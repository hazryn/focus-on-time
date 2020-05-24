import axios from 'axios';
import Vue from 'vue';
import { Task, WorkLog, WorkLogTime } from '@/store/work/interfaces';
import { format } from 'date-fns-tz';

export class WorkModule {
  protected interval = 5;

  constructor(
    private readonly store: any,
    private readonly electronStore: any,
  ) {}

  public async search(phrase: string): Promise<Task[]> {
    const searchQuery = this.buildSearchQuery(phrase);

    const { data } = await axios.get(`https://api.atlassian.com/ex/jira/${this.store.state.Account.resource.id}/rest/api/2/search?jql=${searchQuery}`, {
      headers: { Authorization: `Bearer ${this.store.state.Account.token.access_token}` },
    });

    const tasks = data.issues ? data.issues.slice(0, 10) : [];
    return tasks.map((task: any) => ({
      id: task.id,
      key: task.key,
      name: task.fields.summary,
      status: task.fields.status.name.toUpperCase(),
      assignee: task.fields.assignee || null,
      issue: {
        description: task.fields.issuetype.description,
        icon: task.fields.issuetype.iconUrl,
        name: task.fields.issuetype.name,
      },
    }));
  }

  public getCurrentTaskTime(): number | null {
    const task = this.store.state.Work.workLog.find(
      (w: WorkLog) => w.paused || w.time.some((t: WorkLogTime) => t.endTime === null),
    );

    if (!task) {
      return null;
    }

    return this.calculateTimeForWorkLog(task);
  }

  public getWorkLogStartTime(task: WorkLog) {
    const startTimes = task.time.map((t: WorkLogTime) => t.startTime);
    return startTimes.reduce((prev, next) => (prev < next ? prev : next));
  }

  public getWorkLogEndTime(task: WorkLog) {
    const endTimes = task.time.map((t: WorkLogTime) => t.endTime);
    if (endTimes.some((date: Date | null) => !date)) {
      return new Date();
    }

    const endTimesWithoutEmptyDates: Date[] = endTimes.filter((w: Date | null) => w !== null) as Date[];
    return endTimesWithoutEmptyDates.reduce((prev, next) => (prev > next ? prev : next));
  }

  public calculateTimeForWorkLog(task: WorkLog): number {
    const sumDiffInMilliseconds = task.time.reduce((prev: number, time: WorkLogTime) => (prev + (time.endTime
      ? Math.abs((new Date(time.endTime.getTime() - time.startTime.getTime())).getTime())
      : Math.abs((new Date((new Date()).getTime() - time.startTime.getTime())).getTime()))), 0);

    const diffInMinutes = Math.floor(sumDiffInMilliseconds / 1000 / 60);
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes - (hours * 60);
    const modulo = minutes % this.interval;
    const addRounded = modulo === 0 ? 0 : this.interval - modulo;
    const roundedMinutes = minutes > 0 ? minutes + addRounded : 0;

    return hours * 60 + roundedMinutes;
  }

  public getSumSelectedTime(): number {
    return this.store.state.Work.workLog
      .filter((w: WorkLog) => w.checked)
      .reduce((prev: number, workLog: WorkLog) => prev + this.calculateTimeForWorkLog(workLog), 0);
  }

  public setTask(task: Task): void {
    this.store.commit('Work/SET_TASK', task);
    this.store.commit('Work/ADD_TASK_TO_WORK_LOG', task);
  }

  public resumeWork(): void {
    this.store.commit('Work/RESUME_WORK');
  }

  public stopWork(): void {
    this.store.commit('Work/STOP_WORK');
  }

  public remove({ id, taskId }: WorkLog): void {
    const index = this.store.state.Work.workLog.findIndex((w: WorkLog) => w.id === id);
    if (index >= 0) {
      const workLog = this.store.state.Work.workLog[index];

      if (workLog.paused) {
        const changedWorkLog = Object.assign(workLog, { time: [] });
        Vue.set(this.store.state.Work.workLog, index, changedWorkLog);
      } else {
        Vue.delete(this.store.state.Work.workLog, index);

        const sumOfWorkLogsForThisTask = this.store.state.Work.workLog.filter((w: WorkLog) => w.taskId === taskId);
        if (!sumOfWorkLogsForThisTask.length && this.store.state.Work.task && this.store.state.Work.task.id === taskId) {
          const { task } = this.store.state.Work;
          this.store.commit('Work/ADD_TASK_TO_WORK_LOG', task);
        }
      }
    }
  }

  public sendWorkLogs() {
    const workLogs = this.store.state.Work.workLog.filter((w: WorkLog) => w.checked);
    if (!workLogs.length) throw new Error('No tasks were selected');
    if (!this.isWorkLogValid()) throw new Error('Some work log entries are invalid');

    const promises = workLogs.map((workLog: WorkLog) => this.sendWorkLog(workLog));

    return Promise.all(promises);
  }

  public formatTime(time: number): string {
    const hours = parseInt(String(time / 60), 10);
    const minutes = parseInt(String(time - hours * 60), 10);

    return `${hours}h ${minutes}m`;
  }

  public isWorkLogValid() {
    const workLogs = this.store.state.Work.workLog.filter((w: WorkLog) => w.checked);
    const { workLogDescriptionRequired } = this.store.state.Account.settings;
    if (!workLogs.length || !workLogDescriptionRequired) {
      return true;
    }

    return !workLogs.some((w: WorkLog) => w.description.trim() === '');
  }

  public clearWork() {
    this.store.state.Work.workLog = [];
    this.store.state.Work.task = null;
  }

  protected sendWorkLog(workLog: WorkLog) {
    return axios.post(`https://api.atlassian.com/ex/jira/${this.store.state.Account.resource.id}/rest/api/2/issue/${workLog.taskId}/worklog`, {
      comment: workLog.description,
      started: this.formatStartDate(workLog),
      timeSpent: this.formatTime(this.calculateTimeForWorkLog(workLog)),
    }, {
      headers: { Authorization: `Bearer ${this.store.state.Account.token.access_token}` },
    });
  }

  protected formatStartDate(workLog: WorkLog): string {
    const { timeZone } = this.store.state.Account;
    const isoTimeZone = format(new Date(), 'zzz', { timeZone });
    return this.getWorkLogStartTime(workLog).toISOString().replace(/Z$/, isoTimeZone);
  }

  protected buildSearchQuery(phrase: string): string {
    let searchQuery = `text ~ '${phrase.trim()}*'`;

    if (/^[a-zA-Z]+-[0-9]+$/.test(phrase.trim())) {
      searchQuery += `OR key = '${phrase.trim()}'`;
    }

    searchQuery += ' order by updated desc';

    return searchQuery;
  }
}

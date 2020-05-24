import Vue from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { Task, WorkLog, WorkLogTime, WorkState } from './interfaces';

const SET_TASK = (state: WorkState, task?: Task) => {
  const currentTaskIndex = state.workLog.findIndex((t) => t.paused || t.time.some((w) => !w.endTime));
  if (currentTaskIndex >= 0) {
    const time = state.workLog[currentTaskIndex].time.map((w: WorkLogTime) => Object.assign(w, {
      endTime: w.endTime || new Date(),
    }));
    const changedWorkLog = Object.assign(state.workLog[currentTaskIndex], { time, paused: false });
    Vue.set(state.workLog, currentTaskIndex, changedWorkLog);
  }
  console.log('SET_TASK', task);
  state.task = task || null;
};

const ADD_TASK_TO_WORK_LOG = (state: WorkState, task: Task) => {
  const newWorkLog = {
    id: uuidv4(),
    taskId: task.id,
    name: task.name,
    key: task.key,
    description: '',
    paused: false,
    issue: task.issue,
    checked: false,
    time: [
      {
        startTime: new Date(),
        endTime: null,
      },
    ],
  };
  state.workLog = [...state.workLog, newWorkLog];
};

const RESUME_WORK = (state: WorkState) => {
  const index = state.workLog.findIndex((w) => w.paused);
  if (index >= 0) {
    const time = [...state.workLog[index].time, { startTime: new Date(), endTime: null }];
    const changedWorkLog = Object.assign(state.workLog[index], { time, paused: false });
    Vue.set(state.workLog, index, changedWorkLog);
  }
};

const STOP_WORK = (state: WorkState) => {
  const index = state.workLog.findIndex((w) => !w.paused && w.time.some((t) => !t.endTime));
  if (index >= 0) {
    const time = state.workLog[index].time.map((w: WorkLogTime) => Object.assign(w, {
      endTime: w.endTime || new Date(),
    }));
    const changedWorkLog = Object.assign(state.workLog[index], { time, paused: true });
    Vue.set(state.workLog, index, changedWorkLog);
  }
};

const CHECK_WORK = (state: WorkState, { workLog, value }: { workLog: WorkLog; value: boolean }) => {
  const index = state.workLog.findIndex((w) => w.id === workLog.id);
  if (index >= 0) {
    const changedWorkLog = Object.assign(state.workLog[index], { checked: value });
    Vue.set(state.workLog, index, changedWorkLog);
  }
};

const SET_WORK_DESCRIPTION = (state: WorkState, { workLog, value }: { workLog: WorkLog; value: boolean }) => {
  const index = state.workLog.findIndex((w) => w.id === workLog.id);
  if (index >= 0) {
    const changedWorkLog = Object.assign(state.workLog[index], { description: value });
    Vue.set(state.workLog, index, changedWorkLog);
  }
};

export default {
  SET_TASK,
  ADD_TASK_TO_WORK_LOG,
  RESUME_WORK,
  STOP_WORK,
  CHECK_WORK,
  SET_WORK_DESCRIPTION,
};

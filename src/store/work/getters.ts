import { WorkState } from '@/store/work/interfaces';

export default {
  GET_TASK(state: WorkState) {
    return state.task;
  },
  GET_CURRENT_WORK_LOG(state: WorkState) {
    return state.workLog.find((t) => t.paused || t.time.some((w) => !w.endTime)) || null;
  },
  GET_CHECKED(state: WorkState) {
    return state.workLog.filter((w) => w.checked);
  },
};

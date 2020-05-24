import { UserResponse } from "@/store/account/interfaces";

export interface Task {
  id: string;
  key: string;
  status: string;
  name: string;
  assignee: UserResponse | null;
  issue: Issue;
}

export interface Issue {
  description: string;
  icon: string;
  name: string;
}

export interface WorkLogTime {
  startTime: Date;
  endTime: Date | null;
}

export interface WorkLog {
  id: string;
  taskId: string;
  name: string;
  key: string;
  description: string;
  paused: boolean;
  checked: boolean;
  time: WorkLogTime[];
  issue: Issue;
}

export interface WorkState {
  task: Task | null;
  workLog: WorkLog[];
}

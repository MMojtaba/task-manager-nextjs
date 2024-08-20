import { GROUP, PRIORITY } from "../models/Task";

export interface CREATE_TASK {
  title: string;
  description: string;
  dueDate: Date;
  group: GROUP;
  priority: PRIORITY;
}

// TODO: fix this and use it
export type UPDATE_TASK = CREATE_TASK | { id: string };

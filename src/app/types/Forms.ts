import { PRIORITY } from "../models/Task";

export interface CREATE_TASK {
  title: string;
  description: string;
  dueDate: Date;
  label: string;
  priority: PRIORITY;
}

// TODO: fix this and use it
export type UPDATE_TASK = CREATE_TASK | { id: string };

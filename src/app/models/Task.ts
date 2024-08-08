import mongoose from "mongoose";

type ObjectIdType = mongoose.Types.ObjectId;
const ObjectId = mongoose.Schema.Types.ObjectId;

export enum PRIORITY {
  DEFAULT = "Default",
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}
export enum GROUP {
  OTHER = "Other",
  WORK = "Work",
  SCHOOL = "School",
  PERSONAL = "Personal",
}

export interface ITask {
  _id: ObjectIdType;
  title: string;
  description?: string;
  dueDate: Date;
  priority: PRIORITY;
  group: GROUP;
  user: ObjectIdType;
}

const TaskSchema = new mongoose.Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: PRIORITY, default: PRIORITY.DEFAULT },
  group: { type: String, enum: GROUP, default: GROUP.OTHER },
  user: { type: ObjectId, ref: "User", required: true },
});

export default mongoose.models?.Task ||
  mongoose.model<ITask>("Task", TaskSchema);

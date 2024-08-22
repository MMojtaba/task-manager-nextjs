import mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
  labels: string[];
}

// const defaultLabels = ["Other", "Personal", "Work", "School"];

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  labels: { type: [String], default: [] },
});

export default mongoose.models?.User ||
  mongoose.model<IUser>("User", UserSchema);

import { getMyTasks } from "@/app/dataAccess/task";
import { ITask } from "@/app/models/Task";
import { Metadata } from "next";
import CalendarMain from "./components/CalendarMain";

export const metadata: Metadata = {
  title: "Calendar",
};

export default async function Calendar() {
  let tasks: ITask[] = [];

  try {
    // TODO: how to make {} optional (so i don't have to provide it)
    const res = await getMyTasks({});

    if (res.status === 200) tasks = res.data;
    else throw new Error(res.message);
  } catch (err) {
    console.error("Error getting tasks", err);
  }

  return <CalendarMain tasks={tasks} />;
}

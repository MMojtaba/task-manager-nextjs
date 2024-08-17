import { Metadata } from "next";
import { Suspense } from "react";
import MiniTask from "../../_components/MiniTask";
import { auth } from "@/app/auth/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getMyTasks } from "@/app/dataAccess/task";
import TasksMain from "./components/TasksMain";

export const metadata: Metadata = {
  title: "Tasks",
};

export default async function Tasks() {
  let tasks: any[] | undefined;
  async function init() {
    try {
      const res = await getMyTasks();
      if (res.status !== 200) throw new Error(res.message);

      tasks = res.data;
    } catch (err) {
      console.error("Error getting tasks", err);
    }
  }

  await init();

  return (
    <Suspense fallback={<p>Loading task...</p>}>
      <TasksMain tasks={tasks} />
    </Suspense>
  );
}

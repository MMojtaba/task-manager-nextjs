"use client";

// import { Metadata } from "next";
import { Suspense, useEffect, useState } from "react";
import { getMyTasks } from "@/app/dataAccess/task";
import TasksMain from "./components/TasksMain";
import { TASK_STATUS } from "@/app/models/Task";

// export const metadata: Metadata = {
//   title: "Tasks",
// };

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);

  // let tasks: any[] | undefined;
  async function init(status) {
    try {
      const res = await getMyTasks({ status: status });
      if (res.status === 404) setTasks([]);
      else if (res.status !== 200) throw new Error(res.message);
      else setTasks(res.data);
    } catch (err) {
      console.error("Error getting tasks", err);
    }
  }

  function onTabChange(newTab: TASK_STATUS) {
    console.log("new tab is", newTab);
    init(newTab);
  }

  useEffect(() => {
    init(TASK_STATUS.IN_PROGRESS);
  }, []);

  // TODO: use a context to pass to TaskRow, so it can say that we should splice tasks (or reinit?)

  return (
    <Suspense fallback={<p>Loading task...</p>}>
      <TasksMain tasks={tasks} onTabChange={onTabChange} />
    </Suspense>
  );
}

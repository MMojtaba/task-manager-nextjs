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
  // TODO: use a context to pass to TaskRow, so it can say that we should splice tasks (or reinit?)

  return (
    <Suspense fallback={<p>Loading task...</p>}>
      <TasksMain />
    </Suspense>
  );
}

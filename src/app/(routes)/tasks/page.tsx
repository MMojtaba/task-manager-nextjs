"use client";

// import { Metadata } from "next";
import { Suspense, useEffect, useState } from "react";
import { getMyTasks } from "@/app/dataAccess/task";
import TasksMain from "./components/TasksMain";
import { TASK_STATUS } from "@/app/models/Task";

export default function Tasks() {
  return (
    <Suspense fallback={<p>Loading task...</p>}>
      <TasksMain />
    </Suspense>
  );
}

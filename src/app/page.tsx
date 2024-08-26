"use client";

import { ITask, TASK_STATUS } from "./models/Task";
import { getMyTasks } from "./dataAccess/task";
import TaskRow from "./(routes)/tasks/components/TaskRow";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  async function init() {
    try {
      const resTasks = await getMyTasks({ status: TASK_STATUS.IN_PROGRESS });
      if (resTasks.status === 200) setTasks(resTasks.data);
      else throw new Error(resTasks.message);
    } catch (err) {
      console.error("Error getting home page data");
      tasks: [];
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <main className="m-8 rounded-xl">
      <h2 className="text-lg font-bold">Upcoming...</h2>
      {tasks.map((task) => (
        <TaskRow key={task._id.toString()} task={task} />
      ))}
    </main>
  );
}

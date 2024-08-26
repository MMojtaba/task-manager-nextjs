"use client";

import { ITask } from "@/app/models/Task";
import TaskRow from "../../tasks/components/TaskRow";

interface Props {
  tasks: ITask[];
}

export default function HomeMain({ tasks }: Props) {
  return (
    <div className="m-8 rounded-xl">
      <h2 className="text-lg font-bold">Upcoming...</h2>
      {tasks.map((task) => (
        <TaskRow key={task._id.toString()} task={task} />
      ))}
    </div>
  );
}

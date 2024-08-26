"use client";

import { ITask } from "@/app/models/Task";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { DayProps } from "react-day-picker";
import TaskViewDrawer from "./TaskViewDrawer";
import { useState } from "react";

interface Props {
  tasks: ITask[];
}

export default function CalendarMain({ tasks }: Props) {
  const [shownTask, setShownTask] = useState<ITask | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleTaskClick(task: ITask) {
    setShownTask(task);
    setIsOpen(true);
  }

  function renderDay(props: DayProps) {
    const { date, displayMonth } = props;

    const dayTasks = tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      return (
        dueDate.getFullYear() === date.getFullYear() &&
        dueDate.getMonth() === date.getMonth() &&
        dueDate.getDate() === date.getDate()
      );
    });

    return (
      <div className="flex h-full w-full flex-col">
        <span
          className={
            date.getMonth() === displayMonth.getMonth()
              ? ""
              : "text-muted-foreground opacity-50"
          }
        >
          {props.date.getDate()}
        </span>

        {dayTasks.map((task) => (
          <div key={task._id.toString()}>
            <Badge
              className="m-1 flex w-4/5"
              onClick={() => handleTaskClick(task)}
            >
              {task.title}
            </Badge>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1>Calendar page!</h1>
      <Calendar
        components={{ Day: renderDay }}
        large={true}
        className="w-full"
      />
      <TaskViewDrawer
        task={shownTask}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </div>
  );
}

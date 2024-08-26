"use client";

import { ITask } from "@/app/models/Task";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { DayProps } from "react-day-picker";

interface Props {
  tasks: ITask[];
}

export default function CalendarMain({ tasks }: Props) {
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
          <Badge key={task._id.toString()} className="m-1 flex w-4/5">
            {task.title}
          </Badge>
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
    </div>
  );
}

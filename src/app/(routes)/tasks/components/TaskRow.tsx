"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import TaskRowContent from "./TaskRowContent";
import { Badge } from "@/components/ui/badge";
import { TASK_STATUS, TASK_STATUS_TEXT } from "@/app/models/Task";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { changeTaskStatus } from "@/app/dataAccess/task";
import { formatDate } from "@/app/utils/utils";

interface Props {
  task: any;
  onTaskChange?: any;
}

export default function TaskRow({ task, onTaskChange }: Props) {
  const [isStatusSelectOpen, setIsStatusSelectOpen] = useState<boolean>(false);

  async function handleStatusChange(status: TASK_STATUS) {
    try {
      const res = await changeTaskStatus(task._id, status);
      if (res.status !== 200) throw new Error(res.message);
      onTaskChange(task._id);
    } catch (err) {
      console.error("Error changing task status", err);
    }
  }

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value={task._id}>
          <AccordionTrigger className="flex gap-4">
            <Badge className="flex gap-2" variant="secondary">
              <DropdownMenu
                open={isStatusSelectOpen}
                onOpenChange={setIsStatusSelectOpen}
              >
                <DropdownMenuTrigger asChild>
                  <div>
                    <FontAwesomeIcon icon={faGear} className="mr-2" />
                    <span onClick={() => setIsStatusSelectOpen(true)}>
                      {TASK_STATUS_TEXT[task.status]}
                    </span>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel>Task Status</DropdownMenuLabel>

                  {Object.keys(TASK_STATUS).map((status) => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={task.status === status}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(status);
                      }}
                    >
                      {TASK_STATUS_TEXT[status]}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </Badge>
            <span>{task.title}</span>
            <p>{isStatusSelectOpen}</p>
            <span className="ml-auto text-sm">
              Due {formatDate(task.dueDate)}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <TaskRowContent
              task={task}
              onChange={() => onTaskChange(task._id)}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

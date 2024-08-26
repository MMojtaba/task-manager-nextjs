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

import { formatDate } from "@/lib/utils";
import TaskRowContent from "./TaskRowContent";
import { Badge } from "@/components/ui/badge";
import { TASK_STATUS, TASK_STATUS_TEXT } from "@/app/models/Task";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { changeTaskStatus } from "@/app/dataAccess/task";

interface Props {
  task: any;
}

export default function TaskRow({ task }: Props) {
  const [isStatusSelectOpen, setIsStatusSelectOpen] = useState<boolean>(false);

  async function handleStatusChange(status: TASK_STATUS) {
    try {
      const res = await changeTaskStatus(task._id, status);
      if (res.status !== 200) throw new Error(res.message);
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
                {/* Dropdown menu trigger seems to have a button inside producing a warning in console: button cannot be descentdant of button */}
                <DropdownMenuTrigger>
                  {/* TODO: change icon? */}
                  <FontAwesomeIcon icon={faGear} className="mr-2" />
                  <button onClick={() => setIsStatusSelectOpen(true)}>
                    {TASK_STATUS_TEXT[task.status]}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel>Task Status</DropdownMenuLabel>

                  {/* TODO: stop propegation (so cliking status from dropdown doesn't change accordian open/close) */}
                  {Object.keys(TASK_STATUS).map((status) => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={task.status === status}
                      onClick={() => handleStatusChange(status)}
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
            <TaskRowContent task={task} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

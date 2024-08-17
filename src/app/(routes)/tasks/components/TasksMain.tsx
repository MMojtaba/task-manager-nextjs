"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ITask, TASK_STATUS, TASK_STATUS_TEXT } from "@/app/models/Task";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import TaskTable from "./TaskTable";
import TaskEdit from "./TaskEdit";

interface Props {
  tasks: ITask[] | undefined;
}

const TASKS_TABS = { ...TASK_STATUS, CREATE: "CREATE" };
type TASKS_TABS = TASK_STATUS | "CREATE";

export default function TasksMain({ tasks }: Props) {
  const [selectedTab, setSelectedTab] = useState<TASKS_TABS>(
    TASKS_TABS.IN_PROGRESS,
  );

  return (
    <>
      <Tabs
        className="mx-1"
        defaultValue={TASKS_TABS.IN_PROGRESS}
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value as TASKS_TABS)}
      >
        <TabsList className="w-full">
          <TabsTrigger className="w-1/4" value={TASKS_TABS.IN_PROGRESS}>
            {TASK_STATUS_TEXT.IN_PROGRESS}
          </TabsTrigger>
          <TabsTrigger className="w-1/4" value={TASKS_TABS.COMPLETE}>
            {TASK_STATUS_TEXT.COMPLETE}
          </TabsTrigger>
          <TabsTrigger className="w-1/4" value={TASKS_TABS.CLOSED}>
            {TASK_STATUS_TEXT.CLOSED}
          </TabsTrigger>

          <TabsTrigger className="w-1/4" value={TASKS_TABS.CREATE}>
            <FontAwesomeIcon icon={faSquarePlus} className="text-2xl" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {selectedTab === TASKS_TABS.CREATE ? (
        <TaskEdit />
      ) : (
        <TaskTable tasks={tasks} />
      )}
    </>
  );
}

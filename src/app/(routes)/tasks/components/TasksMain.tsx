"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ITask, TASK_STATUS, TASK_STATUS_TEXT } from "@/app/models/Task";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import TaskTable from "./TaskTable";
import TaskEdit from "./TaskEdit";
import { getMyTasks } from "@/app/dataAccess/task";
import { getUserLabels } from "@/app/dataAccess/label";

const TASKS_TABS = { ...TASK_STATUS, CREATE: "CREATE" };
type TASKS_TABS = TASK_STATUS | "CREATE";

export default function TasksMain() {
  const [selectedTab, setSelectedTab] = useState<TASKS_TABS>(
    TASKS_TABS.IN_PROGRESS,
  );

  const [selectedLabel, setSelectedLabel] = useState<string>("All");

  const [tasks, setTasks] = useState<any[]>();
  const [labels, setLabels] = useState<any[]>([]);

  async function initTasks(status: TASK_STATUS, label: string) {
    try {
      const res = await getMyTasks({ status: status, label: label });
      if (res.status === 404) setTasks([]);
      else if (res.status !== 200) throw new Error(res.message);
      else setTasks(res.data);
    } catch (err) {
      console.error("Error getting tasks", err);
      // TODO: show toast
    }
  }

  async function initLabels() {
    try {
      const res = await getUserLabels();
      if (res.status !== 200) throw new Error(res.message);
      else setLabels(["All", ...res.data]);
    } catch (err) {
      console.error("Error initializing labels", err);
      // TODO: show toast
    }
  }

  function handleStatusTabChange(value: string) {
    setSelectedTab(value as TASKS_TABS);

    if (value !== TASKS_TABS.CREATE)
      initTasks(value as TASK_STATUS, selectedLabel);
  }

  function handleLabelTabChange(value: string) {
    setSelectedLabel(value);
    initTasks(selectedTab as TASK_STATUS, value);
  }

  useEffect(() => {
    initLabels();
    initTasks(TASK_STATUS.IN_PROGRESS, selectedLabel);
  }, []);

  return (
    <>
      <Tabs
        className="m-2"
        defaultValue={TASKS_TABS.IN_PROGRESS}
        value={selectedTab}
        onValueChange={handleStatusTabChange}
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

      {selectedTab !== TASKS_TABS.CREATE && (
        <Tabs
          className="m-2 mx-24"
          defaultValue={"All"}
          value={selectedLabel}
          onValueChange={handleLabelTabChange}
        >
          <TabsList className="w-full">
            {labels.map((label) => (
              <TabsTrigger key={label} className="" value={label}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
      {selectedTab === TASKS_TABS.CREATE ? (
        <TaskEdit />
      ) : (
        <TaskTable tasks={tasks} />
      )}
    </>
  );
}

"use client";

import { removeTask } from "@/app/dataAccess/task";
import { ITask } from "@/app/models/Task";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import TaskEdit from "./TaskEdit";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  task: ITask;
}

export default function TaskRowContent({ task }: Props) {
  const { toast } = useToast();

  const [editOpen, setEditOpen] = useState<boolean>(false);

  async function onTaskRemove() {
    try {
      const res = await removeTask(task._id.toString());
      if (res.status !== 200) throw new Error(res.message);
      toast({ title: "Task removed!" });
    } catch (err) {
      console.error("Error removing task", err);
      toast({ title: "Error removing task", variant: "destructive" });
    }
  }

  async function onTaskEdit() {
    setEditOpen(true);
  }

  return (
    <>
      <div className="rounded-2xl border border-white p-4">
        <span className="flex gap-4">
          <Badge className="w-20 justify-center bg-red-500" title="Priority">
            {task.priority}
          </Badge>
          {!!task.label && (
            <Badge className="w-20 justify-center bg-blue-400" title="Label">
              {task.label}
            </Badge>
          )}
        </span>
        <span className="my-4 flex gap-4">
          <h3 className="text-base font-bold">Description</h3>
          <p className="self-end">{task.description}</p>
        </span>
        <div className="flex gap-2">
          <Button className="w-24" onClick={onTaskEdit}>
            Edit
          </Button>
          <Button className="w-24" variant="destructive" onClick={onTaskRemove}>
            Remove
          </Button>
        </div>
      </div>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription className="">
              <TaskEdit task={task} onClose={() => setEditOpen(false)} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

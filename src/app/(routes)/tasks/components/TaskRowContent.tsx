import { removeTask } from "@/app/dataAccess/task";
import { ITask } from "@/app/models/Task";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  task: ITask;
}

export default function TaskRowContent({ task }: Props) {
  async function onTaskRemove() {
    try {
      const res = await removeTask(task._id);
      if (res.status !== 200) throw new Error(res.message);
      // TODO: toast
    } catch (err) {
      console.error("Error removing task", err);
      // TODO: toast
    }
  }

  return (
    <div className="rounded-2xl border border-white p-4">
      <span className="flex gap-4">
        {/* TODO: hover say priotity or group */}
        <Badge className="w-20 justify-center bg-red-500">
          {task.priority}
        </Badge>
        <Badge className="w-20 justify-center bg-blue-400">{task.group}</Badge>
      </span>
      <span className="my-4 flex gap-4">
        <h3 className="text-base font-bold">Description</h3>
        <p className="self-end">{task.description}</p>
      </span>
      <div className="flex gap-2">
        <Button className="w-24">Edit</Button>
        <Button className="w-24" variant="destructive" onClick={onTaskRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
}

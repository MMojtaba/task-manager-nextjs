import { ITask } from "@/app/models/Task";
import TaskRow from "./TaskRow";

interface Props {
  tasks: ITask[] | undefined;
  onTaskChange: any;
}

export default function TaskTable({ tasks, onTaskChange }: Props) {
  return (
    <div className="px-4">
      {tasks?.length ? (
        tasks.map((task) => (
          <TaskRow
            key={task._id.toString()}
            task={task}
            onTaskChange={onTaskChange}
          />
        ))
      ) : (
        <div className="mt-2 flex justify-center">
          {tasks ? "No tasks..." : "Loading..."}
        </div>
      )}
    </div>
  );
}

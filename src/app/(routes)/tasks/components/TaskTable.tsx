import TaskRow from "./TaskRow";

interface Props {
  tasks: any[] | undefined;
}

export default function TaskTable({ tasks }: Props) {
  return (
    <div className="px-4">
      {tasks?.length ? (
        tasks.map((task, index) => <TaskRow key={task._id} task={task} />)
      ) : (
        <div>No tasks</div>
      )}
    </div>
  );
}

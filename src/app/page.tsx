import { auth } from "@/app/auth/auth";
import AuthButton from "./_components/AuthButton.server";
import { ITask, TASK_STATUS } from "./models/Task";
import { getUserLabels } from "./dataAccess/label";
import { getMyTasks } from "./dataAccess/task";
import TaskRow from "./(routes)/tasks/components/TaskRow";

export default async function Home() {
  let tasks: ITask[] = [];

  try {
    const resTasks = await getMyTasks({ status: TASK_STATUS.IN_PROGRESS });
    if (resTasks.status === 200) tasks = resTasks.data;
    else throw new Error(resTasks.message);
  } catch (err) {
    console.error("Error getting home page data");
    tasks: [];
  }

  return (
    <main className="m-8 rounded-xl">
      <h2 className="text-lg font-bold">Upcoming...</h2>
      {tasks.map((task) => (
        <TaskRow key={task._id.toString()} task={task} />
      ))}
    </main>
  );
}

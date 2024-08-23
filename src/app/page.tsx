import { auth } from "@/app/auth/auth";
import AuthButton from "./_components/AuthButton.server";
import { ITask, TASK_STATUS } from "./models/Task";
import { getUserLabels } from "./dataAccess/label";
import { getMyTasks } from "./dataAccess/task";
import TaskRow from "./(routes)/tasks/components/TaskRow";

export default async function Home() {
  const session = await auth();

  let labels: string[] = [];
  let tasks: ITask[] = [];

  try {
    // TODO: filter by label
    const resTasks = await getMyTasks({ status: TASK_STATUS.IN_PROGRESS });
    if (resTasks.status === 200) tasks = resTasks.data;

    const resLabels = await getUserLabels();
  } catch (err) {
    console.error("Error getting home page data");
  }

  return (
    <main>
      {tasks.map((task) => (
        <TaskRow key={task._id} task={task} />
      ))}
    </main>
  );
}

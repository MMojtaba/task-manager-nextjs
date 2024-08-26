import { ITask, TASK_STATUS } from "./models/Task";
import { getMyTasks } from "./dataAccess/task";
import TaskRow from "./(routes)/tasks/components/TaskRow";
import HomeMain from "./(routes)/settings/components/HomeMain";

export default async function Page() {
  let tasks: ITask[] = [];

  async function init() {
    try {
      const resTasks = await getMyTasks({ status: TASK_STATUS.IN_PROGRESS });
      if (resTasks.status === 200) tasks = resTasks.data;
      else throw new Error(resTasks.message);
    } catch (err) {
      console.error("Error getting home page data");
      tasks = [];
    }
  }

  await init();

  return <HomeMain tasks={tasks} />;
}

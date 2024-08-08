import TaskEdit from "@/app/_components/TaskEdit";

export default function Page() {
  return (
    <>
      <h1 className="m-2 mx-16 rounded-xl border-2 bg-white p-1 text-center text-xl font-bold text-black">
        Create New Task
      </h1>
      <TaskEdit />
    </>
  );
}

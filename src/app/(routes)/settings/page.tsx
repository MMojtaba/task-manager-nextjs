import { getUserLabels } from "@/app/dataAccess/label";
import UserLabelItem from "./components/UserLabelItem";
import CreateLabel from "./components/CreateLabelButton";

export default async function Page() {
  let labels: string[] = [];

  try {
    const res = await getUserLabels();
    console.log("res is", res);
    if (res.status === 404) labels = [];
    else if (res.status !== 200) throw new Error(res.message);
    else labels = res.data;
  } catch (err) {
    console.error("Error getting labesl", err);
    labels = [];
  }

  return (
    <div className="rounded border border-gray-300 p-4">
      <h1 className="text-lg font-bold">My Labels</h1>
      {labels.map((label, index) => (
        <UserLabelItem key={index} label={label} index={index} />
      ))}

      <CreateLabel />
    </div>
  );
}

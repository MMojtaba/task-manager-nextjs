import { getUserLabels } from "@/app/dataAccess/label";
import UserLabelSelector from "./components/UserLabelSelector";
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
    <>
      {labels.map((label, index) => (
        <UserLabelSelector key={index} label={label} index={index} />
      ))}

      <CreateLabel />
    </>
  );
}

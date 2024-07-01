import { Metadata } from "next";
import { Suspense } from "react";
import MiniTask from "../../_components/MiniTask";
import { auth } from "@/app/auth/auth";

export const metadata: Metadata = {
  title: "Tasks",
};

export default async function Tasks() {
  const session = await auth();
  console.log("sessoin ixxs", session, session?.user);
  return (
    <>
      <h1>Tasks page!</h1>
      <Suspense fallback={<p>Loading task...</p>}>
        <MiniTask></MiniTask>
      </Suspense>
    </>
  );
}

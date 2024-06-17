import { Metadata } from "next";
import { Suspense } from "react";
import MiniTask from "../_components/MiniTask";

export const metadata: Metadata = {
  title: "Tasks",
};

export default function Tasks() {
  return (
    <>
      <h1>Tasks page!</h1>
      <Suspense fallback={<p>Loading task...</p>}>
        <MiniTask></MiniTask>
      </Suspense>
    </>
  );
}

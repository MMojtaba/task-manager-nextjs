"use server";

import { genericHttpResponse } from "@/lib/utils";
import Task from "../models/Task";
import { getLoggedInUserId } from "../utils/authUtils";
import { Types } from "mongoose";
import { revalidateTag } from "next/cache";
const ObjectId = Types.ObjectId;

export async function createTask(formValues: any) {
  // TODO: auth
  try {
    // TOOD NOW
    const userId = await getLoggedInUserId();

    if (!userId) return genericHttpResponse(401);

    const { title, description, dueDate, priority, group } = formValues;

    await Task.create({
      title,
      description,
      dueDate,
      priority,
      group,
      user: new ObjectId(userId),
    });

    revalidateTag("task");

    return { status: 200, message: "Created task!" };
  } catch (err) {
    console.error("Error creating task", err);
    return { status: 500, message: "Error creating task" };
  }
}

export async function getMyTasks() {
  revalidateTag("task");
  try {
    // TODO
    const userId = await getLoggedInUserId();
    if (!userId) {
      console.error("Not authorized to get tasks");
      return { status: 401, message: "Unauthorized" };
    }

    const tasks = await Task.find({ user: new ObjectId(userId) });
    if (!tasks.length) {
      console.warn("Not task found for user");
      return { status: 404, message: "No tasks found" };
    }

    return {
      status: 200,
      message: "Success",
      data: JSON.parse(JSON.stringify(tasks)),
    };
  } catch (err) {
    console.error("Error getting my tasks", err);
    return { status: 500, message: "Internal error" };
  }
}

export async function removeTask(taskId: string) {
  const loggedInUID = await getLoggedInUserId();
  if (!loggedInUID) return genericHttpResponse(401);

  try {
    const task = await Task.findById(new ObjectId(taskId));

    if (!task) return genericHttpResponse(404);

    if (task.user.toString() !== loggedInUID) {
      console.warn("User doesn't have access to this task", loggedInUID);
      return genericHttpResponse(401);
    }

    await Task.findByIdAndDelete(task._id);

    revalidateTag("task");

    return genericHttpResponse(200);
  } catch (err) {
    console.error("Error removing task", err);
    return genericHttpResponse(500);
  }
}

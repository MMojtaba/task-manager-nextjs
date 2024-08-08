"use server";

import Task from "../models/Task";
import { getLoggedInUserId } from "../utils/authUtils";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

export async function createTask(formValues: any) {
  // TODO: auth
  try {
    // TOOD NOW
    const userId = (await getLoggedInUserId()) ?? "6684cc08c8a5acc5b9df8a67";

    const { title, description, dueDate, priority, group } = formValues;

    await Task.create({
      title,
      description,
      dueDate,
      priority,
      group,
      user: new ObjectId(userId),
    });

    return { status: 200, message: "Created task!" };
  } catch (err) {
    console.error("Error creating task", err);
    return { status: 500, message: "Error creating task" };
  }
}

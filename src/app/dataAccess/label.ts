"use server";

import { genericHttpResponse } from "@/lib/utils";
import { getLoggedInUserId } from "../utils/authUtils";
import User from "../models/User";
import { Types } from "mongoose";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { TAGS } from "../types/Tags";
import Task from "../models/Task";
const ObjectId = Types.ObjectId;

export async function getUserLabels() {
  const userId = await getLoggedInUserId();

  if (!userId) return genericHttpResponse(401);

  revalidateTag(TAGS.LABEL);

  try {
    const userData = await User.findById(new ObjectId(userId)).select("labels");

    const labels = userData?.labels;

    console.log("labels are", labels);

    if (!labels?.length) return genericHttpResponse(404);

    return { status: 200, message: "Success", data: labels };
  } catch (err) {
    console.error("Error getting user labels", err);
    return genericHttpResponse(500);
  }
}

export async function createLabel(name: string) {
  // TODO: don't allow creating with same namme for this user
  if (!name) return genericHttpResponse(400);

  const userId = await getLoggedInUserId();

  if (!userId) return genericHttpResponse(401);

  try {
    const parseRes = z.string().safeParse(name);
    if (!parseRes.success) return genericHttpResponse(400);

    await User.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $push: { labels: name } },
    );

    revalidateTag(TAGS.LABEL);

    return genericHttpResponse(200);
  } catch (err) {
    console.error("Error creating label", err);
    return genericHttpResponse(500);
  }
}

export async function removeLabel(name: string) {
  if (!name) return genericHttpResponse(400);

  const userId = await getLoggedInUserId();

  if (!userId) return genericHttpResponse(401);

  try {
    const parsedRes = z.string().safeParse(name);
    if (!parsedRes) return genericHttpResponse(400);

    const userData = await User.findById(new ObjectId(userId)).select("labels");

    if (!userData || !userData.labels.some((label) => label === name))
      return genericHttpResponse(404);

    await User.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $pull: { labels: name } },
    );

    await Task.updateMany({ label: name }, { $set: { label: null } });

    revalidateTag(TAGS.LABEL);

    return genericHttpResponse(200);
  } catch (err) {
    console.error("Error removing label", err);
    return genericHttpResponse(500);
  }
}

// TODO: ability to edit label

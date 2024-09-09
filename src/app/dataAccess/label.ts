"use server";

import { getLoggedInUserId } from "../utils/authUtils";
import User from "../models/User";
import { Types } from "mongoose";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { TAGS } from "../types/Tags";
import Task from "../models/Task";
import { genericHttpResponse } from "../utils/utils";
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
  if (!name) return genericHttpResponse(400);

  const userId = await getLoggedInUserId();

  if (!userId) return genericHttpResponse(401);

  try {
    const parseRes = z.string().safeParse(name);
    if (!parseRes.success) return genericHttpResponse(400);

    const userCurrLabels = await User.findById(userId).select("labels");

    if (!userCurrLabels) return genericHttpResponse(404);

    const currLabels = userCurrLabels.labels;

    const isDuplicate = currLabels.some((label) => label === name);

    if (isDuplicate) return genericHttpResponse(400);

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

// TODO FEAT: ability to edit label
import { Resend } from "resend";

export async function tmpSendEmail() {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    resend.emails.send({
      from: "onboarding@resend.dev",
      to: "@gmail.com",
      subject: "Hello World x",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });
    console.log("sent email");
  } catch (err) {
    console.error("Resend error", err);
  }
}

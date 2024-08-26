"use server";

import User from "../models/User";
import { z } from "zod";
import { genericHttpResponse } from "@/lib/utils";
import {
  checkPasswords,
  getLoggedInUserId,
  hashPassword,
} from "../utils/authUtils";

interface PropsCreateUser {
  email: string;
  password: string;
  confirmPassword: string;
}

export async function createUser(values: PropsCreateUser) {
  const { email, password } = values;

  z.string().parse(email);
  z.string().parse(password);

  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ email, password: hashedPassword });

    return genericHttpResponse(200);
  } catch (err) {
    console.error("Error creating user", err);
    return genericHttpResponse(500);
  }
}

export async function updatePassword(values: any) {
  const { currentPassword, newPassword } = values;

  z.string().parse(currentPassword);
  z.string().parse(newPassword);

  try {
    const loggedInUserId = await getLoggedInUserId();

    if (!loggedInUserId) return genericHttpResponse(401);

    const user = await User.findById(loggedInUserId).select("password");

    if (!user) return genericHttpResponse(404);

    const match = await checkPasswords(currentPassword, user.password);

    if (!match) throw new Error("Incorrect password");

    const hashed = await hashPassword(newPassword);

    await User.findByIdAndUpdate(loggedInUserId, {
      $set: { password: hashed },
    });
    return genericHttpResponse(200);
  } catch (err) {
    console.error("Error updating password", err);
    return genericHttpResponse(500);
  }
}

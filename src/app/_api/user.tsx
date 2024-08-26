"use server";

import dbConnect from "../utils/dbConnect";
import User from "../models/User";
import { z } from "zod";
import { genericHttpResponse } from "@/lib/utils";
import { hashPassword } from "../utils/authUtils";

// TODO NOW: hash password

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
    await dbConnect();
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ email, password: hashedPassword });

    return genericHttpResponse(200);
  } catch (err) {
    console.error("Error creating user", err);
    return genericHttpResponse(500);
  }
}

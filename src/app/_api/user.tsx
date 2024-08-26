"use server";

import dbConnect from "../utils/dbConnect";
import User from "../models/User";
import { z } from "zod";
import { genericHttpResponse } from "@/lib/utils";

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
    const newUser = await User.create({ email, password });

    return genericHttpResponse(200);
  } catch (err) {
    console.error("Error creating user", err);
    return genericHttpResponse(500);
  }
}

async function checkUser(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  console.log("create user is", email, password);
}

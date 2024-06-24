"use server";

import dbConnect from "../utils/dbConnect";
import User from "../models/User";

export async function createUser(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  console.log("email is", email, password);

  try {
    await dbConnect();
    const newUser = await User.create({ email, password });

    console.log("new user is", newUser);
  } catch (err) {
    console.error("Error creating user", err);
  }
}

async function checkUser(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  console.log("create user is", email, password);
}

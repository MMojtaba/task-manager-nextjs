import { auth } from "../auth/auth";
// import bcrypt from "bcrypt";

export async function getLoggedInUserId() {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (userId) return userId;
    else return null;
  } catch (err) {
    console.error("Error getting logged in user's id", err);
  }
}

export async function getLoggedInUserEmail() {
  try {
    const session = await auth();
    const userId = session?.user?.email;
    if (userId) return userId;
    else return null;
  } catch (err) {
    console.error("Error getting logged in user's email", err);
  }
}

export async function hashPassword(password: string) {
  try {
    const bcrypt = require("bcrypt");

    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
  } catch (err) {
    console.error("Error hashing password", err);
  }
}

export async function checkPasswords(password: string, hashedPassword: string) {
  try {
    const bcrypt = require("bcrypt");

    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (err) {
    console.error("Error comparing passwords", err);
    return false;
  }
}

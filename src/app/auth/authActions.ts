"use server";

import { revalidateTag } from "next/cache";
import { auth, signIn, signOut } from "./auth";

export async function authLogin(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  if (!email || !password) {
    console.error("Email or password not provided.");
    return;
  }
  await signIn("credentials", {
    email: email,
    password: password,
    redirectTo: "/",
  });

  // revalidateTag("login");
}

export async function authLogout() {
  await signOut();
  // revalidateTag("login");
}

export async function checkLoggedIn() {
  const session = await auth();

  // revalidateTag("login");

  if (session?.user) return true;
  else return false;
}

"use server";

import { signIn, signOut } from "./auth";

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
}

export async function authLogout() {
  await signOut();
}

"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { redirect } from "next/navigation";

export async function authLogin(values: { email: string; password: string }) {
  const email = values.email;
  const password = values.password;
  if (!email || !password) {
    console.error("Email or password not provided.");
    return;
  }

  try {
    await signIn("credentials", {
      email: email,
      password: password,
      // redirectTo: "/",
    });
    // revalidatePath("login");
  } catch (err) {
    //
  }
  redirect("/");
}

export async function authLogout() {
  try {
    await signOut();
    // revalidateTag("login");
  } catch (err) {
    console.error("Error logging out.", err);
  }
  redirect("/login");
}

export async function checkLoggedIn() {
  const session = await auth();

  // revalidateTag("login");

  if (session?.user) return true;
  else return false;
}

import { SessionProvider } from "next-auth/react";

import { BASE_PATH, auth } from "../auth/auth";

import AuthButtonClient from "./AuthButton.client";

export default async function AuthButton() {
  const session = await auth();
  if (session?.user) {
    console.log("session is", session);
    session.user = {
      email: session.user.email,
    };
  }

  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <AuthButtonClient />
    </SessionProvider>
  );
}

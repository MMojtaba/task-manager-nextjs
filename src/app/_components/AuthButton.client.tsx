"use client";

import { useSession } from "next-auth/react";
import { authLogout } from "../auth/authActions";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const session = useSession();

  const router = useRouter();

  return session?.data?.user ? (
    <button
      className="btn btn-accent"
      onClick={async () => {
        await authLogout();
      }}
    >
      {session.data?.user?.email} - Sign Out
    </button>
  ) : (
    <button
      className="btn btn-accent"
      onClick={() => {
        router.push("/login");
      }}
    >
      Sign In
    </button>
  );
}

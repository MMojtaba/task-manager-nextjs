"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authLogout, checkLoggedIn } from "../auth/authActions";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  checkLoggedIn().then((res) => setIsLoggedIn(res));

  const navContentLeft = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/tasks",
      title: "Tasks",
    },
    {
      path: "/calendar",
      title: "Calendar",
    },
  ];

  const navContentRight = [
    {
      path: "/login",
      title: "Login",
    },
    {
      path: "/register",
      title: "Register",
    },
  ];

  const router = useRouter();

  return (
    <nav className="navbar">
      <div className="flex-1">
        {navContentLeft.map((el, index) => (
          <Link
            key={index}
            className={`btn mx-2 text-xl ${
              pathname === el.path ? "btn-primary" : "btn-ghost"
            }`}
            href={el.path}
            prefetch={false}
          >
            {el.title}
          </Link>
        ))}
      </div>
      <div className="flex-none">
        {isLoggedIn ? (
          <button
            className="btn btn-ghost mx-2 text-xl"
            onClick={async () => {
              await authLogout();
              router.push("/");
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              className="btn btn-ghost mx-2 text-xl"
              href="/register"
              prefetch={false}
            >
              Register
            </Link>
            <Link className="btn btn-ghost mx-2 text-xl" href="/login">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

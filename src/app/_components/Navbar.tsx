"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authLogout } from "../auth/authActions";

export default function Navbar() {
  const pathname = usePathname();

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
        <button
          className="btn btn-ghost mx-2 text-xl"
          onClick={() => authLogout()}
        >
          Signout
        </button>
        {navContentRight.map((el, index) => {
          return (
            <Link
              key={index}
              className="btn btn-ghost mx-2 text-xl"
              href={el.path}
              prefetch={false}
            >
              {el.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

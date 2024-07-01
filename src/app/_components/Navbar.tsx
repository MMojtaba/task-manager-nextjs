"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
    {
      path: "/api/auth/signin",
      title: "Login2",
    },
    {
      path: "/api/auth/signout",
      title: "Signout2",
    },
  ];

  return (
    <nav className="navbar">
      <div className="flex-1">
        {navContentLeft.map((el, index) => (
          <Link
            key={index}
            className={`btn text-xl mx-2 ${
              pathname === el.path ? "btn-primary" : "btn-ghost"
            }`}
            href={el.path}
            prefetch={false}>
            {el.title}
          </Link>
        ))}
      </div>
      <div className="flex-none">
        {navContentRight.map((el, index) => (
          <Link
            key={index}
            className={`btn text-xl mx-2 ${
              pathname === el.path ? "btn-primary" : "btn-ghost"
            }`}
            href={el.path}
            prefetch={false}>
            {el.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}

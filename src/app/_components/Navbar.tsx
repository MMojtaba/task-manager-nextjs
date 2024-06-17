"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navContent = [
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

  return (
    <nav className="navbar">
      {navContent.map((el, index) => (
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
    </nav>
  );
}

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link className="btn btn-ghost text-xl" href="home">
        Home
      </Link>
      <Link className="btn btn-ghost text-xl" href="calendar">
        Calendar
      </Link>
    </nav>
  );
}

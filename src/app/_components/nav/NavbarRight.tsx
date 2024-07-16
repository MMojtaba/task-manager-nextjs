import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { badgeVariants } from "@/components/ui/badge";

export default function NavbarRight({ loggedIn }: { loggedIn: boolean }) {
  console.log("in navbar right");
  return (
    <>
      {loggedIn ? (
        <LogoutButton />
      ) : (
        <>
          <Link
            className={badgeVariants({ variant: "outline" })}
            href="/register"
            prefetch={false}
          >
            Register
          </Link>
          <Link className={badgeVariants({ variant: "outline" })} href="/login">
            Login
          </Link>
        </>
      )}
    </>
  );
}

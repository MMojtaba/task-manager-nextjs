import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { badgeVariants } from "@/components/ui/badge";
import NavBarRightLoggedIn from "./NavBarRightLoggedIn";

export default function NavbarRight({ loggedIn }: { loggedIn: boolean }) {
  return (
    <>
      {loggedIn ? (
        <NavBarRightLoggedIn />
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

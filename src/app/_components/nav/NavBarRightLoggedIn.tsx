"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faGear } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { authLogout } from "@/app/auth/authActions";
import Link from "next/link";

export default function NavBarRightLoggedIn() {
  return (
    <div>
      {/* TODO OPT: popover saying what the buttons does? */}
      <Button variant="ghost" size="sm">
        <Link href="/settings">
          <FontAwesomeIcon icon={faGear} size="2x" />
        </Link>
      </Button>

      <Button variant="ghost" size="sm" onClick={() => authLogout()}>
        <FontAwesomeIcon icon={faDoorOpen} size="2x" />
      </Button>
    </div>
  );
}

"use client";

import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  faDoorOpen,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function NavbarRightNotLoggedIn() {
  return (
    <div>
      <Button variant="ghost" size="sm" title="Register">
        <Link href="/register">
          <FontAwesomeIcon icon={faUserPlus} size="2x" />
        </Link>
      </Button>

      <Button variant="ghost" size="sm" title="Login">
        <Link href="/login">
          <FontAwesomeIcon icon={faRightToBracket} size="2x" />
        </Link>
      </Button>
    </div>
  );
}

"use client";

import { authLogout } from "@/app/auth/authActions";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

export default function LogoutButton() {
  return (
    <Button size="sm" onClick={() => authLogout()}>
      Logout
      <FontAwesomeIcon icon={faDoorOpen} />
    </Button>
  );
}

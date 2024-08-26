import NavbarRightLoggedIn from "./NavBarRightLoggedIn";
import NavbarRightNotLoggedIn from "./NavbarRightNotLoggedIn";

export default function NavbarRight({ loggedIn }: { loggedIn: boolean }) {
  return <>{loggedIn ? <NavbarRightLoggedIn /> : <NavbarRightNotLoggedIn />}</>;
}

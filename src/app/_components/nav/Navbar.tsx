import NavbarLeft from "./NavbarLeft";
import NavbarRight from "./NavbarRight";

export default function Navbar({ loggedIn }: { loggedIn: boolean }) {
  return (
    <nav className="m-1 flex">
      <div className="flex-1">
        <NavbarLeft />
      </div>
      <div className="flex-none">
        <NavbarRight loggedIn={loggedIn} />
      </div>
    </nav>
  );
}

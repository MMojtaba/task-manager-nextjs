import NavbarLeft from "./NavbarLeft";
import NavbarRight from "./NavbarRight";

export default function Navbar({ loggedIn }: { loggedIn: boolean }) {
  return (
    <nav className="flex bg-slate-700 p-2">
      <div className="flex-1">
        <NavbarLeft />
      </div>
      <div className="flex-none">
        <NavbarRight loggedIn={loggedIn} />
      </div>
    </nav>
  );
}

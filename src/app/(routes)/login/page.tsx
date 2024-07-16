import { authLogin } from "@/app/auth/authActions";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <form className="form-control" action={authLogin}>
      <label className="input input-bordered m-1 flex items-center gap-2">
        <FontAwesomeIcon icon={faEnvelope} />
        <input type="text" className="grow" placeholder="Email" name="email" />
      </label>

      <label className="input input-bordered m-1 flex items-center gap-2">
        <FontAwesomeIcon icon={faKey} />
        <input
          type="password"
          className="grow"
          placeholder="Password"
          name="password"
        />
      </label>
      <button className="btn btn-accent m-1">Login</button>
    </form>
  );
}

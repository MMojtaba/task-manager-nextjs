import { NextResponse } from "next/server";
import { auth, BASE_PATH } from "./app/auth/auth";
// import dbConnect from "./app/utils/dbConnect";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export default auth(async (req) => {
  console.log("in middleware");
  // await dbConnect();
  const reqUrl = new URL(req.url);
  if (!req.auth && !["/login", "/register"].includes(reqUrl?.pathname)) {
    console.log("not auth");
    return NextResponse.redirect(new URL("login", req.url));
  } else if (req.auth && ["/login", "/register"].includes(reqUrl?.pathname)) {
    console.log("is auth");
    return NextResponse.redirect(new URL("/", req.url));
  }
});

import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./app/auth/auth.config";
// import dbConnect from "./app/utils/dbConnect";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const reqUrl = new URL(req.url);
  if (!req.auth && !["/login", "/register"].includes(reqUrl?.pathname)) {
    console.log("not auth");
    return NextResponse.redirect(new URL("login", reqUrl.origin));
  } else if (req.auth && ["/login", "/register"].includes(reqUrl?.pathname)) {
    console.log("is auth");
    return NextResponse.redirect(new URL("/", req.url));
  }
});

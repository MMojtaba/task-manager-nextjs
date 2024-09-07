import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./app/auth/auth.config";
// import dbConnect from "./app/utils/dbConnect";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

const { auth } = NextAuth(authConfig);

// TODO NOW: fix this giving error in npm run build
export default auth(async (req) => {
  return;
  // const reqUrl = new URL(req.url);
  // if (!req.auth && !["/login", "/register"].includes(reqUrl?.pathname)) {
  //   console.log("not auth");
  //   // TODO NOW: it includes aditional path causing infinite redirects
  //   return NextResponse.redirect(new URL("login", req.url));
  // } else if (req.auth && ["/login", "/register"].includes(reqUrl?.pathname)) {
  //   console.log("is auth");
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
});

// export default function () {
//   return;
// }

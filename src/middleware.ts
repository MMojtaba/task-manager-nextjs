// TODO NOW: test npm start
import { NextResponse } from "next/server";
// import { auth, BASE_PATH } from "./app/auth/auth";
// import dbConnect from "./app/utils/dbConnect";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

// TODO NOW: fix this giving error in npm run build
// export default auth(async (req) => {
//   // const reqUrl = new URL(req.url);
//   // if (!req.auth && !["/login", "/register"].includes(reqUrl?.pathname)) {
//   //   console.log("not auth");
//   //   // TODO NOW: it includes aditional path causing infinite redirects
//   //   return NextResponse.redirect(new URL("login", req.url));
//   // } else if (req.auth && ["/login", "/register"].includes(reqUrl?.pathname)) {
//   //   console.log("is auth");
//   //   return NextResponse.redirect(new URL("/", req.url));
//   // }
// });

export default function () {
  return;
}

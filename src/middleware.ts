import { NextResponse } from "next/server";
import { auth, BASE_PATH } from "./app/auth/auth";
// import dbConnect from "./app/utils/dbConnect";

export const config = {
  matcher: ["/tasks"],
};

export default auth(async (req) => {
  console.log("in middleware", req.auth);
  // return;
  // await dbConnect();
  const reqUrl = new URL(req.url);
  if (!req.auth && reqUrl?.pathname !== "/") {
    console.log("not auth");
    return NextResponse.redirect(
      // new URL(
      //   `${BASE_PATH}/signIn`,
      //   req.url
      // )
      new URL(
        `${BASE_PATH}/signin?callbackUrl=${encodeURIComponent(
          reqUrl?.pathname
        )}`,
        req.url
      )
    );
  } else {
    console.log("is auth");
  }
});

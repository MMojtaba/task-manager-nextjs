import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "../models/User";
import dbConnect from "../utils/dbConnect";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Barry" },
        password: { label: "Password", type: "password" },
      },
      //TODO TYPE
      async authorize(credentials): Promise<any | null> {
        await dbConnect();
        console.log("in authorize", credentials.email, credentials.password);
        const user = await User.findOne({
          email: credentials.email,
          password: credentials.password,
        });
        console.log("in signin", user);
        if (user) return user;
        else return null;
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET,
  // pages: {
  //   signIn: "/login",
  // },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

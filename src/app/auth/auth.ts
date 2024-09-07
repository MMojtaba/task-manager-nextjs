import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "../models/User";
import { checkPasswords } from "../utils/authUtils";
import authConfig from "./auth.config";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  ...authConfig,

  providers: [
    Credentials({
      name: "credentials",

      async authorize(credentials): Promise<any | null> {
        console.log("in authorize", credentials.email);
        const user = await User.findOne({
          email: credentials.email,
        });
        if (user) {
          const match: boolean = await checkPasswords(
            credentials.password as string,
            user.password,
          );
          if (match) return user;
          else return null;
        } else {
          console.log("not authorized");
          return null;
        }
      },
    }),
  ],
  basePath: BASE_PATH,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

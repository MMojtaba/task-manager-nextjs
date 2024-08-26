import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "../models/User";
import dbConnect from "../utils/dbConnect";
import { checkPasswords } from "../utils/authUtils";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "credentials",

      async authorize(credentials): Promise<any | null> {
        await dbConnect();
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
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    // async jwt({ token, user }) {
    //   console.log("usr is", user);
    //   if (user) {
    //     token.id = user.id;
    //   }
    //   return token;
    // },
  },
  session: {
    strategy: "jwt",
    maxAge: 3600 * 24 * 7,
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "../models/User";
import dbConnect from "../utils/dbConnect";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "credentials",
      //TODO TYPE
      async authorize(credentials): Promise<any | null> {
        await dbConnect();
        console.log("in authorize", credentials.email, credentials.password);
        const user = await User.findOne({
          email: credentials.email,
          password: credentials.password,
        });
        if (user) {
          console.log("authorizedx");
          return user;
        } else {
          console.log("not authorizedx");
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

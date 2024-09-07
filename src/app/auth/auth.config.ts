import type { NextAuthConfig } from "next-auth";
import { BASE_PATH } from "./auth";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [],
  // basePath: BASE_PATH,
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
} satisfies NextAuthConfig;

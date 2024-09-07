import type { NextAuthConfig } from "next-auth";

export default {
  providers: [],
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
  },
  session: {
    strategy: "jwt",
    maxAge: 3600 * 24 * 7,
  },
} satisfies NextAuthConfig;

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless";
import { DefaultSession } from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PostgresAdapter(
    new Pool({ connectionString: process.env.POSTGRES_URL })
  ),
  providers: [Google],
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isOnHomePage = nextUrl.pathname === "/";
      if (isOnHomePage) {
        return true;
      } else if (isLoggedIn) {
        return true;
      }
      return false;
    },
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

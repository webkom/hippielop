import { db } from "~/server/db";
import NextAuth, { type User } from "next-auth";

import authConfig from "~/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "@auth/core/adapters";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as unknown as User & {
        sub: string;
        accessToken: string;
      };
      return session;
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  ...authConfig,
  session: {
    strategy: "jwt",
  },
});

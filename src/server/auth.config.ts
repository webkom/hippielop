import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "~/server/db";
import { getGroupById } from "~/actions/group";

export default {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const group = await getGroupById(token.sub);

      if (!group) {
        return token;
      }

      token.isAdmin = group.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.isAdmin && session.user) {
        session.user.isAdmin = token.isAdmin as boolean;
      }

      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.code) {
          return null;
        }

        const group = await db.group.findFirst({
          where: { code: credentials.code },
        });
        if (!group) {
          return null;
        }
        return group;
      },
    }),
  ],
} satisfies NextAuthConfig;

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "~/server/db";

export default {
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

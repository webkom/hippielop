import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "~/server/db";
import jwt from "jsonwebtoken";
import { env } from "~/env";

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

        const token = jwt.sign({ groupId: group.id }, env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return { id: group.id, accessToken: token };
      },
    }),
  ],
} satisfies NextAuthConfig;

import NextAuth, { type User } from "next-auth";

import authConfig from "~/auth.config";

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
  ...authConfig,
  session: {
    strategy: "jwt",
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  isAdmin: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
  interface User {
    id: string;
    isAdmin: boolean;
  }
}

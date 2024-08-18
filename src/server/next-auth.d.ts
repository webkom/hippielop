// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { type DefaultSession } from "next-auth";

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type ExtendedUser = DefaultSession["user"] & {
  sub: string;
  accessToken: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

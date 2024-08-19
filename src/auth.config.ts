import type { NextAuthConfig } from "next-auth";
import { env } from "~/env";

type LegoUserData = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  emailAddress: string;
  email: string;
  profilePicture: string;
  gender: string;
  isActive: boolean;
  isStudent: boolean;
  abakusGroups: {
    id: number;
    name: string;
    description: string;
    contactEmail: string;
    parent: number | null;
    logo: string | null;
    logoPlaceholder: string | null;
    type: string;
    showBadge: boolean;
    active: boolean;
  }[];
  isAbakusMember: boolean;
  isAbakomMember: boolean;
  memberships: {
    id: number;
    user: unknown;
    abakusGroup: number;
    role: string;
    isActive: boolean;
    emailListsEnabled: boolean;
    createdAt: string;
  }[];
};

export default {
  providers: [
    {
      id: "lego",
      name: "LEGO",
      type: "oauth",
      clientId: env.LEGO_ID,
      clientSecret: env.LEGO_SECRET,
      authorization: {
        url: "https://lego.abakus.no/authorization/oauth2/authorize/",
        params: { scope: "user" },
      },
      token: "https://lego.abakus.no/authorization/oauth2/token/",
      userinfo: "https://lego.abakus.no/api/v1/users/oauth2_userdata/",
      profile(profile: LegoUserData) {
        return {
          id: profile.id.toString(),
          name: profile.fullName,
          email: profile.email,
          image: profile.profilePicture,
        };
      },
    },
  ],
} satisfies NextAuthConfig;

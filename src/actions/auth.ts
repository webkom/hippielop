"use server";

import { signIn } from "~/auth";
import { AuthError } from "next-auth";

/**
 * Logs in a user.
 * @param code The code to use.
 * @returns An error if there was one.
 */
export const login = async (code: string): Promise<string> => {
  try {
    await signIn("credentials", {
      code: code,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid credentials!");
        default:
          throw new Error("Something went wrong!");
      }
    }
    throw new Error("Something went wrong!");
  }

  return "Successfully logged in!";
};

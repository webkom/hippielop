"use server";

import { signIn, signOut } from "~/server/auth";
import { AuthError } from "next-auth";
import type * as z from "zod";
import { LoginSchema } from "~/shared/schemas";

/**
 * Logs in a user.
 * @param credentials The credentials to use.
 * @returns An error if there was one.
 */
export const login = async (
  credentials: z.infer<typeof LoginSchema>,
): Promise<boolean> => {
  const validatedFields = LoginSchema.safeParse(credentials);

  if (!validatedFields.success) {
    throw new Error("Ugyldig kode!");
  }

  const { code } = validatedFields.data;
  try {
    await signIn("credentials", {
      code: code,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Feil kode!");
        default:
          throw new Error("Noe gikk galt!");
      }
    }
    throw new Error("Noe gikk galt!");
  }

  return true;
};

/**
 * Logs out the user.
 */
export const logout = async (): Promise<void> => {
  await signOut({
    redirectTo: "/",
  });
};

import * as z from "zod";

export const LoginSchema = z.object({
  code: z
    .string()
    .max(6, {
      message: "Kode må være 6 tegn",
    })
    .min(6, {
      message: "Kode må være 6 tegn",
    }),
});

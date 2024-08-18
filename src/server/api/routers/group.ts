import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const groupRouter = createTRPCRouter({
  getGroup: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user?.sub) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return ctx.session?.user.sub;
  }),
});

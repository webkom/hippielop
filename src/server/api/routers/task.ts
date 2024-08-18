import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { boardOpensDate } from "~/shared/config";

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    if (new Date() < boardOpensDate) return [];
    try {
      return await ctx.db.task.findMany();
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to fetch tasks");
    }
  }),
});

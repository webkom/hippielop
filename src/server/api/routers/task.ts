import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { boardOpensDate } from "~/shared/config";
import { z } from "zod";
import { Status } from "@prisma/client";

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    if (new Date() < boardOpensDate) return [];
    try {
      return await ctx.db.task.findMany({
        include: {
          groups: {
            where: {
              groupId: ctx.session!.user!.id,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to fetch tasks");
    }
  }),

  setStatus: publicProcedure
    .input(z.object({ id: z.number(), status: z.nativeEnum(Status) }))
    .mutation(async ({ ctx, input }) => {
      try {
        const sessionGroup = ctx.session!.user!;
        console.log(sessionGroup.id, input.id, input.status);
        await ctx.db.groupTask.upsert({
          where: {
            taskId_groupId: {
              taskId: input.id,
              groupId: sessionGroup.id,
            },
          },
          update: {
            status: input.status,
          },
          create: {
            taskId: input.id,
            groupId: sessionGroup.id,
            status: input.status,
          },
        });
      } catch (error) {
        console.error("Error updating task status:", error);
        throw new Error("Failed to update task status");
      }
    }),
});

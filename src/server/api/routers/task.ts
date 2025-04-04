import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { boardClosesDate, boardOpensDate } from "~/shared/config";
import { z } from "zod";
import { Status } from "@prisma/client";
import { ee } from "./group-task";

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    if (new Date(new Date().getTime() + 1000 * 30) < boardOpensDate) return [];
    try {
      return await ctx.db.task.findMany({
        include: {
          groups: true,
        },
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to fetch tasks");
    }
  }),

  setStatus: publicProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.nativeEnum(Status),
        groupId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const sessionGroup = ctx.session!.user;
        if (
          input.groupId &&
          !sessionGroup.isAdmin &&
          sessionGroup.id !== input.groupId
        ) {
          throw new Error("You do not have permission to update task status");
        }
        if (!sessionGroup.isAdmin && input.status === "completed") {
          throw new Error("You do not have permission to update task status");
        }
        if (!sessionGroup.isAdmin && new Date() > boardClosesDate) {
          throw new Error("Board is closed");
        }
        const groupId = input.groupId ?? sessionGroup.id;
        const groupTask = await ctx.db.groupTask.upsert({
          where: {
            taskId_groupId: {
              taskId: input.id,
              groupId: groupId,
            },
          },
          update: {
            status: input.status,
          },
          create: {
            taskId: input.id,
            groupId: groupId,
            status: input.status,
          },
        });
        ee.emit("add", groupTask);
      } catch (error) {
        console.error("Error updating task status:", error);
        throw new Error("Failed to update task status");
      }
    }),
});

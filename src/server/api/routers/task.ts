import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { boardOpensDate } from "~/shared/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    if (new Date() < boardOpensDate) return [];
    try {
      return await prisma.task.findMany();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw new Error('Failed to fetch tasks');
    }
  }),
});

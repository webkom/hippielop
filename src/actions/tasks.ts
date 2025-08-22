"use server";

import { db } from "~/server/db";
import { auth } from "~/server/auth";
import { z } from "zod";
import { Status } from "@prisma/client";
import { boardClosesDate } from "~/shared/config";

const SetStatusSchema = z.object({
  id: z.number(),
  status: z.nativeEnum(Status),
  groupId: z.string().optional(),
});

export async function setTaskStatus(rawInput: unknown) {
  const input = SetStatusSchema.parse(rawInput);
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const sessionUser = session.user as { id: string; isAdmin?: boolean };

  if (
    input.groupId &&
    !sessionUser.isAdmin &&
    sessionUser.id !== input.groupId
  ) {
    throw new Error("You do not have permission to update task status");
  }
  if (!sessionUser.isAdmin && input.status === "completed") {
    throw new Error("You do not have permission to update task status");
  }
  if (!sessionUser.isAdmin && new Date() > boardClosesDate) {
    throw new Error("Board is closed");
  }

  const groupId = input.groupId ?? sessionUser.id;

  return db.groupTask.upsert({
    where: {
      taskId_groupId: {
        taskId: input.id,
        groupId,
      },
    },
    update: {
      status: input.status,
    },
    create: {
      taskId: input.id,
      groupId,
      status: input.status,
    },
  });
}

import EventEmitter, { on } from "events";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type GroupTask } from "@prisma/client";
import { tracked } from "@trpc/server";

// create a global event emitter (could be replaced by redis, etc.)
export const ee = new EventEmitter();

export const groupTaskRouter = createTRPCRouter({
  onGroupTaskChanged: publicProcedure.subscription(async function* () {
    // listen for new events
    for await (const [data] of on(ee, "add")) {
      const post = data as GroupTask;
      yield tracked(`${post.taskId}-${post.groupId}-${post.status}`, post);
    }
  }),
});

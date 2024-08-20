import { Suspense } from "react";
import { Board } from "~/app/_components/board";
import { api, HydrateClient } from "~/trpc/server";

export default async function Game() {
  const tasks = await api.task.getAll();
  const currentGroup = await api.group.getGroup();
  const groups = await api.group.getAll();

  return (
    <HydrateClient>
      <Suspense>
        <Board tasks={tasks} currentGroup={currentGroup} groups={groups} />
      </Suspense>
    </HydrateClient>
  );
}

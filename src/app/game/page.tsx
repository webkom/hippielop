import { Suspense } from "react";
import { Board } from "~/app/_components/board";
import { api, HydrateClient } from "~/trpc/server";

export default async function Game() {
  const tasks = await api.task.getAll();
  const group = await api.group.getGroup();

  return (
    <HydrateClient>
      <Suspense>
        <Board tasks={tasks} group={group} />
      </Suspense>
    </HydrateClient>
  );
}

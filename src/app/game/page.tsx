import { Suspense } from "react";
import { Board } from "~/app/_components/board";
import { api, HydrateClient } from "~/trpc/server";
import { Game } from "~/app/_components/game";

export default async function GamePage() {
  const tasks = await api.task.getAll();
  const currentGroup = await api.group.getGroup();
  const groups = await api.group.getAll();

  return (
    <HydrateClient>
      <Suspense>
        <Game tasks={tasks} currentGroup={currentGroup} groups={groups} />
      </Suspense>
    </HydrateClient>
  );
}

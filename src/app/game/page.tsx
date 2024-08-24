import { Suspense } from "react";
import { api, HydrateClient } from "~/trpc/server";
import { Game } from "~/app/_components/game";
import { boardOpensDate } from "~/shared/config";
import { Countdown } from "~/app/_components/countdown";

export default async function GamePage() {
  const tasks = await api.task.getAll();
  const currentGroup = await api.group.getGroup();
  const groups = await api.group.getAll();

  return (
    <HydrateClient>
      <Suspense>
        <Countdown
          date={boardOpensDate}
          doneNode={
            <Game tasks={tasks} currentGroup={currentGroup} groups={groups} />
          }
        />
      </Suspense>
    </HydrateClient>
  );
}

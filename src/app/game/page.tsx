import { Suspense } from "react";
import { Board } from "~/app/_components/board";
import { api, HydrateClient } from "~/trpc/server";

export default async function Game() {
  void api.task.getAll.prefetch();
  void api.group.getGroup.prefetch();

  return (
    <HydrateClient>
      <Suspense>
        <Board />
      </Suspense>
    </HydrateClient>
  );
}

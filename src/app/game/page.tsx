import { Suspense } from "react";
import { Board } from "~/app/_components/board";
import { HydrateClient } from "~/trpc/server";
import { auth } from "~/auth";

export default async function Game() {
  return (
    <HydrateClient>
      <Suspense>
        <Board />
      </Suspense>
    </HydrateClient>
  );
}

import { api, HydrateClient } from "~/trpc/server";
import { Suspense } from "react";
import { Countdown } from "~/app/_components/countdown";
import { boardOpensDate } from "~/shared/config";
import LoginForm from "~/app/_components/login-form";

export default async function Home() {
  void api.task.getAll.prefetch();

  return (
    <HydrateClient>
      <Suspense>
        <Countdown date={boardOpensDate} doneNode={<LoginForm />} />
      </Suspense>
    </HydrateClient>
  );
}

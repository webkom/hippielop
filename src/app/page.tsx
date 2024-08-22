import { HydrateClient } from "~/trpc/server";
import { Suspense } from "react";
import { Countdown } from "~/app/_components/countdown";
import { boardOpensDate } from "~/shared/config";
import LoginForm from "~/app/_components/login-form";

export default async function Home() {
  return (
    <HydrateClient>
      <Suspense>
        <div className="absolute flex h-screen w-screen items-center justify-center px-4">
          <Countdown date={boardOpensDate} doneNode={<LoginForm />} />
        </div>
      </Suspense>
    </HydrateClient>
  );
}

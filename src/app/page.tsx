import { api, HydrateClient } from "~/trpc/server";
import Image from "next/image";
import { Suspense } from "react";
import { Countdown } from "~/app/_components/countdown";
import { boardOpensDate } from "~/shared/config";
import LoginForm from "~/app/_components/login-form";

export default async function Home() {
  void api.task.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-[#ddcfaf]">
        <div className="container flex flex-col items-center justify-center gap-3">
          <h1 className="relative">
            <Image
              src="/banner.webp"
              alt="Hippieløp title"
              width={500}
              height={150}
            />
            <div className="absolute inset-0 top-16 bg-gradient-to-t from-[#ddcfaf]" />
          </h1>

          <Suspense>
            <Countdown date={boardOpensDate} doneNode={<LoginForm />} />
          </Suspense>
        </div>
      </main>
    </HydrateClient>
  );
}

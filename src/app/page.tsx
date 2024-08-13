import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import { Board } from "~/app/_components/board";
import Image from "next/image";

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

          <Board />

          <LatestPost />
        </div>
      </main>
    </HydrateClient>
  );
}

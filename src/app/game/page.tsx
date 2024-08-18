import { Board } from "~/app/_components/board";
import Image from "next/image";

export default async function Game() {
  return (
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
      </div>
    </main>
  );
}

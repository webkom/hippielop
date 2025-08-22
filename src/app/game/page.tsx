import { Suspense } from "react";
import { Game } from "~/app/_components/game";
import { boardOpensDate } from "~/shared/config";
import { Countdown } from "~/app/_components/countdown";
import { db } from "~/server/db";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { type User } from "next-auth";

export default async function GamePage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const nowWithOffset = new Date(Date.now() + 1000 * 30);

  const [tasks, groups] = await Promise.all([
    nowWithOffset < boardOpensDate
      ? Promise.resolve([])
      : db.task.findMany({ include: { groups: true } }),
    db.group.findMany(),
  ]);

  const currentGroup = session.user as User;

  return (
    <Suspense>
      <Countdown
        date={boardOpensDate}
        doneNode={
          <Game tasks={tasks} currentGroup={currentGroup} groups={groups} />
        }
      />
    </Suspense>
  );
}

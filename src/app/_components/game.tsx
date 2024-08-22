"use client";

import { Scoreboard } from "~/app/_components/scoreboard";
import { Button } from "~/app/_components/ui/button";
import { logout } from "~/actions/auth";
import { Board } from "~/app/_components/board";
import { type Group } from "@prisma/client";
import type { RouterOutputs } from "~/trpc/react";
import { type User } from "next-auth";

type GetAllTask = RouterOutputs["task"]["getAll"][number];

interface GameProps {
  tasks: GetAllTask[];
  currentGroup: User;
  groups: Group[];
}

export const Game = ({ tasks, currentGroup, groups }: GameProps) => {
  return (
    <>
      <Board tasks={tasks} currentGroup={currentGroup} />
      <Scoreboard
        tasks={tasks}
        groups={groups}
        currentGroupId={currentGroup.id}
      />
      <Button variant="outline" className="my-4" onClick={() => logout()}>
        Logg ut
      </Button>
    </>
  );
};

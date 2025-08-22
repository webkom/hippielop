"use client";

import { Scoreboard } from "~/app/_components/scoreboard";
import { Button } from "~/app/_components/ui/button";
import { logout } from "~/actions/auth";
import { Board } from "~/app/_components/board";
import { type Group } from "@prisma/client";
import { type User } from "next-auth";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/app/_components/ui/tabs";
import { useUpdatedTasks, type GetAllTask } from "~/hooks/useUpdatedTasks";

interface GameProps {
  tasks: GetAllTask[];
  currentGroup: User;
  groups: Group[];
}

export const Game = ({
  tasks: initialTasks,
  currentGroup,
  groups,
}: GameProps) => {
  const tasks = useUpdatedTasks(initialTasks);

  return (
    <div className="mt-4 flex w-full flex-col items-center">
      <div className="flex w-full max-w-screen-md flex-col items-center px-3">
        <Tabs defaultValue="board" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="board">
              Brett
            </TabsTrigger>
            <TabsTrigger className="w-full" value="scoreboard">
              Poengtavle
            </TabsTrigger>
          </TabsList>
          <TabsContent asChild value="board">
            <Board tasks={tasks} currentGroup={currentGroup} />
          </TabsContent>
          <TabsContent asChild value="scoreboard">
            <Scoreboard
              tasks={tasks}
              groups={groups}
              currentGroupId={currentGroup.id}
            />
          </TabsContent>
        </Tabs>
        <Button variant="outline" className="my-4" onClick={() => logout()}>
          Logg ut
        </Button>
      </div>
    </div>
  );
};

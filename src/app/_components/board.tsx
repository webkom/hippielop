"use client";

import { Pacifico } from "next/font/google";
import { api, type RouterOutputs } from "~/trpc/react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card } from "~/app/_components/ui/card";
import { Button } from "~/app/_components/ui/button";
import { logout } from "~/actions/auth";
import { RotateCwIcon } from "lucide-react";
import { useState } from "react";
import { type User } from "next-auth";
import { Scoreboard } from "./scoreboard";
import { type Group } from "@prisma/client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/app/_components/ui/drawer";

export const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

type GetAllTask = RouterOutputs["task"]["getAll"][number];

interface TaskColumn {
  points: number;
  tasks: GetAllTask[];
}

export const Board = ({
  tasks: initialTasks,
  currentGroup,
  groups,
}: {
  tasks: GetAllTask[];
  currentGroup: User;
  groups: Group[];
}) => {
  const [tasks, setTasks] = useState(initialTasks);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = searchParams.get("page") === "2" ? 2 : 1;

  api.groupTask.onGroupTaskChanged.useSubscription(undefined, {
    onData: (groupTask) => {
      setTasks((tasks) => {
        return tasks.map((task) => {
          if (task.id !== groupTask.data.taskId) {
            return task;
          }
          const groupTaskContained = task.groups.some(
            (gt) => gt.groupId === groupTask.data.groupId,
          );
          return {
            ...task,
            groups: groupTaskContained
              ? task.groups.map((group) => {
                  if (group.groupId !== groupTask.data.groupId) {
                    return group;
                  }
                  return {
                    ...group,
                    status: groupTask.data.status,
                  };
                })
              : [...task.groups, groupTask.data],
          };
        });
      });
    },
  });

  const taskColumns = tasks
    .filter((task) => task.page === page)
    .reduce((cols, task) => {
      const col = cols.find((col) => col.points === task.points);
      if (!col) {
        cols.push({ points: task.points, tasks: [task] });
      } else {
        col.tasks.push(task);
      }
      return cols;
    }, [] as TaskColumn[])
    .sort((a, b) => a.points - b.points);

  return (
    <div className="flex w-full flex-col items-center px-3">
      <h2
        className={`${pacifico.className} my-4 text-3xl text-white drop-shadow`}
      >
        {currentGroup.name} - Side {page}
      </h2>
      <Link href={pathname + (page == 1 ? "?page=2" : "")}>
        <Button>
          <RotateCwIcon className="mr-2" size={16} />
          Flipp
        </Button>
      </Link>
      <div className="my-4 flex w-full max-w-screen-md gap-0 md:gap-1">
        {taskColumns.map((taskColumn) => (
          <div
            key={taskColumn.points}
            className="group flex w-0 flex-grow flex-col"
          >
            <div className="mb-2 text-center font-bold">
              {taskColumn.points}
            </div>
            <div className="flex flex-col gap-0 md:gap-1">
              {taskColumn.tasks.map((task) => (
                <TaskTile key={task.id} task={task} groupId={currentGroup.id} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Scoreboard
        tasks={tasks}
        groups={groups}
        currentGroupId={currentGroup.id}
      />
      <Button className="my-4 w-full max-w-screen-md" onClick={() => logout()}>
        Logg ut
      </Button>
    </div>
  );
};

const statusStrings = {
  started: "Påbegynt",
  sent: "Sendt inn",
  completed: "Fullført",
  notStarted: "Ikke påbegynt",
};

const statusClassName = {
  started: "bg-yellow-300 md:border-yellow-700",
  sent: "bg-blue-300 md:border-blue-700",
  completed: "bg-green-300 md:border-green-700",
  notStarted: "bg-card",
};

const TaskTile = ({ task, groupId }: { task: GetAllTask; groupId: string }) => {
  const { mutate, isPending } = api.task.setStatus.useMutation();

  const status =
    task.groups.find((g) => g.groupId === groupId)?.status ?? "notStarted";

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card
          // Use tailwind they said, it's easy they said
          className={`flex aspect-square items-center justify-center overflow-hidden rounded-none border-0 border-r-2 border-t-2 p-1 last:border-b-2 group-first:border-l-2 first:group-first:rounded-tl-lg last:group-first:rounded-bl-lg first:group-last:rounded-tr-lg last:group-last:rounded-br-lg md:rounded-lg md:border-2 ${statusClassName[status]}`}
        >
          <p className="max-h-full max-w-full text-clip hyphens-auto text-center text-[8px] sm:text-sm md:text-lg">
            {task.text}
          </p>
        </Card>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle className="text-center">{task.text}</DrawerTitle>
            <DrawerDescription className="text-center">
              ✨ {task.points} poeng ✨
              <br />
              Status: {statusStrings[status]}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                onClick={() => mutate({ id: task.id, status: "started" })}
                disabled={isPending}
              >
                Marker som påbegynt
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button
                onClick={() => mutate({ id: task.id, status: "completed" })}
                disabled={isPending}
              >
                Marker som fullført
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

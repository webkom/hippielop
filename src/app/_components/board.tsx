"use client";

import { Pacifico } from "next/font/google";
import { api, type RouterOutputs } from "~/trpc/react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { RotateCwIcon } from "lucide-react";
import { useState } from "react";
import { type User } from "next-auth";
import { TaskTile } from "~/app/_components/task-tile";

export const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

type GetAllTask = RouterOutputs["task"]["getAll"][number];

interface TaskColumn {
  points: number;
  tasks: GetAllTask[];
}

interface BoardProps {
  tasks: GetAllTask[];
  currentGroup: User;
}

export const Board = ({ tasks: initialTasks, currentGroup }: BoardProps) => {
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
    </div>
  );
};

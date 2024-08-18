"use client";

import { Pacifico } from "next/font/google";
import { api } from "~/trpc/react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { type Task } from "@prisma/client";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

interface TaskColumn {
  points: number;
  tasks: Task[];
}

export const Board = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = searchParams.get("page") === "2" ? 2 : 1;

  const [tasks] = api.task.getAll.useSuspenseQuery();
  const [userId] = api.group.getGroup.useSuspenseQuery();

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
    <>
      <h2 className={`${pacifico.className} text-3xl text-white drop-shadow`}>
        Side {page}
      </h2>
      <Link
        href={pathname + (page == 1 ? "?page=2" : "")}
        className="rounded-full border-2 border-amber-700 bg-amber-300 px-4 py-1"
      >
        Flipp
      </Link>
      {userId && <p>Innlogget som {userId}</p>}
      <div className="mx-1 flex w-full max-w-screen-md gap-1">
        {taskColumns.map((taskColumn) => (
          <div key={taskColumn.points} className="flex w-full flex-col gap-1">
            <div className="text-center font-bold">{taskColumn.points}</div>
            {taskColumn.tasks.map((task) => (
              <TaskTile key={task.id} task={task} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

const TaskTile = ({ task }: { task: Task }) => {
  return (
    <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border-2 border-amber-700 bg-amber-50 p-1">
      <p className="h-auto text-center text-xs md:text-lg">{task.text}</p>
    </div>
  );
};

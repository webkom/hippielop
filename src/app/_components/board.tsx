"use client";

import { Pacifico } from "next/font/google";
import { api } from "~/trpc/react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { type Task } from "@prisma/client";
import { Card } from "~/app/_components/ui/card";
import { Button } from "~/app/_components/ui/button";
import { logout } from "~/actions/auth";
import { RotateCwIcon } from "lucide-react";
import { Modal } from "~/app/_components/modal";
import { useState } from "react";

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
  const [group] = api.group.getGroup.useSuspenseQuery();

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
        {group.name} - Side {page}
      </h2>
      <Link href={pathname + (page == 1 ? "?page=2" : "")}>
        <Button>
          <RotateCwIcon className="mr-2" size={16} />
          Flipp
        </Button>
      </Link>
      <div className="flex w-full max-w-screen-md gap-0.5 px-1">
        {taskColumns.map((taskColumn) => (
          <div
            key={taskColumn.points}
            className="flex w-0 flex-grow flex-col gap-0.5"
          >
            <div className="text-center font-bold">{taskColumn.points}</div>
            {taskColumn.tasks.map((task) => (
              <TaskTile key={task.id} task={task} />
            ))}
          </div>
        ))}
      </div>
      <Button variant="outline" className="mt-4" onClick={() => logout()}>
        Logg ut
      </Button>
    </>
  );
};

const TaskTile = ({ task }: { task: Task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Card
        className="flex aspect-square items-center justify-center overflow-hidden"
        onClick={() => setIsModalOpen(true)}
      >
        <p className="max-h-full max-w-full text-clip hyphens-auto text-center text-[8px] md:text-lg">
          {task.text}
        </p>
      </Card>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="w-[80vw] overflow-auto rounded-xl border-2 px-2 py-8"
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-md max-h-full max-w-full text-clip hyphens-auto text-center md:text-lg">
            {task.text}
          </p>
          <p>
            <b>✨ {task.points} poeng ✨</b>
          </p>
          <Button>Marker som fullført</Button>
        </div>
      </Modal>
    </>
  );
};

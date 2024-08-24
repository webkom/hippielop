"use client";

import { Pacifico } from "next/font/google";
import { type RouterOutputs } from "~/trpc/react";
import { Button } from "~/app/_components/ui/button";
import { RotateCwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { type User } from "next-auth";
import { TaskTile } from "~/app/_components/task-tile";
import ReactCardFlip from "react-card-flip";
import { ColorCode } from "~/app/_components/color-code";
import { boardClosesDate } from "~/shared/config";

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

export const Board = ({ tasks, currentGroup }: BoardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsClosed(true);
    }, boardClosesDate.getTime() - new Date().getTime());
    return () => clearTimeout(timeout);
  }, []);

  const taskColumns = tasks
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
      <ReactCardFlip containerClassName="w-full" isFlipped={isFlipped}>
        <Page
          onFlip={() => setIsFlipped(!isFlipped)}
          taskColumns={taskColumns}
          currentGroup={currentGroup}
          isClosed={isClosed}
          page={1}
        />
        <Page
          onFlip={() => setIsFlipped(!isFlipped)}
          taskColumns={taskColumns}
          currentGroup={currentGroup}
          isClosed={isClosed}
          page={2}
        />
      </ReactCardFlip>
      <ColorCode />
    </>
  );
};

const Page = ({
  taskColumns,
  currentGroup,
  page,
  isClosed,
  onFlip,
}: {
  taskColumns: TaskColumn[];
  currentGroup: User;
  page: number;
  isClosed: boolean;
  onFlip: () => void;
}) => {
  return (
    <div className="flex flex-col items-center">
      <h2
        className={`${pacifico.className} my-8 text-3xl text-white drop-shadow`}
      >
        {currentGroup.name} - Side {page}
      </h2>
      <Button onClick={onFlip}>
        <RotateCwIcon className="mr-2" size={16} />
        Flipp
      </Button>

      {isClosed && (
        <div className="my-4 rounded-full border-2 bg-red-500 p-2 text-lg text-white">
          Konkurransen er over og det er ikke mulig å gjøre flere oppgaver.
        </div>
      )}

      <div className="my-4 flex w-full gap-0 md:gap-1">
        {taskColumns
          .map((taskColumn) => ({
            ...taskColumn,
            tasks: taskColumn.tasks.filter((task) => task.page === page),
          }))
          .map((taskColumn) => (
            <div
              key={taskColumn.points}
              className="group flex w-0 flex-grow flex-col"
            >
              <div className="mb-2 text-center font-bold text-muted-foreground">
                {taskColumn.points}
              </div>
              <div className="flex flex-col gap-0 md:gap-1">
                {taskColumn.tasks.map((task) => (
                  <TaskTile
                    key={task.id}
                    task={task}
                    isClosed={isClosed}
                    groupId={currentGroup.id}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

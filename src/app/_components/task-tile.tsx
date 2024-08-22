import { api, type RouterOutputs } from "~/trpc/react";
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
import { Card } from "~/app/_components/ui/card";
import { Button } from "~/app/_components/ui/button";

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

type GetAllTask = RouterOutputs["task"]["getAll"][number];

interface TaskTileProps {
  task: GetAllTask;
  groupId: string;
}

export const TaskTile = ({ task, groupId }: TaskTileProps) => {
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
                onClick={() => mutate({ id: task.id, status: "sent" })}
                disabled={isPending}
              >
                Marker som innsendt
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

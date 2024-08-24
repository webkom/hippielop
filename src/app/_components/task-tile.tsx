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
import { Status } from "@prisma/client";
import { ButtonGroup } from "~/app/_components/button-group";
import { useState } from "react";

const statusClassName = {
  started: "bg-yellow-300 md:border-yellow-700 after:to-yellow-300",
  sent: "bg-blue-300 md:border-blue-700 after:to-blue-300",
  completed: "bg-green-300 md:border-green-700 after:to-green-300",
  notStarted: "bg-card after:to-card",
};

type GetAllTask = RouterOutputs["task"]["getAll"][number];

interface TaskTileProps {
  task: GetAllTask;
  groupId: string;
  isClosed: boolean;
}

export const TaskTile = ({ task, groupId, isClosed }: TaskTileProps) => {
  const { mutate, isPending } = api.task.setStatus.useMutation();
  const [textElement, setTextElement] = useState<HTMLParagraphElement | null>(
    null,
  );
  const overflowing = textElement
    ? textElement.scrollHeight > textElement.clientHeight
    : true;

  const status =
    task.groups.find((g) => g.groupId === groupId)?.status ?? Status.notStarted;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card
          // Use tailwind they said, it's easy they said
          className={`flex aspect-square items-center justify-center overflow-hidden rounded-none border-0 border-r-2 border-t-2 p-1 last:border-b-2 group-first:border-l-2 first:group-first:rounded-tl-lg last:group-first:rounded-bl-lg first:group-last:rounded-tr-lg last:group-last:rounded-br-lg md:rounded-lg md:border-2 ${statusClassName[status]} ${overflowing ? "relative after:absolute after:inset-x-0 after:bottom-0 after:h-6 after:bg-gradient-to-b after:from-transparent after:content-['']" : ""}`}
        >
          <p
            ref={setTextElement}
            className="max-h-full max-w-full text-clip hyphens-auto text-center text-[9px] sm:text-sm md:text-lg"
          >
            {task.text}
          </p>
        </Card>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle className="line mb-6 text-center leading-8">
              {task.text}
            </DrawerTitle>
            <DrawerDescription className="mb-6 text-center text-lg">
              ✨ {task.points} poeng ✨
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="mb-10 flex items-center">
            <DrawerClose asChild>
              <ButtonGroup
                value={status}
                onValueChange={(value) => {
                  mutate({ id: task.id, status: value });
                }}
                items={[
                  {
                    value: Status.notStarted,
                    label: "Ikke gjort",
                    disabled:
                      isClosed || isPending || status === Status.completed,
                  },
                  {
                    value: Status.started,
                    label: "Påbegynt",
                    disabled:
                      isClosed || isPending || status === Status.completed,
                  },
                  {
                    value: Status.sent,
                    label: "Sendt inn",
                    selectedClassName: "bg-blue-500 hover:bg-blue-500/90",
                    disabled:
                      isClosed || isPending || status === Status.completed,
                  },
                  {
                    value: Status.completed,
                    label: "Godkjent",
                    selectedClassName: "bg-green-500 hover:bg-green-500/90",
                    disabled:
                      isClosed || isPending || status !== Status.completed,
                  },
                ]}
              />
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

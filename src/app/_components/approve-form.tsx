"use client";

import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { ApproveSchema } from "~/shared/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/app/_components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";
import { FormError } from "~/app/_components/ui/form-error";
import { Button } from "~/app/_components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { type Group } from "@prisma/client";
import { api } from "~/trpc/react";
import { logout } from "~/actions/auth";
import { useToast } from "~/app/_components/ui/use-toast";
import { pacifico } from "~/app/_components/board";
import { GetAllTask, useUpdatedTasks } from "~/app/useUpdatedTasks";

interface ApproveFormProps {
  groups: Group[];
  tasks: GetAllTask[];
}

const statusOrder = ["sent", "started", "notStarted", "completed"];
const statusClassnames = {
  sent: "bg-blue-100",
  started: "bg-yellow-100",
  completed: "bg-green-100",
  notStarted: "",
};

export default function ApproveForm({
  groups,
  tasks: initialTasks,
}: ApproveFormProps) {
  const tasks = useUpdatedTasks(initialTasks);
  const [error, setError] = useState<string | undefined>("");
  const { mutate, isPending } = api.task.setStatus.useMutation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ApproveSchema>>({
    resolver: zodResolver(ApproveSchema),
    defaultValues: {
      groupId: "",
      taskId: "",
    },
  });

  const selectedGroupId = form.watch("groupId");

  const getTaskStatus = useCallback(
    (task: GetAllTask) =>
      task.groups.find((group) => group.groupId === selectedGroupId)?.status ??
      "notStarted",
    [selectedGroupId],
  );

  const sortedTasks = useMemo(
    () =>
      tasks.sort((a, b) => {
        if (!selectedGroupId) return 0;

        const aStatus = getTaskStatus(a);
        const bStatus = getTaskStatus(b);
        return statusOrder.indexOf(aStatus) - statusOrder.indexOf(bStatus);
      }),
    [getTaskStatus, selectedGroupId, tasks],
  );

  const onSubmit = (data: z.infer<typeof ApproveSchema>) => {
    setError("");
    try {
      mutate(
        {
          id: parseInt(data.taskId),
          groupId: data.groupId,
          status: "completed",
        },
        {
          onSuccess: () => {
            toast({
              title: "Oppgave godkjent",
              description: "Oppgaven er nå godkjent",
            });
            form.reset();
          },
          onError: (_) => {
            setError("An unknown error occurred");
          },
        },
      );
    } catch (err) {
      const error = err as Error;
      setError(error.message || "An unknown error occurred");
    }
  };

  return (
    <div className="flex w-screen flex-col items-center p-2">
      <h2
        className={`${pacifico.className} my-4 text-3xl text-white drop-shadow`}
      >
        Admin
      </h2>
      <Card className="w-full max-w-screen-sm">
        <CardHeader>
          <CardTitle>Godkjenn oppgave</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="groupId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gruppe</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Velg gruppe som har fullført oppgaven" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {groups.map((group) => (
                            <SelectItem value={group.id} key={group.id}>
                              {group.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="taskId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Oppgave</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Velg oppgave som skal godkjennes" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sortedTasks.map((task) => (
                            <SelectItem
                              value={task.id.toString()}
                              key={task.id}
                              className={statusClassnames[getTaskStatus(task)]}
                            >
                              {task.text}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <Button type="submit" className="w-full" disabled={isPending}>
                Godkjenn
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Button variant="outline" className="my-4" onClick={() => logout()}>
        Logg ut
      </Button>
    </div>
  );
}

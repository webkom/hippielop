"use client";

import { useState } from "react";
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
import { type Group, type Task } from "@prisma/client";
import { api } from "~/trpc/react";
import { logout } from "~/actions/auth";

interface ApproveFormProps {
  groups: Group[];
  tasks: Task[];
}

export default function ApproveForm({ groups, tasks }: ApproveFormProps) {
  const [error, setError] = useState<string | undefined>("");
  const { mutate, isPending } = api.task.setStatus.useMutation();

  const form = useForm<z.infer<typeof ApproveSchema>>({
    resolver: zodResolver(ApproveSchema),
    defaultValues: {
      groupId: "",
      taskId: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ApproveSchema>) => {
    setError("");
    try {
      mutate({
        id: parseInt(data.taskId),
        groupId: data.groupId,
        status: "completed",
      });
    } catch (err) {
      const error = err as Error;
      setError(error.message || "An unknown error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Card>
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
                          {tasks.map((task) => (
                            <SelectItem
                              value={task.id.toString()}
                              key={task.id}
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

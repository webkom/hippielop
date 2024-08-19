"use client";

import { login } from "~/actions/auth";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";
import { Input } from "~/app/_components/ui/input";
import { Button } from "~/app/_components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type * as z from "zod";
import { FormError } from "~/app/_components/ui/form-error";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/app/_components/ui/card";
import { LoginSchema } from "~/shared/schemas";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      code: code ?? "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setError("");

    startTransition(async () => {
      try {
        const res = await login(data);
        if (res) {
          window.location.reload();
        }
      } catch (err) {
        const error = err as Error;
        setError(error.message || "An unknown error occurred");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Oppgi koden til din faddergruppe</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Kode"
                        type="text"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Logg inn
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

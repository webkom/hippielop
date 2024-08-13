import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { boardOpensDate } from "~/shared/config";

export interface Task {
  id: number;
  page: 1 | 2;
  points: number;
  text: string;
}

const tasks: Task[] = (
  [
    {
      page: 1,
      points: 10,
      text: "Ta et bilde med en person over 2m",
    },
    {
      page: 1,
      points: 10,
      text: "Skriv et dikt om Trondheim og del det på Facebook",
    },
    {
      page: 1,
      points: 10,
      text: "Eksempel 3",
    },
    {
      page: 1,
      points: 10,
      text: "Eksempel 4",
    },
    {
      page: 1,
      points: 10,
      text: "Eksempel 5",
    },
    {
      page: 1,
      points: 25,
      text: "Ta et bilde med en person over 2m",
    },
    {
      page: 1,
      points: 25,
      text: "Skriv et dikt om Trondheim og del det på Facebook",
    },
    {
      page: 1,
      points: 50,
      text: "Eksempel 3",
    },
    {
      page: 1,
      points: 50,
      text: "Eksempel 4",
    },
    {
      page: 1,
      points: 50,
      text: "Eksempel 5",
    },
    {
      page: 1,
      points: 100,
      text: "Eksempel 5",
    },
    {
      page: 2,
      points: 10,
      text: "Side 2, 10 poeng",
    },
    {
      page: 2,
      points: 25,
      text: "Side 2, 25 poeng",
    },
    {
      page: 2,
      points: 50,
      text: "Side 2, 50 poeng",
    },
    {
      page: 2,
      points: 100,
      text: "Side 2, 100 poeng",
    },
  ] satisfies Omit<Task, "id">[]
).map((task, i) => ({ ...task, id: i }));

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    if (new Date() < boardOpensDate) return [];
    return tasks;
  }),
});

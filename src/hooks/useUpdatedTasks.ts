import useSWR from "swr";
import { type TaskDTO } from "~/shared/types";

export type GetAllTask = TaskDTO;

const fetcher = async (url: string): Promise<TaskDTO[]> => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export const useUpdatedTasks = (initialTasks: GetAllTask[] = []) => {
  const { data } = useSWR<GetAllTask[]>("/api/tasks", fetcher, {
    refreshInterval: 3000,
    revalidateOnFocus: false,
    keepPreviousData: true,
    fallbackData: initialTasks,
  });

  return data ?? initialTasks;
};

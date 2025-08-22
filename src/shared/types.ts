import { type Status } from "@prisma/client";

export type GroupTaskDTO = {
  status: Status;
  groupId: string;
  taskId: number;
};

export type TaskDTO = {
  id: number;
  page: number;
  points: number;
  text: string;
  groups: GroupTaskDTO[];
};

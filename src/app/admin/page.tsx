import ApproveForm from "~/app/_components/approve-form";
import { api } from "~/trpc/server";
import { Toaster } from "../_components/ui/toaster";

export default async function AdminPage() {
  const tasks = await api.task.getAll();
  const groups = await api.group.getAll();

  return (
    <div>
      <ApproveForm groups={groups} tasks={tasks} />
      <Toaster />
    </div>
  );
}

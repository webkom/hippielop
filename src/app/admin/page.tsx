import ApproveForm from "~/app/_components/approve-form";
import { api } from "~/trpc/server";

export default async function AdminPage() {
  const tasks = await api.task.getAll();
  const groups = await api.group.getAll();

  return (
    <div>
      <h1 className="my-4 text-center">Admin</h1>
      <ApproveForm groups={groups} tasks={tasks} />
    </div>
  );
}

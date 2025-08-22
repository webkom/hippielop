import ApproveForm from "~/app/_components/approve-form";
import { Toaster } from "../_components/ui/toaster";
import { db } from "~/server/db";
import { boardOpensDate } from "~/shared/config";

export default async function AdminPage() {
  const nowWithOffset = new Date(Date.now() + 1000 * 30);

  const [tasks, groups] = await Promise.all([
    nowWithOffset < boardOpensDate
      ? Promise.resolve([])
      : db.task.findMany({ include: { groups: true } }),
    db.group.findMany(),
  ]);

  return (
    <div>
      <ApproveForm groups={groups} tasks={tasks} />
      <Toaster />
    </div>
  );
}

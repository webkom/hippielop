import ApproveForm from "~/app/_components/approve-form";
import { Toaster } from "../_components/ui/toaster";
import { db } from "~/server/db";
import { boardOpensDate } from "~/shared/config";

// Reads groups/tasks from the DB on every request; without this Next
// prerenders the page at build time and the group list goes stale.
export const dynamic = "force-dynamic";

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

import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { boardOpensDate } from "~/shared/config";

export async function GET() {
  try {
    if (new Date(new Date().getTime() + 1000 * 30) < boardOpensDate) {
      return NextResponse.json([], { status: 200 });
    }

    const tasks = await db.task.findMany({
      include: { groups: true },
    });
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { boardOpensDate } from "~/shared/config";

// Every client polls this route for the same payload, so let the CDN collapse
// them into one database read every couple of seconds.
const cacheHeaders = {
  "Cache-Control": "public, s-maxage=2, stale-while-revalidate=5",
};

export async function GET() {
  try {
    if (new Date(new Date().getTime() + 1000 * 30) < boardOpensDate) {
      return NextResponse.json([], { status: 200, headers: cacheHeaders });
    }

    const tasks = await db.task.findMany({
      include: { groups: true },
    });
    return NextResponse.json(tasks, { status: 200, headers: cacheHeaders });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}

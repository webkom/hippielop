"use server";

import { db } from "~/server/db";

/**
 * Get a group by its ID.
 * @param id The ID of the group.
 */
export const getGroupById = async (id: string) => {
  try {
    return await db.group.findUnique({ where: { id } });
  } catch {
    return null;
  }
};

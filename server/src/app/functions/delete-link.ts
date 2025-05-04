import { eq } from "drizzle-orm";

import type { LinkItem } from "@/app/functions/get-links";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/utils/either";
import { LinkIdNotExists } from "./errors/link-id-not-exists";

export async function deleteLink(linkId: string): Promise<Either<LinkIdNotExists, { link: LinkItem }>> {
  const linkSelect = await db.select().from(schema.links).where(eq(schema.links.id, linkId));

  if (linkSelect.length === 0) return makeLeft(new LinkIdNotExists());

  const link = linkSelect[0];

  await db.delete(schema.links).where(eq(schema.links.id, link.id));

  return makeRight({ link });
}

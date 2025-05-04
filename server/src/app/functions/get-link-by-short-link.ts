import { eq } from "drizzle-orm";

import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/utils/either";
import { ShortLinkNotExists } from "./errors/short-link-not-exists";
import type { LinkItem } from "./get-links";

export async function getLinkByShortLink(shortLink: string): Promise<Either<ShortLinkNotExists, { link: LinkItem }>> {
  const linkSelect = await db.select().from(schema.links).where(eq(schema.links.shortLink, shortLink));

  if (linkSelect.length === 0) return makeLeft(new ShortLinkNotExists());

  const link = linkSelect[0];

  await db
    .update(schema.links)
    .set({ accessCount: link.accessCount + 1 })
    .where(eq(schema.links.id, link.id));

  return makeRight({ link });
}

import { eq } from "drizzle-orm";
import { z } from "zod";

import { ShortLinkExists } from "@/app/functions/errors/short-link-exists";
import type { LinkItem } from "@/app/functions/get-links";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/utils/either";

export const linkFormSchema = z.object({
  originalLink: z.string().url(),
  shortLink: z.string(),
});

export type LinkForm = z.infer<typeof linkFormSchema>;

export async function postLink(input: LinkForm): Promise<Either<ShortLinkExists, { link: LinkItem }>> {
  const { originalLink, shortLink } = input;

  const linkAlreadyExists = await db.select().from(schema.links).where(eq(schema.links.shortLink, shortLink));

  if (linkAlreadyExists.length > 0) return makeLeft(new ShortLinkExists());

  const link = await db.insert(schema.links).values({ originalLink, shortLink }).returning({
    id: schema.links.id,
    originalLink: schema.links.originalLink,
    shortLink: schema.links.shortLink,
    createdAt: schema.links.createdAt,
    accessCount: schema.links.accessCount,
  });

  return makeRight({ link: link[0] });
}

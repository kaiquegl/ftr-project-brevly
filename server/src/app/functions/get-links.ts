import { desc } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

export const linkItemSchema = z.object({
  id: z.string(),
  originalLink: z.string().url(),
  shortLink: z.string(),
  createdAt: z.date(),
  accessCount: z.number(),
});

export type LinkItem = z.infer<typeof linkItemSchema>;

export const getLinksSchema = z.object({
  links: z.array(linkItemSchema),
});

export type GetLinksResponse = z.infer<typeof getLinksSchema>;

export async function getLinks(): Promise<GetLinksResponse> {
  const links = await db
    .select({
      id: schema.links.id,
      originalLink: schema.links.originalLink,
      shortLink: schema.links.shortLink,
      createdAt: schema.links.createdAt,
      accessCount: schema.links.accessCount,
    })
    .from(schema.links)
    .orderBy(desc(schema.links.id));

  return { links };
}

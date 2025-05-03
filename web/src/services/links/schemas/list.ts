import { z } from "zod";

const linkListItemSchema = z.object({
  id: z.string(),
  originalLink: z.string().url(),
  shortLink: z.string(),
  createdAt: z.date(),
  accessCount: z.number(),
});

type LinkListItem = z.infer<typeof linkListItemSchema>;

const linkListResponseSchema = z.object({
  items: z.array(linkListItemSchema),
});

type LinkListResponse = z.infer<typeof linkListResponseSchema>;

export { linkListResponseSchema, type LinkListResponse, type LinkListItem };

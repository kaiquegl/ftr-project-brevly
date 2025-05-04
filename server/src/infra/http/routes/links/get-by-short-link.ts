import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

import { getLinkByShortLink } from "@/app/functions/get-link-by-short-link";
import { linkItemSchema } from "@/app/functions/get-links";
import { isLeft, unwrapEither } from "@/utils/either";

export const getLinkByShortLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links/:shortLink",
    {
      schema: {
        tags: ["Links"],
        params: z.object({
          shortLink: z.string(),
        }),
        summary: "Get link data by short link",
        response: {
          200: z.object({ item: linkItemSchema }),
          404: z.object({ error: z.string().describe("Error getting link by id") }),
        },
      },
    },
    async (request, reply) => {
      const { shortLink } = request.params;

      const result = await getLinkByShortLink(shortLink);

      if (isLeft(result)) {
        const error = unwrapEither(result);
        return reply.status(404).send({ error: error.message });
      }

      const { link } = unwrapEither(result);
      return reply.status(200).send({ item: link });
    }
  );
};

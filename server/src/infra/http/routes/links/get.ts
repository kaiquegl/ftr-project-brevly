import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { getLinks, getLinksSchema } from "@/app/functions/get-links";

export const getLinksRoutes: FastifyPluginAsyncZod = async server => {
  server.get(
    "/links",
    {
      schema: {
        tags: ["Links"],
        summary: "Get all links",
        response: {
          200: getLinksSchema,
        },
      },
    },
    async (_, reply) => {
      const { links } = await getLinks();
      return reply.status(200).send({ links });
    }
  );
};

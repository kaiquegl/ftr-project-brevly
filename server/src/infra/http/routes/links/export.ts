import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

import { exportLinks } from "@/app/functions/export-links";
import { isLeft, unwrapEither } from "@/utils/either";

export const exportLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links/exports",
    {
      schema: {
        tags: ["Links"],
        summary: "Export links",
        response: {
          200: z.object({
            reportUrl: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (_, reply) => {
      const result = await exportLinks();

      if (isLeft(result)) {
        return reply.status(404).send({ message: "Links not found." });
      }

      const { reportUrl } = unwrapEither(result);

      return reply.status(200).send({ reportUrl });
    }
  );
};

import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

import { deleteLink } from "@/app/functions/delete-link";
import { linkItemSchema } from "@/app/functions/get-links";
import { isLeft, unwrapEither } from "@/utils/either";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/links/:id",
    {
      schema: {
        tags: ["Links"],
        summary: "Delete a link",
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({ item: linkItemSchema.describe("Deleted link successfully") }),
          404: z.object({ error: z.string().describe("Error deleting link") }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const result = await deleteLink(id);

      if (isLeft(result)) {
        const error = unwrapEither(result);
        return reply.status(404).send({ error: error.message });
      }

      const { link } = unwrapEither(result);
      return reply.status(201).send({ item: link });
    }
  );
};

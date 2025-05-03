import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

import { linkItemSchema } from "@/app/functions/get-links";
import { linkFormSchema, postLink } from "@/app/functions/post-link";
import { isLeft, unwrapEither } from "@/utils/either";

export const postLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    "/links",
    {
      schema: {
        tags: ["Links"],
        summary: "Create a new short link",
        body: linkFormSchema,
        response: {
          201: z.object({ link: linkItemSchema.describe("Created link successfully") }),
          400: z.object({ error: z.string().describe("Error creating link") }),
        },
      },
    },
    async (request, reply) => {
      const { originalLink, shortLink } = request.body;

      const result = await postLink({ originalLink, shortLink });

      if (isLeft(result)) {
        const error = unwrapEither(result);
        return reply.status(400).send({ error: error.message });
      }

      const { link } = unwrapEither(result);
      return reply.status(201).send({ link });
    }
  );
};

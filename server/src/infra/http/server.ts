import { fastifyCors } from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { deleteLinkRoute } from "@/infra/http/routes/links/delete";
import { exportLinksRoute } from "@/infra/http/routes/links/export";
import { getLinksRoute } from "@/infra/http/routes/links/get";
import { getLinkByShortLinkRoute } from "@/infra/http/routes/links/get-by-short-link";
import { postLinkRoute } from "@/infra/http/routes/links/post";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, _request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.validation,
    });
  }

  // Send error to Sentry or other error tracking service
  console.log(error);

  return reply.status(500).send({ message: "Internal server error." });
});

server.register(fastifyCors, { origin: "*", methods: ["GET", "POST", "DELETE"] });

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "FTR - brev.ly API server",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

// links
server.register(getLinksRoute);
server.register(getLinkByShortLinkRoute);
server.register(postLinkRoute);
server.register(deleteLinkRoute);
server.register(exportLinksRoute);

server.listen({ port: 3333, host: "0.0.0.0" }, () => {
  console.log("HTTP Server Running at port 3333");
});

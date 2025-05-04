import { createFileRoute } from "@tanstack/react-router";

import NotFoundTemplate from "@/template/not-found";

export const Route = createFileRoute("/not-found/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <NotFoundTemplate />;
}

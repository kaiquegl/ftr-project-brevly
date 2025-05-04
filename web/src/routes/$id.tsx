import { useSuspenseQuery } from "@tanstack/react-query";
import { Navigate, createFileRoute } from "@tanstack/react-router";

import { getLinkByShortLinkQueryOptions } from "@/services/links/get-by-short-link";
import RedirectTemplate from "@/template/redirect";
import RedirectLoadingTemplate from "@/template/redirect/loading";

export const Route = createFileRoute("/$id")({
  preload: false,
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { id } }) =>
    queryClient.ensureQueryData(getLinkByShortLinkQueryOptions(id)),
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { data, isLoading } = useSuspenseQuery(getLinkByShortLinkQueryOptions(id));

  return isLoading ? (
    <RedirectLoadingTemplate />
  ) : !data?.item ? (
    <Navigate to="/not-found" />
  ) : (
    <RedirectTemplate link={data.item} />
  );
}

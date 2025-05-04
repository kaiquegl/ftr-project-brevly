import { queryOptions, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { env } from "@/env";
import type { LinkListItem } from "@/services/links/schemas/list";

export const getLinkByShortLink = (shortLink: string) => {
  return useQuery(getLinkByShortLinkQueryOptions(shortLink));
};

export const getLinkByShortLinkQueryOptions = (shortLink: string) => {
  return queryOptions({
    retry: false,
    queryKey: ["links", shortLink],
    queryFn: async () => {
      const response = await fetch(`${env.VITE_API_BASE_URL}/links/${shortLink}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return { item: null };
        }

        toast.error("Erro", {
          description: "Erro ao buscar o link, tente novamente mais tarde...",
        });

        throw new Error("Failed to fetch links");
      }

      const data = (await response.json()) as { item: LinkListItem };

      return { item: data?.item ?? null };
    },
  });
};

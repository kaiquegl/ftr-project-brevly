import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { env } from "@/env";
import type { LinkListResponse } from "@/services/links/schemas/list";
import { toast } from "sonner";

export default function getLinkList() {
  return useQuery<LinkListResponse>({
    queryKey: ["links"],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await fetch(`${env.VITE_API_BASE_URL}/links`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        toast.error("Erro", {
          description: "Erro ao buscar links, tente novamente mais tarde...",
        });

        throw new Error("Failed to fetch links");
      }

      const data = (await response.json()) as LinkListResponse;

      return { items: data?.items ?? [] };
    },
  });
}

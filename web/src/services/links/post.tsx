import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { env } from "@/env";
import type { LinkForm } from "@/services/links/schemas/form";
import type { LinkListItem } from "@/services/links/schemas/list";

export default function postLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ originalLink, shortLink }: LinkForm) => {
      const response = await fetch(`${env.VITE_API_BASE_URL}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalLink, shortLink }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          toast.warning("Erro no cadastro", {
            description: "Essa URL encurtada já existe",
          });
        } else {
          toast.error("Erro", {
            description: "Erro ao cadastrar link, tente novamente mais tarde...",
          });
        }

        throw new Error("Failed to post link");
      }

      queryClient.invalidateQueries({ queryKey: ["links"] });

      const data = (await response.json()) as { item: LinkListItem };

      return { item: data?.item ?? null };
    },
  });
}

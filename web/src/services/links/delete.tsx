import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { env } from "@/env";
import type { LinkListItem } from "@/services/links/schemas/list";

export default function deleteLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${env.VITE_API_BASE_URL}/links/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        if (response.status === 404) {
          toast.warning("Erro ao excluir link", {
            description: "Essa URL encurtada não foi encontrada",
          });
        } else {
          toast.error("Erro", {
            description: "Erro ao excluir link, tente novamente mais tarde...",
          });

          throw new Error("Failed to delete link");
        }
      }

      queryClient.invalidateQueries({ queryKey: ["links"] });

      const data = (await response.json()) as { item: LinkListItem };

      return { item: data?.item ?? null };
    },
  });
}

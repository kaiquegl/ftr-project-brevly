import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { env } from "@/env";

export default function exportLinks() {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${env.VITE_API_BASE_URL}/links/exports`, {
        method: "POST",
      });

      if (!response.ok) {
        if (response.status === 404) {
          toast.warning("Erro ao exportar links", {
            description: "Nenhum link encontrado",
          });
        } else {
          toast.error("Erro", {
            description: "Erro ao exportar links, tente novamente mais tarde...",
          });

          throw new Error("Failed to export link");
        }
      }

      const data = (await response.json()) as { reportUrl: string };

      return { reportUrl: data?.reportUrl ?? null };
    },
  });
}

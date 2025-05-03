import { Loader } from "lucide-react";

import Typography from "@/components/ui/typography";

export default function LoadingList() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Loader className="size-6 text-secondary-400 animate-spin" />

      <Typography size="sm" tag="p" className="uppercase font-medium text-secondary-400">
        Carregando links...
      </Typography>
    </div>
  );
}

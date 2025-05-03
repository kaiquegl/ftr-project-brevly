import { useState } from "react";

import DownloadIcon from "@/components/icons/download";
import LinkIcon from "@/components/icons/link";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export default function ListCard() {
  const [links, setLinks] = useState([]);

  return (
    <Card className="flex flex-col gap-4 lg:gap-5">
      <div className="flex items-center justify-between">
        <Typography size="lg" tag="h2" className="text-foreground">
          Meus links
        </Typography>

        <Button variant="secondary" size="sm">
          <DownloadIcon className="size-4 text-foreground" />
          Baixar CSV
        </Button>
      </div>

      <div className={cn("border-t border-secondary", !links?.length && "pt-8 pb-6")}>
        {!links.length ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <LinkIcon className="size-8 text-secondary-400" />

            <Typography size="xs" tag="p" className="text-secondary-foreground">
              Ainda não existem links cadastrados
            </Typography>
          </div>
        ) : (
          <div />
        )}
      </div>
    </Card>
  );
}

import { useEffect } from "react";

import Card from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import type { LinkListItem } from "@/services/links/schemas/list";
import brevLyLogo from "/imgs/only-logo.svg?url";

type RedirectTemplateProps = {
  link: LinkListItem;
};

export default function RedirectTemplate({ link }: RedirectTemplateProps) {
  useEffect(() => {
    if (link) {
      const timer = setTimeout(() => {
        window.location.href = link.originalLink;
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [link]);

  return (
    <main className="min-h-dvh flex py-8 px-3 justify-center items-center">
      <Card className="max-w-xl py-12 md:py-16 px-5 md:px-12 lg:py-16 lg:px-12 flex flex-col items-center justify-center gap-6">
        <img src={brevLyLogo} alt="Brev.ly" className="block h-auto w-full max-w-12" />

        <Typography size="xl" tag="h1">
          Redirecionando...
        </Typography>

        <div className="flex flex-col gap-1 text-center">
          <Typography size="md" tag="p" className="text-secondary-foreground">
            O link será aberto automaticamente em alguns instantes.
          </Typography>

          <Typography size="md" tag="p" className="text-secondary-foreground">
            Não foi redirecionado?{" "}
            <a href={link.originalLink} className="text-primary underline" rel="noreferrer">
              Acesse aqui
            </a>
          </Typography>
        </div>
      </Card>
    </main>
  );
}

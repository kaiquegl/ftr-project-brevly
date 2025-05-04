import { Link } from "@tanstack/react-router";
import { useTransition } from "react";
import { toast } from "sonner";

import CopyIcon from "@/components/icons/copy";
import TrashIcon from "@/components/icons/trash";
import Button from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import deleteLink from "@/services/links/delete";
import type { LinkListItem } from "@/services/links/schemas/list";

type ListLinkItemProps = {
  item: LinkListItem;
};

export default function ListLinkItem({ item }: ListLinkItemProps) {
  const deleteLinkMutation = deleteLink();
  const [isPending, startTransition] = useTransition();

  async function handleDeleteLink() {
    if (confirm(`Você realmente quer apagar o link ${item.shortLink}?`)) {
      const result = await deleteLinkMutation.mutateAsync(item.id);

      if (result.item) toast.success("Link apagado com sucesso");
    }
  }

  async function handleCopyLink() {
    startTransition(async () => {
      await navigator.clipboard.writeText(`${location.origin}/${item.shortLink}`);

      toast.info("Link copiado com sucesso", {
        description: `O link ${item.shortLink} foi copiado para a área de transferência`,
      });
    });
  }

  return (
    <div className="flex items-center justify-between py-4.5 gap-3 not-last:border-b not-last:border-secondary">
      <div className="flex flex-col gap-1 flex-auto">
        <Link to="/$id" params={{ id: item.shortLink }}>
          <Typography size="md" tag="p" className="text-primary hover:underline transition-all underline-offset-2">
            {`${location.host}/${item.shortLink}`}
          </Typography>
        </Link>

        <a href={item.originalLink} target="_blank" rel="noreferrer">
          <Typography
            size="sm"
            tag="p"
            className="text-secondary-foreground hover:underline transition-all underline-offset-2"
          >
            {item.originalLink}
          </Typography>
        </a>
      </div>
      <div className="flex items-center gap-1">
        <Typography size="sm" tag="span" className="text-secondary-foreground mr-4">
          {item.accessCount} acessos
        </Typography>

        <Button variant="secondary" size="icon" isLoading={isPending} onClick={handleCopyLink}>
          <CopyIcon className="size-4 text-foreground" />
        </Button>
        <Button isLoading={deleteLinkMutation.isPending} variant="secondary" size="icon" onClick={handleDeleteLink}>
          <TrashIcon className="size-4 text-foreground" />
        </Button>
      </div>
    </div>
  );
}

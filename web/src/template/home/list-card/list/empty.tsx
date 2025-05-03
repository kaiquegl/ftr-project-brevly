import LinkIcon from "@/components/icons/link";
import Typography from "@/components/ui/typography";

export default function EmptyList() {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <LinkIcon className="size-8 text-secondary-400" />

      <Typography size="xs" tag="p" className="text-secondary-foreground">
        Ainda não existem links cadastrados
      </Typography>
    </div>
  );
}

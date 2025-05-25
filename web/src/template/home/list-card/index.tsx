import DownloadIcon from "@/components/icons/download";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import exportLinks from "@/services/links/export";
import getLinkList from "@/services/links/get-list";
import EmptyList from "./list/empty";
import ListLinkItem from "./list/item";
import LoadingList from "./list/loading";

export default function ListCard() {
  const { data, isLoading, isFetching } = getLinkList();
  const exportLinksMutation = exportLinks();

  const handleExportLinks = async () => {
    const { reportUrl } = await exportLinksMutation.mutateAsync();

    if (reportUrl) {
      const a = document.createElement("a");

      a.setAttribute("href", reportUrl);
      a.setAttribute("download", "links.csv");
      a.click();

      window.URL.revokeObjectURL(reportUrl);
    }
  };

  return (
    <Card className="flex flex-col gap-4 lg:gap-5">
      <div className="flex items-center justify-between">
        <Typography size="lg" tag="h2" className="text-foreground">
          Meus links
        </Typography>

        <Button
          size="sm"
          variant="secondary"
          onClick={handleExportLinks}
          isLoading={exportLinksMutation.isPending}
          disabled={exportLinksMutation.isPending || data?.items.length === 0 || !data}
        >
          <DownloadIcon className="size-4 text-foreground" />
          Baixar CSV
        </Button>
      </div>

      <div
        className={cn(
          "border-t border-secondary max-h-112.5 scrollbar scrollbar-thumb-primary scrollbar-track-secondary overflow-y-auto",
          (!data?.items?.length || isLoading || isFetching) && "pt-8 pb-6",
          !!data?.items && data?.items?.length > 6 && "pr-2"
        )}
      >
        {isLoading || isFetching ? (
          <LoadingList />
        ) : !data?.items?.length ? (
          <EmptyList />
        ) : (
          <div className="">
            {data.items.map((item) => (
              <ListLinkItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

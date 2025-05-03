import DownloadIcon from "@/components/icons/download";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import getLinkList from "@/services/links/get-list";
import EmptyList from "./list/empty";
import ListLinkItem from "./list/item";
import LoadingList from "./list/loading";

export default function ListCard() {
  const { data, isLoading, isFetching } = getLinkList();

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

      <div className={cn("border-t border-secondary", !data?.items?.length && "pt-8 pb-6")}>
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

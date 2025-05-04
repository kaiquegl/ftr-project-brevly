import Card from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { Link } from "@tanstack/react-router";
import notFoundImg from "/imgs/404.svg?url";

export default function NotFoundTemplate() {
  return (
    <main className="min-h-dvh flex py-8 px-3 justify-center items-center">
      <Card className="max-w-xl py-12 md:py-16 lg:py-16 lg:px-12 px-5 md:px-12 flex flex-col items-center justify-center gap-6">
        <img src={notFoundImg} alt="Not Found - 404" className="block h-auto w-full max-w-41" />

        <Typography size="xl" tag="h1">
          Link não encontrado
        </Typography>

        <div className="text-center">
          <Typography size="md" tag="p" className="text-secondary-foreground">
            O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. <br /> Saiba mais em{" "}
            <Link to="/" className="text-primary underline">
              {location.host}
            </Link>
            .
          </Typography>
        </div>
      </Card>
    </main>
  );
}

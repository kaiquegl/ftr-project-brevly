import Card from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import brevLyLogo from "/imgs/only-logo.svg?url";

export default function RedirectLoadingTemplate() {
  return (
    <main className="min-h-dvh flex py-8 px-3 justify-center items-center">
      <Card className="max-w-xl py-12 md:py-16 px-5 md:px-12 lg:py-16 lg:px-12 flex flex-col items-center justify-center gap-6">
        <img src={brevLyLogo} alt="Brev.ly" className="block h-auto w-full max-w-12" />

        <Typography size="xl" tag="h1">
          Carregando link encurtado...
        </Typography>
      </Card>
    </main>
  );
}

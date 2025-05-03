import brevLyLogo from "/imgs/logo.svg?url";
import FormCard from "./form-card";
import ListCard from "./list-card";

export default function HomeTemplate() {
  return (
    <main className="min-h-dvh flex py-8 px-3 justify-center lg:items-center">
      <div className="container max-w-245 mx-auto flex flex-col gap-6 lg:gap-8">
        <img src={brevLyLogo} alt="Brev.ly" className="block h-auto w-full max-w-24" />

        <div className="grid gap-3 lg:gap-5 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <FormCard />
          </div>
          <div className="lg:col-span-7">
            <ListCard />
          </div>
        </div>
      </div>
    </main>
  );
}

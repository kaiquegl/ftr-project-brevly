import Card from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { useAppForm } from "@/hooks/form";
import { defaultLinkFormValues, linkFormSchema } from "@/services/links/schemas/form";

export default function FormCard() {
  const form = useAppForm({
    defaultValues: defaultLinkFormValues,
    validators: { onChange: linkFormSchema },
    onSubmit: ({ value }) => {
      console.log("submit", value);
    },
  });

  return (
    <Card className="flex flex-col gap-5 lg:gap-6">
      <Typography size="lg" tag="h2" className="text-foreground">
        Novo link
      </Typography>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.AppField
          name="originalLink"
          children={(field) => <field.InputField label="Link original" placeholder="https://www.exemplo.com.br" />}
        />

        <form.AppField
          name="shortenedLink"
          children={(field) => <field.InputField label="Link encurtado" placeholder="brev.ly/" />}
        />

        <div className="mt-6">
          <form.AppForm>
            <form.SubscribeButton label="Salvar link" />
          </form.AppForm>
        </div>
      </form>
    </Card>
  );
}

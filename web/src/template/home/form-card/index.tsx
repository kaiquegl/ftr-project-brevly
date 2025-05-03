import Card from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { useAppForm } from "@/hooks/form";
import postLink from "@/services/links/post";
import { defaultLinkFormValues, linkFormSchema } from "@/services/links/schemas/form";
import { toast } from "sonner";

export default function FormCard() {
  const { mutateAsync } = postLink();

  const form = useAppForm({
    defaultValues: defaultLinkFormValues,
    validators: { onChange: linkFormSchema },
    onSubmit: async ({ value }) => {
      const response = await mutateAsync(value);

      if (response.item) {
        form.reset(defaultLinkFormValues);

        toast.success("Link cadastrado com sucesso");
      }
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
          name="shortLink"
          children={(field) => <field.InputField label="Link encurtado" prefix={`${location.host}/`} />}
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

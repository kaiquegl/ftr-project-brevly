import { z } from "zod";

const linkFormSchema = z.object({
  originalLink: z.string().url({ message: "Url inválida" }).min(1, "Campo obrigatório"),
  shortLink: z.string().min(1, "Campo obrigatório"),
});

type LinkForm = z.infer<typeof linkFormSchema>;

const defaultLinkFormValues = {
  originalLink: "",
  shortLink: "",
} as LinkForm;

export { linkFormSchema, defaultLinkFormValues, type LinkForm };

import { z } from "zod";

const linkFormSchema = z.object({
  originalLink: z.string().url({ message: "Url inválida" }).min(1, "Campo obrigatório"),
  shortenedLink: z.string().min(1, "Campo obrigatório"),
});

type LinkFormSchema = z.infer<typeof linkFormSchema>;

const defaultLinkFormValues = {
  originalLink: "",
  shortenedLink: "",
} as LinkFormSchema;

export { linkFormSchema, defaultLinkFormValues, type LinkFormSchema };

import { object, string } from "yup";

export const checkOrgSchema = object({
  slug: string().required("Slug da organização é obrigatória."),
});

export const createOrgSchema = object({
  slug: string().required("Slug da organização é obrigatória."),
  name: string().required("Nome da organização é obrigatório."),
});

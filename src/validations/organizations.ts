import { object, string } from "yup";

export const checkOrgSchema = object({
  slug: string().required("Slug é obrigatória."),
});

export const createUserSchema = object({
  slug: string().required("Slug é obrigatória."),
  name: string().required("Nome é obrigatória."),
});

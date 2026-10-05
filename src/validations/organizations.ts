import { object, string } from "yup";

export const checkOrgBySlug = object({
  slug: string().required("Slug é obrigatória."),
});

export const createOrgBySlug = object({
  slug: string().required("Slug é obrigatória."),
  name: string().required("Nome é obrigatória."),
});

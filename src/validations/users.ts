import { object, ref, string } from "yup";

export const checkUserSchema = object({
  slug: string().required("Slug da organização é obrigatória."),
  email: string()
    .email("Email inválido.")
    .required("Email do usuário é obrigatório."),
});

export const createUserSchema = object({
  slug: string().required("Slug da organização é obrigatória."),
  email: string()
    .email("Email inválido.")
    .required("Email do usuário é obrigatório."),
  name: string().required("Nome do usuário é obrigatório."),
  surname: string().required("Sobrenome do usuário é obrigatório."),
  password: string()
    .min(8, "A senha deve ter no mínimo 8 dígitos.")
    .required("A senha do usuário é obrigatória."),
  confirmPassword: string()
    .min(8, "A confirmação de senha deve ter no mínimo 8 dígitos.")
    .oneOf([ref("password")], "As senhas não conferem.")
    .required("A confirmação de senha é obrigatória."),
});

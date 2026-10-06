import bcrypt from "bcryptjs";
import { UserResponse } from "../interfaces/users";
import { UsersRepository } from "../repositories/users";
import { checkUserSchema, createUserSchema } from "../validations/users";
import { OrganizationsService } from "./organizations";

export const UsersService = {
  async checkByEmail(slug: string, email: string): Promise<UserResponse> {
    const validatedData = await checkUserSchema.validate(
      { slug, email },
      { abortEarly: false },
    );

    const orgExists = await OrganizationsService.checkBySlug(
      validatedData.slug,
    );

    if (!orgExists.active) {
      throw new Error("Organização não ativa.");
    }

    const userExists = await UsersRepository.checkByEmail(
      orgExists.id,
      validatedData.email,
    );

    if (!userExists) {
      throw new Error("Usuário não cadastrado.");
    }

    return userExists;
  },
  async create(
    slug: string,
    email: string,
    name: string,
    surname: string,
    password: string,
    confirmPassword: string,
  ): Promise<UserResponse> {
    const validatedData = await createUserSchema.validate({
      slug,
      email,
      name,
      surname,
      password,
      confirmPassword,
    });

    const orgExists = await OrganizationsService.checkBySlug(
      validatedData.slug,
    );

    if (!orgExists.active) {
      throw new Error("Organização não ativa.");
    }

    const userExists = await UsersRepository.checkByEmail(
      orgExists.id,
      validatedData.email,
    );

    if (userExists) {
      throw new Error("Usuário já cadastrado.");
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    return UsersRepository.create(
      validatedData.email,
      validatedData.name,
      validatedData.surname,
      hashedPassword,
      orgExists.id,
    );
  },
  async changeStatus(slug: string, email: string): Promise<UserResponse> {
    const validatedData = await checkUserSchema.validate(
      { slug, email },
      { abortEarly: false },
    );

    const orgExists = await OrganizationsService.checkBySlug(
      validatedData.slug,
    );

    if (!orgExists.active) {
      throw new Error("Organização não ativa.");
    }

    const userExists = await this.checkByEmail(
      orgExists.slug,
      validatedData.email,
    );

    return UsersRepository.changeActive(
      orgExists.id,
      userExists.email,
      !userExists.active,
    );
  },
};

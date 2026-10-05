import { OrganizationResponse } from "../interfaces/organizations";
import { OrganizationsRepository } from "../repositories/organizations";
import { checkOrgBySlug, createOrgBySlug } from "../validations/organizations";

export const OrganizationsService = {
  async checkBySlug(slug: string): Promise<OrganizationResponse> {
    const validatedData = await checkOrgBySlug.validate(
      { slug },
      { abortEarly: false },
    );

    const orgExists = await OrganizationsRepository.checkBySlug(
      validatedData.slug,
    );

    if (!orgExists) {
      throw new Error("Organização não cadastrada.");
    }

    return orgExists;
  },
  async create(slug: string, name: string): Promise<OrganizationResponse> {
    const validatedData = await createOrgBySlug.validate(
      { slug, name },
      { abortEarly: false },
    );

    const orgExists = await OrganizationsRepository.checkBySlug(
      validatedData.slug,
    );

    if (orgExists) {
      throw new Error("Organização já cadastrada.");
    }

    return OrganizationsRepository.create(
      validatedData.slug,
      validatedData.name,
    );
  },
  async changeStatus(slug: string): Promise<OrganizationResponse> {
    const validatedData = await checkOrgBySlug.validate(
      { slug },
      { abortEarly: false },
    );

    const orgExists = await this.checkBySlug(validatedData.slug);

    return OrganizationsRepository.changeActive(
      orgExists.id,
      !orgExists.active,
    );
  },
};

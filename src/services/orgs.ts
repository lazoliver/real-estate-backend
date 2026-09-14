import { OrganizationResponse } from "../interfaces/orgs";
import OrganizationsRepository from "../repositories/orgs";
import { checkOrgSchema, createOrgSchema } from "../validations/orgs";

const OrganizationsService = {
  async check(slug: string): Promise<OrganizationResponse | null> {
    const validatedData = await checkOrgSchema.validate(
      { slug },
      {
        abortEarly: false,
      },
    );

    const orgExists = await OrganizationsRepository.check(validatedData.slug);

    if (!orgExists) {
      return null;
    }

    return orgExists;
  },
  async create(slug: string, name: string): Promise<OrganizationResponse> {
    const validatedData = await createOrgSchema.validate(
      { slug, name },
      { abortEarly: false },
    );

    const orgExists = await this.check(validatedData.slug);

    if (orgExists) {
      throw new Error(`Org slug ${validatedData.slug} is already in use.`);
    }

    return await OrganizationsRepository.create(
      validatedData.slug,
      validatedData.name,
    );
  },
  async status(slug: string): Promise<OrganizationResponse> {
    const orgExists = await this.check(slug);

    if (!orgExists) {
      throw new Error(`Org slug ${slug} is not registered yet.`);
    }

    return await OrganizationsRepository.status(
      orgExists.id,
      !orgExists.active,
    );
  },
};

export default OrganizationsService;

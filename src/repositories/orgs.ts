import { prisma } from "../database/prisma";
import { OrganizationResponse } from "../interfaces/orgs";

const OrganizationsRepository = {
  check(slug: string): Promise<OrganizationResponse | null> {
    return prisma.organization.findUnique({ where: { slug } });
  },
  create(slug: string, name: string): Promise<OrganizationResponse> {
    return prisma.organization.create({ data: { slug, name } });
  },
  status(organizationId: string, status: boolean) {
    return prisma.organization.update({
      where: { id: organizationId },
      data: { active: status },
    });
  },
};

export default OrganizationsRepository;

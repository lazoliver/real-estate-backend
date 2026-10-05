import { prisma } from "../database/prisma";
import { OrganizationResponse } from "../interfaces/organizations";

export const OrganizationsRepository = {
  checkBySlug(slug: string): Promise<OrganizationResponse | null> {
    return prisma.organization.findUnique({ where: { slug } });
  },
  create(slug: string, name: string): Promise<OrganizationResponse> {
    return prisma.organization.create({ data: { slug, name } });
  },
  changeActive(id: string, status: boolean): Promise<OrganizationResponse> {
    return prisma.organization.update({
      where: { id },
      data: { active: status },
    });
  },
};

import { prisma } from "../database/prisma";
import { UserResponse } from "../interfaces/users";

export const UsersRepository = {
  checkByEmail(
    organizationId: string,
    email: string,
  ): Promise<UserResponse | null> {
    return prisma.user.findUnique({
      where: {
        organizationId_email: {
          organizationId,
          email,
        },
      },
    });
  },
  create(
    email: string,
    name: string,
    surname: string,
    password: string,
    organizationId: string,
  ): Promise<UserResponse> {
    return prisma.user.create({
      data: {
        email,
        name,
        surname,
        password,
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
    });
  },
  changeActive(
    organizationId: string,
    email: string,
    status: boolean,
  ): Promise<UserResponse> {
    return prisma.user.update({
      where: { organizationId_email: { organizationId, email } },
      data: { active: status },
    });
  },
};

import { ValidationError } from "yup";
import logger from "../../configs/logs";
import { prisma } from "../../database/prisma";
import { UsersService } from "../../services/users";
import vars from "../../configs/vars";

void (async () => {
  try {
    const [, , ...args] = process.argv;

    if (args.length != 4) {
      throw new Error(
        "uso: yarn create-user <org-slug> <user-email> <user-name> <user-surname>",
      );
    }

    const slug = args[0];
    const email = args[1];
    const name = args[2];
    const surname = args[3];
    const password = vars.default_password;
    const confirmPassword = vars.default_password;

    const user = await UsersService.create(
      slug,
      email,
      name,
      surname,
      password,
      confirmPassword,
    );

    logger.debug(
      `scripts/users/create - id: ${user.id} email: ${user.email} org: ${user.organizationId} active: ${user.active}`,
    );
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`scripts/users/create - ${error}`);
    } else if (error instanceof ValidationError) {
      logger.error(`scripts/users/create - ${error.errors}`);
    } else {
      logger.error(`scripts/users/create - ${error}`);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();

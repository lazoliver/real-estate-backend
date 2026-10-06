import { ValidationError } from "yup";
import logger from "../../configs/logs";
import { prisma } from "../../database/prisma";
import { UsersService } from "../../services/users";

void (async () => {
  try {
    const [, , ...args] = process.argv;

    if (args.length != 2) {
      throw new Error("uso: yarn check-user <org-slug> <user-email>");
    }

    const slug = args[0];
    const email = args[1];

    const user = await UsersService.checkByEmail(slug, email);

    logger.debug(
      `scripts/users/check - id: ${user.id} email: ${user.email} org: ${user.organizationId} active: ${user.active}`,
    );
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`scripts/users/check - ${error}`);
    } else if (error instanceof ValidationError) {
      logger.error(`scripts/users/check - ${error.errors}`);
    } else {
      logger.error(`scripts/users/check - ${error}`);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();

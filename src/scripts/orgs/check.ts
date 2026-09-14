import { ValidationError } from "yup";
import OrganizationsService from "../../services/orgs";
import { prisma } from "../../database/prisma";
import logger from "../../configs/logs";

void (async () => {
  try {
    const [, , ...args] = process.argv;

    if (args.length != 1) {
      throw new Error("uso: yarn check-org <org-slug>");
    }

    const slug = args[0];

    const org = await OrganizationsService.check(slug);

    if (!org) {
      throw new Error(`Org with slug ${slug} is not registered yet.`);
    }

    logger.debug(
      `scripts/orgs/check - id: ${org.id} slug: ${org.slug} active: ${org.active}`,
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.error("scripts/orgs/check - ", {
        message: error.message,
        errors: error.errors,
      });
    } else if (error instanceof Error) {
      logger.error("scripts/orgs/check - ", error);
    } else {
      logger.error("scripts/orgs/check - ", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();

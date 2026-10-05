import { ValidationError } from "yup";
import logger from "../../configs/logs";
import { prisma } from "../../database/prisma";
import { OrganizationsService } from "../../services/organizations";

void (async () => {
  try {
    const [, , ...args] = process.argv;

    if (args.length != 1) {
      throw new Error("uso: yarn check-org <org-slug>");
    }

    const slug = args[0];

    const org = await OrganizationsService.checkBySlug(slug);

    logger.debug(
      `scripts/orgs/check - id: ${org.id} slug: ${org.slug} active: ${org.active}`,
    );
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`scripts/orgs/check - ${error}`);
    } else if (error instanceof ValidationError) {
      logger.error(`scripts/orgs/check - ${error.errors}`);
    } else {
      logger.error(`scripts/orgs/check - ${error}`);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();

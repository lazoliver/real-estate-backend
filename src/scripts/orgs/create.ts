import { ValidationError } from "yup";
import logger from "../../configs/logs";
import { prisma } from "../../database/prisma";
import { OrganizationsService } from "../../services/organizations";

void (async () => {
  try {
    const [, , ...args] = process.argv;

    if (args.length != 2) {
      throw new Error("uso: yarn create-org <org-slug>");
    }

    const slug = args[0];
    const name = args[1];

    const org = await OrganizationsService.create(slug, name);

    logger.debug(
      `scripts/orgs/create - id: ${org.id} slug: ${org.slug} active: ${org.active}`,
    );
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`scripts/orgs/create - ${error}`);
    } else if (error instanceof ValidationError) {
      logger.error(`scripts/orgs/create - ${error.errors}`);
    } else {
      logger.error(`scripts/orgs/create - ${error}`);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();

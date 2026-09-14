import { ValidationError } from "yup";
import OrganizationsService from "../../services/orgs";
import { prisma } from "../../database/prisma";

void (async () => {
  try {
    const [, , ...args] = process.argv;

    if (args.length != 1) {
      throw new Error("uso: yarn status-org <org-slug>");
    }

    const slug = args[0];

    const org = await OrganizationsService.status(slug);

    console.log(
      `scripts/orgs/status - id: ${org.id} slug: ${org.slug} active: ${org.active}`,
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error("scripts/orgs/status - ", {
        message: error.message,
        errors: error.errors,
      });
    } else if (error instanceof Error) {
      console.error("scripts/orgs/status - ", error);
    } else {
      console.error("scripts/orgs/status - ", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();

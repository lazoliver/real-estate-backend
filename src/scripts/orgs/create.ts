import { ValidationError } from "yup";
import OrganizationsService from "../../services/orgs";
import { prisma } from "../../database/prisma";

void (async () => {
  try {
    const [, , ...args] = process.argv;

    if (args.length != 2) {
      throw new Error("uso: yarn create-org <org-slug> <org-name>");
    }

    const slug = args[0];
    const name = args[1];

    const org = await OrganizationsService.create(slug, name);

    console.log(
      `scripts/orgs/create - id: ${org.id} slug: ${org.slug} active: ${org.active}`,
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error("scripts/orgs/create - ", {
        message: error.message,
        errors: error.errors,
      });
    } else if (error instanceof Error) {
      console.error("scripts/orgs/create - ", error);
    } else {
      console.error("scripts/orgs/create - ", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();

import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // On s'assure que Prisma lit bien ton fichier .env
    url: process.env.DATABASE_URL,
  },
});
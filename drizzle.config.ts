import { defineConfig } from "drizzle-kit";

const getUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Database url is undefined");
  return url;
};

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: getUrl(),
  },
});

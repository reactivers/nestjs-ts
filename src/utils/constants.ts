import { config } from "dotenv";

const ENV = () => process.env.NODE_ENV;

if (!ENV()) throw Error("ENV is not set!");

const getEnvExtension = () => {
  const env = ENV();
  if (env === "production") return "";
  return `.${env}`;
};

config({
  path: `.env${getEnvExtension()}`,
});

export const JWT_SECRET = process.env.JWT_SECRET;

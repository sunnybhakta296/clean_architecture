import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let client: Pool;

export const pgClient = (): Pool => {
  if (!client) {
    client = new Pool({
      host: process.env.DB_HOST,
      port: parseInt(`${process.env.DB_PORT}`),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    // client = new Pool("postgres://wudujmma:1pxqgSsp8kD4UgKP5RzxDOvmW4XC7Drx@satao.db.elephantsql.com/wudujmma")
  }
  return client;
};

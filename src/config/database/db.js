import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const vars = process.env;

const databaseConfig = {
  host: vars.DB_HOST,
  port: vars.DB_PORT,
  database: vars.DB_NAME,
  username: vars.DB_USER,
  password: vars.DB_PASSWORD,
  dialect: "postgres",
  // logging: vars.DB_LOGGING,
};

const database = new Sequelize(databaseConfig);

export default database;

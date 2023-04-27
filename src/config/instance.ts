import { Sequelize } from "sequelize-typescript";

const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
};

const sequelize = new Sequelize(
  config.database!,
  config.username!,
  config.password ?? undefined,
  {
    host: config.host,
    dialect: "mysql",
  }
);

export default sequelize;

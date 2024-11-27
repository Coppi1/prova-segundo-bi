import { Sequelize } from "sequelize";
import path from "path";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "../database.sqlite"), 
  logging: console.log,
});

export default sequelize;

import { Sequelize } from "sequelize";
import path from "path";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "../database.sqlite"), 
  logging: console.log,
});

sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Models synchronized with the database.');
  })
  .catch((error) => console.error('Error syncing database:', error));

export default sequelize;

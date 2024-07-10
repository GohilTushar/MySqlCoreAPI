import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,

    // logging:false
  }
);
(async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default sequelize;

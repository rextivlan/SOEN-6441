import dotenv from "dotenv";
dotenv.config();
import Sequelize from "sequelize";

const db = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  }
);

(async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    // await sequelize.sync({ force: true });
    // console.log('Models were synced.');
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default db;

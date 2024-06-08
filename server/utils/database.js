import { Sequelize } from "sequelize";

const sequelize = new Sequelize("xlsxtopdf", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;

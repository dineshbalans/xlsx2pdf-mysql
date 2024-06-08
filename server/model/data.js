import { Sequelize } from "sequelize";
import sequelize from "../utils/database.js";

const Data = sequelize.define("data", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  SNO: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  employeeName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  designation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  department: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  doj: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pay: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  gradePay: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  da: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  hra: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  otherAllow: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  totalEarnings: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  leaveOnLossOfPay: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  professionalTax: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  tds: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  othersDeduction: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  totalDeduction: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  netAmount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  month: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default Data;

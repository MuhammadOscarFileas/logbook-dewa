import { DataTypes } from "sequelize";
import db from "../config/database.js";

const PatroliUdaraMaster = db.define(
  "patroli_udara_master",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    lokasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ttd_supervisor: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ttd_officer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default PatroliUdaraMaster; 
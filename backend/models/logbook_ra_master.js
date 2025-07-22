import { DataTypes } from "sequelize";
import db from "../config/database.js";

const LogbookRaMaster = db.define(
  "logbook_ra_master",
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
    shift: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pos_jaga: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ttd_menerima: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ttd_menyerahkan: {
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

export default LogbookRaMaster; 
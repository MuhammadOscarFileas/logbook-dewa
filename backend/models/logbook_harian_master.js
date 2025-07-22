import { DataTypes } from "sequelize";
import db from "../config/database.js";

const LogbookHarianMaster = db.define(
  "logbook_harian_master",
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
    lokasi_pos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ttd_yg_menyerahkan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ttd_yg_menerima: {
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

export default LogbookHarianMaster; 
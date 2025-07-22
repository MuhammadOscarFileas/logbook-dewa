import { DataTypes } from "sequelize";
import db from "../config/database.js";

const DataTrackingCCTV = db.define(
  "data_tracking_cctv",
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
    nama_petugas_jaga: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_pemohon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    waktu: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    kejadian: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_foto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    file_video: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    keterangan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

export default DataTrackingCCTV; 
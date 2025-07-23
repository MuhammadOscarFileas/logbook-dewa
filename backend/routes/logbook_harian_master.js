import express from "express";
import {
  createLogbookHarianMaster,
  getAllLogbookHarianMaster,
  getLogbookHarianMasterById,
  updateLogbookHarianMaster,
  deleteLogbookHarianMaster,
  getAllLogbookByLokasi,
  getAllLogbookLokasiList
} from "../controllers/logbook_harian_master.js";

const router = express.Router();

// List all possible lokasi
router.get("/lokasi-list", getAllLogbookLokasiList);
// Get all logbook by lokasi (dynamic)
router.get("/harian/:lokasi", getAllLogbookByLokasi);
router.post("/", createLogbookHarianMaster);
router.get("/", getAllLogbookHarianMaster);
router.get("/:id", getLogbookHarianMasterById);
router.put("/:id", updateLogbookHarianMaster);
router.delete("/:id", deleteLogbookHarianMaster);

export default router; 
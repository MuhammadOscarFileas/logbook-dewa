import express from "express";
import {
  createLogbookHarianMaster,
  getAllLogbookHarianMaster,
  getLogbookHarianMasterById,
  updateLogbookHarianMaster,
  deleteLogbookHarianMaster
} from "../controllers/logbook_harian_master.js";

const router = express.Router();

router.post("/", createLogbookHarianMaster);
router.get("/", getAllLogbookHarianMaster);
router.get("/:id", getLogbookHarianMasterById);
router.put("/:id", updateLogbookHarianMaster);
router.delete("/:id", deleteLogbookHarianMaster);

export default router; 
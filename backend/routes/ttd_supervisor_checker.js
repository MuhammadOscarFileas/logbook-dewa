import express from "express";
import { getTtdSupervisorKosong, getLaporanBelumTtdSupervisorByNama } from "../controllers/ttd_supervisor_checker.js";

const router = express.Router();

// GET /api/ttd-supervisor-kosong/:nama
router.get("/ttd-supervisor-kosong/:nama", getTtdSupervisorKosong);
router.get("/laporan-belum-ttd-supervisor/:nama", getLaporanBelumTtdSupervisorByNama);

export default router
import express from "express";
import { getTtdSupervisorKosong } from "../controllers/ttd_supervisor_checker.js";

const router = express.Router();

// GET /api/ttd-supervisor-kosong/:nama
router.get("/ttd-supervisor-kosong/:nama", getTtdSupervisorKosong);

export default router
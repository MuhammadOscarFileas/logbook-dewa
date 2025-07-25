import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";

// Import semua routes yang SUDAH ADA
import userRoutes from "./routes/user.js";
import behaviourMasterRoutes from "./routes/behaviour_master.js";
import behaviourUraianRoutes from "./routes/behaviour_uraian.js";
import bukuPengunjungCctvRoutes from "./routes/buku_pengunjung_cctv.js";
import checklistHarianPatroliMasterRoutes from "./routes/checklist_harian_patroli_master.js";
import checklistHarianPatroliUraianRoutes from "./routes/checklist_harian_patroli_uraian.js";
import checklistPenyisiranRoutes from "./routes/checklist_penyisiran.js";
import dataTrackingCctvRoutes from "./routes/data_tracking_cctv.js";
import formKemajuanPersonelMasterRoutes from "./routes/form_kemajuan_personel_master.js";
import formKemajuanPersonelUraianRoutes from "./routes/form_kemajuan_personel_uraian.js";
import formPengendalianPiRoutes from "./routes/form_pengendalian_pi.js";
import laporanPatroliRandomMasterRoutes from "./routes/laporan_patroli_random_master.js";
import laporanPatroliRandomUraianRoutes from "./routes/laporan_patroli_random_uraian.js";
import laporanTerminalKargoMasterRoutes from "./routes/laporan_terminal_kargo_master.js";
import laporanTerminalKargoUraianRoutes from "./routes/laporan_terminal_kargo_uraian.js";
import logbookHarianMasterRoutes from "./routes/logbook_harian_master.js";
import logbookRaMasterRoutes from "./routes/logbook_ra_master.js";
import logbookRaUraianRoutes from "./routes/logbook_ra_uraian.js";
import logbookSenjataApiDanPeluruRoutes from "./routes/logbook_senjata_api_dan_peluru.js";
import patrolDaratUraianRoutes from "./routes/patrol_darat_uraian.js";
import patroliDaratMasterRoutes from "./routes/patroli_darat_master.js";
import patroliUdaraMasterRoutes from "./routes/patroli_udara_master.js";
import patrolUdaraUraianRoutes from "./routes/patrol_udara_uraian.js";
import penggunaanSmartDoorBoardingRoutes from "./routes/penggunaan_smart_door_boarding.js";
import penyisiranRuangTungguMasterRoutes from "./routes/penyisiran_ruang_tunggu_master.js";
import penitipanSenjataApiSelainPenumpangRoutes from "./routes/penitipan_senjata_api_selain_penumpang.js";
import randomCheckEtdRoutes from "./routes/random_check_etd.js";
import rekonsiliasiBagasiRoutes from "./routes/rekonsiliasi_bagasi.js";
import rotasiPersonelMasterRoutes from "./routes/rotasi_personel_master.js";
import rotasiPersonelUraianRoutes from "./routes/rotasi_personel_uraian.js";
import suspiciousMasterRoutes from "./routes/suspicious_master.js";
import suspiciousUraianRoutes from "./routes/suspicious_uraian.js";
import uraianInventarisRoutes from "./routes/uraian_inventaris.js";
import uraianTugasRoutes from "./routes/uraian_tugas.js";
import walkingPatrolChecklistRoutes from "./routes/walking_patrol_checklist.js";
import walkingPatrolMasterRoutes from "./routes/walking_patrol_master.js";
import walkingPatrolNonTerminalMasterRoutes from "./routes/walking_patrol_non_terminal_master.js";
import walkingPatrolNonTerminalUraianRoutes from "./routes/walking_patrol_non_terminal_uraian.js";
import bukuPemeriksaanManualRoutes from "./routes/buku_pemeriksaan_manual.js";
import uraianPIRoutes from "./routes/uraian_pi.js";
import uraianGateRoutes from "./routes/uraian_gate.js";

// Import relasi antar model jika ada (opsional)
//banyak bngt
import "./models/association.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware global
app.use(cors({
  origin: ['http://localhost:3000', 'https://c6c0e507ae3f.ngrok-free.app', 'https://w50hv1z0-3000.asse.devtunnels.ms','https://vfd44k84-3000.asse.devtunnels.ms'],
  credentials: true
}));

app.use(express.json());

// Daftarkan semua route API yang SUDAH ADA
app.use("/api/users", userRoutes);

// Behaviour Master
app.use("/api/behaviour-master", behaviourMasterRoutes);
app.use("/api/behaviour-master/behaviour-uraian", behaviourUraianRoutes);

app.use("/api/buku-pengunjung-cctv", bukuPengunjungCctvRoutes);

app.use("/api/checklist-harian-patroli-master", checklistHarianPatroliMasterRoutes);
app.use("/api/checklist-harian-patroli-master/checklist-harian-patroli-uraian", checklistHarianPatroliUraianRoutes);

app.use("/api/data-tracking-cctv", dataTrackingCctvRoutes);

app.use("/api/form-kemajuan-personel-master", formKemajuanPersonelMasterRoutes);
app.use("/api/form-kemajuan-personel-master/form-kemajuan-personel-uraian", formKemajuanPersonelUraianRoutes);

app.use("/api/form-pengendalian-pi", formPengendalianPiRoutes);
app.use("/api/form-pengendalian-pi/uraian-pi", uraianPIRoutes);
app.use("/api/form-pengendalian-pi/uraian-gate", uraianGateRoutes);

app.use("/api/laporan-patroli-random-master", laporanPatroliRandomMasterRoutes);
app.use("/api/laporan-patroli-random-master/laporan-patroli-random-uraian", laporanPatroliRandomUraianRoutes);

app.use("/api/laporan-terminal-kargo-master", laporanTerminalKargoMasterRoutes);
app.use("/api/laporan-terminal-kargo-master/laporan-terminal-kargo-uraian", laporanTerminalKargoUraianRoutes);

app.use("/api/logbook-senjata-api-dan-peluru", logbookSenjataApiDanPeluruRoutes);

app.use("/api/logbook-ra-master", logbookRaMasterRoutes);
app.use("/api/logbook-ra-master/logbook-ra-uraian", logbookRaUraianRoutes);

app.use("/api/patrol-darat-uraian", patrolDaratUraianRoutes);
app.use("/api/patroli_darat-uraian/patroli-darat-master", patroliDaratMasterRoutes);

app.use("/api/patroli-udara-master", patroliUdaraMasterRoutes);
app.use("/api/patroli-udara-master/patrol-udara-uraian", patrolUdaraUraianRoutes);

app.use("/api/penggunaan-smart-door-boarding", penggunaanSmartDoorBoardingRoutes);

app.use("/api/penyisiran-ruang-tunggu-master", penyisiranRuangTungguMasterRoutes);
app.use("/api/penyisiran-ruang-tunggu-master/checklist-penyisiran", checklistPenyisiranRoutes);

app.use("/api/penitipan-senjata-api-selain-penumpang", penitipanSenjataApiSelainPenumpangRoutes);

app.use("/api/random-check-etd", randomCheckEtdRoutes);

app.use("/api/rekonsiliasi-bagasi", rekonsiliasiBagasiRoutes);

// Rotasi Personel Master
app.use("/api/rotasi-personel-master", rotasiPersonelMasterRoutes);
app.use("/api/rotasi-personel-master/rotasi-personel-uraian", rotasiPersonelUraianRoutes);

// Suspicious Master
app.use("/api/suspicious-master", suspiciousMasterRoutes);
app.use("/api/suspicious-master/suspicious-uraian", suspiciousUraianRoutes);

// Logbook Harian Master
app.use("/api/logbook-harian-master", logbookHarianMasterRoutes);
app.use("/api/logbook-harian-master/uraian-inventaris", uraianInventarisRoutes);
app.use("/api/logbook-harian-master/uraian-tugas", uraianTugasRoutes);

// Walking Patrol
app.use("/api/walking-patrol-master", walkingPatrolMasterRoutes);
app.use("/api/walking-patrol-master/walking-patrol-checklist", walkingPatrolChecklistRoutes);

// Walking Patrol Non Terminal
app.use("/api/walking-patrol-non-terminal-master", walkingPatrolNonTerminalMasterRoutes);
app.use("/api/walking-patrol-non-terminal-master/walking-patrol-non-terminal-uraian", walkingPatrolNonTerminalUraianRoutes);

// Buku Pemeriksaan Manual
app.use("/api/buku-pemeriksaan-manual", bukuPemeriksaanManualRoutes);


// Root path
app.get("/", (req, res) => {
  res.json({ msg: "🌐 API Log Book Security aktif dan berjalan" });
});

// Start server
const startServer = async () => {
  try {
    await db.authenticate();
    console.log("✅ Database connected...");
    await db.sync({ alter: true }); // aktifkan jika ingin sync otomatis
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
};

startServer();

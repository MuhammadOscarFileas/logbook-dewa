import PDFDocument from "pdfkit";
import LogbookHarianMaster from "../models/logbook_harian_master.js";
import UraianTugas from "../models/uraian_tugas.js";
import UraianInventaris from "../models/uraian_inventaris.js";
import { Op } from "sequelize";

export const exportLogbookHarianMasterPDF = async (req, res) => {
  const { start, end } = req.query;
  try {
    const logbooks = await LogbookHarianMaster.findAll({
      where: {
        tanggal: { [Op.between]: [start, end] }
      },
      include: [
        { model: UraianTugas, as: "uraian_tugas_list" },
        { model: UraianInventaris, as: "uraian_inventaris_list" }
      ]
    });

    const doc = new PDFDocument({ margin: 30, size: "A4" });
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=logbook.pdf");
      res.send(pdfData);
    });


    logbooks.forEach((logbook, idx) => {
      doc.fontSize(12).text(`HARI / TANGGAL : ${logbook.tanggal}`);
      doc.text(`DINAS / SHIFT : ${logbook.shift}`);
      doc.moveDown(0.5);

      // Table header
      doc.font("Helvetica-Bold").text("NO", 50, doc.y, { continued: true })
        .text("JAM", 100, doc.y, { continued: true })
        .text("URAIAN TUGAS", 150, doc.y, { continued: true })
        .text("KETERANGAN", 400, doc.y);
      doc.font("Helvetica");

      // Uraian Tugas rows
      (logbook.uraian_tugas_list || []).forEach((uraian, i) => {
        doc.text(i + 1, 50, doc.y, { continued: true })
          .text(uraian.jam_mulai || "-", 100, doc.y, { continued: true })
          .text(uraian.uraian_tugas, 150, doc.y, { continued: true })
          .text(uraian.keterangan || "-", 400, doc.y);
      });

      doc.moveDown(1);
      doc.font("Helvetica-Bold").text("Inventaris:");
      doc.font("Helvetica");
      // Uraian Inventaris rows
      (logbook.uraian_inventaris_list || []).forEach((inv, i) => {
        doc.text(`${i + 1}. ${inv.nama_inventaris} (${inv.jumlah})`, { indent: 50 });
      });


      // Signature section
      doc.moveDown(2);
      doc.font("Helvetica-Bold").text("Tanda Tangan:");
      doc.moveDown(1);
      const y = doc.y;
      doc.font("Helvetica").text("Pembuat", 50, y, { continued: true })
        .text("Penerima", 250, y, { continued: true })
        .text("Supervisor", 400, y);


      // Draw signatures as images if available
      const sigHeight = 50, sigWidth = 120;
      doc.moveDown(1);
      const sigY = doc.y;
      // Pembuat
      if (logbook.ttd_yg_menyerahkan) {
        try {
          const img = logbook.ttd_yg_menyerahkan.replace(/^data:image\/png;base64,/, "");
          doc.image(Buffer.from(img, "base64"), 50, sigY, { width: sigWidth, height: sigHeight });
        } catch {}
      } else {
        doc.font("Helvetica").text("(..................)", 50, sigY, { continued: true });
      }
      // Penerima
      if (logbook.ttd_yg_menerima) {
        try {
          const img = logbook.ttd_yg_menerima.replace(/^data:image\/png;base64,/, "");
          doc.image(Buffer.from(img, "base64"), 250, sigY, { width: sigWidth, height: sigHeight });
        } catch {}
      } else {
        doc.font("Helvetica").text("(..................)", 250, sigY, { continued: true });
      }
      // Supervisor
      if (logbook.ttd_supervisor) {
        try {
          const img = logbook.ttd_supervisor.replace(/^data:image\/png;base64,/, "");
          doc.image(Buffer.from(img, "base64"), 400, sigY, { width: sigWidth, height: sigHeight });
        } catch {}
      } else {
        doc.font("Helvetica").text("(..................)", 400, sigY);
      }

      // Show names below each signature
      doc.moveDown(1.2);
      doc.fontSize(10);
      doc.text(logbook.nama_yg_menyerahkan || "", 50, doc.y, { continued: true });
      doc.text(logbook.nama_yg_menerima || "", 250, doc.y, { continued: true });
      doc.text(logbook.nama_supervisor || "", 400, doc.y);

      doc.moveDown(2);

      doc.addPage();
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

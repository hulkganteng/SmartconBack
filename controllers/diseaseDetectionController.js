const FormData = require("form-data");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const db = require("../models/db");

const detectDisease = async (req, res) => {
  try {
    // Pastikan file ada
    if (!req.file) {
      return res.status(400).json({ message: "Gambar tidak ditemukan" });
    }

    // Path file gambar yang diupload
    const imagePath = fs.createReadStream(req.file.path);

    const formdata = new FormData();

    formdata.append('file', imagePath);

    // Kirim gambar ke API AI untuk deteksi penyakit
    const response = await axios.post(process.env.AI_API_URL, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    const result = response.data;  // Hasil deteksi penyakit dari API

    // Pastikan status dari API tidak null
    if (!result.predicted_class) {
      return res.status(500).json({ message: "Status penyakit tidak ditemukan dari API" });
    }

    // Simpan hasil deteksi ke database
    const query = `
      INSERT INTO history (image, status, predicted_class, confidence, handling_tip, date)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    db.query(query, [
      req.file.filename,
      result.predicted_class,  // status
      result.predicted_class,  // predicted_class
      result.confidence,       // confidence
      JSON.stringify(result.handling_tip.tips) // Convert handling_tip array to string
    ], (err, dbResult) => {
      if (err) {
        console.error("Error saving to database:", err);
        return res.status(500).json({ message: "Gagal menyimpan ke database" });
      }

      // Kirim respons hasil deteksi ke frontend setelah berhasil menyimpan
      res.status(200).json({
        message: "Deteksi berhasil",
        status: result.predicted_class,
        confidence: result.confidence,
        tips: result.handling_tip.tips,
        image: `/uploads/detection/${req.file.filename}`,
      });
    });

  } catch (error) {
    console.error("Error detecting disease:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat memproses gambar." });
  }
};

module.exports = { detectDisease };

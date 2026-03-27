const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

// ✅ Middleware cek token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token tidak ditemukan, silakan login" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Token tidak valid, silakan login ulang" });
  }
};

// ✅ POST /api/auth/login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username dan password wajib diisi" });
    }

    const [rows] = await db.query("SELECT * FROM admins WHERE username = ?", [
      username,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    const admin = rows[0];
    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, nama: admin.nama },
      JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.json({
      message: "Login berhasil",
      token,
      admin: { id: admin.id, username: admin.username, nama: admin.nama },
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
});

// ✅ GET /api/contacts (protected)
app.get("/api/contacts", authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM contacts ORDER BY created_at DESC",
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data", error });
  }
});

// ✅ POST /api/contacts (public)
app.post("/api/contacts", async (req, res) => {
  try {
    const { nama, email, telepon, pesan } = req.body;

    if (!nama || !email) {
      return res.status(400).json({ message: "Nama dan email wajib diisi" });
    }

    const [result] = await db.query(
      "INSERT INTO contacts (nama, email, telepon, pesan) VALUES (?, ?, ?, ?)",
      [nama, email, telepon, pesan],
    );

    res.status(201).json({
      message: "Data berhasil disimpan",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal menyimpan data", error });
  }
});

// ✅ DELETE /api/contacts/:id (protected)
app.delete("/api/contacts/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM contacts WHERE id = ?", [id]);
    res.json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus data", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

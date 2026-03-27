const db = require("../db");

async function migrate() {
  try {
    console.log("⏳ Menjalankan migrasi...");

    await db.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        telepon VARCHAR(20),
        pesan TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Tabel contacts berhasil dibuat!");

    await db.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        nama VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Tabel admins berhasil dibuat!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Migrasi gagal:", error);
    process.exit(1);
  }
}

migrate();

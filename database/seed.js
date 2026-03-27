const db = require("../db");
const bcrypt = require("bcryptjs");

const dummyContacts = [
  {
    nama: "Budi Santoso",
    email: "budi@gmail.com",
    telepon: "081234567890",
    pesan:
      "Halo, saya tertarik dengan layanan web development kalian. Bisa minta info lebih lanjut?",
  },
  {
    nama: "Siti Rahayu",
    email: "siti@yahoo.com",
    telepon: "082345678901",
    pesan:
      "Saya ingin konsultasi tentang pembuatan aplikasi mobile untuk bisnis saya.",
  },
  {
    nama: "Ahmad Fauzi",
    email: "ahmad@outlook.com",
    telepon: "083456789012",
    pesan: "Apakah kalian menerima proyek desain UI/UX untuk startup?",
  },
  {
    nama: "Dewi Lestari",
    email: "dewi@gmail.com",
    telepon: "084567890123",
    pesan: "Saya butuh bantuan untuk digital marketing produk UMKM saya.",
  },
  {
    nama: "Rizky Pratama",
    email: "rizky@gmail.com",
    telepon: "085678901234",
    pesan: "Berapa biaya untuk membuat website company profile seperti ini?",
  },
  {
    nama: "Nurul Hidayah",
    email: "nurul@hotmail.com",
    telepon: "086789012345",
    pesan: "Apakah kalian bisa bantu maintenance website yang sudah ada?",
  },
  {
    nama: "Doni Kurniawan",
    email: "doni@gmail.com",
    telepon: "087890123456",
    pesan:
      "Kami dari perusahaan manufaktur ingin digitalisasi sistem inventory kami.",
  },
  {
    nama: "Fitri Anggraini",
    email: "fitri@gmail.com",
    telepon: "088901234567",
    pesan:
      "Apakah ada paket bundling untuk web development dan digital marketing?",
  },
  {
    nama: "Hendra Wijaya",
    email: "hendra@gmail.com",
    telepon: "089012345678",
    pesan: "Saya ingin membuat toko online untuk produk fashion lokal saya.",
  },
  {
    nama: "Rina Susanti",
    email: "rina@yahoo.com",
    telepon: "081123456789",
    pesan: "Apakah kalian bisa bantu optimasi SEO website saya yang sudah ada?",
  },
  {
    nama: "Bagas Prasetyo",
    email: "bagas@gmail.com",
    telepon: "082234567890",
    pesan:
      "Saya butuh sistem manajemen karyawan berbasis web untuk perusahaan kecil.",
  },
  {
    nama: "Maya Kusuma",
    email: "maya@outlook.com",
    telepon: "083345678901",
    pesan:
      "Tertarik dengan jasa pembuatan landing page untuk produk baru kami.",
  },
  {
    nama: "Fajar Nugroho",
    email: "fajar@gmail.com",
    telepon: "084456789012",
    pesan:
      "Apakah kalian bisa integrasi payment gateway ke website yang sudah ada?",
  },
  {
    nama: "Laila Fitriani",
    email: "laila@yahoo.com",
    telepon: "085567890123",
    pesan:
      "Saya ingin konsultasi tentang pengembangan aplikasi kasir berbasis web.",
  },
  {
    nama: "Eko Budiyanto",
    email: "eko@gmail.com",
    telepon: "086678901234",
    pesan: "Butuh website untuk portofolio arsitek, apakah kalian bisa bantu?",
  },
  {
    nama: "Wulandari",
    email: "wulan@hotmail.com",
    telepon: "087789012345",
    pesan:
      "Saya tertarik paket social media management, bisa minta detail harganya?",
  },
  {
    nama: "Gilang Ramadhan",
    email: "gilang@gmail.com",
    telepon: "088890123456",
    pesan:
      "Apakah kalian bisa bantu migrasi website lama ke teknologi yang lebih modern?",
  },
  {
    nama: "Putri Amalia",
    email: "putri@gmail.com",
    telepon: "089901234567",
    pesan: "Saya butuh sistem booking online untuk salon kecantikan saya.",
  },
  {
    nama: "Rendra Saputra",
    email: "rendra@yahoo.com",
    telepon: "081098765432",
    pesan:
      "Ingin tanya apakah kalian menyediakan jasa pembuatan company profile video?",
  },
  {
    nama: "Anisa Permata",
    email: "anisa@gmail.com",
    telepon: "082109876543",
    pesan:
      "Kami dari yayasan pendidikan butuh website donasi online, bisa dibantu?",
  },
];

const dummyAdmins = [
  {
    username: "admin",
    password: "admin123",
    nama: "Super Admin",
  },
  {
    username: "manager",
    password: "manager123",
    nama: "Manager",
  },
];

async function seed() {
  try {
    console.log("⏳ Menjalankan seeder...");

    // Seed contacts
    await db.query("TRUNCATE TABLE contacts");
    console.log("🗑️  Tabel contacts dikosongkan");

    for (const data of dummyContacts) {
      await db.query(
        "INSERT INTO contacts (nama, email, telepon, pesan) VALUES (?, ?, ?, ?)",
        [data.nama, data.email, data.telepon, data.pesan],
      );
      console.log(`✅ Contact "${data.nama}" ditambahkan`);
    }

    // Seed admins
    await db.query("TRUNCATE TABLE admins");
    console.log("🗑️  Tabel admins dikosongkan");

    for (const admin of dummyAdmins) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      await db.query(
        "INSERT INTO admins (username, password, nama) VALUES (?, ?, ?)",
        [admin.username, hashedPassword, admin.nama],
      );
      console.log(`✅ Admin "${admin.username}" ditambahkan`);
    }

    console.log("\n🎉 Seeder selesai!");
    console.log("👤 Admin accounts:");
    console.log("   username: admin    | password: admin123");
    console.log("   username: manager  | password: manager123");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder gagal:", error);
    process.exit(1);
  }
}

seed();

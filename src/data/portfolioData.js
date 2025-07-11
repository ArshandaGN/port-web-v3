import ikon1 from '../assets/ikon1.png';
import arshan1 from '../assets/arshan1.png';

// --- Data for Portfolio (Static) ---

export const portfolioData = {
  profile: {
    name: "Arshanda",
    shortProfile: "Mahasiswa semester 6 Jurusan Ilmu Komputer di Universitas Pertamina dengan minat besar di bidang Data Analysis, UI/UX Design, dan Front-End Development. Terampil menggunakan Python, Flutter, Figma, dan Laravel, serta berpengalaman dalam proyek klasifikasi citra, pengembangan aplikasi mobile/web, dan visualisasi data. Aktif dalam organisasi, adaptif, komunikatif, dan memiliki semangat belajar yang tinggi. Selalu antusias untuk mempelajari teknologi baru dan mengembangkan solusi yang inovatif dan aplikatif.",
    homeDescription: "Selamat datang di portofolio saya! Saya Arshanda, seorang mahasiswa Ilmu Komputer yang bersemangat dalam pengembangan web dan teknologi. Di sini, Anda dapat melihat karya dan proyek yang telah saya buat. Mari terhubung dan berkolaborasi!",
    role: "Data Analyst | UI/UX Design| Front-End Developer", // Updated role
    personalImage1: ikon1, 
    personalImage2: arshan1,// Placeholder image
    cvLink: "https://drive.google.com/file/d/1yJCpgLt199NoA-qVnx4up9e0DvY08opo/view?usp=sharing", // REPLACE WITH YOUR ACTUAL GOOGLE DRIVE CV LINK
  },
  // Education section removed as per user request
  skills: {
    technical: [
      { name: "Python", icon: "Code" },
      { name: "Flutter", icon: "Code" },
      { name: "Figma", icon: "Code" },
      { name: "Laravel", icon: "Code" },
      { name: "C++", icon: "Code" },
      { name: "Java", icon: "Code" },
      { name: "CSS", icon: "Code" },
      { name: "HTML", icon: "Code" },
      { name: "Spreadsheets", icon: "Code" },
      { name: "AppSheet", icon: "Code" },
      { name: "Looker Studio", icon: "Code" },
      { name: "Canva", icon: "Code" },
      { name: "Capcut", icon: "Code" },
    ],
    interpersonal: [
      "Kemampuan Problem Solving dan Berpikir Analitis",
      "Komunikasi, Ketelitian, dan Kerapihan",
      "Bekerja dengan tim maupun individu",
      "Bahasa Indonesia (Lanjutan)",
      "Bahasa Inggris (Dasar)"
    ]
  },
  experiences: [ // Combined and structured for easier rendering
    {
      type: "Organisasi",
      title: "Bendahara Umum 1",
      organization: "HIMPUNAN MAHASISWA ILMU KOMPUTER (HMIK)",
      years: "2024 – Sekarang",
      description: [
        "Mengelola pencatatan keuangan organisasi secara terstruktur dan akurat menggunakan Google Spreadsheet sebagai basis data keuangan.",
        "Membuat dashboard keuangan interaktif menggunakan Looker Studio yang menampilkan pencatatan dana kegiatan, kas himpunan, serta laporan pemasukan dan pengeluaran secara berkala.",
        "Mengembangkan sistem monitoring kas menggunakan AppSheet terintegrasi dengan Spreadsheet untuk memudahkan pengurus dalam memantau saldo dan transaksi secara real-time.",
        "Berkoordinasi dengan pengurus terkait dalam penyusunan Rencana Anggaran Biaya (RAB) dan memastikan alur penggunaan dana sesuai prosedur secara transparan."
      ]
    },
    {
      type: "Kepemimpinan & Kepanitiaan",
      title: "Mentor",
      organization: "Pekan Orientasi dan Pengenalan Universitas Pertamina (POP UP) 2024",
      years: "September 2024 – Desember 2024",
      description: [
        "Membimbing mahasiswa baru dalam mengenal budaya kampus, tata tertib, serta kegiatan akademik dan non-akademik.",
        "Memimpin tour kampus bersama fasilitator, serta memberikan arahan dan dukungan selama masa orientasi selama 7 hari.",
        "Menjadi penghubung antara peserta dan panitia dalam menyampaikan informasi penting selama acara berlangsung."
      ]
    },
    {
      type: "Kepemimpinan & Kepanitiaan",
      title: "Ketua Divisi Acara Teknis",
      organization: "Computer and IT Event Universitas Pertamina (CITE UP) 2024",
      years: "Maret 2024 – September 2024",
      description: [
        "Merancang dan mengeksekusi konsep seminar serta talkshow bertema teknologi dengan menghadirkan Milea Lab sebagai narasumber utama.",
        "Mengoordinasikan jadwal, rundown, dan teknis acara lintas divisi untuk memastikan kelancaran keseluruhan kegiatan.",
        "Berhasil menarik 262 partisipan dari berbagai kalangan sebagai bentuk keberhasilan exposure kampus melalui event CITE UP."
      ]
    },
    {
      type: "Kepemimpinan & Kepanitiaan",
      title: "Asisten Dosen",
      organization: "Pengabdian Masyarakat Data Sains SMAS SMART Ekselensia Indonesia",
      years: "Juli 2024",
      description: [
        "Membantu dosen dalam menyiapkan materi pengajaran dasar pemrograman Python.",
        "Membuat dan memandu ice breaking interaktif untuk menjaga fokus dan semangat belajar siswa.",
        "Mendampingi peserta dalam praktik langsung menulis kode Python sederhana seperti operasi dasar, percabangan, dan perulangan."
      ]
    },
    {
      type: "Kepemimpinan & Kepanitiaan",
      title: "Staff Acara Teknis",
      organization: "INTERNATIONAL SPACE-UP EMERGING FORUM (ISEF) 2024",
      years: "Desember 2023 – Maret 2024",
      description: [
        "Menyiapkan teknis pelaksanaan forum berskala nasional, termasuk rundown, logistik, dan koordinasi dengan narasumber seperti Sadam Permana, perwakilan Kedutaan Besar, serta Kementerian Pemuda dan Olahraga (Kemenpora).",
        "Mendukung kelancaran jalannya seminar dan diskusi panel yang diikuti oleh lebih dari 500 peserta dari berbagai institusi.",
        "Mengelola kebutuhan alat dan sarana pendukung teknis, serta memastikan kesiapan ruangan, konektivitas, dan kelengkapan media acara."
      ]
    }
  ].sort((a, b) => { // Sort by year (descending) for display
    const yearA = parseInt(a.years.split('–')[0].trim().split(' ')[a.years.split('–')[0].trim().split(' ').length - 1]);
    const yearB = parseInt(b.years.split('–')[0].trim().split(' ')[b.years.split('–')[0].trim().split(' ').length - 1]);
    return yearB - yearA;
  })
};
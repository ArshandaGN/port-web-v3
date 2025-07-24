import ikon1 from '../assets/ikon1.png';
import arshan1 from '../assets/arshan1.png';
import C from '../assets/c.png';
import Canva from '../assets/canva.png';
import Capcut from '../assets/capcut.png';
import CSS from '../assets/css-3.png';
import Github from '../assets/github.png';
import html from '../assets/html.png';
import Java from '../assets/java.png';
import LookerStudio from '../assets/LookerStudio.png';
import Python from '../assets/python.png';
import Spreadsheets from '../assets/Spreadsheets.png';
import AppSheet from '../assets/AppSheets.png';
import JavaScript from '../assets/JavaScript.png';
import Figma from '../assets/figma.png';
import project_cnn from '../assets/project_cnn.png';
import project_Halallens from '../assets/project_Halallens.png';
import project_nexor from '../assets/project_nexor.png';
import project_kwn from '../assets/project_kwn.png';
import sertifcpp from '../assets/Sertif_C++.jpg';
import project_quis from '../assets/project_quiz.png';
import project_mac from '../assets/project_mac.png';

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
    technical: {
      dataTools: [
        { name: "Python", icon: Python, url: "https://www.python.org/" },
        { name: "Spreadsheets", icon: Spreadsheets, url: "https://www.google.com/sheets/about/" },
        { name: "AppSheet", icon: AppSheet, url: "https://www.appsheet.com/" },
        { name: "Looker Studio", icon: LookerStudio, url: "https://lookerstudio.google.com/" },
      ],
      designTools: [
        { name: "Figma", icon: Figma, url: "https://www.figma.com/" },
        { name: "Canva", icon: Canva, url: "https://www.canva.com/" },
        { name: "Capcut", icon: Capcut, url: "https://www.capcut.com/" },
      ],
      programming: [
        { name: "HTML", icon: html, url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { name: "CSS", icon: CSS, url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { name: "JavaScript", icon: JavaScript, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "C++", icon: C, url: "https://isocpp.org/" },
        { name: "Java", icon: Java, url: "https://www.java.com/" },
        { name: "Github", icon: Github, url: "https://github.com/" },
      ],
    },
  interpersonal: [
      {
        title: "Problem Solving",
        desc: "Mampu menganalisis dan menyelesaikan permasalahan dengan pendekatan logis dan efisien.",
      },
      {
        title: "Komunikatif",
        desc: "Terbiasa menyampaikan ide dan bekerja sama dalam tim lintas disiplin.",
      },
      {
        title: "Teliti & Rapi",
        desc: "Selalu menjaga kualitas dan kerapihan dalam setiap pekerjaan yang dilakukan.",
      },
      {
        title: "Bahasa",
        desc: "Menguasai Bahasa Indonesia (lanjutan) dan Bahasa Inggris (dasar).",
      },
      {
        title: "Adaptif",
        desc: "Cepat belajar dan beradaptasi dengan tools dan teknologi baru.",
      },
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
  }),

 projects: [
  {
    id: 1,
    title: "Klasifikasi Gambar Sampah Menggunakan CNN",
    description:
      "Sebuah proyek analisis data berbasis Computer Vision untuk mengklasifikasikan jenis sampah menggunakan dataset TrashNet. Proyek ini membandingkan performa tiga arsitektur CNN yaitu VGG19, ResNet50, dan EfficientNetB0. Pengujian dilakukan dalam lingkungan Jupyter Notebook menggunakan TensorFlow dan Keras. Proyek ini juga dilengkapi dengan manual book dan paper ilmiah.",
    techStack: ["Python", "Jupyter", "TensorFlow", "CNN", "TrashNet"],
    github: "https://github.com/ArshandaGN/cnn-comparison-trashnet-UAS-ML.git",
    link: "", // Tidak ada link demo
    category: "Machine Learning",
    img: project_cnn, // ganti nanti dengan gambar aktual
  },
  {
    id: 2,
    title: "Desain UI/UX Aplikasi Mobile",
    description:
      "Kumpulan desain antarmuka aplikasi mobile menggunakan Figma, termasuk wireframe, user flow, dan prototipe interaktif. Desain mencakup halaman utama, fitur login, navigasi, dan halaman produk. Desain ini dibuat berdasarkan prinsip-prinsip UX seperti kemudahan penggunaan, konsistensi, dan visual hierarchy.",
    techStack: ["Figma", "UI/UX", "Prototyping"],
    github: "", // jika ada figma file public, bisa disisipkan
    link: "https://www.figma.com/proto/PVRAy6wONCIbVHNu4ptgSV/Slytherin?page-id=563%3A255&node-id=578-17&viewport=3355%2C-6154%2C0.41&t=YbPgzYrFeWn6S506-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=578%3A17&show-proto-sidebar=1", // jika nanti punya link demo atau figma public
    category: "UI/UX",
    img: project_Halallens, // placeholder
  },
  {
    id: 3,
    title: "Dashboard Keuangan Himpunan Mahasiswa",
    description:
      "Dashboard interaktif berbasis Google Looker Studio untuk memvisualisasikan data keuangan Himpunan Mahasiswa Ilmu Komputer. Menampilkan laporan kas masuk, kas keluar, dan saldo real-time berdasarkan input spreadsheet. Digunakan sebagai alat bantu transparansi pengelolaan dana organisasi.",
    techStack: ["Looker Studio", "Google Spreadsheet", "Data Visualization"],
    github: "", // bukan project kode
    link: "https://lookerstudio.google.com/reporting/6b277e53-e918-4af2-b8d3-f956a5b1d2f5",
    category: "Data Visualization",
    img: project_nexor, // placeholder image dashboard
  },
  {
    id: 4,
    title: "Video Editing: Tugas Kelas CapCut",
    description:
      "Sebuah video yang diedit menggunakan CapCut untuk tugas kelas. Proses editing mencakup pemotongan video, penambahan transisi, audio latar, dan subtitle untuk meningkatkan pengalaman menonton. Proyek ini menunjukkan kemampuan dasar dalam pengeditan video menggunakan tools intuitif.",
    techStack: ["CapCut", "Video Editing"],
    github: "",
    link: "https://www.youtube.com/watch?v=tfikt73qMdQ", // YouTube video
    category: "Multimedia",
    img: project_kwn, // placeholder thumbnail
  },
  {
    id: 5,
    title: "Website App-Quiz",
    description:
      "Sebuah aplikasi kuis berbasis web yang dibangun menggunakan HTML, Tailwind CSS, dan JavaScript. Aplikasi ini memiliki fitur validasi nama pengguna, sistem skor berdasarkan level (mudah, sedang, sulit), timer soal, penyimpanan skor dengan localStorage, serta leaderboard interaktif. Aplikasi dirancang untuk pengguna anak-anak dengan antarmuka yang menarik dan ramah pengguna.",
    techStack: ["HTML", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/ArshandaGN/App-Quiz.git", // isi dengan link GitHub jika tersedia
    link: "https://app-quiz-two.vercel.app/", // sesuaikan jika sudah dideploy ke Vercel atau lainnya
    category: "Web",
    img: project_quis, // placeholder, sesuaikan dengan nama asset gambar yang kamu pakai
},

  {
  id: 6,
  title: "Website Company Profile Mama Ajeng Cookies & Cake",
  description:
    "Sebuah website statis untuk mempromosikan usaha rumahan Mama Ajeng Cookies & Cake. Dibuat menggunakan HTML, CSS, dan JavaScript, website ini menampilkan informasi usaha, galeri produk, layanan, serta form feedback yang langsung terhubung ke WhatsApp pemilik usaha. Proyek ini bertujuan membantu UMKM tampil profesional secara digital.",
  techStack: ["HTML", "CSS", "JavaScript"],
  github: "https://github.com/ArshandaGN/Compro_MAC.git", // ganti kalau repo beda
  link: "https://compro-mac.vercel.app/", // bisa diisi kalau nanti upload ke Netlify/Vercel
  category: "Web",
  img: project_mac, // ganti dengan nama gambar di assets (misal: project_MAC.jpg/png)
},

],


  certificates: [
    {
      id: 1,
      title: "C++ Dasar - Skilvul",
      img: sertifcpp, // nanti kamu ubah dari PDF ke PNG
      link: "https://skilvul.com/courses/c-plus-plus-dasar/student/clwmgqpkf01px01msojb403w1/",
    },
  ],

};
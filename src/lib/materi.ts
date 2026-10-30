export type Jurnal = { akun: string; debit?: number; kredit?: number }[];
export type Materi = {
  slug: string;
  icon: string;
  title: string;
  summary: string;
  points: string[];
  rumus?: string;
  ilustrasi?: string;
  contoh?: { soal: string; jawab: string; jurnal: Jurnal };
};

export const MATERI: Materi[] = [
  {
    slug: "pengertian",
    icon: "📘",
    title: "Pengertian & Tujuan Jurnal Penyesuaian",
    summary: "Jurnal yang dibuat di akhir periode agar saldo akun menunjukkan jumlah yang sebenarnya.",
    points: [
      "Jurnal penyesuaian (adjusting entries) dibuat pada akhir periode akuntansi, sebelum laporan keuangan disusun.",
      "Dasarnya adalah prinsip akrual: pendapatan dicatat saat diperoleh dan beban dicatat saat terjadi, bukan saat kas diterima/dibayar.",
      "Tujuan: menyajikan saldo akun aset, liabilitas, pendapatan, dan beban yang sesuai keadaan sebenarnya.",
      "Tujuan lain: menerapkan konsep penandingan (matching) antara pendapatan dan beban pada periode yang sama.",
    ],
  },
  {
    slug: "akun",
    icon: "🗂️",
    title: "Akun-Akun yang Memerlukan Penyesuaian",
    summary: "Kelompok akun yang saldonya sering belum sesuai di akhir periode.",
    points: [
      "Deferral (penangguhan): beban dibayar di muka dan pendapatan diterima di muka.",
      "Accrual (akrual): beban yang masih harus dibayar dan pendapatan yang masih harus diterima.",
      "Estimasi: penyusutan aset tetap.",
      "Lainnya: pemakaian perlengkapan dan penyesuaian persediaan barang dagang.",
    ],
  },
  {
    slug: "beban-dimuka",
    icon: "🏠",
    title: "Beban Dibayar di Muka",
    summary: "Beban yang sudah dibayar tetapi manfaatnya belum digunakan seluruhnya.",
    points: [
      "Contoh: sewa, asuransi, iklan yang dibayar untuk beberapa bulan ke depan.",
      "Jika saat bayar dicatat sebagai aset (Sewa Dibayar di Muka), penyesuaian mencatat bagian yang sudah terpakai sebagai beban.",
    ],
    rumus: "Beban terpakai = (Total pembayaran ÷ Jumlah bulan) × Bulan yang sudah lewat",
    ilustrasi: "1 Oktober bayar sewa toko 12 bulan. Pada 31 Desember, 3 bulan sudah dipakai.",
    contoh: {
      soal: "1 Oktober 2026 dibayar sewa Rp12.000.000 untuk 12 bulan (dicatat sebagai Sewa Dibayar di Muka). Buat penyesuaian 31 Desember 2026.",
      jawab: "Rp12.000.000 ÷ 12 × 3 bulan = Rp3.000.000",
      jurnal: [
        { akun: "Beban Sewa", debit: 3000000 },
        { akun: "Sewa Dibayar di Muka", kredit: 3000000 },
      ],
    },
  },
  {
    slug: "pendapatan-dimuka",
    icon: "💌",
    title: "Pendapatan Diterima di Muka",
    summary: "Uang sudah diterima, tetapi jasa/barang belum diserahkan seluruhnya.",
    points: [
      "Saat menerima uang dicatat sebagai liabilitas (Pendapatan Diterima di Muka).",
      "Penyesuaian memindahkan bagian yang sudah menjadi hak perusahaan ke akun pendapatan.",
    ],
    rumus: "Pendapatan diakui = (Total diterima ÷ Jumlah bulan) × Bulan yang sudah lewat",
    ilustrasi: "1 September menerima sewa 6 bulan dari penyewa. Pada 31 Desember, 4 bulan sudah berjalan.",
    contoh: {
      soal: "1 September 2026 diterima sewa Rp6.000.000 untuk 6 bulan (dicatat sebagai Sewa Diterima di Muka). Buat penyesuaian 31 Desember.",
      jawab: "Rp6.000.000 ÷ 6 × 4 bulan = Rp4.000.000",
      jurnal: [
        { akun: "Sewa Diterima di Muka", debit: 4000000 },
        { akun: "Pendapatan Sewa", kredit: 4000000 },
      ],
    },
  },
  {
    slug: "beban-terutang",
    icon: "⏳",
    title: "Beban yang Masih Harus Dibayar",
    summary: "Beban sudah terjadi tetapi belum dibayar dan belum dicatat.",
    points: [
      "Contoh: gaji karyawan, bunga pinjaman, listrik yang belum dibayar di akhir periode.",
      "Penyesuaian mengakui beban dan utangnya.",
    ],
    rumus: "Beban terutang = Tarif per hari/bulan × Jumlah hari/bulan yang belum dibayar",
    ilustrasi: "Gaji dibayar tiap Jumat. Tanggal 29–31 Desember karyawan sudah bekerja, tetapi gaji baru dibayar Januari.",
    contoh: {
      soal: "Gaji karyawan Rp500.000 per hari. Gaji 3 hari terakhir Desember belum dibayar. Buat penyesuaian.",
      jawab: "Rp500.000 × 3 hari = Rp1.500.000",
      jurnal: [
        { akun: "Beban Gaji", debit: 1500000 },
        { akun: "Utang Gaji", kredit: 1500000 },
      ],
    },
  },
  {
    slug: "pendapatan-akrual",
    icon: "🌱",
    title: "Pendapatan yang Masih Harus Diterima",
    summary: "Pendapatan sudah menjadi hak perusahaan tetapi uangnya belum diterima.",
    points: [
      "Contoh: bunga piutang, jasa yang sudah selesai tetapi belum ditagih.",
      "Penyesuaian mengakui piutang dan pendapatannya.",
    ],
    rumus: "Bunga = Pokok × Tarif bunga per tahun × (Bulan berjalan ÷ 12)",
    ilustrasi: "Perusahaan memiliki piutang wesel berbunga. Bunga 3 bulan terakhir belum diterima.",
    contoh: {
      soal: "1 Oktober diterima wesel Rp10.000.000, bunga 12% per tahun, jatuh tempo 6 bulan. Buat penyesuaian 31 Desember.",
      jawab: "Rp10.000.000 × 12% × 3/12 = Rp300.000",
      jurnal: [
        { akun: "Piutang Bunga", debit: 300000 },
        { akun: "Pendapatan Bunga", kredit: 300000 },
      ],
    },
  },
  {
    slug: "penyusutan",
    icon: "🏭",
    title: "Penyusutan Aset Tetap",
    summary: "Alokasi harga perolehan aset tetap menjadi beban selama umur manfaatnya.",
    points: [
      "Berlaku untuk aset tetap seperti peralatan, kendaraan, dan gedung (tanah tidak disusutkan).",
      "Metode yang paling sederhana adalah garis lurus.",
      "Akumulasi penyusutan adalah akun kontra aset (mengurangi nilai aset).",
    ],
    rumus: "Penyusutan per tahun = (Harga perolehan − Nilai residu) ÷ Umur ekonomis",
    ilustrasi: "Peralatan dibeli 1 April, sehingga tahun pertama hanya disusutkan 9 bulan.",
    contoh: {
      soal: "1 April 2026 dibeli peralatan Rp50.000.000, nilai residu Rp5.000.000, umur 5 tahun. Hitung penyusutan 31 Desember 2026.",
      jawab: "(Rp50.000.000 − Rp5.000.000) ÷ 5 × 9/12 = Rp6.750.000",
      jurnal: [
        { akun: "Beban Penyusutan Peralatan", debit: 6750000 },
        { akun: "Akumulasi Penyusutan Peralatan", kredit: 6750000 },
      ],
    },
  },
  {
    slug: "perlengkapan",
    icon: "✏️",
    title: "Pemakaian Perlengkapan",
    summary: "Perlengkapan yang sudah terpakai selama periode diakui sebagai beban.",
    points: [
      "Pembelian perlengkapan biasanya dicatat sebagai aset (Perlengkapan).",
      "Di akhir periode dilakukan perhitungan fisik sisa perlengkapan.",
    ],
    rumus: "Perlengkapan terpakai = Saldo perlengkapan − Sisa perlengkapan (fisik)",
    ilustrasi: "Saldo perlengkapan kantor di neraca saldo Rp2.500.000, hasil hitung fisik tersisa Rp800.000.",
    contoh: {
      soal: "Saldo Perlengkapan Rp2.500.000. Sisa per 31 Desember Rp800.000. Buat penyesuaian.",
      jawab: "Rp2.500.000 − Rp800.000 = Rp1.700.000",
      jurnal: [
        { akun: "Beban Perlengkapan", debit: 1700000 },
        { akun: "Perlengkapan", kredit: 1700000 },
      ],
    },
  },
  {
    slug: "persediaan",
    icon: "📦",
    title: "Penyesuaian Persediaan Barang Dagang",
    summary: "Pada perusahaan dagang (metode periodik), persediaan awal ditutup dan persediaan akhir dicatat.",
    points: [
      "Pendekatan ikhtisar laba rugi: dua jurnal penyesuaian.",
      "Pertama, menghapus persediaan awal: Ikhtisar Laba Rugi (D) – Persediaan Barang Dagang (K).",
      "Kedua, mencatat persediaan akhir: Persediaan Barang Dagang (D) – Ikhtisar Laba Rugi (K).",
    ],
    rumus: "Gunakan nilai persediaan awal (neraca saldo) dan persediaan akhir (hasil hitung fisik)",
    ilustrasi: "Persediaan awal Rp15.000.000, hasil stock opname 31 Desember Rp18.000.000.",
    contoh: {
      soal: "Persediaan awal Rp15.000.000 dan persediaan akhir Rp18.000.000. Buat jurnal penyesuaian.",
      jawab: "Jurnal 1 menggunakan persediaan awal, jurnal 2 menggunakan persediaan akhir.",
      jurnal: [
        { akun: "Ikhtisar Laba Rugi", debit: 15000000 },
        { akun: "Persediaan Barang Dagang", kredit: 15000000 },
        { akun: "Persediaan Barang Dagang", debit: 18000000 },
        { akun: "Ikhtisar Laba Rugi", kredit: 18000000 },
      ],
    },
  },
];

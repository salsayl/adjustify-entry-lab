export type Jurnal = { akun: string; debit?: number; kredit?: number }[];

export type Materi = {
  slug: string;
  icon: string;
  title: string;
  summary: string;
  pengertian: string;
  tujuan: string[];
  karakteristik: string[];
  penjelasan: string;
  ilustrasi: string;
  rumus?: string;
  langkah: string[];
  analisis?: { debit: string; kredit: string; alasan: string };
  contoh?: { soal: string; jawab: string; jurnal: Jurnal };
  kesalahan: string[];
  rangkuman: string[];
  latihan: { soal: string; pembahasan: string };
};

export const MATERI: Materi[] = [
  {
    slug: "konsep-dasar",
    icon: "📘",
    title: "Bab 1 · Konsep Dasar Jurnal Penyesuaian",
    summary: "Apa itu jurnal penyesuaian, mengapa diperlukan, dan kapan dibuat.",
    pengertian:
      "Jurnal penyesuaian (adjusting entries) adalah jurnal yang dibuat pada akhir periode akuntansi untuk memperbarui saldo akun agar sesuai dengan keadaan yang sebenarnya, sebelum laporan keuangan disusun.",
    tujuan: [
      "Menyajikan saldo akun aset, liabilitas, pendapatan, dan beban sesuai keadaan sebenarnya di akhir periode.",
      "Menerapkan prinsip akrual: pendapatan dicatat saat diperoleh dan beban dicatat saat terjadi, bukan saat kas berpindah.",
      "Menandingkan (matching) pendapatan dengan beban pada periode yang sama agar laba rugi tidak salah.",
    ],
    karakteristik: [
      "Dibuat di akhir periode, setelah neraca saldo dan sebelum laporan keuangan.",
      "Selalu memengaruhi minimal satu akun neraca (aset/liabilitas) dan satu akun laba rugi (pendapatan/beban).",
      "Tidak pernah melibatkan akun Kas, karena kas sudah dicatat saat transaksi terjadi.",
    ],
    penjelasan:
      "Bayangkan kamu membayar sewa untuk setahun di bulan Oktober. Sampai Desember, sebagian sewa itu sudah benar-benar terpakai. Tanpa jurnal penyesuaian, laporan keuangan akan menganggap seluruh sewa masih berupa aset, padahal sebagian sudah menjadi beban. Jurnal penyesuaian memperbaiki hal seperti ini. Neraca saldo adalah daftar saldo sebelum penyesuaian; setelah disesuaikan, barulah laporan keuangan (laba rugi, perubahan ekuitas, neraca) disusun.",
    ilustrasi:
      "Perusahaan membayar sewa setahun di muka, menerima uang muka dari pelanggan, memiliki gaji yang belum dibayar, dan peralatan yang nilainya menyusut. Semua itu memerlukan penyesuaian di akhir periode.",
    langkah: [
      "Baca neraca saldo dan data penyesuaian di akhir periode.",
      "Tentukan akun apa yang saldonya belum sesuai keadaan sebenarnya.",
      "Hitung nominal penyesuaian dengan rumus yang sesuai jenis transaksinya.",
      "Tentukan akun debit dan kreditnya.",
      "Catat jurnal penyesuaian, lalu susun neraca saldo setelah penyesuaian.",
    ],
    kesalahan: [
      "Mengira jurnal penyesuaian boleh dicatat kapan saja — padahal hanya di akhir periode.",
      "Melibatkan akun Kas dalam jurnal penyesuaian.",
      "Langsung menyusun laporan keuangan dari neraca saldo tanpa penyesuaian.",
    ],
    rangkuman: [
      "Jurnal penyesuaian memperbarui saldo akun di akhir periode.",
      "Dasarnya prinsip akrual dan penandingan pendapatan-beban.",
      "Urutannya: neraca saldo → jurnal penyesuaian → neraca saldo disesuaikan → laporan keuangan.",
    ],
    latihan: {
      soal: "Mengapa jurnal penyesuaian tidak pernah melibatkan akun Kas?",
      pembahasan:
        "Karena setiap penerimaan dan pengeluaran kas sudah dicatat saat transaksi terjadi di jurnal umum. Jurnal penyesuaian hanya menyesuaikan pengakuan pendapatan dan beban yang waktunya berbeda dengan aliran kas.",
    },
  },
  {
    slug: "perlengkapan",
    icon: "✏️",
    title: "Bab 2 · Perlengkapan",
    summary: "Menghitung perlengkapan yang terpakai dan mencatatnya sebagai beban.",
    pengertian:
      "Perlengkapan (supplies) adalah barang habis pakai yang dipakai dalam kegiatan operasional, misalnya kertas, tinta, dan alat tulis. Saat dibeli, perlengkapan dicatat sebagai aset.",
    tujuan: [
      "Mengakui bagian perlengkapan yang sudah terpakai sebagai beban periode berjalan.",
      "Menampilkan sisa perlengkapan yang benar sebagai aset di neraca.",
    ],
    karakteristik: [
      "Dibeli tunai dan dicatat sebagai aset (Perlengkapan).",
      "Dipakai sedikit demi sedikit selama periode berjalan.",
      "Sisa di akhir periode diketahui lewat perhitungan fisik (stock opname).",
    ],
    penjelasan:
      "Kuncinya sederhana: yang sudah terpakai adalah beban, yang masih tersisa adalah aset. Karena pemakaian tidak dicatat setiap hari, di akhir periode kita hitung fisik sisanya. Selisih antara saldo di pembukuan dan sisa fisik itulah jumlah yang terpakai.",
    ilustrasi:
      "Toko ATK membeli perlengkapan sepanjang tahun. Di akhir Desember, karyawan menghitung sisa kertas dan tinta di gudang untuk mengetahui berapa yang sudah terpakai.",
    rumus: "Perlengkapan terpakai = Saldo perlengkapan (neraca saldo) − Sisa perlengkapan (hasil hitung fisik)",
    langkah: [
      "Catat saldo akun Perlengkapan dari neraca saldo.",
      "Hitung fisik sisa perlengkapan di akhir periode.",
      "Kurangkan: saldo − sisa = perlengkapan terpakai.",
      "Jurnal: Beban Perlengkapan (D) – Perlengkapan (K).",
    ],
    analisis: {
      debit: "Beban Perlengkapan",
      kredit: "Perlengkapan",
      alasan: "Pemakaian menambah beban (debit) dan mengurangi aset perlengkapan (kredit).",
    },
    contoh: {
      soal: "Saldo Perlengkapan di neraca saldo Rp2.500.000. Hasil hitung fisik per 31 Desember tersisa Rp800.000. Buat jurnal penyesuaian.",
      jawab: "Terpakai = Rp2.500.000 − Rp800.000 = Rp1.700.000",
      jurnal: [
        { akun: "Beban Perlengkapan", debit: 1700000 },
        { akun: "Perlengkapan", kredit: 1700000 },
      ],
    },
    kesalahan: [
      "Memakai sisa fisik (Rp800.000) sebagai nominal jurnal, padahal yang dijurnal adalah yang terpakai.",
      "Membalik posisi debit-kredit: mendebit Perlengkapan dan mengkredit Beban.",
    ],
    rangkuman: [
      "Perlengkapan terpakai = saldo − sisa fisik.",
      "Yang terpakai diakui sebagai Beban Perlengkapan.",
    ],
    latihan: {
      soal: "Saldo Perlengkapan Rp3.750.000, sisa fisik Rp1.250.000. Berapa beban perlengkapan dan bagaimana jurnalnya?",
      pembahasan:
        "Terpakai = Rp3.750.000 − Rp1.250.000 = Rp2.500.000. Jurnal: Beban Perlengkapan (D) Rp2.500.000 – Perlengkapan (K) Rp2.500.000.",
    },
  },
  {
    slug: "beban-dimuka",
    icon: "🏠",
    title: "Bab 3 · Beban Dibayar di Muka",
    summary: "Beban yang sudah dibayar, tetapi manfaatnya belum seluruhnya dipakai.",
    pengertian:
      "Beban dibayar di muka (prepaid expense) adalah pembayaran yang dilakukan sekarang untuk manfaat beberapa periode ke depan, misalnya sewa dan asuransi tahunan.",
    tujuan: [
      "Mengakui bagian yang sudah terpakai sebagai beban periode berjalan.",
      "Menjaga agar aset (bagian yang belum terpakai) tercatat dengan benar.",
    ],
    karakteristik: [
      "Kas keluar duluan, manfaat dinikmati kemudian secara bertahap.",
      "Pendekatan harta: saat bayar dicatat sebagai aset (misal Sewa Dibayar di Muka); penyesuaian mengakui bagian yang terpakai sebagai beban.",
      "Pendekatan beban: saat bayar dicatat sebagai beban; penyesuaian mengakui bagian yang belum terpakai sebagai aset. Hasil akhir kedua pendekatan sama.",
    ],
    penjelasan:
      "Anggap kamu membayar sewa kios untuk 12 bulan. Setiap bulan berlalu, 1/12 bagian sewa itu berubah dari aset menjadi beban. Di akhir periode, hitung berapa bulan yang sudah lewat, kalikan dengan biaya per bulan. Itulah nominal penyesuaiannya.",
    ilustrasi:
      "1 Oktober dibayar sewa toko untuk 12 bulan. Pada 31 Desember, 3 bulan sudah terpakai dan 9 bulan masih menjadi aset.",
    rumus: "Beban terpakai = (Total pembayaran ÷ Jumlah bulan) × Bulan yang sudah lewat",
    langkah: [
      "Hitung biaya per bulan: total ÷ jumlah bulan.",
      "Hitung berapa bulan sudah lewat sampai tanggal penyesuaian.",
      "Kalikan keduanya untuk mendapat beban yang diakui.",
      "Pendekatan harta: Beban (D) – Akun Dibayar di Muka (K).",
    ],
    analisis: {
      debit: "Beban (misal Beban Sewa)",
      kredit: "Aset dibayar di muka (misal Sewa Dibayar di Muka)",
      alasan: "Bagian yang terpakai menjadi beban (debit); aset berkurang karena manfaatnya sudah dipakai (kredit).",
    },
    contoh: {
      soal: "1 Oktober 2026 dibayar sewa Rp12.000.000 untuk 12 bulan (dicatat sebagai Sewa Dibayar di Muka). Buat penyesuaian 31 Desember 2026.",
      jawab: "Rp12.000.000 ÷ 12 × 3 bulan = Rp3.000.000",
      jurnal: [
        { akun: "Beban Sewa", debit: 3000000 },
        { akun: "Sewa Dibayar di Muka", kredit: 3000000 },
      ],
    },
    kesalahan: [
      "Menghitung bulan yang belum lewat, bukan yang sudah lewat.",
      "Lupa membagi total dengan jumlah bulan sehingga nominal terlalu besar.",
      "Tertukar dengan pendekatan beban: arah jurnal penyesuaiannya berbeda.",
    ],
    rangkuman: [
      "Beban dibayar di muka: bayar dulu, pakai kemudian.",
      "Nominal penyesuaian = biaya per bulan × bulan yang sudah lewat.",
      "Pendekatan harta dan beban menghasilkan saldo akhir yang sama.",
    ],
    latihan: {
      soal: "1 Juli dibayar asuransi Rp2.400.000 untuk 12 bulan (dicatat sebagai aset). Berapa beban asuransi per 31 Desember?",
      pembahasan:
        "Per bulan = Rp2.400.000 ÷ 12 = Rp200.000. Bulan terpakai Juli–Desember = 6 bulan. Beban = Rp200.000 × 6 = Rp1.200.000. Jurnal: Beban Asuransi (D) – Asuransi Dibayar di Muka (K) Rp1.200.000.",
    },
  },
  {
    slug: "pendapatan-dimuka",
    icon: "💌",
    title: "Bab 4 · Pendapatan Diterima di Muka",
    summary: "Uang sudah diterima, tetapi jasa atau barang belum diserahkan seluruhnya.",
    pengertian:
      "Pendapatan diterima di muka (unearned revenue) adalah penerimaan kas dari pelanggan untuk jasa atau barang yang belum diserahkan. Karena perusahaan masih berutang jasa, penerimaan ini dicatat sebagai liabilitas.",
    tujuan: [
      "Mengakui bagian yang sudah menjadi hak perusahaan sebagai pendapatan.",
      "Menampilkan sisa kewajiban kepada pelanggan dengan benar.",
    ],
    karakteristik: [
      "Kas diterima duluan, jasa/barang diserahkan kemudian.",
      "Pendekatan kewajiban: saat terima kas dicatat sebagai liabilitas (Pendapatan Diterima di Muka); penyesuaian mengakui bagian yang sudah dihasilkan sebagai pendapatan.",
      "Pendekatan pendapatan: saat terima kas dicatat sebagai pendapatan; penyesuaian memindahkan bagian yang belum dihasilkan ke liabilitas.",
    ],
    penjelasan:
      "Kalau pelanggan membayar di muka untuk 6 bulan sewa, uang itu belum sepenuhnya menjadi pendapatanmu. Setiap bulan berlalu, sebagian berubah dari kewajiban menjadi pendapatan. Hitung bulan yang sudah berjalan, kalikan tarif per bulan — itulah yang boleh diakui sebagai pendapatan.",
    ilustrasi:
      "1 September diterima sewa ruko untuk 6 bulan dari penyewa. Pada 31 Desember, 4 bulan sudah berjalan.",
    rumus: "Pendapatan diakui = (Total diterima ÷ Jumlah bulan) × Bulan yang sudah berjalan",
    langkah: [
      "Hitung nilai per bulan: total ÷ jumlah bulan.",
      "Hitung bulan yang sudah berjalan sampai tanggal penyesuaian.",
      "Kalikan untuk mendapat pendapatan yang diakui.",
      "Pendekatan kewajiban: Pendapatan Diterima di Muka (D) – Pendapatan (K).",
    ],
    analisis: {
      debit: "Pendapatan Diterima di Muka (liabilitas)",
      kredit: "Pendapatan (misal Pendapatan Sewa)",
      alasan: "Kewajiban berkurang karena sebagian jasa sudah diserahkan (debit); pendapatan bertambah (kredit).",
    },
    contoh: {
      soal: "1 September 2026 diterima sewa Rp6.000.000 untuk 6 bulan (dicatat sebagai Sewa Diterima di Muka). Buat penyesuaian 31 Desember.",
      jawab: "Rp6.000.000 ÷ 6 × 4 bulan = Rp4.000.000",
      jurnal: [
        { akun: "Sewa Diterima di Muka", debit: 4000000 },
        { akun: "Pendapatan Sewa", kredit: 4000000 },
      ],
    },
    kesalahan: [
      "Menganggap seluruh uang yang diterima langsung menjadi pendapatan.",
      "Membalik jurnal: mendebit Pendapatan dan mengkredit Pendapatan Diterima di Muka.",
      "Salah menghitung bulan berjalan (misalnya menghitung September dua kali).",
    ],
    rangkuman: [
      "Pendapatan diterima di muka awalnya adalah liabilitas, bukan pendapatan.",
      "Yang diakui sebagai pendapatan = nilai per bulan × bulan berjalan.",
    ],
    latihan: {
      soal: "1 November diterima Rp7.200.000 untuk kontrak jasa 6 bulan (dicatat sebagai Pendapatan Diterima di Muka). Berapa pendapatan yang diakui per 31 Desember?",
      pembahasan:
        "Per bulan = Rp7.200.000 ÷ 6 = Rp1.200.000. Bulan berjalan November–Desember = 2 bulan. Pendapatan = Rp1.200.000 × 2 = Rp2.400.000. Jurnal: Pendapatan Diterima di Muka (D) – Pendapatan Jasa (K) Rp2.400.000.",
    },
  },
  {
    slug: "beban-terutang",
    icon: "⏳",
    title: "Bab 5 · Beban yang Masih Harus Dibayar",
    summary: "Beban sudah terjadi, tetapi belum dibayar dan belum dicatat.",
    pengertian:
      "Beban yang masih harus dibayar (accrued expense) adalah beban yang sudah terjadi dalam periode berjalan tetapi belum dibayar dan belum dicatat, misalnya gaji, listrik, dan bunga pinjaman.",
    tujuan: [
      "Mengakui beban pada periode terjadinya, sesuai prinsip akrual.",
      "Mencatat kewajiban (utang) yang timbul dari beban tersebut.",
    ],
    karakteristik: [
      "Beban terjadi duluan, kas keluar kemudian.",
      "Belum ada bukti pembayaran, sehingga belum tercatat sama sekali.",
      "Penyesuaian selalu menambah beban dan menambah utang.",
    ],
    penjelasan:
      "Karyawan sudah bekerja sampai akhir Desember, tetapi gajinya baru dibayar awal Januari. Secara akrual, gaji itu adalah beban bulan Desember. Karena belum dibayar, perusahaan juga punya utang gaji. Hitung tarif per hari atau per bulan, kalikan jumlah hari/bulan yang belum dibayar.",
    ilustrasi:
      "Gaji dibayar setiap awal bulan. Tanggal 29–31 Desember karyawan sudah bekerja, tetapi gaji 3 hari itu baru dibayar Januari.",
    rumus: "Beban terutang = Tarif per hari/bulan × Jumlah hari/bulan yang belum dibayar · Bunga = Pokok × Tarif per tahun × (Bulan berjalan ÷ 12)",
    langkah: [
      "Tentukan tarif beban (per hari, per bulan, atau tarif bunga per tahun).",
      "Hitung berapa hari/bulan beban sudah terjadi tetapi belum dibayar.",
      "Kalikan untuk mendapat nominal beban terutang.",
      "Jurnal: Beban (D) – Utang (K).",
    ],
    analisis: {
      debit: "Beban (misal Beban Gaji, Beban Bunga)",
      kredit: "Utang (misal Utang Gaji, Utang Bunga)",
      alasan: "Beban sudah terjadi sehingga ditambah (debit); karena belum dibayar, timbul kewajiban (kredit).",
    },
    contoh: {
      soal: "Gaji karyawan Rp500.000 per hari. Gaji 3 hari terakhir Desember belum dibayar. Buat jurnal penyesuaian.",
      jawab: "Rp500.000 × 3 hari = Rp1.500.000",
      jurnal: [
        { akun: "Beban Gaji", debit: 1500000 },
        { akun: "Utang Gaji", kredit: 1500000 },
      ],
    },
    kesalahan: [
      "Tidak membuat penyesuaian karena merasa belum ada pembayaran.",
      "Mengkredit Kas, padahal kas belum keluar — yang benar mengkredit Utang.",
      "Untuk bunga, lupa mengalikan proporsi bulan (misal 2/12).",
    ],
    rangkuman: [
      "Beban terutang: terjadi dulu, bayar belakangan.",
      "Jurnalnya selalu Beban (D) – Utang (K).",
    ],
    latihan: {
      soal: "1 November perusahaan meminjam Rp20.000.000 dengan bunga 9% per tahun, dibayar saat jatuh tempo. Berapa penyesuaian bunga per 31 Desember?",
      pembahasan:
        "Bunga = Rp20.000.000 × 9% × 2/12 = Rp300.000. Jurnal: Beban Bunga (D) – Utang Bunga (K) Rp300.000.",
    },
  },
  {
    slug: "pendapatan-akrual",
    icon: "🌱",
    title: "Bab 6 · Pendapatan yang Masih Harus Diterima",
    summary: "Pendapatan sudah menjadi hak, tetapi uangnya belum diterima.",
    pengertian:
      "Pendapatan yang masih harus diterima (accrued revenue) adalah pendapatan yang sudah menjadi hak perusahaan karena jasa sudah diberikan atau waktu sudah berjalan, tetapi kasnya belum diterima.",
    tujuan: [
      "Mengakui pendapatan pada periode saat pendapatan itu diperoleh.",
      "Mencatat piutang yang menjadi hak perusahaan.",
    ],
    karakteristik: [
      "Jasa/barang diserahkan duluan, kas diterima kemudian.",
      "Belum ada penerimaan kas, sehingga belum tercatat sama sekali.",
      "Penyesuaian selalu menambah piutang dan menambah pendapatan.",
    ],
    penjelasan:
      "Ini kebalikan dari beban terutang. Misalnya perusahaan punya piutang wesel berbunga: setiap bulan bunganya bertambah menjadi hak perusahaan, walau uangnya baru diterima saat jatuh tempo. Hitung bunga yang sudah berjalan dengan rumus pokok × tarif × bulan/12.",
    ilustrasi:
      "Perusahaan memegang wesel berbunga. Bunga 3 bulan terakhir sudah menjadi hak, tetapi baru akan diterima saat wesel jatuh tempo.",
    rumus: "Bunga = Pokok × Tarif bunga per tahun × (Bulan berjalan ÷ 12)",
    langkah: [
      "Tentukan pokok, tarif bunga, dan bulan yang sudah berjalan.",
      "Hitung bunga: pokok × tarif × bulan/12.",
      "Untuk jasa yang selesai tapi belum ditagih, pakai nilai jasanya langsung.",
      "Jurnal: Piutang (D) – Pendapatan (K).",
    ],
    analisis: {
      debit: "Piutang (misal Piutang Bunga, Piutang Jasa)",
      kredit: "Pendapatan (misal Pendapatan Bunga, Pendapatan Jasa)",
      alasan: "Perusahaan punya hak menagih (piutang bertambah, debit) dan pendapatan sudah diperoleh (kredit).",
    },
    contoh: {
      soal: "1 Oktober diterima wesel Rp10.000.000, bunga 12% per tahun, jatuh tempo 6 bulan. Buat penyesuaian 31 Desember.",
      jawab: "Rp10.000.000 × 12% × 3/12 = Rp300.000",
      jurnal: [
        { akun: "Piutang Bunga", debit: 300000 },
        { akun: "Pendapatan Bunga", kredit: 300000 },
      ],
    },
    kesalahan: [
      "Menunggu kas diterima dulu baru mencatat pendapatan.",
      "Mendebit Pendapatan dan mengkredit Piutang (terbalik).",
      "Menghitung bunga setahun penuh padahal baru berjalan beberapa bulan.",
    ],
    rangkuman: [
      "Pendapatan akrual: hak sudah ada, kas belum masuk.",
      "Jurnalnya selalu Piutang (D) – Pendapatan (K).",
    ],
    latihan: {
      soal: "Wesel Rp15.000.000 berbunga 10% per tahun diterima 1 September. Berapa piutang bunga per 31 Desember?",
      pembahasan:
        "Bunga = Rp15.000.000 × 10% × 4/12 = Rp500.000. Jurnal: Piutang Bunga (D) – Pendapatan Bunga (K) Rp500.000.",
    },
  },
  {
    slug: "penyusutan",
    icon: "🏭",
    title: "Bab 7 · Penyusutan Aset Tetap",
    summary: "Mengalokasikan harga perolehan aset tetap menjadi beban selama umur manfaatnya.",
    pengertian:
      "Penyusutan (depresiasi) adalah alokasi harga perolehan aset tetap menjadi beban secara bertahap selama umur ekonomisnya, karena aset seperti peralatan, kendaraan, dan gedung nilainya menyusut karena dipakai. Tanah tidak disusutkan.",
    tujuan: [
      "Menandingkan biaya aset dengan pendapatan yang dibantunya hasilkan setiap periode.",
      "Menampilkan nilai buku aset yang wajar di neraca.",
    ],
    karakteristik: [
      "Berlaku untuk aset tetap berwujud selain tanah.",
      "Dipengaruhi tiga faktor: harga perolehan, nilai residu (sisa), dan umur ekonomis.",
      "Dicatat lewat akun kontra aset: Akumulasi Penyusutan, bukan mengurangi akun aset langsung.",
    ],
    penjelasan:
      "Metode garis lurus membagi beban secara merata: harga perolehan dikurangi nilai residu, dibagi umur ekonomis — itulah penyusutan per tahun. Kalau aset dibeli di tengah tahun, kalikan proporsi bulannya. Misal beli 1 April, tahun pertama hanya dihitung 9/12.",
    ilustrasi:
      "Peralatan dibeli 1 April. Sampai 31 Desember, peralatan baru dipakai 9 bulan, jadi penyusutan tahun pertama hanya 9/12 dari penyusutan setahun.",
    rumus: "Penyusutan per tahun = (Harga perolehan − Nilai residu) ÷ Umur ekonomis · Jika beli tengah tahun: × (Bulan dipakai ÷ 12)",
    langkah: [
      "Kurangi harga perolehan dengan nilai residu.",
      "Bagi dengan umur ekonomis untuk mendapat penyusutan per tahun.",
      "Kalikan proporsi bulan jika aset dibeli di tengah tahun.",
      "Jurnal: Beban Penyusutan (D) – Akumulasi Penyusutan (K).",
    ],
    analisis: {
      debit: "Beban Penyusutan (misal Beban Penyusutan Peralatan)",
      kredit: "Akumulasi Penyusutan (akun kontra aset)",
      alasan: "Beban diakui setiap periode (debit); akumulasi penyusutan mengurangi nilai buku aset di neraca (kredit).",
    },
    contoh: {
      soal: "1 April 2026 dibeli peralatan Rp50.000.000, nilai residu Rp5.000.000, umur 5 tahun. Hitung penyusutan 31 Desember 2026.",
      jawab: "(Rp50.000.000 − Rp5.000.000) ÷ 5 × 9/12 = Rp6.750.000",
      jurnal: [
        { akun: "Beban Penyusutan Peralatan", debit: 6750000 },
        { akun: "Akumulasi Penyusutan Peralatan", kredit: 6750000 },
      ],
    },
    kesalahan: [
      "Lupa mengurangi nilai residu sebelum membagi umur ekonomis.",
      "Mengkredit akun aset langsung, bukan Akumulasi Penyusutan.",
      "Menyusutkan tanah, atau lupa proporsi bulan untuk aset yang dibeli tengah tahun.",
    ],
    rangkuman: [
      "Penyusutan garis lurus = (harga perolehan − residu) ÷ umur ekonomis.",
      "Selalu gunakan Akumulasi Penyusutan di sisi kredit.",
    ],
    latihan: {
      soal: "Mesin Rp60.000.000, residu Rp6.000.000, umur 6 tahun, dibeli 1 Mei. Berapa penyusutan per 31 Desember?",
      pembahasan:
        "Per tahun = (Rp60.000.000 − Rp6.000.000) ÷ 6 = Rp9.000.000. Dipakai Mei–Desember = 8 bulan, jadi Rp9.000.000 × 8/12 = Rp6.000.000. Jurnal: Beban Penyusutan Mesin (D) – Akumulasi Penyusutan Mesin (K) Rp6.000.000.",
    },
  },
  {
    slug: "persediaan",
    icon: "📦",
    title: "Bab 8 · Persediaan Barang Dagang",
    summary: "Penyesuaian persediaan pada perusahaan dagang dengan metode periodik.",
    pengertian:
      "Persediaan barang dagang adalah barang yang dibeli untuk dijual kembali. Pada metode periodik (fisik), nilai persediaan di pembukuan tidak berubah selama periode, sehingga di akhir periode perlu disesuaikan dengan hasil perhitungan fisik.",
    tujuan: [
      "Menutup persediaan awal dan menampilkan persediaan akhir hasil hitung fisik.",
      "Menyajikan harga pokok penjualan dan laba yang benar.",
    ],
    karakteristik: [
      "Hanya dipakai perusahaan dagang dengan metode periodik.",
      "Pendekatan ikhtisar laba rugi memakai dua jurnal penyesuaian.",
      "Pendekatan harga pokok penjualan (HPP) memindahkan seluruh unsur pembentuk HPP.",
    ],
    penjelasan:
      "Dengan pendekatan ikhtisar laba rugi ada dua langkah. Pertama, persediaan awal (dari neraca saldo) dihapus: Ikhtisar Laba Rugi (D) – Persediaan Barang Dagang (K). Kedua, persediaan akhir (hasil stock opname) dimunculkan: Persediaan Barang Dagang (D) – Ikhtisar Laba Rugi (K). Ingat: jurnal pertama pakai nilai awal, jurnal kedua pakai nilai akhir.",
    ilustrasi:
      "Persediaan awal toko Rp15.000.000. Setelah stock opname 31 Desember, barang di gudang bernilai Rp18.000.000. Selisihnya memengaruhi harga pokok penjualan.",
    rumus: "Jurnal 1 memakai persediaan awal (neraca saldo); Jurnal 2 memakai persediaan akhir (hasil hitung fisik). Selisih persediaan = akhir − awal.",
    langkah: [
      "Catat persediaan awal dari neraca saldo.",
      "Tentukan persediaan akhir dari hasil perhitungan fisik.",
      "Jurnal 1: Ikhtisar Laba Rugi (D) – Persediaan Barang Dagang (K) sebesar persediaan awal.",
      "Jurnal 2: Persediaan Barang Dagang (D) – Ikhtisar Laba Rugi (K) sebesar persediaan akhir.",
    ],
    analisis: {
      debit: "Ikhtisar Laba Rugi (jurnal 1), lalu Persediaan Barang Dagang (jurnal 2)",
      kredit: "Persediaan Barang Dagang (jurnal 1), lalu Ikhtisar Laba Rugi (jurnal 2)",
      alasan: "Persediaan awal ditutup ke ikhtisar laba rugi, kemudian persediaan akhir dicatat sebagai aset yang baru.",
    },
    contoh: {
      soal: "Persediaan awal Rp15.000.000 dan persediaan akhir Rp18.000.000. Buat jurnal penyesuaian (pendekatan ikhtisar laba rugi).",
      jawab: "Jurnal 1 memakai Rp15.000.000 (awal), jurnal 2 memakai Rp18.000.000 (akhir).",
      jurnal: [
        { akun: "Ikhtisar Laba Rugi", debit: 15000000 },
        { akun: "Persediaan Barang Dagang", kredit: 15000000 },
        { akun: "Persediaan Barang Dagang", debit: 18000000 },
        { akun: "Ikhtisar Laba Rugi", kredit: 18000000 },
      ],
    },
    kesalahan: [
      "Tertukar: memakai nilai akhir di jurnal pertama dan nilai awal di jurnal kedua.",
      "Hanya membuat satu jurnal, padahal pendekatan ikhtisar laba rugi butuh dua.",
      "Memakai akun HPP padahal soal meminta pendekatan ikhtisar laba rugi.",
    ],
    rangkuman: [
      "Metode periodik: persediaan disesuaikan di akhir periode.",
      "Ikhtisar laba rugi: tutup persediaan awal, lalu catat persediaan akhir.",
    ],
    latihan: {
      soal: "Persediaan awal Rp10.000.000, persediaan akhir Rp8.500.000. Buat kedua jurnal penyesuaiannya.",
      pembahasan:
        "Jurnal 1: Ikhtisar Laba Rugi (D) Rp10.000.000 – Persediaan Barang Dagang (K) Rp10.000.000. Jurnal 2: Persediaan Barang Dagang (D) Rp8.500.000 – Ikhtisar Laba Rugi (K) Rp8.500.000.",
    },
  },
];

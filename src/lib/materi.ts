export type Jurnal = { akun: string; debit?: number; kredit?: number }[];
export type Materi = {
  slug: string; icon: string; title: string; summary: string;
  pengertian: string; tujuan: string[]; karakteristik: string[];
  penjelasan: string; ilustrasi: string; rumus?: string; langkah: string[];
  analisis?: { debit: string; kredit: string; alasan: string };
  contoh?: { soal: string; jawab: string; jurnal: Jurnal };
  tambahan?: { title: string; text: string; jurnal?: Jurnal }[];
  kesalahan: string[]; rangkuman: string[];
  latihan: { soal: string; pembahasan: string };
};

// Transcribed from MATERI_FIX_review_LAMAAA.pdf, chapters 1–7 only.
export const MATERI: Materi[] = [
  {
    "slug": "konsep-dasar",
    "icon": "📘",
    "title": "Bab 1 · Konsep Dasar Jurnal Penyesuaian",
    "summary": "Jurnal penyesuaian memperbarui saldo akun pada akhir periode.",
    "pengertian": "Jurnal penyesuaian (adjusting entries) adalah jurnal yang dibuat pada akhir periode akuntansi untuk memperbarui saldo akun agar sesuai dengan keadaan yang sebenarnya, sebelum laporan keuangan disusun.",
    "tujuan": [
      "Menyajikan saldo akun aset, liabilitas, pendapatan, dan beban sesuai keadaan sebenarnya di akhir periode.",
      "Menerapkan prinsip akrual: pendapatan dicatat saat diperoleh dan beban dicatat saat terjadi, bukan saat kas berpindah.",
      "Menandingkan pendapatan dengan beban pada periode yang sama agar laba rugi tidak salah."
    ],
    "karakteristik": [
      "Dibuat di akhir periode, setelah neraca saldo dan sebelum laporan keuangan.",
      "Memengaruhi minimal satu akun neraca (aset/liabilitas) dan satu akun laba rugi (pendapatan/beban).",
      "Tidak melibatkan akun Kas karena penerimaan dan pembayaran kas dicatat saat transaksi terjadi."
    ],
    "penjelasan": "Misalnya perusahaan membayar sewa untuk satu tahun pada bulan Oktober. Sampai Desember, sebagian masa sewa sudah digunakan. Jika tidak disesuaikan, seluruh pembayaran masih terlihat sebagai aset, padahal sebagian telah menjadi beban. Jurnal penyesuaian memperbarui saldo tersebut. Urutan umumnya adalah neraca saldo, jurnal penyesuaian, neraca saldo setelah penyesuaian, lalu laporan keuangan.",
    "ilustrasi": "Perusahaan membayar sewa setahun di muka, menerima uang muka pelanggan, memiliki gaji yang belum dibayar, dan menggunakan peralatan. Kondisi-kondisi tersebut dapat memerlukan penyesuaian pada akhir periode.",
    "langkah": [
      "Baca neraca saldo dan data penyesuaian akhir periode.",
      "Tentukan akun yang saldonya belum mencerminkan keadaan sebenarnya.",
      "Hitung nominal penyesuaian sesuai jenis transaksi.",
      "Tentukan akun debit dan kredit.",
      "Catat jurnal penyesuaian, lalu susun neraca saldo setelah penyesuaian."
    ],
    "kesalahan": [
      "Menganggap jurnal penyesuaian dapat dicatat kapan saja; umumnya dibuat pada akhir periode.",
      "Melibatkan akun Kas dalam jurnal penyesuaian.",
      "Menyusun laporan keuangan langsung dari neraca saldo sebelum penyesuaian."
    ],
    "rangkuman": [
      "Jurnal penyesuaian memperbarui saldo akun pada akhir periode.",
      "Dasarnya prinsip akrual dan penandingan pendapatan-beban.",
      "Urutan: neraca saldo → jurnal penyesuaian → neraca saldo setelah penyesuaian → laporan keuangan."
    ],
    "latihan": {
      "soal": "Mengapa jurnal penyesuaian tidak pernah melibatkan akun Kas?",
      "pembahasan": "Karena penerimaan dan pengeluaran kas sudah dicatat ketika transaksi terjadi. Jurnal penyesuaian mengakui pendapatan atau beban yang waktunya berbeda dari penerimaan atau pembayaran kas."
    },
    "tambahan": [
      {
        "title": "Basis Akrual",
        "text": "Basis akrual mencatat transaksi pada periode ketika peristiwa ekonomi terjadi, bukan ketika uang diterima atau dibayarkan. Pendapatan diakui ketika barang atau jasa telah diserahkan. Beban diakui ketika beban terjadi atau manfaat telah digunakan."
      },
      {
        "title": "Basis Kas",
        "text": "Basis kas mencatat pendapatan ketika kas benar-benar diterima dan mencatat beban ketika kas benar-benar dibayarkan. Waktu pencatatan mengikuti arus uang masuk dan uang keluar."
      },
      {
        "title": "Perbandingan: Pendapatan",
        "text": "Basis akrual: diakui saat barang/jasa diserahkan atau hak pendapatan timbul. Basis kas: diakui saat uang diterima."
      },
      {
        "title": "Perbandingan: Beban",
        "text": "Basis akrual: diakui saat beban terjadi atau manfaat digunakan. Basis kas: diakui saat uang dibayarkan."
      },
      {
        "title": "Perbandingan: Waktu Pencatatan",
        "text": "Basis akrual mengikuti terjadinya transaksi ekonomi serta timbulnya hak/kewajiban. Basis kas mengikuti penerimaan atau pengeluaran kas."
      },
      {
        "title": "Perbandingan: Gambaran Kinerja",
        "text": "Basis akrual lebih menggambarkan pendapatan yang diperoleh dan beban yang terjadi dalam suatu periode. Basis kas dapat tidak menggambarkan kinerja periode secara tepat jika kas diterima/dibayar pada periode berbeda."
      },
      {
        "title": "Contoh: Jasa Selesai, Pembayaran Menyusul",
        "text": "Pada 20 Desember, perusahaan menyelesaikan jasa desain senilai Rp4.000.000. Pelanggan baru membayar pada 15 Januari tahun berikutnya. Basis akrual mengakui pendapatan pada Desember karena jasa sudah selesai diberikan.",
        "jurnal": [
          {
            "akun": "Piutang Usaha",
            "debit": 4000000
          },
          {
            "akun": "Pendapatan Jasa",
            "kredit": 4000000
          }
        ]
      },
      {
        "title": "Contoh yang Sama: Basis Kas",
        "text": "Jika menggunakan basis kas, pendapatan baru dicatat pada Januari, ketika uang diterima. Pendapatan tersebut tidak muncul sebagai pendapatan Desember dalam pencatatan basis kas."
      },
      {
        "title": "Mengapa Basis Akrual Penting?",
        "text": "Jurnal penyesuaian diperlukan agar pendapatan dan beban masuk ke periode yang benar. Ada pendapatan yang sudah diperoleh tetapi belum diterima kasnya, beban yang sudah terjadi tetapi belum dibayar, serta pembayaran atau penerimaan kas yang berlangsung lebih dari satu periode."
      },
      {
        "title": "Kas Lebih Dahulu",
        "text": "Beban dibayar di muka: kas sudah dibayar, tetapi sebagian manfaat belum digunakan, misalnya sewa/asuransi. Pendapatan diterima di muka: kas sudah diterima, tetapi jasa/barang belum seluruhnya diserahkan."
      },
      {
        "title": "Kas Menyusul",
        "text": "Beban masih harus dibayar: beban sudah terjadi, tetapi kas belum dibayar, misalnya gaji atau bunga terutang. Pendapatan masih harus diterima: pendapatan sudah diperoleh, tetapi kas belum diterima, misalnya jasa selesai atau bunga yang sudah menjadi hak."
      },
      {
        "title": "Inti Basis Akrual dan Basis Kas",
        "text": "Basis akrual berfokus pada kapan pendapatan diperoleh dan beban terjadi; basis kas berfokus pada kapan uang diterima dan dibayarkan. Laporan keuangan disusun menggunakan basis akrual, kecuali informasi arus kas. Ikuti penjelasan modul dan arahan dosen untuk konteks penerapannya."
      }
    ]
  },
  {
    "slug": "perlengkapan",
    "icon": "✏️",
    "title": "Bab 2 · Perlengkapan",
    "summary": "Perlengkapan terpakai = saldo – sisa fisik.",
    "pengertian": "Perlengkapan (supplies) adalah barang habis pakai untuk kegiatan operasional, misalnya kertas, tinta, dan alat tulis. Ketika dibeli, perlengkapan dicatat sebagai aset.",
    "tujuan": [
      "Mengakui perlengkapan yang sudah digunakan sebagai beban periode berjalan.",
      "Menampilkan sisa perlengkapan sebagai aset dengan jumlah yang benar."
    ],
    "karakteristik": [
      "Dibeli dan dicatat sebagai aset Perlengkapan.",
      "Digunakan sedikit demi sedikit selama periode berjalan.",
      "Sisa akhir periode diketahui melalui pemeriksaan atau perhitungan fisik."
    ],
    "penjelasan": "Yang sudah digunakan menjadi beban, sedangkan yang masih tersisa tetap menjadi aset. Karena pemakaian tidak selalu dicatat setiap hari, perusahaan menghitung sisa perlengkapan pada akhir periode. Selisih antara saldo pembukuan dan sisa fisik merupakan perlengkapan yang telah digunakan.",
    "ilustrasi": "Toko alat tulis membeli kertas dan tinta selama tahun berjalan. Pada akhir Desember, petugas menghitung sisa barang di gudang untuk mengetahui jumlah yang sudah digunakan.",
    "langkah": [
      "Ambil saldo akun Perlengkapan dari neraca saldo.",
      "Tentukan sisa perlengkapan melalui perhitungan fisik.",
      "Kurangkan saldo pembukuan dengan sisa fisik.",
      "Catat Beban Perlengkapan di debit dan Perlengkapan di kredit."
    ],
    "kesalahan": [
      "Menggunakan sisa fisik sebagai nominal jurnal, padahal yang dijurnal adalah jumlah terpakai.",
      "Membalik debit dan kredit."
    ],
    "rangkuman": [
      "Perlengkapan terpakai = saldo – sisa fisik.",
      "Jumlah terpakai diakui sebagai Beban Perlengkapan."
    ],
    "rumus": "Perlengkapan terpakai = Saldo perlengkapan menurut neraca saldo – Sisa perlengkapan hasil hitung fisik.",
    "analisis": {
      "debit": "Beban Perlengkapan",
      "kredit": "Perlengkapan",
      "alasan": "Pemakaian menambah beban dan mengurangi aset perlengkapan."
    },
    "contoh": {
      "soal": "Saldo Perlengkapan Rp2.500.000. Sisa fisik per 31 Desember Rp800.000. Perlengkapan terpakai = Rp2.500.000 – Rp800.000 = Rp1.700.000.",
      "jawab": "Rp2.500.000 − Rp800.000 = Rp1.700.000",
      "jurnal": [
        {
          "akun": "Beban Perlengkapan",
          "debit": 1700000
        },
        {
          "akun": "Perlengkapan",
          "kredit": 1700000
        }
      ]
    },
    "latihan": {
      "soal": "Saldo Perlengkapan Rp3.750.000 dan sisa fisik Rp1.250.000. Berapa beban perlengkapan dan bagaimana jurnalnya?",
      "pembahasan": "Terpakai = Rp3.750.000 – Rp1.250.000 = Rp2.500.000. Debit Beban Perlengkapan Rp2.500.000 dan kredit Perlengkapan Rp2.500.000."
    },
    "tambahan": [
      {
        "title": "Contoh Perhitungan Perlengkapan",
        "text": "Saldo perlengkapan menurut pembukuan Rp2.000.000. Sisa hasil pemeriksaan fisik Rp500.000. Terpakai = Rp2.000.000 − Rp500.000 = Rp1.500.000. Jumlah terpakai diakui sebagai Beban Perlengkapan.",
        "jurnal": [
          {
            "akun": "Beban Perlengkapan",
            "debit": 1500000
          },
          {
            "akun": "Perlengkapan",
            "kredit": 1500000
          }
        ]
      }
    ]
  },
  {
    "slug": "beban-dimuka",
    "icon": "🏠",
    "title": "Bab 3 · Beban Dibayar di Muka",
    "summary": "Bayar lebih dahulu, manfaat digunakan kemudian.",
    "pengertian": "Beban dibayar di muka (prepaid expense) adalah pembayaran yang dilakukan sekarang untuk memperoleh manfaat pada beberapa periode mendatang, misalnya sewa dan asuransi tahunan.",
    "tujuan": [
      "Mengakui bagian yang sudah digunakan sebagai beban periode berjalan.",
      "Menjaga agar bagian manfaat yang belum digunakan tetap tercatat sebagai aset."
    ],
    "karakteristik": [
      "Kas dibayarkan lebih dahulu, manfaat diterima kemudian secara bertahap.",
      "Pendekatan harta: pembayaran awal dicatat sebagai aset; bagian terpakai dipindahkan menjadi beban.",
      "Pendekatan beban: pembayaran awal dicatat sebagai beban; bagian belum terpakai dipindahkan menjadi aset. Saldo akhir kedua pendekatan harus sama."
    ],
    "penjelasan": "Jika perusahaan membayar sewa kios untuk 12 bulan, setiap bulan yang berlalu menunjukkan bahwa sebagian manfaat sewa telah digunakan. Hitung biaya per bulan, lalu kalikan dengan jumlah bulan yang sudah terpakai. Contoh jurnal berikut menggunakan pendekatan harta.",
    "ilustrasi": "Pada 1 Oktober dibayar sewa toko untuk 12 bulan. Sampai 31 Desember, masa sewa yang telah digunakan adalah 3 bulan; sisanya 9 bulan belum digunakan.",
    "langkah": [
      "Hitung biaya per bulan: total pembayaran dibagi jumlah bulan manfaat.",
      "Hitung bulan yang telah berlalu sampai tanggal penyesuaian.",
      "Kalikan biaya per bulan dengan bulan terpakai.",
      "Untuk pendekatan harta: debit Beban dan kredit akun Dibayar di Muka."
    ],
    "kesalahan": [
      "Menghitung bulan yang belum terpakai, bukan bulan yang sudah terpakai.",
      "Tidak membagi pembayaran dengan jumlah bulan manfaat.",
      "Tidak memperhatikan pendekatan pencatatan awal."
    ],
    "rangkuman": [
      "Bayar lebih dahulu, manfaat digunakan kemudian.",
      "Nominal beban = biaya per bulan × bulan terpakai.",
      "Perhatikan pendekatan pencatatan awal."
    ],
    "rumus": "Beban terpakai = (Total pembayaran ÷ Jumlah bulan manfaat) × Bulan yang sudah terpakai",
    "analisis": {
      "debit": "Beban (misalnya Beban Sewa)",
      "kredit": "Aset dibayar di muka (misalnya Sewa Dibayar di Muka)",
      "alasan": "Bagian yang telah digunakan menjadi beban, sedangkan aset berkurang."
    },
    "contoh": {
      "soal": "Pada 1 Oktober 2026 dibayar sewa Rp12.000.000 untuk 12 bulan dan dicatat sebagai Sewa Dibayar di Muka. Penyesuaian 31 Desember 2026: Rp12.000.000 ÷ 12 × 3 = Rp3.000.000. Sisa sewa dibayar dimuka: Rp12.000.000 - Rp3.000.000 = Rp9.000.000. Sewa yang telah digunakan sebesar Rp3.000.000 selama 3 bulan diakui sebagai Beban sewa di akhir periode karena telah digunakan.",
      "jawab": "Rp12.000.000 ÷ 12 × 3 = Rp3.000.000. Sisa sewa dibayar di muka = Rp12.000.000 − Rp3.000.000 = Rp9.000.000.",
      "jurnal": [
        {
          "akun": "Beban Sewa",
          "debit": 3000000
        },
        {
          "akun": "Sewa Dibayar di Muka",
          "kredit": 3000000
        }
      ]
    },
    "latihan": {
      "soal": "Pada 1 Juli dibayar asuransi Rp2.400.000 untuk 12 bulan dan dicatat sebagai aset. Berapa beban asuransi per 31 Desember?",
      "pembahasan": "Biaya per bulan Rp2.400.000 ÷ 12 = Rp200.000. Juli–Desember = 6 bulan. Beban = Rp200.000 × 6 = Rp1.200.000. Debit Beban Asuransi dan kredit Asuransi Dibayar di Muka masing-masing Rp1.200.000."
    }
  },
  {
    "slug": "pendapatan-dimuka",
    "icon": "💌",
    "title": "Bab 4 · Pendapatan Diterima di Muka",
    "summary": "Penerimaan sebelum jasa diberikan merupakan liabilitas.",
    "pengertian": "Pendapatan diterima di muka (unearned revenue) adalah penerimaan dari pelanggan sebelum barang diserahkan atau jasa diberikan seluruhnya. Karena masih ada kewajiban kepada pelanggan, penerimaan awal dicatat sebagai liabilitas.",
    "tujuan": [
      "Mengakui bagian yang sudah menjadi hak perusahaan sebagai pendapatan.",
      "Menampilkan sisa kewajiban kepada pelanggan dengan benar."
    ],
    "karakteristik": [
      "Kas diterima lebih dahulu, jasa atau barang diserahkan kemudian.",
      "Pendekatan kewajiban: penerimaan awal dicatat sebagai liabilitas; bagian yang telah diperoleh dipindahkan menjadi pendapatan.",
      "Pendekatan pendapatan: penerimaan awal dicatat sebagai pendapatan; bagian yang belum diperoleh dipindahkan menjadi liabilitas."
    ],
    "penjelasan": "Jika pelanggan membayar sewa untuk enam bulan, seluruh uang belum langsung menjadi pendapatan. Perusahaan masih memiliki kewajiban memberikan manfaat sewa. Setiap bulan yang telah berjalan, bagian yang menjadi hak perusahaan diakui sebagai pendapatan.",
    "ilustrasi": "Pada 1 September diterima pembayaran sewa untuk enam bulan. Sampai 31 Desember, empat bulan telah berjalan.",
    "langkah": [
      "Hitung penerimaan per bulan.",
      "Hitung jumlah bulan yang telah berjalan sampai tanggal penyesuaian.",
      "Kalikan nilai per bulan dengan bulan yang telah berjalan.",
      "Untuk pendekatan kewajiban: debit Pendapatan Diterima di Muka dan kredit Pendapatan."
    ],
    "kesalahan": [
      "Menganggap seluruh uang yang diterima langsung menjadi pendapatan.",
      "Membalik debit dan kredit.",
      "Salah menghitung bulan yang telah berjalan."
    ],
    "rangkuman": [
      "Penerimaan sebelum jasa diberikan merupakan liabilitas.",
      "Bagian yang telah diperoleh diakui sebagai pendapatan."
    ],
    "rumus": "Pendapatan diakui = (Total penerimaan ÷ Jumlah bulan kontrak) × Bulan yang telah berjalan",
    "analisis": {
      "debit": "Pendapatan Diterima di Muka (liabilitas)",
      "kredit": "Pendapatan (misalnya Pendapatan Sewa)",
      "alasan": "Kewajiban berkurang karena jasa telah diberikan, sementara pendapatan bertambah."
    },
    "contoh": {
      "soal": "Pada 1 September 2026 diterima sewa Rp6.000.000 untuk enam bulan dan dicatat sebagai Sewa Diterima di Muka. Sampai 31 Desember, empat bulan telah berjalan. Pendapatan = Rp6.000.000 ÷ 6 × 4 = Rp4.000.000.",
      "jawab": "Rp6.000.000 ÷ 6 × 4 = Rp4.000.000",
      "jurnal": [
        {
          "akun": "Sewa Diterima di Muka",
          "debit": 4000000
        },
        {
          "akun": "Pendapatan Sewa",
          "kredit": 4000000
        }
      ]
    },
    "latihan": {
      "soal": "Pada 1 November diterima Rp7.200.000 untuk kontrak jasa enam bulan dan dicatat sebagai Pendapatan Diterima di Muka. Berapa pendapatan yang diakui per 31 Desember?",
      "pembahasan": "Rp7.200.000 ÷ 6 = Rp1.200.000 per bulan. November–Desember = 2 bulan. Pendapatan yang diakui Rp2.400.000. Debit Pendapatan Diterima di Muka dan kredit Pendapatan Jasa masing-masing Rp2.400.000."
    }
  },
  {
    "slug": "beban-terutang",
    "icon": "⏳",
    "title": "Bab 5 · Beban yang Masih Harus Dibayar",
    "summary": "Beban terutang: beban terjadi lebih dahulu, pembayaran menyusul.",
    "pengertian": "Beban yang masih harus dibayar (accrued expense) adalah beban yang telah terjadi pada periode berjalan, tetapi belum dibayar dan belum dicatat, misalnya gaji, listrik, dan bunga pinjaman.",
    "tujuan": [
      "Mengakui beban pada periode terjadinya sesuai prinsip akrual.",
      "Mencatat kewajiban atau utang yang timbul dari beban tersebut."
    ],
    "karakteristik": [
      "Beban terjadi lebih dahulu, pembayaran dilakukan kemudian.",
      "Beban belum tercatat karena pembayaran atau tagihan belum dilakukan.",
      "Penyesuaian menambah beban dan menambah utang."
    ],
    "penjelasan": "Karyawan mungkin sudah bekerja pada akhir Desember, tetapi gajinya baru dibayarkan pada Januari. Gaji tersebut tetap merupakan beban Desember karena jasa karyawan telah diterima perusahaan. Karena belum dibayar, perusahaan mencatat utang gaji.",
    "ilustrasi": "Gaji dibayar setiap awal bulan. Karyawan telah bekerja selama tiga hari terakhir Desember, tetapi gaji untuk hari tersebut baru dibayarkan pada Januari.",
    "langkah": [
      "Tentukan tarif beban per hari, per bulan, atau tarif bunga per tahun.",
      "Hitung hari atau bulan beban telah terjadi tetapi belum dibayar.",
      "Kalikan untuk memperoleh nominal beban terutang.",
      "Catat Beban di debit dan Utang di kredit."
    ],
    "kesalahan": [
      "Tidak membuat penyesuaian karena pembayaran belum dilakukan.",
      "Mengkredit Kas padahal kas belum keluar; akun yang tepat adalah Utang.",
      "Lupa menghitung proporsi waktu pada bunga."
    ],
    "rangkuman": [
      "Beban terutang: beban terjadi lebih dahulu, pembayaran menyusul.",
      "Jurnal umum: Beban (D) – Utang (K)."
    ],
    "rumus": "Beban terutang = Tarif per hari/bulan × Jumlah hari/bulan yang belum dibayar. Bunga = Pokok × Tarif bunga tahunan × (Bulan berjalan ÷ 12)",
    "analisis": {
      "debit": "Beban (misalnya Beban Gaji atau Beban Bunga)",
      "kredit": "Utang (misalnya Utang Gaji atau Utang Bunga)",
      "alasan": "Beban bertambah dan kewajiban bertambah."
    },
    "contoh": {
      "soal": "gaji Rp500.000 per hari untuk tiga hari terakhir Desember belum dibayar. Beban terutang = Rp500.000 × 3 = Rp1.500.000.",
      "jawab": "Rp500.000 × 3 = Rp1.500.000",
      "jurnal": [
        {
          "akun": "Beban Gaji",
          "debit": 1500000
        },
        {
          "akun": "Utang Gaji",
          "kredit": 1500000
        }
      ]
    },
    "latihan": {
      "soal": "Pada 1 November perusahaan meminjam Rp20.000.000 dengan bunga 9% per tahun. Bunga dibayar saat jatuh tempo. Berapa penyesuaian bunga per 31 Desember?",
      "pembahasan": "Bunga = Rp20.000.000 × 9% × 2/12 = Rp300.000. Debit Beban Bunga Rp300.000 dan kredit Utang Bunga Rp300.000."
    }
  },
  {
    "slug": "pendapatan-akrual",
    "icon": "🌱",
    "title": "Bab 6 · Pendapatan yang Masih Harus Diterima",
    "summary": "Pendapatan akrual: hak sudah timbul, kas belum diterima.",
    "pengertian": "Pendapatan yang masih harus diterima (accrued revenue) adalah pendapatan yang sudah menjadi hak perusahaan karena jasa telah diberikan atau waktu telah berjalan, tetapi kas belum diterima.",
    "tujuan": [
      "Mengakui pendapatan pada periode saat pendapatan diperoleh.",
      "Mencatat piutang yang menjadi hak perusahaan."
    ],
    "karakteristik": [
      "Jasa telah diberikan atau hak pendapatan telah timbul, sedangkan kas diterima kemudian.",
      "Pendapatan belum tercatat karena belum ada penerimaan atau penagihan.",
      "Penyesuaian menambah piutang dan menambah pendapatan."
    ],
    "penjelasan": "Kondisi ini merupakan kebalikan dari beban yang masih harus dibayar. Contohnya, bunga wesel bertambah setiap bulan dan menjadi hak perusahaan, walaupun uangnya baru diterima saat jatuh tempo. Pendapatan jasa yang sudah diberikan tetapi belum ditagih juga termasuk contoh pendapatan akrual.",
    "ilustrasi": "Perusahaan memegang wesel berbunga. Bunga selama tiga bulan terakhir telah menjadi hak perusahaan, tetapi baru diterima ketika wesel jatuh tempo.",
    "langkah": [
      "Tentukan pokok, tarif bunga tahunan, dan jumlah bulan yang telah berjalan.",
      "Hitung bunga dengan rumus pokok × tarif × bulan/12.",
      "Untuk jasa yang telah selesai tetapi belum ditagih, gunakan nilai jasa yang telah diperoleh.",
      "Catat Piutang di debit dan Pendapatan di kredit."
    ],
    "kesalahan": [
      "Menunggu kas diterima sebelum mencatat pendapatan.",
      "Membalik debit dan kredit.",
      "Menghitung bunga setahun penuh padahal baru berjalan beberapa bulan."
    ],
    "rangkuman": [
      "Pendapatan akrual: hak sudah timbul, kas belum diterima.",
      "Jurnal umum: Piutang (D) – Pendapatan (K)."
    ],
    "rumus": "Bunga yang masih harus diterima = Pokok × Tarif bunga tahunan × (Bulan berjalan ÷ 12)",
    "analisis": {
      "debit": "Piutang (misalnya Piutang Bunga atau Piutang Jasa)",
      "kredit": "Pendapatan (misalnya Pendapatan Bunga atau Pendapatan Jasa)",
      "alasan": "Perusahaan memiliki hak tagih dan telah memperoleh pendapatan."
    },
    "contoh": {
      "soal": "Pada 1 Oktober diterima wesel Rp10.000.000 dengan bunga 12% per tahun dan jatuh tempo enam bulan. Penyesuaian 31 Desember: Rp10.000.000 × 12% × 3/12 = Rp300.000.",
      "jawab": "Rp10.000.000 × 12% × 3/12 = Rp300.000",
      "jurnal": [
        {
          "akun": "Piutang Bunga",
          "debit": 300000
        },
        {
          "akun": "Pendapatan Bunga",
          "kredit": 300000
        }
      ]
    },
    "latihan": {
      "soal": "Wesel Rp15.000.000 berbunga 10% per tahun diterima 1 September. Berapa piutang bunga per 31 Desember?",
      "pembahasan": "Bunga = Rp15.000.000 × 10% × 4/12 = Rp500.000. Debit Piutang Bunga Rp500.000 dan kredit Pendapatan Bunga Rp500.000."
    }
  },
  {
    "slug": "penyusutan",
    "icon": "🏭",
    "title": "Bab 7 · Penyusutan Aset Tetap",
    "summary": "Metode garis lurus = (harga perolehan – nilai residu) ÷ umur ekonomis.",
    "pengertian": "Penyusutan (depresiasi) adalah proses mengalokasikan harga perolehan aset tetap menjadi beban secara sistematis selama umur manfaatnya. Contoh aset tetap yang disusutkan adalah peralatan, kendaraan, dan gedung. Tanah pada umumnya tidak disusutkan.",
    "tujuan": [
      "Menandingkan biaya aset dengan pendapatan yang membantu dihasilkan oleh aset tersebut.",
      "Menyajikan nilai buku aset setelah memperhitungkan akumulasi penyusutan."
    ],
    "karakteristik": [
      "Diterapkan pada aset tetap berwujud yang memiliki umur manfaat terbatas.",
      "Metode garis lurus menggunakan harga perolehan, nilai residu, dan umur ekonomis.",
      "Dicatat melalui akun kontra-aset Akumulasi Penyusutan, bukan langsung mengurangi akun aset."
    ],
    "penjelasan": "Metode garis lurus membagi jumlah yang dapat disusutkan secara merata selama umur ekonomis. Jumlah yang dapat disusutkan adalah harga perolehan dikurangi nilai residu. Jika aset dibeli di tengah tahun, beban tahun pertama dihitung sesuai proporsi bulan penggunaan.",
    "ilustrasi": "Peralatan dibeli pada 1 April. Sampai 31 Desember, aset digunakan selama sembilan bulan sehingga penyusutan tahun pertama dihitung 9/12 dari penyusutan setahun.",
    "langkah": [
      "Kurangi harga perolehan dengan nilai residu.",
      "Bagi hasilnya dengan umur ekonomis untuk memperoleh penyusutan per tahun.",
      "Jika aset dibeli di tengah tahun, kalikan dengan proporsi bulan penggunaan.",
      "Catat Beban Penyusutan di debit dan Akumulasi Penyusutan di kredit."
    ],
    "kesalahan": [
      "Lupa mengurangi nilai residu sebelum membagi umur ekonomis.",
      "Mengkredit akun aset secara langsung, bukan Akumulasi Penyusutan.",
      "Tidak menghitung proporsi bulan ketika aset dibeli di tengah tahun."
    ],
    "rangkuman": [
      "Metode garis lurus = (harga perolehan – nilai residu) ÷ umur ekonomis.",
      "Gunakan Akumulasi Penyusutan di sisi kredit.",
      "Perhatikan jumlah bulan penggunaan pada tahun pembelian."
    ],
    "rumus": "Penyusutan per tahun = (Harga perolehan – Nilai residu) ÷ Umur ekonomis. Jika digunakan sebagian tahun: penyusutan tahunan × (Bulan digunakan ÷ 12)",
    "analisis": {
      "debit": "Beban Penyusutan",
      "kredit": "Akumulasi Penyusutan sebagai akun kontra-aset",
      "alasan": "Beban diakui pada periode berjalan, sedangkan akumulasi penyusutan mengurangi nilai buku aset."
    },
    "contoh": {
      "soal": "Pada 1 April 2026 dibeli peralatan Rp50.000.000, nilai residu Rp5.000.000, dan umur manfaat lima tahun. Penyusutan setahun = (Rp50.000.000 – Rp5.000.000) ÷ 5 = Rp9.000.000. Penggunaan April–Desember = 9 bulan. Penyusutan 2026 = Rp9.000.000 × 9/12 = Rp6.750.000.",
      "jawab": "(Rp50.000.000 − Rp5.000.000) ÷ 5 = Rp9.000.000 per tahun. Rp9.000.000 × 9/12 = Rp6.750.000.",
      "jurnal": [
        {
          "akun": "Beban Penyusutan Peralatan",
          "debit": 6750000
        },
        {
          "akun": "Akumulasi Penyusutan Peralatan",
          "kredit": 6750000
        }
      ]
    },
    "latihan": {
      "soal": "Mesin Rp60.000.000, nilai residu Rp6.000.000, umur enam tahun, dibeli 1 Mei. Berapa penyusutan per 31 Desember?",
      "pembahasan": "Penyusutan setahun = (Rp60.000.000 – Rp6.000.000) ÷ 6 = Rp9.000.000. Digunakan Mei–Desember = 8 bulan. Beban = Rp9.000.000 × 8/12 = Rp6.000.000. Debit Beban Penyusutan Mesin dan kredit Akumulasi Penyusutan Mesin masing-masing Rp6.000.000."
    }
  }
];

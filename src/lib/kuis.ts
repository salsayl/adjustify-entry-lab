export type Level = "Mudah" | "Sedang" | "Sulit";
export type Q =
  | { kind: "pg"; level: Level; topic: string; q: string; options: string[]; answer: number; why: string }
  | { kind: "bs"; level: Level; topic: string; q: string; answer: boolean; why: string }
  | { kind: "hitung"; level: Level; topic: string; q: string; answer: number; why: string };

// topic mengacu ke slug bab di materi.ts — dipakai untuk rekomendasi belajar.
export const KUIS: Q[] = [
  { kind: "pg", level: "Mudah", topic: "konsep-dasar", q: "Kapan jurnal penyesuaian dibuat?", options: ["Setiap ada transaksi", "Di akhir periode akuntansi", "Saat membuka usaha", "Setelah laporan keuangan dibagikan"], answer: 1, why: "Jurnal penyesuaian dibuat di akhir periode sebelum laporan keuangan disusun." },
  { kind: "bs", level: "Mudah", topic: "penyusutan", q: "Tanah termasuk aset tetap yang disusutkan.", answer: false, why: "Tanah tidak disusutkan karena umur manfaatnya dianggap tidak terbatas." },
  { kind: "pg", level: "Mudah", topic: "penyusutan", q: "Akumulasi Penyusutan Peralatan termasuk akun …", options: ["Beban", "Pendapatan", "Kontra aset", "Liabilitas"], answer: 2, why: "Akumulasi penyusutan mengurangi nilai buku aset, sehingga disebut akun kontra aset." },
  { kind: "bs", level: "Mudah", topic: "pendapatan-dimuka", q: "Pendapatan Diterima di Muka adalah akun liabilitas.", answer: true, why: "Perusahaan masih berkewajiban menyerahkan jasa/barang, sehingga dicatat sebagai liabilitas." },
  { kind: "pg", level: "Sedang", topic: "beban-terutang", q: "Gaji yang sudah menjadi hak karyawan tetapi belum dibayar dicatat dengan jurnal …", options: ["Beban Gaji (D) – Kas (K)", "Utang Gaji (D) – Beban Gaji (K)", "Beban Gaji (D) – Utang Gaji (K)", "Kas (D) – Utang Gaji (K)"], answer: 2, why: "Beban sudah terjadi (debit Beban Gaji) dan perusahaan memiliki kewajiban (kredit Utang Gaji). Kas tidak dilibatkan karena belum ada pembayaran." },
  { kind: "pg", level: "Sedang", topic: "perlengkapan", q: "Saldo Perlengkapan Rp3.000.000, sisa fisik Rp1.200.000. Jurnal penyesuaiannya …", options: ["Beban Perlengkapan (D) Rp1.200.000", "Beban Perlengkapan (D) Rp1.800.000", "Perlengkapan (D) Rp1.800.000", "Beban Perlengkapan (D) Rp3.000.000"], answer: 1, why: "Terpakai = Rp3.000.000 − Rp1.200.000 = Rp1.800.000, didebit ke Beban Perlengkapan. Yang dijurnal adalah yang terpakai, bukan sisanya." },
  { kind: "bs", level: "Sedang", topic: "pendapatan-akrual", q: "Bunga piutang yang belum diterima dicatat dengan mendebit Pendapatan Bunga.", answer: false, why: "Yang benar: Piutang Bunga (D) – Pendapatan Bunga (K). Piutang bertambah karena perusahaan punya hak menagih." },
  { kind: "hitung", level: "Sedang", topic: "beban-dimuka", q: "1 Juli dibayar asuransi Rp2.400.000 untuk 12 bulan (dicatat sebagai aset). Berapa beban asuransi yang diakui per 31 Desember? (tulis angka saja)", answer: 1200000, why: "Rp2.400.000 ÷ 12 × 6 bulan (Juli–Desember) = Rp1.200.000." },
  { kind: "pg", level: "Sulit", topic: "penyusutan", q: "Mesin Rp60.000.000, residu Rp6.000.000, umur 6 tahun, dibeli 1 Mei. Penyusutan tahun pertama (31 Des) adalah …", options: ["Rp9.000.000", "Rp6.000.000", "Rp10.000.000", "Rp7.500.000"], answer: 1, why: "(Rp60.000.000 − Rp6.000.000) ÷ 6 = Rp9.000.000/tahun × 8/12 (Mei–Desember) = Rp6.000.000." },
  { kind: "hitung", level: "Sulit", topic: "pendapatan-dimuka", q: "1 November diterima sewa Rp7.200.000 untuk 6 bulan (dicatat sebagai Sewa Diterima di Muka). Berapa pendapatan sewa yang diakui per 31 Desember?", answer: 2400000, why: "Rp7.200.000 ÷ 6 × 2 bulan (November–Desember) = Rp2.400.000." },
  { kind: "hitung", level: "Sulit", topic: "pendapatan-akrual", q: "Wesel Rp15.000.000 berbunga 10% per tahun diterima 1 September. Berapa piutang bunga per 31 Desember?", answer: 500000, why: "Rp15.000.000 × 10% × 4/12 (September–Desember) = Rp500.000." },
  { kind: "pg", level: "Sulit", topic: "persediaan", q: "Dengan pendekatan ikhtisar laba rugi, persediaan akhir barang dagang dicatat …", options: ["Ikhtisar Laba Rugi (D) – Persediaan (K)", "Persediaan (D) – Ikhtisar Laba Rugi (K)", "HPP (D) – Persediaan (K)", "Persediaan (D) – Pembelian (K)"], answer: 1, why: "Persediaan akhir dimunculkan sebagai aset (debit) dengan lawan Ikhtisar Laba Rugi (kredit). Jurnal pertama justru menutup persediaan awal." },
];

export function motivasi(pct: number) {
  if (pct >= 85) return "Hasil latihanmu sangat baik! Pertahankan dan terus berlatih dengan soal yang lebih beragam.";
  if (pct >= 70) return "Hasil yang bagus! Baca kembali pembahasan soal yang masih salah agar pemahamanmu makin kuat.";
  if (pct >= 50) return "Kamu sudah di jalur yang benar. Coba ulangi materi dan simulasi pada bagian yang masih sulit.";
  return "Tidak apa-apa, belajar butuh proses. Pelajari lagi materinya pelan-pelan, lalu coba latihan sekali lagi.";
}

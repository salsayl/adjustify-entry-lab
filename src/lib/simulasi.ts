import {
  accruedExpense,
  accruedInterest,
  prepaidUsed,
  rupiah,
  straightLine,
  suppliesUsed,
  unearnedEarned,
} from "./accounting";

export const AKUN = [
  "Kas",
  "Beban Sewa",
  "Sewa Dibayar di Muka",
  "Beban Asuransi",
  "Asuransi Dibayar di Muka",
  "Pendapatan Sewa",
  "Sewa Diterima di Muka",
  "Pendapatan Jasa",
  "Pendapatan Diterima di Muka",
  "Beban Gaji",
  "Utang Gaji",
  "Beban Bunga",
  "Utang Bunga",
  "Piutang Bunga",
  "Pendapatan Bunga",
  "Piutang Jasa",
  "Beban Penyusutan Peralatan",
  "Akumulasi Penyusutan Peralatan",
  "Beban Penyusutan Kendaraan",
  "Akumulasi Penyusutan Kendaraan",
  "Beban Perlengkapan",
  "Perlengkapan",
];

export type Sim = {
  id: string;
  type: string;
  title: string;
  kasus: string;
  amount: number;
  debit: string;
  kredit: string;
  steps: string[];
};

export const SIM_TYPES = [
  "Beban Dibayar di Muka",
  "Pendapatan Diterima di Muka",
  "Beban Masih Harus Dibayar",
  "Pendapatan Masih Harus Diterima",
  "Penyusutan Aset Tetap",
  "Pemakaian Perlengkapan",
];

const a1 = prepaidUsed(12000000, 12, 3);
const a2 = prepaidUsed(4800000, 24, 5);
const b1 = unearnedEarned(6000000, 6, 4);
const b2 = unearnedEarned(9000000, 12, 2);
const c1 = accruedExpense(500000, 3);
const c2 = accruedInterest(20000000, 9, 2);
const d1 = accruedInterest(10000000, 12, 3);
const d2 = 2500000;
const e1 = straightLine(50000000, 5000000, 5, 9);
const e2 = straightLine(180000000, 30000000, 10, 12);
const f1 = suppliesUsed(2500000, 800000);
const f2 = suppliesUsed(3750000, 1250000);

export const SIMS: Sim[] = [
  {
    id: "a1", type: SIM_TYPES[0], title: "Sewa toko dibayar di muka",
    kasus: "Tanggal 1 Oktober 2026, UD Melati membayar sewa toko Rp12.000.000 untuk 12 bulan dan mencatatnya sebagai Sewa Dibayar di Muka. Buat jurnal penyesuaian per 31 Desember 2026.",
    amount: a1, debit: "Beban Sewa", kredit: "Sewa Dibayar di Muka",
    steps: ["Sewa per bulan = Rp12.000.000 ÷ 12 = Rp1.000.000", "Masa terpakai 1 Okt – 31 Des = 3 bulan", `Beban sewa = Rp1.000.000 × 3 = ${rupiah(a1)}`, "Aset berkurang (kredit) dan beban bertambah (debit)."],
  },
  {
    id: "a2", type: SIM_TYPES[0], title: "Asuransi 2 tahun",
    kasus: "Tanggal 1 Agustus 2026 dibayar premi asuransi Rp4.800.000 untuk 24 bulan, dicatat sebagai Asuransi Dibayar di Muka. Buat penyesuaian per 31 Desember 2026.",
    amount: a2, debit: "Beban Asuransi", kredit: "Asuransi Dibayar di Muka",
    steps: ["Premi per bulan = Rp4.800.000 ÷ 24 = Rp200.000", "Masa terpakai 1 Agu – 31 Des = 5 bulan", `Beban asuransi = Rp200.000 × 5 = ${rupiah(a2)}`],
  },
  {
    id: "b1", type: SIM_TYPES[1], title: "Sewa diterima di muka",
    kasus: "Tanggal 1 September 2026 diterima uang sewa ruko Rp6.000.000 untuk 6 bulan, dicatat sebagai Sewa Diterima di Muka. Buat penyesuaian per 31 Desember 2026.",
    amount: b1, debit: "Sewa Diterima di Muka", kredit: "Pendapatan Sewa",
    steps: ["Sewa per bulan = Rp6.000.000 ÷ 6 = Rp1.000.000", "Masa berjalan 1 Sep – 31 Des = 4 bulan", `Pendapatan yang diakui = ${rupiah(b1)}`, "Liabilitas berkurang (debit), pendapatan bertambah (kredit)."],
  },
  {
    id: "b2", type: SIM_TYPES[1], title: "Kontrak jasa 1 tahun",
    kasus: "Tanggal 1 November 2026 perusahaan jasa menerima Rp9.000.000 untuk kontrak perawatan 12 bulan, dicatat sebagai Pendapatan Diterima di Muka. Buat penyesuaian per 31 Desember 2026.",
    amount: b2, debit: "Pendapatan Diterima di Muka", kredit: "Pendapatan Jasa",
    steps: ["Per bulan = Rp9.000.000 ÷ 12 = Rp750.000", "Masa berjalan Nov – Des = 2 bulan", `Pendapatan jasa = Rp750.000 × 2 = ${rupiah(b2)}`],
  },
  {
    id: "c1", type: SIM_TYPES[2], title: "Gaji belum dibayar",
    kasus: "Gaji karyawan Rp500.000 per hari. Pada 31 Desember 2026, gaji untuk 3 hari kerja terakhir belum dibayar dan belum dicatat. Buat jurnal penyesuaian.",
    amount: c1, debit: "Beban Gaji", kredit: "Utang Gaji",
    steps: ["Gaji per hari = Rp500.000", "Hari belum dibayar = 3 hari", `Beban gaji terutang = Rp500.000 × 3 = ${rupiah(c1)}`],
  },
  {
    id: "c2", type: SIM_TYPES[2], title: "Bunga pinjaman bank",
    kasus: "Tanggal 1 November 2026 perusahaan meminjam Rp20.000.000 dari bank dengan bunga 9% per tahun. Bunga dibayar saat jatuh tempo. Buat penyesuaian bunga per 31 Desember 2026.",
    amount: c2, debit: "Beban Bunga", kredit: "Utang Bunga",
    steps: ["Rumus: Pokok × Tarif × (bulan ÷ 12)", "Masa berjalan Nov – Des = 2 bulan", `Bunga = Rp20.000.000 × 9% × 2/12 = ${rupiah(c2)}`],
  },
  {
    id: "d1", type: SIM_TYPES[3], title: "Bunga piutang wesel",
    kasus: "Tanggal 1 Oktober 2026 diterima wesel Rp10.000.000 berbunga 12% per tahun, jangka waktu 6 bulan. Buat penyesuaian bunga per 31 Desember 2026.",
    amount: d1, debit: "Piutang Bunga", kredit: "Pendapatan Bunga",
    steps: ["Rumus: Pokok × Tarif × (bulan ÷ 12)", "Masa berjalan Okt – Des = 3 bulan", `Bunga = Rp10.000.000 × 12% × 3/12 = ${rupiah(d1)}`],
  },
  {
    id: "d2", type: SIM_TYPES[3], title: "Jasa selesai belum ditagih",
    kasus: "Pada 31 Desember 2026, perusahaan konsultan telah menyelesaikan pekerjaan untuk klien senilai Rp2.500.000, tetapi tagihan baru dikirim dan dibayar bulan Januari 2027. Buat jurnal penyesuaian.",
    amount: d2, debit: "Piutang Jasa", kredit: "Pendapatan Jasa",
    steps: ["Jasa sudah selesai, jadi pendapatan sudah menjadi hak perusahaan di tahun 2026.", "Uang belum diterima, maka dicatat sebagai piutang.", `Nominal = ${rupiah(d2)}`],
  },
  {
    id: "e1", type: SIM_TYPES[4], title: "Penyusutan peralatan",
    kasus: "Tanggal 1 April 2026 dibeli peralatan seharga Rp50.000.000, nilai residu Rp5.000.000, umur ekonomis 5 tahun (metode garis lurus). Hitung penyusutan per 31 Desember 2026.",
    amount: e1, debit: "Beban Penyusutan Peralatan", kredit: "Akumulasi Penyusutan Peralatan",
    steps: ["Penyusutan per tahun = (Rp50.000.000 − Rp5.000.000) ÷ 5 = Rp9.000.000", "Masa pemakaian 1 Apr – 31 Des = 9 bulan", `Penyusutan = Rp9.000.000 × 9/12 = ${rupiah(e1)}`],
  },
  {
    id: "e2", type: SIM_TYPES[4], title: "Penyusutan kendaraan",
    kasus: "Kendaraan dibeli 2 Januari 2026 seharga Rp180.000.000, nilai residu Rp30.000.000, umur ekonomis 10 tahun (garis lurus). Hitung penyusutan per 31 Desember 2026.",
    amount: e2, debit: "Beban Penyusutan Kendaraan", kredit: "Akumulasi Penyusutan Kendaraan",
    steps: ["Penyusutan per tahun = (Rp180.000.000 − Rp30.000.000) ÷ 10", `Dipakai satu tahun penuh = ${rupiah(e2)}`],
  },
  {
    id: "f1", type: SIM_TYPES[5], title: "Perlengkapan kantor",
    kasus: "Saldo akun Perlengkapan pada neraca saldo 31 Desember 2026 sebesar Rp2.500.000. Hasil perhitungan fisik, perlengkapan yang tersisa Rp800.000. Buat penyesuaian.",
    amount: f1, debit: "Beban Perlengkapan", kredit: "Perlengkapan",
    steps: ["Rumus: Saldo − Sisa fisik", `Terpakai = Rp2.500.000 − Rp800.000 = ${rupiah(f1)}`],
  },
  {
    id: "f2", type: SIM_TYPES[5], title: "Perlengkapan toko",
    kasus: "Saldo awal perlengkapan Rp1.250.000 dan selama tahun dibeli Rp2.500.000 (saldo neraca saldo Rp3.750.000). Sisa perlengkapan 31 Desember Rp1.250.000. Buat penyesuaian.",
    amount: f2, debit: "Beban Perlengkapan", kredit: "Perlengkapan",
    steps: ["Saldo perlengkapan = Rp1.250.000 + Rp2.500.000 = Rp3.750.000", `Terpakai = Rp3.750.000 − Rp1.250.000 = ${rupiah(f2)}`],
  },
];

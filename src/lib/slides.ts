import { rupiah } from "./accounting";
import type { Jurnal, Materi } from "./materi";

export type Slide =
  | { kind: "judul"; title: string; text: string; icon: string; narasi: string }
  | { kind: "poin"; title: string; text: string; no: number; narasi: string }
  | { kind: "kotak"; title: string; text: string; label: string; tone: "cream" | "pink"; narasi: string }
  | { kind: "list"; title: string; label: string; items: string[]; narasi: string }
  | { kind: "jurnal"; title: string; soal: string; jawab: string; jurnal: Jurnal; narasi: string };

function jurnalNarasi(j: Jurnal) {
  return j.map((r) => (r.debit ? `Debit ${r.akun} sebesar ${rupiah(r.debit)}.` : `Kredit ${r.akun} sebesar ${rupiah(r.kredit!)}.`)).join(" ");
}

export function buildSlides(m: Materi): Slide[] {
  const s: Slide[] = [
    { kind: "judul", title: m.title, text: m.summary, icon: m.icon, narasi: `${m.title}. ${m.summary}` },
    { kind: "kotak", title: "Pengertian", label: "💡 Apa itu?", text: m.pengertian, tone: "cream", narasi: `Pengertian. ${m.pengertian}` },
    { kind: "list", title: "Tujuan & Fungsi", label: "🎯 Untuk apa?", items: m.tujuan, narasi: `Tujuan dan fungsinya. ${m.tujuan.join(" ")}` },
    { kind: "list", title: "Karakteristik Transaksi", label: "🔍 Ciri-cirinya", items: m.karakteristik, narasi: `Karakteristik transaksinya. ${m.karakteristik.join(" ")}` },
    { kind: "kotak", title: "Penjelasan Konsep", label: "🧠 Pelan-pelan ya", text: m.penjelasan, tone: "pink", narasi: m.penjelasan },
    { kind: "kotak", title: "Ilustrasi Transaksi", label: "🧾 Bayangkan situasinya", text: m.ilustrasi, tone: "cream", narasi: `Ilustrasi transaksi. ${m.ilustrasi}` },
  ];
  if (m.rumus)
    s.push({ kind: "kotak", title: "Rumus Menghitung Nominal", label: "📐 Ingat rumus ini", text: m.rumus, tone: "pink", narasi: `Rumusnya: ${m.rumus}` });
  s.push({ kind: "list", title: "Langkah Penyelesaian", label: "🪜 Ikuti urutannya", items: m.langkah, narasi: `Langkah penyelesaiannya. ${m.langkah.join(" ")}` });
  if (m.analisis)
    s.push({
      kind: "kotak",
      title: "Analisis Debit & Kredit",
      label: "⚖️ Debit dan kreditnya",
      text: `Debit: ${m.analisis.debit}. Kredit: ${m.analisis.kredit}. ${m.analisis.alasan}`,
      tone: "cream",
      narasi: `Analisis akun. Debit: ${m.analisis.debit}. Kredit: ${m.analisis.kredit}. ${m.analisis.alasan}`,
    });
  if (m.contoh)
    s.push({
      kind: "jurnal", title: "Contoh Soal & Jurnal", soal: m.contoh.soal, jawab: m.contoh.jawab, jurnal: m.contoh.jurnal,
      narasi: `Contoh soal. ${m.contoh.soal} Perhitungannya: ${m.contoh.jawab}. Jurnalnya: ${jurnalNarasi(m.contoh.jurnal)}`,
    });
  s.push(
    { kind: "list", title: "Kesalahan yang Sering Terjadi", label: "⚠️ Hati-hati", items: m.kesalahan, narasi: `Kesalahan yang sering dilakukan. ${m.kesalahan.join(" ")}` },
    { kind: "list", title: "Rangkuman", label: "📌 Inti bab ini", items: m.rangkuman, narasi: `Rangkuman. ${m.rangkuman.join(" ")}` },
    {
      kind: "kotak",
      title: "Latihan Singkat",
      label: "✍️ Coba jawab dulu, lalu baca pembahasan",
      text: `${m.latihan.soal} — Pembahasan: ${m.latihan.pembahasan}`,
      tone: "pink",
      narasi: `Latihan. ${m.latihan.soal} Pembahasannya: ${m.latihan.pembahasan}`,
    },
  );
  return s;
}

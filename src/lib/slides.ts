import { rupiah } from "./accounting";
import type { Jurnal, Materi } from "./materi";

export type Slide =
  | { kind: "judul"; title: string; text: string; icon: string; narasi: string }
  | { kind: "poin"; title: string; text: string; no: number; narasi: string }
  | { kind: "kotak"; title: string; text: string; label: string; tone: "cream" | "pink"; narasi: string }
  | { kind: "jurnal"; title: string; soal: string; jawab: string; jurnal: Jurnal; narasi: string };

function jurnalNarasi(j: Jurnal) {
  return j.map((r) => (r.debit ? `Debit ${r.akun} sebesar ${rupiah(r.debit)}.` : `Kredit ${r.akun} sebesar ${rupiah(r.kredit!)}.`)).join(" ");
}

export function buildSlides(m: Materi): Slide[] {
  const s: Slide[] = [
    { kind: "judul", title: m.title, text: m.summary, icon: m.icon, narasi: `${m.title}. ${m.summary}` },
  ];
  m.points.forEach((p, i) => s.push({ kind: "poin", title: m.title, text: p, no: i + 1, narasi: p }));
  if (m.ilustrasi)
    s.push({ kind: "kotak", title: "Ilustrasi Transaksi", label: "🧾 Bayangkan situasinya", text: m.ilustrasi, tone: "cream", narasi: `Ilustrasi transaksi. ${m.ilustrasi}` });
  if (m.rumus)
    s.push({ kind: "kotak", title: "Rumus", label: "📐 Ingat rumus ini", text: m.rumus, tone: "pink", narasi: `Rumusnya: ${m.rumus}` });
  if (m.contoh)
    s.push({
      kind: "jurnal", title: "Contoh Soal & Jurnal", soal: m.contoh.soal, jawab: m.contoh.jawab, jurnal: m.contoh.jurnal,
      narasi: `Contoh soal. ${m.contoh.soal} Perhitungannya: ${m.contoh.jawab}. Jurnalnya: ${jurnalNarasi(m.contoh.jurnal)}`,
    });
  return s;
}

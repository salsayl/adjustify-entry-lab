import type { Jurnal, Materi } from "./materi";

export type Slide =
  | { kind: "judul"; title: string; text: string; icon: string }
  | { kind: "kotak"; title: string; text: string; label: string; tone: "cream" | "pink" }
  | { kind: "list"; title: string; label: string; items: string[]; start: number }
  | { kind: "jurnal"; title: string; soal: string; jawab: string; jurnal: Jurnal };

// Split source paragraphs at sentence boundaries; never summarize away source content.
function textSlides(title: string, text: string, label: string, tone: "cream" | "pink" = "cream"): Slide[] {
  const sentences = text.match(/[^.!?]+(?:[.!?](?=\s|$)|$)/g) ?? [text];
  const chunks: string[] = [];
  let chunk = "";
  for (const sentence of sentences) {
    const next = sentence.trim();
    if (chunk && (chunk + next).length > 360) { chunks.push(chunk); chunk = ""; }
    chunk = [chunk, next].filter(Boolean).join(" ");
  }
  if (chunk) chunks.push(chunk);
  return chunks.map((part, i) => ({ kind: "kotak", title: chunks.length > 1 ? `${title} · ${i + 1}` : title, text: part, label, tone }));
}

function listSlides(title: string, label: string, items: string[]): Slide[] {
  const slides: Slide[] = [];
  for (let i = 0; i < items.length; i += 3) {
    slides.push({ kind: "list", title, label, items: items.slice(i, i + 3), start: i + 1 });
  }
  return slides;
}

export function buildSlides(m: Materi): Slide[] {
  const s: Slide[] = [
    { kind: "judul", title: m.title, text: m.summary, icon: m.icon },
    ...textSlides("Pengertian", m.pengertian, "Konsep dasar"),
    ...listSlides("Tujuan & Fungsi", "Mengapa perlu disesuaikan?", m.tujuan),
    ...listSlides("Karakteristik Transaksi", "Ciri-cirinya", m.karakteristik),
    ...textSlides("Penjelasan Konsep", m.penjelasan, "Pahami situasinya", "pink"),
    ...textSlides("Ilustrasi Transaksi", m.ilustrasi, "Transaksi dalam kehidupan sehari-hari"),
  ];
  for (const extra of m.tambahan ?? []) {
    s.push(...textSlides(extra.title, extra.text, "Pendalaman konsep", "pink"));
    if (extra.jurnal) s.push({ kind: "jurnal", title: "Jurnal · " + extra.title, soal: "", jawab: "", jurnal: extra.jurnal });
  }
  if (m.rumus) s.push(...textSlides("Rumus Menghitung Nominal", m.rumus, "Rumus penyesuaian", "pink"));
  s.push(...listSlides("Langkah Penyelesaian", "Kerjakan sesuai urutan", m.langkah));
  if (m.analisis) {
    s.push(...listSlides("Analisis Debit & Kredit", "Akun yang berubah", [
      `Debit: ${m.analisis.debit}.`, `Kredit: ${m.analisis.kredit}.`, m.analisis.alasan,
    ]));
  }
  if (m.contoh) {
    s.push(...textSlides("Contoh Soal", m.contoh.soal, "Baca kasusnya"));
    s.push(...textSlides("Perhitungan", m.contoh.jawab, "Nominal penyesuaian", "pink"));
    s.push({ kind: "jurnal", title: "Jurnal Penyesuaian", soal: "", jawab: "", jurnal: m.contoh.jurnal });
  }
  s.push(...listSlides("Kesalahan yang Sering Terjadi", "Perhatikan kembali", m.kesalahan));
  s.push(...listSlides("Rangkuman", "Inti bab ini", m.rangkuman));
  s.push(...textSlides("Latihan Singkat", m.latihan.soal, "Coba jawab terlebih dahulu"));
  s.push(...textSlides("Pembahasan Latihan", m.latihan.pembahasan, "Bandingkan dengan jawabanmu", "pink"));
  return s;
}

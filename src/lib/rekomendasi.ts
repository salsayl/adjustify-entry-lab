// Rekomendasi belajar otomatis: dihitung dari jawaban kuis yang benar-benar
// dikerjakan siswa (bukan acak). Topik dengan jawaban salah terbanyak
// direkomendasikan untuk dipelajari ulang.
import { MATERI } from "./materi";
import type { QuizAnswer } from "./learning";

export type Rekomendasi = { slug: string; title: string; icon: string; salah: number };

export function hitungRekomendasi(answers: QuizAnswer[]): Rekomendasi[] {
  const salahPerTopik = new Map<string, number>();
  for (const a of answers) {
    if (!a.isCorrect) salahPerTopik.set(a.topic, (salahPerTopik.get(a.topic) ?? 0) + 1);
  }
  return [...salahPerTopik.entries()]
    .map(([slug, salah]) => {
      const m = MATERI.find((x) => x.slug === slug);
      return m ? { slug, title: m.title, icon: m.icon, salah } : null;
    })
    .filter((x): x is Rekomendasi => x !== null)
    .sort((a, b) => b.salah - a.salah);
}

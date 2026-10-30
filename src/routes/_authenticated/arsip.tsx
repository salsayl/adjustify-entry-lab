import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageTitle } from "@/components/SiteHeader";
import { MATERI } from "@/lib/materi";
import { SIMS } from "@/lib/simulasi";
import { useLearning, type QuizAttempt } from "@/lib/learning";

export const Route = createFileRoute("/_authenticated/arsip")({
  head: () => ({
    meta: [
      { title: "Arsip Belajar — ADJUSTIFY" },
      { name: "description", content: "Arsip belajar pribadi: materi yang selesai, riwayat kuis beserta jawaban, dan riwayat simulasi." },
    ],
  }),
  component: ArsipPage,
});

function fmtTgl(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function ArsipPage() {
  const { data, isLoading } = useLearning();
  const [openQuiz, setOpenQuiz] = useState<string | null>(null);

  const materiDone = new Set((data?.materi ?? []).filter((m) => m.completed).map((m) => m.materi_slug));

  return (
    <>
      <PageTitle tag="Arsip" title="Arsip Belajar Pribadi" desc="Semua jejak belajarmu tersimpan aman di akunmu — tetap ada meski kamu keluar dan masuk lagi." />
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-10">
        {isLoading && <p className="text-center text-muted-foreground">Memuat arsip…</p>}

        {data && (
          <>
            <section className="card-soft p-6">
              <h2 className="text-xl font-bold">📚 Materi yang sudah dipelajari</h2>
              <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                {MATERI.map((m) => (
                  <li key={m.slug} className={"rounded-xl px-3 py-2 " + (materiDone.has(m.slug) ? "bg-sage" : "bg-muted text-muted-foreground")}>
                    {materiDone.has(m.slug) ? "✓" : "○"} {m.icon} {m.title}
                  </li>
                ))}
              </ul>
            </section>

            <section className="card-soft p-6">
              <h2 className="text-xl font-bold">📝 Riwayat kuis</h2>
              {data.quizzes.length === 0 && <p className="mt-3 text-sm text-muted-foreground">Belum ada. <Link to="/kuis" className="text-primary underline">Kerjakan kuis pertamamu</Link>.</p>}
              <div className="mt-3 space-y-3">
                {data.quizzes.map((q) => (
                  <QuizCard key={q.id} q={q} open={openQuiz === q.id} onToggle={() => setOpenQuiz(openQuiz === q.id ? null : q.id)} />
                ))}
              </div>
            </section>

            <section className="card-soft p-6">
              <h2 className="text-xl font-bold">🧮 Riwayat simulasi</h2>
              {data.sims.length === 0 && <p className="mt-3 text-sm text-muted-foreground">Belum ada. <Link to="/simulasi" className="text-primary underline">Coba simulasi</Link>.</p>}
              <ul className="mt-3 space-y-2 text-sm">
                {data.sims.slice(0, 20).map((s) => {
                  const sim = SIMS.find((x) => x.id === s.sim_id);
                  return (
                    <li key={s.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted px-3 py-2">
                      <span>{sim ? sim.title : s.sim_id} <span className="text-muted-foreground">· {fmtTgl(s.created_at)}</span></span>
                      <span className={"rounded-full px-2.5 py-0.5 text-xs font-bold " + (s.is_correct ? "bg-sage" : "bg-pink")}>
                        {s.is_correct ? "Benar" : `Salah (${s.attempts}× percobaan)`}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          </>
        )}
      </div>
    </>
  );
}

function QuizCard({ q, open, onToggle }: { q: QuizAttempt; open: boolean; onToggle: () => void }) {
  const pct = Math.round((q.correct_count / q.total_count) * 100);
  return (
    <div className="rounded-2xl border bg-card">
      <button onClick={onToggle} className="flex w-full flex-wrap items-center justify-between gap-2 px-4 py-3 text-left">
        <span className="text-sm">{fmtTgl(q.created_at)}</span>
        <span className="flex items-center gap-3 text-sm">
          <span className="font-bold">{q.correct_count}/{q.total_count} · {pct}%</span>
          <span className="text-primary underline">{open ? "Tutup pembahasan" : "Lihat pembahasan"}</span>
        </span>
      </button>
      {open && (
        <div className="space-y-3 border-t p-4">
          {q.answers.map((a) => (
            <div key={a.i} className={"rounded-xl p-3 text-sm " + (a.isCorrect ? "bg-sage/60" : "bg-pink/60")}>
              <p className="font-semibold">{a.i + 1}. {a.q}</p>
              <p className="mt-1">Jawabanmu: <b>{a.chosen}</b> {a.isCorrect ? "✓" : `· Jawaban benar: ${a.correct}`}</p>
              <p className="mt-1 text-muted-foreground">{a.why}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

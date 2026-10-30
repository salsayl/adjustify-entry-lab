import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageTitle } from "@/components/SiteHeader";
import { motivasi } from "@/lib/kuis";
import { hitungRekomendasi } from "@/lib/rekomendasi";
import { useLearning } from "@/lib/learning";

export const Route = createFileRoute("/_authenticated/hasil")({
  head: () => ({
    meta: [
      { title: "Evaluasi Kuis — ADJUSTIFY" },
      { name: "description", content: "Nilai, waktu pengerjaan, pembahasan tiap soal, dan rekomendasi materi dari kuis terakhirmu." },
      { property: "og:title", content: "Evaluasi Kuis — ADJUSTIFY" },
      { property: "og:description", content: "Pembahasan lengkap hasil kuis jurnal penyesuaian." },
    ],
  }),
  component: HasilPage,
});

function fmtWaktu(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? `${m} menit ${s} detik` : `${s} detik`;
}

function HasilPage() {
  const { data, isLoading } = useLearning();
  const [showAll, setShowAll] = useState(false);
  const q = data?.quizzes[0];

  if (isLoading) {
    return <div className="mx-auto max-w-4xl px-4 py-16 text-center text-muted-foreground">Memuat hasil…</div>;
  }

  if (!q) {
    return (
      <>
        <PageTitle tag="Evaluasi" title="Evaluasi Kuis" desc="Hasil dan pembahasan kuis akan tampil di sini." />
        <div className="mx-auto max-w-xl px-4 py-10">
          <div className="card-soft p-8 text-center">
            <div className="text-5xl">📝</div>
            <p className="mt-3 font-semibold">Kamu belum mengerjakan kuis.</p>
            <Link to="/kuis" className="btn btn-primary mt-4">Mulai Kuis</Link>
          </div>
        </div>
      </>
    );
  }

  const pct = Math.round((q.correct_count / q.total_count) * 100);
  const salah = q.answers.filter((a) => !a.isCorrect);
  const rekom = hitungRekomendasi(q.answers);
  const shown = showAll ? q.answers : salah;

  return (
    <>
      <PageTitle tag="Evaluasi" title="Hasil & Pembahasan Kuis" desc="Kuis terakhirmu sudah dinilai. Baca pembahasannya pelan-pelan ya." />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="card-soft fade-up p-6 text-center">
          <div className="mx-auto grid h-36 w-36 place-items-center rounded-full"
            style={{ background: `conic-gradient(var(--primary) ${pct * 3.6}deg, var(--lavender) 0)` }}>
            <div className="grid h-28 w-28 place-items-center rounded-full bg-card">
              <span className="font-display text-3xl font-bold">{pct}%</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Skor" value={`${q.correct_count}/${q.total_count}`} cls="bg-lavender" />
            <Stat label="Benar" value={q.correct_count} cls="bg-sage" />
            <Stat label="Salah" value={q.total_count - q.correct_count} cls="bg-pink" />
            <Stat label="Waktu" value={fmtWaktu(q.duration_seconds)} cls="bg-cream" />
          </div>
          <p className="mx-auto mt-6 max-w-lg rounded-2xl bg-cream p-4">{motivasi(pct)}</p>
          <p className="mt-2 text-xs text-muted-foreground">Skor ini gambaran hasil latihan, bukan ukuran penguasaan materi secara keseluruhan.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/kuis" className="btn btn-primary">Ulangi Kuis</Link>
            <Link to="/materi" className="btn btn-outline">Pelajari Ulang Materi</Link>
            <Link to="/dashboard" className="btn btn-outline">Ke Dashboard</Link>
          </div>
        </div>

        {rekom.length > 0 && (
          <div className="card-soft mt-8 p-6">
            <h2 className="text-xl font-bold">🎯 Rekomendasi belajarmu</h2>
            <p className="mt-1 text-sm text-muted-foreground">Berdasarkan soal yang masih salah pada kuis ini:</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {rekom.map((r) => (
                <Link key={r.slug} to="/materi" className="rounded-2xl bg-lavender p-4 transition hover:-translate-y-0.5">
                  <p className="font-semibold">{r.icon} {r.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{r.salah} soal salah pada topik ini — pelajari lagi ya.</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Pembahasan per soal</h2>
            <button className="btn btn-outline px-4 py-2 text-sm" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Tampilkan yang salah saja" : "Tampilkan semua soal"}
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {shown.length === 0 && (
              <p className="card-soft p-6 text-center text-muted-foreground">Semua jawabanmu benar — tidak ada yang perlu dibahas. 🎉</p>
            )}
            {shown.map((a) => (
              <div key={a.i} className={"card-soft p-5 " + (a.isCorrect ? "" : "border-destructive/40")}>
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold">Soal {a.i + 1}. {a.q}</p>
                  <span className={"shrink-0 rounded-full px-3 py-1 text-xs font-bold " + (a.isCorrect ? "bg-sage" : "bg-pink")}>
                    {a.isCorrect ? "Benar" : "Salah"}
                  </span>
                </div>
                {!a.isCorrect && (
                  <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                    <p className="rounded-xl bg-pink p-3"><b>Jawabanmu:</b> {a.chosen}</p>
                    <p className="rounded-xl bg-sage p-3"><b>Jawaban benar:</b> {a.correct}</p>
                  </div>
                )}
                <p className="mt-3 rounded-xl bg-muted p-3 text-sm"><b>Pembahasan:</b> {a.why}</p>
                {!a.isCorrect && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    📖 Pelajari lagi: <Link to="/materi" className="font-semibold text-primary underline">{a.topic.replace(/-/g, " ")}</Link>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value, cls }: { label: string; value: string | number; cls: string }) {
  return (
    <div className={`rounded-2xl p-4 ${cls}`}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-display text-2xl font-bold">{value}</p>
    </div>
  );
}

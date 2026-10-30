import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle } from "@/components/SiteHeader";
import { motivasi } from "@/lib/kuis";
import { MATERI } from "@/lib/materi";
import { SIMS } from "@/lib/simulasi";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/hasil")({
  head: () => ({
    meta: [
      { title: "Hasil Belajar — ADJUSTIFY" },
      { name: "description", content: "Lihat skor kuis, jumlah jawaban benar dan salah, serta progress belajar jurnal penyesuaian." },
      { property: "og:title", content: "Hasil Belajar — ADJUSTIFY" },
      { property: "og:description", content: "Ringkasan hasil latihan jurnal penyesuaian." },
    ],
  }),
  component: HasilPage,
});

function HasilPage() {
  const { progress, reset } = useProgress();
  const q = progress.quiz;
  const pct = q ? Math.round((q.correct / q.total) * 100) : 0;

  return (
    <>
      <PageTitle tag="Hasil" title="Hasil Belajar" desc="Ringkasan hasil latihan dan progress belajarmu (tersimpan di perangkat ini)." />
      <div className="mx-auto max-w-4xl px-4 py-10">
        {q ? (
          <div className="card-soft fade-up p-6 text-center">
            <div className="mx-auto grid h-36 w-36 place-items-center rounded-full"
              style={{ background: `conic-gradient(var(--primary) ${pct * 3.6}deg, var(--lavender) 0)` }}>
              <div className="grid h-28 w-28 place-items-center rounded-full bg-card">
                <span className="font-display text-3xl font-bold">{pct}%</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <Stat label="Skor" value={`${q.correct}/${q.total}`} cls="bg-lavender" />
              <Stat label="Benar" value={q.correct} cls="bg-sage" />
              <Stat label="Salah" value={q.total - q.correct} cls="bg-pink" />
            </div>
            <p className="mx-auto mt-6 max-w-lg rounded-2xl bg-cream p-4">{motivasi(pct)}</p>
            <p className="mt-2 text-xs text-muted-foreground">Skor ini adalah gambaran hasil latihan, bukan ukuran penguasaan materi secara keseluruhan.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/kuis" className="btn btn-primary">Ulangi Latihan</Link>
              <Link to="/materi" className="btn btn-outline">Pelajari Materi Lagi</Link>
              <Link to="/" className="btn btn-outline">Kembali ke Beranda</Link>
            </div>
          </div>
        ) : (
          <div className="card-soft p-8 text-center">
            <div className="text-5xl">📝</div>
            <p className="mt-3 font-semibold">Kamu belum mengerjakan kuis.</p>
            <Link to="/kuis" className="btn btn-primary mt-4">Mulai Kuis</Link>
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Stat label="Materi dibaca" value={`${progress.materiRead.length}/${MATERI.length}`} cls="bg-card border" />
          <Stat label="Simulasi dijawab benar" value={`${progress.simSolved.length}/${SIMS.length}`} cls="bg-card border" />
        </div>
        <div className="mt-6 text-center">
          <button className="text-sm text-muted-foreground underline" onClick={() => { if (confirm("Hapus semua progress belajar?")) reset(); }}>
            Reset progress
          </button>
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

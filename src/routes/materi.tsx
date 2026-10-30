import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageTitle } from "@/components/SiteHeader";
import { JurnalTable } from "@/components/JurnalTable";
import { MATERI } from "@/lib/materi";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/materi")({
  head: () => ({
    meta: [
      { title: "Materi Jurnal Penyesuaian — ADJUSTIFY" },
      { name: "description", content: "Sembilan modul jurnal penyesuaian lengkap dengan rumus, contoh soal, dan jurnal debit-kredit." },
      { property: "og:title", content: "Materi Jurnal Penyesuaian — ADJUSTIFY" },
      { property: "og:description", content: "Modul ringkas jurnal penyesuaian untuk mahasiswa." },
    ],
  }),
  component: MateriPage,
});

function MateriPage() {
  const [open, setOpen] = useState<string | null>(MATERI[0].slug);
  const { progress, markMateri } = useProgress();
  return (
    <>
      <PageTitle tag="Materi" title="Modul Jurnal Penyesuaian" desc="Buka modul satu per satu. Tandai selesai setelah kamu membacanya." />
      <div className="mx-auto max-w-4xl space-y-4 px-4 py-10">
        {MATERI.map((m, i) => {
          const isOpen = open === m.slug;
          const done = progress.materiRead.includes(m.slug);
          return (
            <article key={m.slug} className="card-soft overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : m.slug)} className="flex w-full items-center gap-4 p-5 text-left">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-lavender text-2xl">{m.icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-primary">Modul {i + 1}{done && " · ✓ Selesai"}</p>
                  <h2 className="text-lg font-bold">{m.title}</h2>
                  <p className="text-sm text-muted-foreground">{m.summary}</p>
                </div>
                <span className={"text-xl transition " + (isOpen ? "rotate-180" : "")}>⌄</span>
              </button>
              {isOpen && (
                <div className="fade-up space-y-5 border-t px-5 pb-6 pt-5">
                  <ul className="list-disc space-y-2 pl-5">{m.points.map((p) => <li key={p}>{p}</li>)}</ul>
                  {m.ilustrasi && (
                    <div className="rounded-2xl bg-cream p-4"><p className="text-sm font-semibold">🧾 Ilustrasi transaksi</p><p className="mt-1">{m.ilustrasi}</p></div>
                  )}
                  {m.rumus && (
                    <div className="rounded-2xl bg-pink p-4"><p className="text-sm font-semibold">📐 Rumus</p><p className="mt-1 font-medium">{m.rumus}</p></div>
                  )}
                  {m.contoh && (
                    <div className="rounded-2xl bg-sage/50 p-4">
                      <p className="text-sm font-semibold">✍️ Contoh soal</p>
                      <p className="mt-1">{m.contoh.soal}</p>
                      <p className="mt-2 text-sm"><b>Perhitungan:</b> {m.contoh.jawab}</p>
                      <div className="mt-3"><JurnalTable rows={m.contoh.jurnal} /></div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <button className="btn btn-primary" disabled={done} onClick={() => markMateri(m.slug)}>
                      {done ? "✓ Sudah dibaca" : "Tandai selesai"}
                    </button>
                    {i < MATERI.length - 1 && (
                      <button className="btn btn-outline" onClick={() => { markMateri(m.slug); setOpen(MATERI[i + 1].slug); }}>
                        Modul berikutnya →
                      </button>
                    )}
                  </div>
                </div>
              )}
            </article>
          );
        })}
        <div className="pt-4 text-center">
          <Link to="/simulasi" className="btn btn-primary">Lanjut ke Simulasi →</Link>
        </div>
      </div>
    </>
  );
}

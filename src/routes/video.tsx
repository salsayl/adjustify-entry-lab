import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageTitle } from "@/components/SiteHeader";
import { MATERI } from "@/lib/materi";

export const Route = createFileRoute("/video")({
  head: () => ({
    meta: [
      { title: "Video Pembelajaran — ADJUSTIFY" },
      { name: "description", content: "Kumpulan ruang video pembelajaran jurnal penyesuaian per submateri." },
      { property: "og:title", content: "Video Pembelajaran — ADJUSTIFY" },
      { property: "og:description", content: "Video jurnal penyesuaian dikelompokkan per submateri." },
    ],
  }),
  component: VideoPage,
});

const KEY = "adjustify-videos";

export function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function VideoPage() {
  const [links, setLinks] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [err, setErr] = useState<Record<string, string>>({});
  useEffect(() => {
    try { setLinks(JSON.parse(localStorage.getItem(KEY) || "{}")); } catch { /* ignore */ }
  }, []);
  const save = (next: Record<string, string>) => { setLinks(next); localStorage.setItem(KEY, JSON.stringify(next)); };

  return (
    <>
      <PageTitle tag="Video" title="Video Pembelajaran" desc="Setiap submateri memiliki ruang video. Tempel tautan YouTube yang dibagikan dosen untuk menampilkannya di sini." />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-2">
        {MATERI.map((m) => {
          const id = links[m.slug] ? youtubeId(links[m.slug]) : null;
          return (
            <div key={m.slug} className="card-soft p-5">
              <h2 className="text-lg font-bold">{m.icon} {m.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{m.summary}</p>
              <div className="mt-4 aspect-video overflow-hidden rounded-2xl bg-lavender">
                {id ? (
                  <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${id}`} title={m.title} allowFullScreen
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" />
                ) : (
                  <div className="grid h-full place-items-center text-center text-sm text-muted-foreground">
                    <div><div className="text-4xl">🎬</div>Video belum ditambahkan</div>
                  </div>
                )}
              </div>
              {id ? (
                <button className="btn btn-outline mt-3" onClick={() => { const n = { ...links }; delete n[m.slug]; save(n); }}>Hapus video</button>
              ) : (
                <form className="mt-3 flex gap-2" onSubmit={(e) => {
                  e.preventDefault();
                  const v = draft[m.slug] || "";
                  if (!youtubeId(v)) { setErr({ ...err, [m.slug]: "Tautan YouTube tidak valid." }); return; }
                  setErr({ ...err, [m.slug]: "" });
                  save({ ...links, [m.slug]: v });
                }}>
                  <input className="field" placeholder="https://youtube.com/watch?v=..." value={draft[m.slug] || ""}
                    onChange={(e) => setDraft({ ...draft, [m.slug]: e.target.value })} />
                  <button className="btn btn-primary shrink-0">Simpan</button>
                </form>
              )}
              {err[m.slug] && <p className="mt-1 text-sm text-destructive">{err[m.slug]}</p>}
            </div>
          );
        })}
      </div>
    </>
  );
}

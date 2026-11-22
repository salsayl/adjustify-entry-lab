import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check } from "lucide-react";
import { toast } from "sonner";
import { PageTitle } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { JurnalTable } from "@/components/JurnalTable";
import { MATERI } from "@/lib/materi";
import { buildSlides } from "@/lib/slides";
import { useLearning, useLearningActions } from "@/lib/learning";

export const Route = createFileRoute("/_authenticated/materi")({
  head: () => ({ meta: [
    { title: "Materi 7 Bab Jurnal Penyesuaian — ADJUSTIFY" },
    { name: "description", content: "Presentasi interaktif tujuh bab jurnal penyesuaian, dengan konsep akrual, rumus, contoh jurnal, dan pembahasan latihan." },
    { property: "og:title", content: "Materi 7 Bab — ADJUSTIFY" },
    { property: "og:description", content: "Pelajari jurnal penyesuaian secara bertahap melalui materi Bab 1–7." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: MateriPage,
});

function MateriPage() {
  const [mi, setMi] = useState(0);
  const [si, setSi] = useState(0);
  const { data: learning } = useLearning();
  const actions = useLearningActions();
  const m = MATERI[mi];
  const slides = useMemo(() => m ? buildSlides(m) : [], [m]);
  const slide = slides[si];
  const last = si === slides.length - 1;
  const touchX = useRef<number | null>(null);
  const completed = !!m && !!learning?.materi.some((x) => x.materi_slug === m.slug && x.completed);

  useEffect(() => {
    if (!m || !learning) return;
    actions.markMateri(m.slug, last || completed, si).catch(() => {
      toast.error("Progres belajar gagal disimpan. Periksa koneksi internetmu.", { id: "progres-materi" });
    });
    // Saving depends on slide navigation, not cache invalidation after the write.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [m?.slug, last, si, !!learning]);

  const go = useCallback((d: number) => {
    const n = si + d;
    if (n >= 0 && n < slides.length) setSi(n);
    else if (n >= slides.length && mi < MATERI.length - 1) { setMi(mi + 1); setSi(0); }
    else if (n < 0 && mi > 0) {
      const previous = MATERI[mi - 1];
      if (!previous) return;
      setMi(mi - 1); setSi(buildSlides(previous).length - 1);
    }
  }, [mi, si, slides.length]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && ["SELECT", "INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [go]);

  if (!m || !slide) return null;
  return (
    <>
      <PageTitle tag="Materi" title="Materi 7 Bab" desc="Jurnal penyesuaian · Konsep, perhitungan, dan pencatatan" />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
          <aside>
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold"><BookOpen size={16} /> Daftar bab</p>
            <select aria-label="Pilih bab" className="field lg:hidden" value={mi} onChange={(e) => { setMi(Number(e.target.value)); setSi(0); }}>
              {MATERI.map((x, i) => <option key={x.slug} value={i}>{x.title}</option>)}
            </select>
            <div className="hidden space-y-1 lg:block">
              {MATERI.map((x, i) => (
                <Button key={x.slug} variant="ghost" aria-current={mi === i ? "step" : undefined}
                  className={`h-auto w-full justify-start whitespace-normal px-3 py-3 text-left leading-relaxed ${mi === i ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : ""}`}
                  onClick={() => { setMi(i); setSi(0); }}>
                  <span className="shrink-0 text-base">{x.icon}</span>
                  <span className="min-w-0 flex-1">{x.title}</span>
                  {learning?.materi.some((r) => r.materi_slug === x.slug && r.completed) && <Check size={14} />}
                </Button>
              ))}
            </div>
          </aside>
          <div className="min-w-0">
            <div className="overflow-hidden rounded-lg border bg-card"
              onTouchStart={(e) => { touchX.current = e.touches[0]?.clientX ?? null; }}
              onTouchEnd={(e) => {
                const end = e.changedTouches[0]?.clientX;
                if (touchX.current !== null && end !== undefined && Math.abs(end - touchX.current) > 50) go(end < touchX.current ? 1 : -1);
                touchX.current = null;
              }}>
              <div className="flex items-center justify-between gap-3 border-b bg-muted/60 px-4 py-3 text-xs font-semibold text-muted-foreground">
                <span className="min-w-0">{m.title}</span>
                <span className="shrink-0" aria-live="polite">{si + 1} / {slides.length}</span>
              </div>
              <div key={`${mi}-${si}`} className="fade-up flex min-h-[420px] flex-col justify-center p-5 sm:min-h-[480px] sm:p-10">
                {slide.kind === "judul" && (
                  <div>
                    <div className="mb-8 text-5xl" aria-hidden="true">{slide.icon}</div>
                    <p className="text-sm font-semibold text-muted-foreground">JURNAL PENYESUAIAN</p>
                    <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{slide.title}</h2>
                    <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{slide.text}</p>
                  </div>
                )}
                {slide.kind === "kotak" && (
                  <div>
                    <p className="mb-3 text-sm font-semibold text-muted-foreground">{slide.label}</p>
                    <h2 className="text-2xl font-bold sm:text-3xl">{slide.title}</h2>
                    <div className={`mt-7 border-l-4 pl-5 ${slide.tone === "cream" ? "border-primary" : "border-accent"}`}>
                      <p className="text-lg leading-relaxed sm:text-xl">{slide.text}</p>
                    </div>
                  </div>
                )}
                {slide.kind === "list" && (
                  <div>
                    <p className="mb-3 text-sm font-semibold text-muted-foreground">{slide.label}</p>
                    <h2 className="text-2xl font-bold sm:text-3xl">{slide.title}</h2>
                    <ol start={slide.start} className="mt-6 space-y-5">
                      {slide.items.map((it, i) => (
                        <li key={i} className="flex gap-3 text-base leading-relaxed sm:text-lg">
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage text-sm font-bold">{slide.start + i}</span>
                          <span className="min-w-0">{it}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                {slide.kind === "jurnal" && (
                  <div className="min-w-0">
                    <h2 className="mb-6 text-2xl font-bold sm:text-3xl">{slide.title}</h2>
                    {slide.soal && <p className="mb-4">{slide.soal}</p>}
                    {slide.jawab && <p className="mb-4">{slide.jawab}</p>}
                    <JurnalTable rows={slide.jurnal} />
                  </div>
                )}
              </div>
              <progress aria-label="Progres slide" value={si + 1} max={slides.length} className="block h-1.5 w-full accent-primary" />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <Button variant="outline" disabled={mi === 0 && si === 0} onClick={() => go(-1)}><ArrowLeft /> Sebelumnya</Button>
              {last && mi === MATERI.length - 1 ? (
                <Button asChild><Link to="/simulasi">Lanjut ke Simulasi <ArrowRight /></Link></Button>
              ) : (
                <Button onClick={() => go(1)}>{last ? "Bab berikutnya" : "Berikutnya"} <ArrowRight /></Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageTitle } from "@/components/SiteHeader";
import { JurnalTable } from "@/components/JurnalTable";
import { MATERI } from "@/lib/materi";
import { buildSlides } from "@/lib/slides";
import { canSpeak, pauseSpeak, resumeSpeak, speak, stopSpeak } from "@/lib/sound";
import { useLearning, useLearningActions } from "@/lib/learning";

export const Route = createFileRoute("/_authenticated/materi")({
  head: () => ({
    meta: [
      { title: "Materi Jurnal Penyesuaian — ADJUSTIFY" },
      { name: "description", content: "Materi jurnal penyesuaian 8 bab dalam bentuk slide bersuara, lengkap dengan rumus, contoh soal, dan jurnal." },
      { property: "og:title", content: "Materi Jurnal Penyesuaian — ADJUSTIFY" },
      { property: "og:description", content: "Slide materi jurnal penyesuaian dengan narasi suara." },
    ],
  }),
  component: MateriPage,
});

function MateriPage() {
  const [mi, setMi] = useState(0);
  const [si, setSi] = useState(0);
  const [auto, setAuto] = useState(false);
  const [talking, setTalking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [rate, setRate] = useState(0.95);
  const [volume, setVolume] = useState(1);
  const [voiceOk, setVoiceOk] = useState(true);
  const { data: learning } = useLearning();
  const actions = useLearningActions();
  const m = MATERI[mi]!;
  const slides = useMemo(() => buildSlides(m), [m]);
  const slide = slides[si]!;
  const last = si === slides.length - 1;
  const touchX = useRef<number | null>(null);
  const readSlugs = new Set((learning?.materi ?? []).filter((x) => x.completed).map((x) => x.materi_slug));

  useEffect(() => setVoiceOk(canSpeak()), []);
  useEffect(() => {
    if (last) actions.markMateri(m.slug, true, si).catch(() => {});
    else actions.markMateri(m.slug, readSlugs.has(m.slug), si).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [last, m.slug, si]);

  const play = () => {
    setPaused(false);
    setTalking(true);
    speak(slide.narasi, { rate, volume, onEnd: () => { setTalking(false); setPaused(false); } });
  };
  const pause = () => { pauseSpeak(); setPaused(true); };
  const resume = () => { resumeSpeak(); setPaused(false); };
  const stop = () => { stopSpeak(); setTalking(false); setPaused(false); };

  useEffect(() => {
    if (auto) play(); else stop();
    return () => stopSpeak();
  }, [mi, si, auto]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = (d: number) => {
    const n = si + d;
    if (n >= 0 && n < slides.length) setSi(n);
    else if (n >= slides.length && mi < MATERI.length - 1) { setMi(mi + 1); setSi(0); }
    else if (n < 0 && mi > 0) { setMi(mi - 1); setSi(buildSlides(MATERI[mi - 1]!).length - 1); }
  };

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "SELECT") return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  });

  return (
    <>
      <PageTitle tag="Materi" title="Materi 8 Bab (Slide Bersuara)" desc="Pelajari jurnal penyesuaian bab demi bab, slide demi slide. Tekan ▶ untuk mendengarkan penjelasannya." />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-wrap items-center gap-3">
          <select className="field max-w-md" value={mi} onChange={(e) => { setMi(Number(e.target.value)); setSi(0); }}>
            {MATERI.map((x, i) => (
              <option key={x.slug} value={i}>
                {readSlugs.has(x.slug) ? "✓ " : ""}{x.title}
              </option>
            ))}
          </select>
          {voiceOk && (
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
              <input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} className="h-4 w-4 accent-primary" />
              Bacakan otomatis setiap slide
            </label>
          )}
        </div>

        <div
          className="card-soft relative mt-5 flex min-h-[420px] flex-col overflow-hidden md:aspect-[16/9] md:min-h-0"
          onTouchStart={(e) => (touchX.current = e.touches[0]!.clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0]!.clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between border-b bg-muted/60 px-5 py-2 text-xs font-semibold text-muted-foreground">
            <span>{m.title}</span>
            <span>{si + 1} / {slides.length}</span>
          </div>
          <div key={`${mi}-${si}`} className="fade-up flex flex-1 flex-col justify-center p-6 md:p-10">
            {slide.kind === "judul" && (
              <div className="text-center">
                <div className="float-slow mx-auto grid h-24 w-24 place-items-center rounded-3xl bg-lavender text-5xl">{slide.icon}</div>
                <h2 className="mt-6 text-3xl font-bold md:text-5xl">{slide.title}</h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">{slide.text}</p>
              </div>
            )}
            {slide.kind === "poin" && (
              <div className="flex items-start gap-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-sage font-display text-2xl font-bold">{slide.no}</span>
                <div>
                  <p className="text-sm font-semibold text-primary">Poin penting</p>
                  <p className="mt-2 text-xl leading-relaxed md:text-3xl md:leading-snug">{slide.text}</p>
                </div>
              </div>
            )}
            {slide.kind === "kotak" && (
              <div>
                <h2 className="text-2xl font-bold md:text-4xl">{slide.title}</h2>
                <div className={`mt-6 rounded-3xl p-6 md:p-8 ${slide.tone === "cream" ? "bg-cream" : "bg-pink"}`}>
                  <p className="text-sm font-semibold">{slide.label}</p>
                  <p className="mt-2 text-lg font-medium leading-relaxed md:text-xl">{slide.text}</p>
                </div>
              </div>
            )}
            {slide.kind === "list" && (
              <div>
                <h2 className="text-2xl font-bold md:text-4xl">{slide.title}</h2>
                <p className="mt-1 text-sm font-semibold text-primary">{slide.label}</p>
                <ul className="mt-4 space-y-3">
                  {slide.items.map((it, i) => (
                    <li key={i} className="flex gap-3 text-base leading-relaxed md:text-lg">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage text-sm font-bold">{i + 1}</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {slide.kind === "jurnal" && (
              <div className="grid gap-5 md:grid-cols-2 md:items-center">
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">{slide.title}</h2>
                  <p className="mt-3">{slide.soal}</p>
                  <p className="mt-3 rounded-2xl bg-pink p-3 text-sm"><b>Perhitungan:</b> {slide.jawab}</p>
                </div>
                <JurnalTable rows={slide.jurnal} />
              </div>
            )}
          </div>
          <div className="h-1.5 bg-muted">
            <div className="h-full bg-primary transition-all" style={{ width: `${((si + 1) / slides.length) * 100}%` }} />
          </div>
        </div>

        {voiceOk && (
          <div className="card-soft mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 p-4 text-sm">
            <span className="font-semibold">🔊 Audio narasi</span>
            {talking && !paused && <button className="btn btn-outline px-3 py-1.5" onClick={pause}>⏸ Jeda</button>}
            {talking && paused && <button className="btn btn-outline px-3 py-1.5" onClick={resume}>▶ Lanjutkan</button>}
            {!talking && <button className="btn btn-outline px-3 py-1.5" onClick={play}>▶ Putar slide ini</button>}
            {talking && <button className="btn btn-outline px-3 py-1.5" onClick={stop}>⏹ Berhenti</button>}
            <label className="flex items-center gap-2">Volume
              <input type="range" min={0} max={1} step={0.1} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-24 accent-primary" />
            </label>
            <label className="flex items-center gap-2">Kecepatan
              <select className="field w-auto px-2 py-1" value={rate} onChange={(e) => setRate(Number(e.target.value))}>
                <option value={0.75}>Pelan</option>
                <option value={0.95}>Normal</option>
                <option value={1.2}>Cepat</option>
              </select>
            </label>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <button className="btn btn-outline" disabled={mi === 0 && si === 0} onClick={() => go(-1)}>← Sebelumnya</button>
          {last && mi === MATERI.length - 1 ? (
            <Link to="/simulasi" className="btn btn-primary">Lanjut ke Simulasi →</Link>
          ) : (
            <button className="btn btn-primary" onClick={() => go(1)}>{last ? "Bab berikutnya →" : "Berikutnya →"}</button>
          )}
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Tips: gunakan tombol panah ← → di keyboard, atau geser slide di HP.
          {!voiceOk && " Browser ini belum mendukung suara."}
        </p>
      </div>
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageTitle } from "@/components/SiteHeader";
import { JurnalTable } from "@/components/JurnalTable";
import { MATERI } from "@/lib/materi";
import { buildSlides } from "@/lib/slides";
import { canSpeak, speak, stopSpeak } from "@/lib/sound";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/materi")({
  head: () => ({
    meta: [
      { title: "Materi Jurnal Penyesuaian — ADJUSTIFY" },
      { name: "description", content: "Materi jurnal penyesuaian dalam bentuk slide bersuara, lengkap dengan rumus, contoh soal, dan jurnal." },
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
  const [voiceOk, setVoiceOk] = useState(true);
  const { progress, markMateri } = useProgress();
  const m = MATERI[mi]!;
  const slides = useMemo(() => buildSlides(m), [m]);
  const slide = slides[si]!;
  const last = si === slides.length - 1;
  const touchX = useRef<number | null>(null);

  useEffect(() => setVoiceOk(canSpeak()), []);
  useEffect(() => { if (last) markMateri(m.slug); }, [last, m.slug]); // eslint-disable-line react-hooks/exhaustive-deps

  const play = () => { setTalking(true); speak(slide.narasi, () => setTalking(false)); };
  const stop = () => { stopSpeak(); setTalking(false); };

  useEffect(() => {
    if (auto) play(); else stop();
    return () => stopSpeak();
  }, [mi, si, auto]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = (d: number) => {
    const n = si + d;
    if (n >= 0 && n < slides.length) setSi(n);
    else if (n >= slides.length && mi < MATERI.length - 1) { setMi(mi + 1); setSi(0); }
    else if (n < 0 && mi > 0) { const pm = MATERI[mi - 1]!; setMi(mi - 1); setSi(buildSlides(pm).length - 1); }
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
      <PageTitle tag="Materi" title="Slide Materi Bersuara" desc="Pelajari jurnal penyesuaian slide demi slide. Tekan 🔊 untuk mendengarkan penjelasannya." />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-wrap items-center gap-3">
          <select className="field max-w-md" value={mi} onChange={(e) => { setMi(Number(e.target.value)); setSi(0); }}>
            {MATERI.map((x, i) => (
              <option key={x.slug} value={i}>
                {progress.materiRead.includes(x.slug) ? "✓ " : ""}Modul {i + 1}: {x.title}
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
            <span>Modul {mi + 1} · {m.title}</span>
            <span>{si + 1} / {slides.length}</span>
          </div>
          <div key={`${mi}-${si}`} className="fade-up flex flex-1 flex-col justify-center p-6 md:p-12">
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
                  <p className="mt-2 text-xl font-medium leading-relaxed md:text-2xl">{slide.text}</p>
                </div>
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

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <button className="btn btn-outline" disabled={mi === 0 && si === 0} onClick={() => go(-1)}>← Sebelumnya</button>
          {voiceOk && (
            talking
              ? <button className="btn btn-outline" onClick={stop}>⏹ Hentikan suara</button>
              : <button className="btn btn-outline" onClick={play}>🔊 Dengarkan slide ini</button>
          )}
          {last && mi === MATERI.length - 1 ? (
            <Link to="/simulasi" className="btn btn-primary">Lanjut ke Simulasi →</Link>
          ) : (
            <button className="btn btn-primary" onClick={() => go(1)}>{last ? "Modul berikutnya →" : "Berikutnya →"}</button>
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

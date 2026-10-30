import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { PageTitle } from "@/components/SiteHeader";
import { KUIS } from "@/lib/kuis";
import { isMusicPlaying, playFinish, playNavigate, playStart, setMusicVolume, startMusic, stopMusic } from "@/lib/sound";
import { useLearningActions, type QuizAnswer } from "@/lib/learning";

export const Route = createFileRoute("/_authenticated/kuis")({
  head: () => ({
    meta: [
      { title: "Kuis Jurnal Penyesuaian — ADJUSTIFY" },
      { name: "description", content: "Kuis jurnal penyesuaian: satu soal per halaman, tanpa bocoran benar-salah, pembahasan tampil di akhir." },
      { property: "og:title", content: "Kuis Jurnal Penyesuaian — ADJUSTIFY" },
      { property: "og:description", content: "Uji pemahaman jurnal penyesuaian, pembahasan lengkap setelah dikumpulkan." },
    ],
  }),
  component: KuisPage,
});

type Ans = string | number | boolean | null;

function KuisPage() {
  const [phase, setPhase] = useState<"intro" | "run">("intro");
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Ans[]>(() => KUIS.map(() => null));
  const [musicOn, setMusicOn] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [busy, setBusy] = useState(false);
  const startAt = useRef(0);
  const actions = useLearningActions();
  const nav = useNavigate();
  const q = KUIS[i]!;
  const answered = answers.filter((a) => a !== null && a !== "").length;

  const begin = () => {
    playStart();
    if (musicOn) startMusic(volume);
    startAt.current = Date.now();
    setPhase("run");
  };

  const toggleMusic = (on: boolean) => {
    setMusicOn(on);
    if (phase === "run") {
      if (on) startMusic(volume);
      else stopMusic();
    }
  };

  const setAns = (v: Ans) => setAnswers((a) => a.map((x, k) => (k === i ? v : x)));

  const goTo = (n: number) => {
    if (n < 0 || n >= KUIS.length) return;
    playNavigate();
    setI(n);
  };

  const answerText = (qq: (typeof KUIS)[number], a: Ans): string => {
    if (a === null || a === "") return "(tidak dijawab)";
    if (qq.kind === "pg") return qq.options[Number(a)] ?? "(tidak dijawab)";
    if (qq.kind === "bs") return a === true ? "Benar" : "Salah";
    return String(a);
  };
  const correctText = (qq: (typeof KUIS)[number]): string =>
    qq.kind === "pg" ? qq.options[qq.answer]! : qq.kind === "bs" ? (qq.answer ? "Benar" : "Salah") : String(qq.answer);

  const isCorrect = (qq: (typeof KUIS)[number], a: Ans) => {
    if (qq.kind === "hitung") return Number(String(a).replace(/\D/g, "")) === qq.answer;
    return a === qq.answer;
  };

  const submit = async () => {
    if (answered < KUIS.length && !confirm(`Masih ada ${KUIS.length - answered} soal kosong. Kumpulkan sekarang?`)) return;
    setBusy(true);
    stopMusic();
    playFinish();
    const detail: QuizAnswer[] = KUIS.map((qq, k) => ({
      i: k,
      kind: qq.kind,
      topic: qq.topic,
      q: qq.q,
      chosen: answerText(qq, answers[k]!),
      correct: correctText(qq),
      isCorrect: isCorrect(qq, answers[k]!),
      why: qq.why,
    }));
    const correct = detail.filter((d) => d.isCorrect).length;
    const durationSeconds = Math.round((Date.now() - startAt.current) / 1000);
    try {
      await actions.saveQuiz({ correct, total: KUIS.length, durationSeconds, answers: detail });
    } catch {
      toast.error("Hasil kuis gagal disimpan. Coba lagi ya.");
      setBusy(false);
      return;
    }
    nav({ to: "/hasil" });
  };

  if (phase === "intro") {
    return (
      <>
        <PageTitle tag="Kuis" title="Kuis Jurnal Penyesuaian" desc={`${KUIS.length} soal bertahap dari mudah ke sulit, satu soal per halaman.`} />
        <div className="mx-auto max-w-xl px-4 py-10">
          <div className="card-soft p-8 text-center">
            <div className="text-5xl">📝</div>
            <h2 className="mt-4 text-2xl font-bold">Siap mengerjakan kuis?</h2>
            <ul className="mx-auto mt-4 max-w-sm space-y-2 text-left text-sm text-muted-foreground">
              <li>• {KUIS.length} soal: pilihan ganda, benar/salah, dan perhitungan.</li>
              <li>• Kamu bisa maju-mundur antar soal sebelum mengumpulkan.</li>
              <li>• Benar atau salah <b>tidak ditampilkan</b> selama kuis berlangsung.</li>
              <li>• Pembahasan lengkap muncul setelah jawaban dikumpulkan.</li>
            </ul>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 rounded-2xl bg-muted p-4 text-sm">
              <label className="flex cursor-pointer items-center gap-2 font-medium">
                <input type="checkbox" checked={musicOn} onChange={(e) => setMusicOn(e.target.checked)} className="h-4 w-4 accent-primary" />
                🎵 Musik latar lembut
              </label>
              <label className="flex items-center gap-2">Volume
                <input type="range" min={0} max={1} step={0.1} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-24 accent-primary" />
              </label>
            </div>
            <button className="btn btn-primary mt-6 px-8 py-3 text-lg" onClick={begin}>Mulai Kuis ▶</button>
          </div>
        </div>
      </>
    );
  }

  const optBase = "w-full rounded-2xl border p-4 text-left transition ";
  const optCls = (val: Ans) =>
    optBase + (answers[i] === val ? "border-primary bg-lavender" : "bg-card hover:bg-muted");

  return (
    <>
      <PageTitle tag="Kuis" title="Kuis sedang berlangsung" desc="Jawab dengan tenang — hasil dan pembahasan tampil setelah kamu mengumpulkan semua jawaban." />
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>Soal {i + 1} dari {KUIS.length}</span>
          <span>Terjawab: {answered}/{KUIS.length}</span>
          <button
            className="rounded-full bg-muted px-3 py-1 text-xs font-semibold"
            onClick={() => toggleMusic(!musicOn)}
            title="Nyalakan/matikan musik"
          >
            {musicOn && isMusicPlaying() ? "🎵 Musik: ON" : "🎵 Musik: OFF"}
          </button>
        </div>
        {musicOn && isMusicPlaying() && (
          <label className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">Volume musik
            <input type="range" min={0} max={1} step={0.1} value={volume}
              onChange={(e) => { setVolume(Number(e.target.value)); setMusicVolume(Number(e.target.value)); }}
              className="w-28 accent-primary" />
          </label>
        )}
        <div className="mt-2 h-2 rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(answered / KUIS.length) * 100}%` }} />
        </div>

        <div key={i} className="card-soft fade-up mt-6 p-6">
          <div className="flex gap-2 text-xs font-semibold">
            <span className="rounded-full bg-cream px-3 py-1">{q.level}</span>
            <span className="rounded-full bg-lavender px-3 py-1">{q.kind === "pg" ? "Pilihan ganda" : q.kind === "bs" ? "Benar / Salah" : "Perhitungan"}</span>
          </div>
          <h2 className="mt-4 text-xl font-bold leading-snug">{q.q}</h2>

          <div className="mt-5 space-y-3">
            {q.kind === "pg" && q.options.map((o, k) => (
              <button key={o} onClick={() => setAns(k)} className={optCls(k)}>
                <b className="mr-2">{"ABCD"[k]}.</b>{o}
              </button>
            ))}
            {q.kind === "bs" && (
              <div className="grid grid-cols-2 gap-3">
                {[true, false].map((v) => (
                  <button key={String(v)} onClick={() => setAns(v)} className={optCls(v)}>{v ? "✓ Benar" : "✕ Salah"}</button>
                ))}
              </div>
            )}
            {q.kind === "hitung" && (
              <input className="field" inputMode="numeric" placeholder="Tulis nominal, contoh: 1500000"
                value={answers[i] === null ? "" : String(answers[i])}
                onChange={(e) => setAns(e.target.value)} />
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button className="btn btn-outline" disabled={i === 0} onClick={() => goTo(i - 1)}>← Sebelumnya</button>
            {i < KUIS.length - 1 ? (
              <button className="btn btn-primary" onClick={() => goTo(i + 1)}>Berikutnya →</button>
            ) : (
              <button className="btn btn-primary" disabled={busy} onClick={submit}>
                {busy ? "Menilai…" : "✅ Kumpulkan Jawaban"}
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {KUIS.map((_, k) => (
            <button key={k} onClick={() => goTo(k)} aria-label={`Ke soal ${k + 1}`}
              className={"h-8 w-8 rounded-full text-xs font-bold transition " +
                (k === i ? "bg-primary text-primary-foreground" : answers[k] !== null && answers[k] !== "" ? "bg-sage" : "bg-muted")}>
              {k + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

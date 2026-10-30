import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageTitle } from "@/components/SiteHeader";
import { KUIS } from "@/lib/kuis";
import { rupiah } from "@/lib/accounting";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/kuis")({
  head: () => ({
    meta: [
      { title: "Latihan & Kuis — ADJUSTIFY" },
      { name: "description", content: "Kuis jurnal penyesuaian: pilihan ganda, benar-salah, dan perhitungan dari mudah sampai sulit." },
      { property: "og:title", content: "Latihan & Kuis — ADJUSTIFY" },
      { property: "og:description", content: "Uji pemahaman jurnal penyesuaian dengan pembahasan tiap soal." },
    ],
  }),
  component: KuisPage,
});

type Ans = string | number | boolean | null;

function KuisPage() {
  const [i, setI] = useState(0);
  const [ans, setAns] = useState<Ans>(null);
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const { saveQuiz } = useProgress();
  const nav = useNavigate();
  const q = KUIS[i];

  const isCorrect = () => {
    if (q.kind === "hitung") return Number(input.replace(/\D/g, "")) === q.answer;
    return ans === q.answer;
  };
  const canSubmit = q.kind === "hitung" ? input.trim() !== "" : ans !== null;

  const submit = () => { setSubmitted(true); if (isCorrect()) setScore((s) => s + 1); };
  const next = () => {
    if (i === KUIS.length - 1) {
      saveQuiz({ correct: score, total: KUIS.length, date: new Date().toISOString() });
      nav({ to: "/hasil" });
      return;
    }
    setI(i + 1); setAns(null); setInput(""); setSubmitted(false);
  };

  const correctText = q.kind === "pg" ? q.options[q.answer] : q.kind === "bs" ? (q.answer ? "Benar" : "Salah") : rupiah(q.answer);
  const optBase = "w-full rounded-2xl border p-4 text-left transition ";
  const optCls = (val: Ans) => {
    if (!submitted) return optBase + (ans === val ? "border-primary bg-lavender" : "bg-card hover:bg-muted");
    if (val === q.answer) return optBase + "border-success bg-sage";
    if (val === ans) return optBase + "border-destructive bg-pink";
    return optBase + "bg-card opacity-70";
  };

  return (
    <>
      <PageTitle tag="Latihan" title="Latihan & Kuis" desc={`${KUIS.length} soal bertahap dari mudah ke sulit. Jawab satu per satu dan baca pembahasannya.`} />
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Soal {i + 1} dari {KUIS.length}</span><span>Skor sementara: {score}</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((i + (submitted ? 1 : 0)) / KUIS.length) * 100}%` }} /></div>

        <div key={i} className="card-soft fade-up mt-6 p-6">
          <div className="flex gap-2 text-xs font-semibold">
            <span className="rounded-full bg-cream px-3 py-1">{q.level}</span>
            <span className="rounded-full bg-lavender px-3 py-1">{q.kind === "pg" ? "Pilihan ganda" : q.kind === "bs" ? "Benar / Salah" : "Perhitungan"}</span>
          </div>
          <h2 className="mt-4 text-xl font-bold leading-snug">{q.q}</h2>

          <div className="mt-5 space-y-3">
            {q.kind === "pg" && q.options.map((o, k) => (
              <button key={o} disabled={submitted} onClick={() => setAns(k)} className={optCls(k)}>
                <b className="mr-2">{"ABCD"[k]}.</b>{o}
              </button>
            ))}
            {q.kind === "bs" && (
              <div className="grid grid-cols-2 gap-3">
                {[true, false].map((v) => (
                  <button key={String(v)} disabled={submitted} onClick={() => setAns(v)} className={optCls(v)}>{v ? "✓ Benar" : "✕ Salah"}</button>
                ))}
              </div>
            )}
            {q.kind === "hitung" && (
              <input className="field" inputMode="numeric" placeholder="Tulis nominal, contoh: 1500000" disabled={submitted}
                value={input} onChange={(e) => setInput(e.target.value)} />
            )}
          </div>

          {submitted && (
            <div className={"fade-up mt-5 rounded-2xl p-4 " + (isCorrect() ? "bg-sage" : "bg-pink")}>
              <p className="font-bold">{isCorrect() ? "🎉 Benar!" : `Kurang tepat. Jawaban benar: ${correctText}`}</p>
              <p className="mt-1 text-sm">{q.why}</p>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3">
            {!submitted ? (
              <button className="btn btn-primary" disabled={!canSubmit} onClick={submit}>Periksa Jawaban</button>
            ) : (
              <button className="btn btn-primary" onClick={next}>{i === KUIS.length - 1 ? "Lihat Hasil" : "Berikutnya →"}</button>
            )}
          </div>
        </div>
        <div className="mt-6 text-center"><Link to="/" className="text-sm text-muted-foreground underline">← Kembali ke beranda</Link></div>
      </div>
    </>
  );
}

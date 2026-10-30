import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageTitle } from "@/components/SiteHeader";
import { JurnalTable } from "@/components/JurnalTable";
import { rupiah } from "@/lib/accounting";
import { AKUN, SIMS, SIM_TYPES } from "@/lib/simulasi";
import { playFeedback } from "@/lib/sound";
import { useLearning, useLearningActions } from "@/lib/learning";

export const Route = createFileRoute("/_authenticated/simulasi")({
  head: () => ({
    meta: [
      { title: "Simulasi Perhitungan — ADJUSTIFY" },
      { name: "description", content: "Latih menghitung nominal dan memilih akun debit-kredit jurnal penyesuaian dengan umpan balik otomatis." },
      { property: "og:title", content: "Simulasi Perhitungan — ADJUSTIFY" },
      { property: "og:description", content: "Studi kasus jurnal penyesuaian interaktif dengan pembahasan langkah demi langkah." },
    ],
  }),
  component: SimPage,
});

function SimPage() {
  const [type, setType] = useState("Semua");
  const list = type === "Semua" ? SIMS : SIMS.filter((s) => s.type === type);
  const [idx, setIdx] = useState(0);
  const sim = list[idx % list.length]!;
  const [amount, setAmount] = useState("");
  const [debit, setDebit] = useState("");
  const [kredit, setKredit] = useState("");
  const [checked, setChecked] = useState(false);
  const [tries, setTries] = useState(0);
  const { data: learning } = useLearning();
  const actions = useLearningActions();
  const solvedIds = new Set((learning?.sims ?? []).filter((s) => s.is_correct).map((s) => s.sim_id));

  const num = Number(amount.replace(/\D/g, ""));
  const okAmount = num === sim.amount;
  const okDebit = debit === sim.debit;
  const okKredit = kredit === sim.kredit;
  const allOk = okAmount && okDebit && okKredit;

  const resetForm = () => { setAmount(""); setDebit(""); setKredit(""); setChecked(false); setTries(0); };
  const next = () => { setIdx((i) => (i + 1) % list.length); resetForm(); };
  const check = () => {
    const n = tries + 1;
    setTries(n);
    setChecked(true);
    playFeedback(allOk);
    actions.saveSimulation(sim.id, allOk, n).catch(() => {});
  };

  return (
    <>
      <PageTitle tag="⭐ Fitur Unggulan" title="Simulasi Perhitungan" desc="Baca kasusnya, hitung nominal penyesuaian, lalu pilih akun debit dan kredit yang tepat." />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex flex-wrap gap-2">
          {["Semua", ...SIM_TYPES].map((t) => (
            <button key={t} onClick={() => { setType(t); setIdx(0); resetForm(); }}
              className={"rounded-full px-4 py-2 text-sm font-medium transition " + (type === t ? "bg-primary text-primary-foreground" : "bg-lavender hover:bg-pink")}>
              {t}
            </button>
          ))}
        </div>

        <div key={sim.id} className="card-soft fade-up mt-6 p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold">{sim.type}</span>
            <span className="text-xs text-muted-foreground">
              Soal {(idx % list.length) + 1}/{list.length} · {solvedIds.has(sim.id) ? "✓ pernah benar" : "belum selesai"}
            </span>
          </div>
          <h2 className="mt-3 text-xl font-bold">{sim.title}</h2>
          <p className="mt-2 rounded-2xl bg-muted p-4">{sim.kasus}</p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <label className="block text-sm font-semibold">Nominal penyesuaian (Rp)
              <input className="field mt-1" inputMode="numeric" placeholder="contoh: 1500000" value={amount}
                onChange={(e) => { setAmount(e.target.value); setChecked(false); }} />
              {checked && <Mark ok={okAmount} />}
            </label>
            <label className="block text-sm font-semibold">Akun debit
              <select className="field mt-1" value={debit} onChange={(e) => { setDebit(e.target.value); setChecked(false); }}>
                <option value="">Pilih akun…</option>
                {AKUN.map((a) => <option key={a}>{a}</option>)}
              </select>
              {checked && <Mark ok={okDebit} />}
            </label>
            <label className="block text-sm font-semibold">Akun kredit
              <select className="field mt-1" value={kredit} onChange={(e) => { setKredit(e.target.value); setChecked(false); }}>
                <option value="">Pilih akun…</option>
                {AKUN.map((a) => <option key={a}>{a}</option>)}
              </select>
              {checked && <Mark ok={okKredit} />}
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button className="btn btn-primary" disabled={!amount || !debit || !kredit} onClick={check}>Periksa Jawaban</button>
            <button className="btn btn-outline" onClick={next}>Soal berikutnya →</button>
          </div>

          {checked && (
            <div className={"fade-up mt-6 rounded-2xl p-5 " + (allOk ? "bg-sage" : "bg-pink")}>
              <p className="text-lg font-bold">{allOk ? "🎉 Jawabanmu benar!" : "Belum tepat, yuk cek pembahasannya."}</p>
              <p className="mt-3 text-sm font-semibold">Pembahasan langkah demi langkah:</p>
              <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm">{sim.steps.map((s) => <li key={s}>{s}</li>)}</ol>
              <p className="mt-3 text-sm font-semibold">Jurnal penyesuaian yang benar ({rupiah(sim.amount)}):</p>
              <div className="mt-2"><JurnalTable rows={[{ akun: sim.debit, debit: sim.amount }, { akun: sim.kredit, kredit: sim.amount }]} /></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Mark({ ok }: { ok: boolean }) {
  return <span className={"mt-1 block text-xs " + (ok ? "text-success" : "text-destructive")}>{ok ? "✓ Benar" : "✕ Salah"}</span>;
}

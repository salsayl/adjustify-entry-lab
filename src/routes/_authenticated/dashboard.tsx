import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle } from "@/components/SiteHeader";
import { MATERI } from "@/lib/materi";
import { SIMS } from "@/lib/simulasi";
import { hitungRekomendasi } from "@/lib/rekomendasi";
import { useLearning, useProfile } from "@/lib/learning";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — ADJUSTIFY" },
      { name: "description", content: "Dashboard pribadi: progres belajar, riwayat kuis dan simulasi, serta rekomendasi materi." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { data: profile } = useProfile();
  const { data, isLoading } = useLearning();

  const materiDone = new Set((data?.materi ?? []).filter((m) => m.completed).map((m) => m.materi_slug));
  const simBenar = new Set((data?.sims ?? []).filter((s) => s.is_correct).map((s) => s.sim_id));
  const lastQuiz = data?.quizzes[0];
  const rekom = lastQuiz ? hitungRekomendasi(lastQuiz.answers) : [];
  const belumDibaca = MATERI.filter((m) => !materiDone.has(m.slug));

  const items = [
    { l: "Materi selesai dibaca", v: materiDone.size, t: MATERI.length },
    { l: "Simulasi dijawab benar", v: simBenar.size, t: SIMS.length },
  ];

  return (
    <>
      <PageTitle
        tag="Dashboard"
        title={`Halo, ${profile?.full_name ?? "Siswa"}! 👋`}
        desc={`Kelas ${profile?.kelas ?? "-"} · Pendidikan Akuntansi Semester 1. Ini ringkasan belajarmu.`}
      />
      <div className="mx-auto max-w-6xl px-4 py-8">
        {isLoading ? (
          <p className="text-center text-muted-foreground">Memuat progres…</p>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
              <div className="card-soft p-6">
                <h2 className="text-2xl font-bold">Progres Pembelajaran</h2>
                <div className="mt-4 space-y-4">
                  {items.map((x) => (
                    <div key={x.l}>
                      <div className="flex justify-between text-sm"><span>{x.l}</span><span className="font-semibold">{x.v}/{x.t}</span></div>
                      <div className="mt-1 h-2.5 rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(x.v / x.t) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                  <p className="text-sm text-muted-foreground">
                    Kuis terakhir: {lastQuiz ? `${lastQuiz.correct_count}/${lastQuiz.total_count} benar` : "belum dikerjakan"}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to="/materi" className="btn btn-primary">Lanjut Belajar →</Link>
                  <Link to="/kuis" className="btn btn-outline">Kerjakan Kuis</Link>
                </div>
              </div>

              <div className="card-soft p-6">
                <h2 className="text-2xl font-bold">🎯 Rekomendasi untukmu</h2>
                {rekom.length > 0 ? (
                  <ul className="mt-4 space-y-3">
                    {rekom.slice(0, 3).map((r) => (
                      <li key={r.slug}>
                        <Link to="/materi" className="block rounded-2xl bg-lavender p-4 transition hover:-translate-y-0.5">
                          <p className="font-semibold">{r.icon} {r.title}</p>
                          <p className="text-sm text-muted-foreground">{r.salah} soal salah di kuis terakhir</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : lastQuiz ? (
                  <p className="mt-4 rounded-2xl bg-sage p-4 text-sm">Kuis terakhirmu bersih dari kesalahan. Coba soal simulasi yang lebih sulit! 💪</p>
                ) : (
                  <p className="mt-4 rounded-2xl bg-cream p-4 text-sm">Kerjakan kuis pertamamu agar kami bisa merekomendasikan materi yang perlu kamu pelajari lagi.</p>
                )}
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="card-soft p-6">
                <h2 className="text-xl font-bold">📚 Materi yang belum dipelajari</h2>
                {belumDibaca.length > 0 ? (
                  <ul className="mt-3 space-y-2 text-sm">
                    {belumDibaca.map((m) => (
                      <li key={m.slug} className="rounded-xl bg-muted px-3 py-2">{m.icon} {m.title}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 rounded-xl bg-sage p-3 text-sm">Semua materi sudah kamu baca. Bagus sekali! 🎉</p>
                )}
              </div>

              <div className="card-soft p-6">
                <h2 className="text-xl font-bold">🧾 Riwayat kuis terakhir</h2>
                {data && data.quizzes.length > 0 ? (
                  <ul className="mt-3 space-y-2 text-sm">
                    {data.quizzes.slice(0, 5).map((q) => (
                      <li key={q.id} className="flex items-center justify-between rounded-xl bg-muted px-3 py-2">
                        <span>{new Date(q.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                        <span className="font-semibold">{q.correct_count}/{q.total_count} benar ({Math.round((q.correct_count / q.total_count) * 100)}%)</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-muted-foreground">Belum ada riwayat kuis.</p>
                )}
                <Link to="/arsip" className="mt-4 inline-block text-sm font-semibold text-primary underline">Lihat arsip lengkap →</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

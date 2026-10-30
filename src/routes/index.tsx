import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { useProgress } from "@/lib/progress";
import { MATERI } from "@/lib/materi";
import { SIMS } from "@/lib/simulasi";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ADJUSTIFY — Learn. Practice. Understand." },
      { name: "description", content: "Belajar jurnal penyesuaian dengan materi, video, simulasi perhitungan, dan kuis interaktif." },
      { property: "og:title", content: "ADJUSTIFY — Learn. Practice. Understand." },
      { property: "og:description", content: "Media pembelajaran interaktif jurnal penyesuaian untuk mahasiswa Pendidikan Akuntansi." },
    ],
  }),
  component: Index,
});

const TUJUAN = [
  "Memahami pengertian dan tujuan jurnal penyesuaian.",
  "Mengidentifikasi akun-akun yang memerlukan penyesuaian.",
  "Menghitung nominal penyesuaian dengan rumus yang tepat.",
  "Menyusun jurnal penyesuaian di sisi debit dan kredit.",
];

const FITUR = [
  { to: "/materi", icon: "📚", t: "Materi", d: "9 modul ringkas dengan rumus & contoh jurnal.", bg: "bg-lavender" },
  { to: "/video", icon: "🎬", t: "Video", d: "Ruang video per submateri.", bg: "bg-pink" },
  { to: "/simulasi", icon: "🧮", t: "Simulasi", d: "Hitung nominal & pilih akun debit-kredit.", bg: "bg-cream" },
  { to: "/kuis", icon: "📝", t: "Kuis", d: "Soal bertahap mudah sampai sulit.", bg: "bg-sage" },
] as const;

function Index() {
  const { progress } = useProgress();
  const items = [
    { l: "Materi dibaca", v: progress.materiRead.length, t: MATERI.length },
    { l: "Simulasi benar", v: progress.simSolved.length, t: SIMS.length },
  ];
  return (
    <>
      <section className="bg-hero">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
          <div className="fade-up">
            <span className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-primary">
              Jurnal Penyesuaian · Semester 1
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
              Welcome to <span className="text-primary">ADJUSTIFY</span>
            </h1>
            <p className="mt-3 font-display text-xl text-secondary-foreground">Learn. Practice. Understand.</p>
            <p className="mt-4 max-w-md text-muted-foreground">
              Media pembelajaran interaktif untuk membantu mahasiswa memahami konsep, menghitung nominal, dan
              menyusun jurnal penyesuaian dengan lebih mudah.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/materi" className="btn btn-primary">Mulai Belajar →</Link>
              <Link to="/simulasi" className="btn btn-outline">Coba Simulasi</Link>
            </div>
          </div>
          <img src={hero} alt="Ilustrasi buku besar, kalkulator, dan koin" width={1024} height={1024}
            className="float-slow mx-auto w-full max-w-md rounded-3xl" />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-[1.3fr_1fr]">
        <div className="card-soft p-6">
          <h2 className="text-2xl font-bold">Tujuan Pembelajaran</h2>
          <ul className="mt-4 space-y-3">
            {TUJUAN.map((t, i) => (
              <li key={t} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage text-sm font-bold">{i + 1}</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card-soft p-6">
          <h2 className="text-2xl font-bold">Progress Belajarmu</h2>
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
              Kuis terakhir: {progress.quiz ? `${progress.quiz.correct}/${progress.quiz.total} benar` : "belum dikerjakan"}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold">Fitur ADJUSTIFY</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FITUR.map((f) => (
            <Link key={f.to} to={f.to} className={`${f.bg} rounded-3xl p-6 transition hover:-translate-y-1`}>
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-3 text-lg font-bold">{f.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

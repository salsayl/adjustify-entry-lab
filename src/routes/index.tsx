import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { useSession } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ADJUSTIFY — Learn. Practice. Understand." },
      { name: "description", content: "Belajar jurnal penyesuaian dengan materi 8 bab, video, audio narasi, simulasi perhitungan, dan kuis interaktif." },
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
  { to: "/materi", icon: "📚", t: "Materi 8 Bab", d: "Slide bersuara dengan rumus & contoh jurnal.", bg: "bg-lavender" },
  { to: "/video", icon: "🎬", t: "Video", d: "Ruang video pembelajaran per bab.", bg: "bg-pink" },
  { to: "/simulasi", icon: "🧮", t: "Simulasi", d: "Hitung nominal & pilih akun debit-kredit.", bg: "bg-cream" },
  { to: "/kuis", icon: "📝", t: "Kuis", d: "Soal bertahap dengan pembahasan di akhir.", bg: "bg-sage" },
] as const;

function Index() {
  const signedIn = useSession();
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
              menyusun jurnal penyesuaian dengan lebih mudah — semua progresmu tersimpan di akun pribadimu.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {signedIn ? (
                <Link to="/dashboard" className="btn btn-primary">Buka Dashboard →</Link>
              ) : (
                <>
                  <Link to="/auth" className="btn btn-primary">Daftar & Mulai Belajar →</Link>
                  <Link to="/auth" className="btn btn-outline">Masuk</Link>
                </>
              )}
            </div>
          </div>
          <img src={hero} alt="Ilustrasi buku besar, kalkulator, dan koin" width={1024} height={1024}
            className="float-slow mx-auto w-full max-w-md rounded-3xl" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="card-soft p-6">
          <h2 className="text-2xl font-bold">Tujuan Pembelajaran</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {TUJUAN.map((t, i) => (
              <li key={t} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage text-sm font-bold">{i + 1}</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
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
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Semua fitur belajar memerlukan akun — gratis dan cepat daftarnya.
        </p>
      </section>
    </>
  );
}

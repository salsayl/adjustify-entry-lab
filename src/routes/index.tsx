import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Calculator, Clapperboard, ListChecks } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { useSession } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "ADJUSTIFY — Belajar Jurnal Penyesuaian" },
    { name: "description", content: "Belajar jurnal penyesuaian melalui materi tujuh bab, simulasi, video pembelajaran, dan kuis dengan pembahasan." },
    { property: "og:title", content: "Selamat Datang di ADJUSTIFY" },
    { property: "og:description", content: "Jangan takut salah, karena setiap kesalahan perlu penyesuaian." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const TUJUAN = [
  "Mengidentifikasi jenis-jenis transaksi yang memerlukan penyesuaian dalam suatu periode akuntansi.",
  "Menghitung nominal penyesuaian berdasarkan ilustrasi transaksi yang diberikan dengan tepat.",
  "Menyusun jurnal penyesuaian dengan menentukan akun debit dan kredit secara benar.",
];
const FITUR = [
  { to: "/materi", Icon: BookOpen, title: "Materi 7 Bab", text: "Konsep, rumus, dan contoh jurnal.", bg: "bg-sage" },
  { to: "/simulasi", Icon: Calculator, title: "Simulasi", text: "Kasus transaksi dan perhitungan nominal.", bg: "bg-cream" },
  { to: "/video", Icon: Clapperboard, title: "Video Pembelajaran", text: "Video dari tim pengajar, dikelompokkan per bab.", bg: "bg-lavender" },
  { to: "/kuis", Icon: ListChecks, title: "Kuis", text: "Latihan bertahap dan pembahasan jawaban.", bg: "bg-pink" },
] as const;

function Index() {
  const signedIn = useSession();
  return (
    <>
      <section className="relative isolate overflow-hidden border-b">
        <img src={hero} alt="Buku besar, kalkulator, dan koin" className="absolute inset-0 -z-20 h-full w-full object-cover object-right" />
        <div className="hero-overlay absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-4 py-9 sm:py-14 md:py-16">
          <div className="fade-up max-w-2xl">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Pendidikan Akuntansi · Semester 1</p>
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Selamat Datang di <span className="block text-primary">ADJUSTIFY</span>
            </h1>
            <p className="mt-5 max-w-lg font-display text-lg leading-relaxed sm:text-xl">“Jangan takut salah, karena setiap kesalahan perlu penyesuaian.”</p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              Belajar memahami konsep, menghitung nominal, dan menyusun jurnal penyesuaian — satu langkah setiap waktu.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to={signedIn ? "/dashboard" : "/auth"}>{signedIn ? "Lanjut Belajar" : "Mulai Belajar"} <ArrowRight /></Link></Button>
              {signedIn === false && <Button asChild size="lg" variant="outline"><Link to="/auth">Masuk</Link></Button>}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <h2 className="text-2xl font-bold">Tujuan Pembelajaran</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Setelah mengikuti pembelajaran melalui ADJUSTIFY, mahasiswa diharapkan mampu:</p>
        <ol className="mt-6 grid gap-6 md:grid-cols-3">
          {TUJUAN.map((t, i) => (
            <li key={t} className="flex gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sage text-sm font-bold">{i + 1}</span>
              <p className="text-sm leading-relaxed">{t}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="border-t bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
          <h2 className="text-2xl font-bold">Ruang Belajar</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FITUR.map(({ to, Icon, title, text, bg }) => (
              <Link key={to} to={to} className={`${bg} rounded-lg border p-5 transition hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-ring`}>
                <Icon size={26} className="text-primary" />
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                <ArrowRight className="mt-5 text-primary" size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

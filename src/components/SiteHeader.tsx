import { Link } from "@tanstack/react-router";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Beranda" },
  { to: "/materi", label: "Materi" },
  { to: "/video", label: "Video" },
  { to: "/simulasi", label: "Simulasi" },
  { to: "/kuis", label: "Kuis" },
  { to: "/hasil", label: "Hasil" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-lavender">Σ</span>
          ADJUSTIFY
        </Link>
        <nav className="hidden gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted"
              activeProps={{ className: "bg-lavender text-secondary-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          className="btn btn-outline px-3 py-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Buka menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t px-4 py-3 md:hidden">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-xl px-4 py-2 font-medium"
              activeProps={{ className: "bg-lavender" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function PageTitle({ tag, title, desc }: { tag: string; title: string; desc: string }) {
  return (
    <div className="bg-hero">
      <div className="mx-auto max-w-6xl px-4 py-12 fade-up">
        <span className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-primary">{tag}</span>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

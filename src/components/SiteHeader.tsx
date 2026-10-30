import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const NAV_PUBLIC = [{ to: "/", label: "Beranda" }] as const;
const NAV_PRIVATE = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/materi", label: "Materi" },
  { to: "/video", label: "Video" },
  { to: "/simulasi", label: "Simulasi" },
  { to: "/kuis", label: "Kuis" },
  { to: "/hasil", label: "Evaluasi" },
  { to: "/arsip", label: "Arsip" },
  { to: "/profil", label: "Profil" },
] as const;

export function useSession() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setSignedIn(!!data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setSignedIn(!!session));
    return () => sub.subscription.unsubscribe();
  }, []);
  return signedIn;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const signedIn = useSession();
  const nav = useNavigate();
  const qc = useQueryClient();
  const items = signedIn ? NAV_PRIVATE : NAV_PUBLIC;

  const logout = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    setOpen(false);
    nav({ to: "/auth", replace: true });
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to={signedIn ? "/dashboard" : "/"} className="flex items-center gap-2 font-display text-xl font-bold text-primary">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-lavender">Σ</span>
          ADJUSTIFY
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {items.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted"
              activeProps={{ className: "bg-lavender text-secondary-foreground" }}
            >
              {n.label}
            </Link>
          ))}
          {signedIn === false && (
            <Link to="/auth" className="btn btn-primary ml-2 px-4 py-2 text-sm">Masuk / Daftar</Link>
          )}
          {signedIn && (
            <button onClick={logout} className="ml-2 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted">
              Keluar
            </button>
          )}
        </nav>
        <button
          className="btn btn-outline px-3 py-2 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Buka menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t px-4 py-3 lg:hidden">
          {items.map((n) => (
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
          {signedIn === false && (
            <Link to="/auth" onClick={() => setOpen(false)} className="rounded-xl bg-primary px-4 py-2 text-center font-semibold text-primary-foreground">
              Masuk / Daftar
            </Link>
          )}
          {signedIn && (
            <button onClick={logout} className="rounded-xl px-4 py-2 text-left font-medium text-muted-foreground">
              Keluar
            </button>
          )}
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

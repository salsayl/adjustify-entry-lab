import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: typeof s.redirect === "string" && s.redirect.startsWith("/") ? s.redirect : "",
  }),
  head: () => ({
    meta: [
      { title: "Masuk / Daftar — ADJUSTIFY" },
      { name: "description", content: "Masuk atau daftar akun ADJUSTIFY untuk mulai belajar jurnal penyesuaian." },
      { property: "og:title", content: "Masuk / Daftar — ADJUSTIFY" },
      { property: "og:description", content: "Satu akun untuk semua progres belajarmu." },
    ],
  }),
  component: AuthPage,
});

const loginSchema = z.object({
  email: z.string().trim().email("Email tidak valid").max(255),
  password: z.string().min(6, "Password minimal 6 karakter").max(72),
});
const registerSchema = loginSchema.extend({
  full_name: z.string().trim().min(3, "Nama minimal 3 huruf").max(100, "Nama maksimal 100 huruf"),
  kelas: z.enum(["A", "B"]),
});

type Mode = "login" | "register" | "forgot";

function AuthPage() {
  const { redirect } = Route.useSearch();
  const nav = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [sentEmail, setSentEmail] = useState("");
  const [form, setForm] = useState({ full_name: "", email: "", password: "", kelas: "A" as "A" | "B" });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const afterLogin = () => nav({ to: redirect || "/dashboard" });

  const doLogin = async () => {
    const v = loginSchema.safeParse({ email: form.email, password: form.password });
    if (!v.success) return setErr(v.error.issues[0]!.message);
    setBusy(true); setErr("");
    const { error } = await supabase.auth.signInWithPassword(v.data);
    setBusy(false);
    if (error) return setErr("Email atau password salah. Coba lagi ya.");
    toast.success("Berhasil masuk. Selamat belajar!");
    afterLogin();
  };

  const doRegister = async () => {
    const v = registerSchema.safeParse(form);
    if (!v.success) return setErr(v.error.issues[0]!.message);
    setBusy(true); setErr("");
    const { data, error } = await supabase.auth.signUp({
      email: v.data.email,
      password: v.data.password,
      options: {
        data: { full_name: v.data.full_name, kelas: v.data.kelas },
        emailRedirectTo: window.location.origin,
      },
    });
    setBusy(false);
    if (error) return setErr(error.message.includes("already") ? "Email ini sudah terdaftar. Coba masuk saja." : error.message);
    if (!data.session) {
      setSentEmail(v.data.email);
      return;
    }
    toast.success("Akun berhasil dibuat!");
    afterLogin();
  };

  const doForgot = async () => {
    const v = z.string().trim().email("Email tidak valid").safeParse(form.email);
    if (!v.success) return setErr(v.error.issues[0]!.message);
    setBusy(true); setErr("");
    const { error } = await supabase.auth.resetPasswordForEmail(v.data, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) return setErr(error.message);
    toast.success("Tautan reset password dikirim ke emailmu.");
    setMode("login");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") doLogin();
    else if (mode === "register") doRegister();
    else doForgot();
  };

  if (sentEmail) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <div className="card-soft p-8">
          <div className="text-5xl">📬</div>
          <h1 className="mt-4 text-2xl font-bold">Cek emailmu ya!</h1>
          <p className="mt-2 text-muted-foreground">
            Kami mengirim tautan konfirmasi ke <b>{sentEmail}</b>. Klik tautannya, lalu masuk dengan akun barumu.
          </p>
          <button className="btn btn-primary mt-6" onClick={() => { setSentEmail(""); setMode("login"); }}>
            Ke halaman masuk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="card-soft p-8">
        <div className="text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-lavender font-display text-2xl font-bold text-primary">Σ</span>
          <h1 className="mt-3 text-2xl font-bold">
            {mode === "login" ? "Masuk ke ADJUSTIFY" : mode === "register" ? "Daftar Akun Baru" : "Lupa Password"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "forgot"
              ? "Masukkan email, kami kirim tautan untuk mengatur password baru."
              : "Satu akun untuk menyimpan semua progres belajarmu."}
          </p>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === "register" && (
            <>
              <label className="block text-sm font-semibold">Nama lengkap
                <input className="field mt-1" value={form.full_name} onChange={set("full_name")} placeholder="contoh: Salsabila Zahra" maxLength={100} />
              </label>
              <label className="block text-sm font-semibold">Kelas
                <select className="field mt-1" value={form.kelas} onChange={set("kelas")}>
                  <option value="A">Kelas A</option>
                  <option value="B">Kelas B</option>
                </select>
              </label>
            </>
          )}
          <label className="block text-sm font-semibold">Email
            <input className="field mt-1" type="email" value={form.email} onChange={set("email")} placeholder="nama@email.com" maxLength={255} />
          </label>
          {mode !== "forgot" && (
            <label className="block text-sm font-semibold">Password
              <input className="field mt-1" type="password" value={form.password} onChange={set("password")} placeholder="minimal 6 karakter" maxLength={72} />
            </label>
          )}

          {err && <p className="rounded-xl bg-pink p-3 text-sm font-medium text-destructive">{err}</p>}

          <button className="btn btn-primary w-full" disabled={busy}>
            {busy ? "Memproses…" : mode === "login" ? "Masuk" : mode === "register" ? "Daftar" : "Kirim tautan reset"}
          </button>
        </form>

        <div className="mt-5 space-y-2 text-center text-sm">
          {mode === "login" && (
            <>
              <button className="text-primary underline" onClick={() => { setMode("forgot"); setErr(""); }}>Lupa password?</button>
              <p className="text-muted-foreground">
                Belum punya akun?{" "}
                <button className="font-semibold text-primary underline" onClick={() => { setMode("register"); setErr(""); }}>Daftar di sini</button>
              </p>
            </>
          )}
          {mode === "register" && (
            <p className="text-muted-foreground">
              Sudah punya akun?{" "}
              <button className="font-semibold text-primary underline" onClick={() => { setMode("login"); setErr(""); }}>Masuk</button>
            </p>
          )}
          {mode === "forgot" && (
            <button className="text-primary underline" onClick={() => { setMode("login"); setErr(""); }}>← Kembali ke halaman masuk</button>
          )}
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        <Link to="/" className="underline">← Kembali ke beranda</Link>
      </p>
    </div>
  );
}

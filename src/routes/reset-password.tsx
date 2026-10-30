import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Atur Ulang Password — ADJUSTIFY" },
      { name: "description", content: "Atur password baru untuk akun ADJUSTIFY-mu." },
    ],
  }),
  component: ResetPage,
});

function ResetPage() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Tautan reset membawa token di hash URL; Supabase menukarnya jadi sesi recovery.
    if (window.location.hash.includes("type=recovery")) setReady(true);
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return setErr("Password minimal 6 karakter.");
    if (password !== confirm) return setErr("Konfirmasi password tidak sama.");
    setBusy(true); setErr("");
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return setErr(error.message);
    toast.success("Password berhasil diubah. Silakan masuk.");
    nav({ to: "/auth", search: { redirect: "" } });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="card-soft p-8">
        <h1 className="text-2xl font-bold">Atur Password Baru</h1>
        {!ready ? (
          <p className="mt-3 text-muted-foreground">
            Tautan reset tidak valid atau sudah kedaluwarsa. Minta tautan baru dari halaman masuk.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-5 space-y-4">
            <label className="block text-sm font-semibold">Password baru
              <input className="field mt-1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={72} />
            </label>
            <label className="block text-sm font-semibold">Ulangi password baru
              <input className="field mt-1" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} maxLength={72} />
            </label>
            {err && <p className="rounded-xl bg-pink p-3 text-sm font-medium text-destructive">{err}</p>}
            <button className="btn btn-primary w-full" disabled={busy}>{busy ? "Menyimpan…" : "Simpan password baru"}</button>
          </form>
        )}
      </div>
    </div>
  );
}

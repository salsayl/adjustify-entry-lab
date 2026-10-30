import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageTitle } from "@/components/SiteHeader";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/lib/learning";

export const Route = createFileRoute("/_authenticated/profil")({
  head: () => ({
    meta: [
      { title: "Profil Akun — ADJUSTIFY" },
      { name: "description", content: "Kelola nama, kelas, dan password akun ADJUSTIFY-mu." },
    ],
  }),
  component: ProfilPage,
});

function ProfilPage() {
  const { data: profile } = useProfile();
  const qc = useQueryClient();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [kelas, setKelas] = useState<"A" | "B">("A");
  const [curPass, setCurPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);
  useEffect(() => {
    if (profile) { setName(profile.full_name); setKelas(profile.kelas === "B" ? "B" : "A"); }
  }, [profile]);

  const saveProfile = async () => {
    if (name.trim().length < 3) return toast.error("Nama minimal 3 huruf.");
    if (!profile) return;
    setBusy(true);
    const { error } = await supabase.from("profiles").update({ full_name: name.trim(), kelas }).eq("id", profile.id);
    setBusy(false);
    if (error) return toast.error("Gagal menyimpan profil.");
    await qc.invalidateQueries({ queryKey: ["profile"] });
    toast.success("Profil berhasil disimpan.");
  };

  const changePassword = async () => {
    if (newPass.length < 6) { toast.error("Password baru minimal 6 karakter."); return; }
    if (!curPass) { toast.error("Isi password saat ini dulu ya."); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: newPass, current_password: curPass });
    setBusy(false);
    if (error) { toast.error(error.message.includes("Current password") ? "Password saat ini salah." : error.message); return; }
    setCurPass(""); setNewPass("");
    toast.success("Password berhasil diubah.");
  };

  const logout = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    nav({ to: "/auth", replace: true });
  };

  return (
    <>
      <PageTitle tag="Profil" title="Profil Akun" desc="Kelola data akun dan keamanan password-mu di sini." />
      <div className="mx-auto max-w-2xl space-y-6 px-4 py-10">
        <section className="card-soft p-6">
          <h2 className="text-xl font-bold">Data akun</h2>
          <div className="mt-4 space-y-4">
            <label className="block text-sm font-semibold">Email
              <input className="field mt-1 bg-muted" value={email} disabled />
            </label>
            <label className="block text-sm font-semibold">Nama lengkap
              <input className="field mt-1" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
            </label>
            <label className="block text-sm font-semibold">Kelas
              <select className="field mt-1" value={kelas} onChange={(e) => setKelas(e.target.value as "A" | "B")}>
                <option value="A">Kelas A</option>
                <option value="B">Kelas B</option>
              </select>
            </label>
            <button className="btn btn-primary" disabled={busy} onClick={saveProfile}>Simpan profil</button>
          </div>
        </section>

        <section className="card-soft p-6">
          <h2 className="text-xl font-bold">Ubah password</h2>
          <div className="mt-4 space-y-4">
            <label className="block text-sm font-semibold">Password saat ini
              <input className="field mt-1" type="password" value={curPass} onChange={(e) => setCurPass(e.target.value)} maxLength={72} />
            </label>
            <label className="block text-sm font-semibold">Password baru
              <input className="field mt-1" type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} maxLength={72} />
            </label>
            <button className="btn btn-outline" disabled={busy} onClick={changePassword}>Ubah password</button>
          </div>
        </section>

        <section className="card-soft p-6 text-center">
          <p className="text-sm text-muted-foreground">Selesai belajar untuk hari ini?</p>
          <button className="btn btn-outline mt-3" onClick={logout}>Keluar dari akun</button>
        </section>
      </div>
    </>
  );
}

// Lapisan data belajar: semua baca/tulis lewat klien Supabase dengan RLS,
// sehingga setiap siswa hanya bisa mengakses datanya sendiri.
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export type Profile = { id: string; full_name: string; kelas: string };
export type MateriProgressRow = { materi_slug: string; completed: boolean; last_slide: number; updated_at: string };
export type QuizAnswer = {
  i: number;
  kind: string;
  topic: string;
  q: string;
  chosen: string;
  correct: string;
  isCorrect: boolean;
  why: string;
};
export type QuizAttempt = {
  id: string;
  correct_count: number;
  total_count: number;
  duration_seconds: number;
  answers: QuizAnswer[];
  created_at: string;
};
export type SimRow = { id: string; sim_id: string; is_correct: boolean; attempts: number; created_at: string };

async function requireUserId() {
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Belum masuk");
  return data.user.id;
}

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<Profile | null> => {
      const uid = await requireUserId();
      const { data, error } = await supabase.from("profiles").select("id, full_name, kelas").eq("id", uid).maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export type LearningData = {
  materi: MateriProgressRow[];
  quizzes: QuizAttempt[];
  sims: SimRow[];
};

export function useLearning() {
  return useQuery({
    queryKey: ["learning"],
    queryFn: async (): Promise<LearningData> => {
      const uid = await requireUserId();
      const [m, q, s] = await Promise.all([
        supabase.from("materi_progress").select("materi_slug, completed, last_slide, updated_at").eq("user_id", uid),
        supabase.from("quiz_attempts").select("id, correct_count, total_count, duration_seconds, answers, created_at").eq("user_id", uid).order("created_at", { ascending: false }),
        supabase.from("simulation_history").select("id, sim_id, is_correct, attempts, created_at").eq("user_id", uid).order("created_at", { ascending: false }),
      ]);
      if (m.error) throw m.error;
      if (q.error) throw q.error;
      if (s.error) throw s.error;
      return {
        materi: m.data ?? [],
        quizzes: (q.data ?? []) as unknown as QuizAttempt[],
        sims: s.data ?? [],
      };
    },
  });
}

export function useLearningActions() {
  const qc = useQueryClient();
  const done = () => qc.invalidateQueries({ queryKey: ["learning"] });

  return {
    async markMateri(slug: string, completed: boolean, lastSlide: number) {
      const uid = await requireUserId();
      const { error } = await supabase.from("materi_progress").upsert(
        { user_id: uid, materi_slug: slug, completed, last_slide: lastSlide, updated_at: new Date().toISOString() },
        { onConflict: "user_id,materi_slug" },
      );
      if (error) throw error;
      await done();
    },
    async saveQuiz(a: { correct: number; total: number; durationSeconds: number; answers: QuizAnswer[] }) {
      const uid = await requireUserId();
      const { error } = await supabase.from("quiz_attempts").insert({
        user_id: uid,
        correct_count: a.correct,
        total_count: a.total,
        duration_seconds: a.durationSeconds,
        answers: a.answers as unknown as Json,
      });
      if (error) throw error;
      await done();
    },
    async saveSimulation(simId: string, isCorrect: boolean, attempts: number) {
      const uid = await requireUserId();
      const { error } = await supabase.from("simulation_history").insert({
        user_id: uid,
        sim_id: simId,
        is_correct: isCorrect,
        attempts,
      });
      if (error) throw error;
      await done();
    },
  };
}

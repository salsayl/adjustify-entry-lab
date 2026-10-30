import { useEffect, useState } from "react";

export type QuizResult = { correct: number; total: number; date: string };
export type Progress = {
  materiRead: string[];
  simSolved: string[];
  quiz: QuizResult | null;
};

const KEY = "adjustify-progress";
const empty: Progress = { materiRead: [], simSolved: [], quiz: null };

function read(): Progress {
  try {
    return { ...empty, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return empty;
  }
}

export function useProgress() {
  const [p, setP] = useState<Progress>(empty);
  useEffect(() => {
    setP(read());
    const on = () => setP(read());
    window.addEventListener("adjustify-progress", on);
    return () => window.removeEventListener("adjustify-progress", on);
  }, []);
  const update = (fn: (p: Progress) => Progress) => {
    const next = fn(read());
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("adjustify-progress"));
  };
  return {
    progress: p,
    markMateri: (slug: string) =>
      update((x) => (x.materiRead.includes(slug) ? x : { ...x, materiRead: [...x.materiRead, slug] })),
    markSim: (id: string) =>
      update((x) => (x.simSolved.includes(id) ? x : { ...x, simSolved: [...x.simSolved, id] })),
    saveQuiz: (r: QuizResult) => update((x) => ({ ...x, quiz: r })),
    reset: () => update(() => empty),
  };
}

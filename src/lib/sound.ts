// Suara: narasi (Web Speech API, bahasa Indonesia) + efek benar/salah (Web Audio).

export function toSpeech(text: string) {
  return text
    .replace(/÷/g, " dibagi ")
    .replace(/×/g, " dikali ")
    .replace(/ − /g, " dikurangi ")
    .replace(/\(D\)/g, " di debit ")
    .replace(/\(K\)/g, " di kredit ")
    .replace(/–/g, " sampai ")
    .replace(/Rp(\d[\d.]*)/g, (_, n: string) => `${n.replace(/\./g, "")} rupiah`)
    .replace(/(\d+)\/12/g, "$1 per 12");
}

export function canSpeak() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(text: string, onEnd?: () => void) {
  if (!canSpeak()) return;
  const s = window.speechSynthesis;
  s.cancel();
  const u = new SpeechSynthesisUtterance(toSpeech(text));
  u.lang = "id-ID";
  u.rate = 0.95;
  const v = s.getVoices().find((x) => x.lang.toLowerCase().startsWith("id"));
  if (v) u.voice = v;
  if (onEnd) u.onend = onEnd;
  s.speak(u);
}

export function stopSpeak() {
  if (canSpeak()) window.speechSynthesis.cancel();
}

let ctx: AudioContext | null = null;
export function playFeedback(ok: boolean) {
  try {
    ctx ??= new AudioContext();
    const notes = ok ? [660, 880] : [300, 220];
    notes.forEach((f, i) => {
      const o = ctx!.createOscillator();
      const g = ctx!.createGain();
      o.type = "sine";
      o.frequency.value = f;
      const t = ctx!.currentTime + i * 0.13;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.2, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
      o.connect(g).connect(ctx!.destination);
      o.start(t);
      o.stop(t + 0.22);
    });
  } catch {
    /* audio tidak tersedia */
  }
}

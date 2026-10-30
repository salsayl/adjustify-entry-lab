// Suara: narasi materi (Web Speech API, bahasa Indonesia) dengan kontrol
// play/pause/stop/volume/kecepatan, musik latar lembut, dan efek suara kuis
// (semuanya Web Audio, tanpa berkas eksternal).

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

export type SpeakOptions = { rate?: number; volume?: number; onEnd?: () => void };

export function speak(text: string, opts: SpeakOptions = {}) {
  if (!canSpeak()) return;
  const s = window.speechSynthesis;
  s.cancel();
  const u = new SpeechSynthesisUtterance(toSpeech(text));
  u.lang = "id-ID";
  u.rate = opts.rate ?? 0.95;
  u.volume = opts.volume ?? 1;
  const v = s.getVoices().find((x) => x.lang.toLowerCase().startsWith("id"));
  if (v) u.voice = v;
  if (opts.onEnd) u.onend = opts.onEnd;
  s.speak(u);
}

export function pauseSpeak() {
  if (canSpeak()) window.speechSynthesis.pause();
}

export function resumeSpeak() {
  if (canSpeak()) window.speechSynthesis.resume();
}

export function stopSpeak() {
  if (canSpeak()) window.speechSynthesis.cancel();
}

// ---- Efek suara & musik (Web Audio) ----

let ctx: AudioContext | null = null;
function audio() {
  ctx ??= new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(freq: number, start: number, dur: number, vol: number, type: OscillatorType = "sine") {
  const c = audio();
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  const t = c.currentTime + start;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + dur + 0.05);
}

export function playFeedback(ok: boolean) {
  try {
    (ok ? [660, 880] : [300, 220]).forEach((f, i) => tone(f, i * 0.13, 0.2, 0.2));
  } catch { /* audio tidak tersedia */ }
}

// Efek kuis: mulai, pindah soal, selesai.
export function playStart() {
  try { [523, 659, 784].forEach((f, i) => tone(f, i * 0.12, 0.25, 0.15)); } catch { /* abaikan */ }
}
export function playNavigate() {
  try { tone(520, 0, 0.09, 0.08); } catch { /* abaikan */ }
}
export function playFinish() {
  try { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.15, 0.35, 0.18)); } catch { /* abaikan */ }
}

// Musik latar lembut: pad akord yang bergantian pelan, volume rendah agar
// tidak mengganggu konsentrasi.
const CHORDS = [
  [261.63, 329.63, 392.0], // C
  [220.0, 261.63, 329.63], // Am
  [174.61, 220.0, 261.63], // F
  [196.0, 246.94, 293.66], // G
];

let musicGain: GainNode | null = null;
let musicTimer: ReturnType<typeof setInterval> | null = null;
let musicChord = 0;
let musicVol = 0.5;

function playChord() {
  const c = audio();
  const chord = CHORDS[musicChord % CHORDS.length]!;
  musicChord += 1;
  for (const f of chord) {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    o.frequency.value = f;
    const t = c.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.33, t + 0.8);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 3.4);
    o.connect(g).connect(musicGain!);
    o.start(t);
    o.stop(t + 3.5);
  }
}

export function startMusic(volume = musicVol) {
  try {
    musicVol = volume;
    const c = audio();
    if (!musicGain) {
      musicGain = c.createGain();
      musicGain.connect(c.destination);
    }
    musicGain.gain.value = volume * 0.05;
    if (musicTimer) return; // sudah berjalan
    playChord();
    musicTimer = setInterval(playChord, 2600);
  } catch { /* audio tidak tersedia */ }
}

export function setMusicVolume(v: number) {
  musicVol = v;
  if (musicGain) musicGain.gain.value = v * 0.05;
}

export function stopMusic() {
  if (musicTimer) clearInterval(musicTimer);
  musicTimer = null;
}

export function isMusicPlaying() {
  return musicTimer !== null;
}

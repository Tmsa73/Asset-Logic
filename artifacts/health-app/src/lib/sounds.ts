type SoundKind = "xp" | "level" | "achievement" | "toggle";

const STORAGE_KEY = "bodylogic-sound-effects";

export function areSoundEffectsEnabled() {
  return localStorage.getItem(STORAGE_KEY) === "true";
}

export function setSoundEffectsEnabled(enabled: boolean) {
  localStorage.setItem(STORAGE_KEY, String(enabled));
}

export function playGamificationSound(kind: SoundKind) {
  if (!areSoundEffectsEnabled() && kind !== "toggle") return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const sequence: Record<SoundKind, number[]> = {
      xp: [520, 660],
      level: [440, 660, 880],
      achievement: [660, 880, 1040],
      toggle: [420, 620],
    };
    sequence[kind].forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(ctx.destination);
      const start = ctx.currentTime + index * 0.09;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.045, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.08);
      osc.start(start);
      osc.stop(start + 0.09);
    });
    setTimeout(() => ctx.close(), 600);
  } catch {
    return;
  }
}
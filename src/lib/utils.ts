import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getLevelColor(level: string): string {
  switch (level) {
    case "tease": return "text-pink-300";
    case "sensual": return "text-rose-400";
    case "dirty": return "text-red-500";
    case "filthy": return "text-red-600";
    case "depraved": return "text-red-800";
    default: return "text-white";
  }
}

export function getLevelBg(level: string): string {
  switch (level) {
    case "tease": return "bg-pink-500/20 border-pink-500/50";
    case "sensual": return "bg-rose-500/20 border-rose-500/50";
    case "dirty": return "bg-red-500/20 border-red-500/50";
    case "filthy": return "bg-red-600/20 border-red-600/50";
    case "depraved": return "bg-red-900/30 border-red-800/50";
    default: return "bg-white/10 border-white/30";
  }
}

"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { cn, getLevelColor, getLevelBg } from "@/lib/utils";
import type { GameLevel } from "@/types";

const nsfwLevels: { id: GameLevel; name: string; emoji: string }[] = [
  { id: "tease", name: "Tease", emoji: "💋" },
  { id: "sensual", name: "Sensual", emoji: "🔥" },
  { id: "dirty", name: "Dirty", emoji: "😈" },
  { id: "filthy", name: "Filthy", emoji: "🫠" },
  { id: "depraved", name: "Depraved", emoji: "💀" },
];

const chillLevels: { id: GameLevel; name: string; emoji: string }[] = [
  { id: "tease", name: "Flirty", emoji: "😏" },
  { id: "sensual", name: "Touchy", emoji: "🫦" },
  { id: "dirty", name: "Naughty", emoji: "😈" },
];

const partyLevels: { id: GameLevel; name: string; emoji: string }[] = [
  { id: "tease", name: "Warm Up", emoji: "🌊" },
  { id: "sensual", name: "Getting Hot", emoji: "🔥" },
  { id: "dirty", name: "Party Time", emoji: "🎉" },
  { id: "filthy", name: "Peak Energy", emoji: "⚡" },
  { id: "depraved", name: "Legendary", emoji: "🏆" },
];

const partyActiveClass: Record<GameLevel, string> = {
  tease: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  sensual: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  dirty: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  filthy: "bg-red-500/20 text-red-400 border-red-500/30",
  depraved: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const chillActiveClass: Record<GameLevel, string> = {
  tease: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  sensual: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  dirty: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  filthy: "bg-red-500/20 text-red-400 border-red-500/30",
  depraved: "bg-red-700/20 text-red-500 border-red-700/30",
};

export function LevelSelector() {
  const { session, setLevel, currentVibe } = useGameStore();
  if (!session) return null;

  let displayLevels: { id: GameLevel; name: string; emoji: string }[];
  let activeClass: Record<GameLevel, string> | undefined;

  switch (currentVibe) {
    case "party":
      displayLevels = partyLevels;
      activeClass = partyActiveClass;
      break;
    case "chill":
      displayLevels = chillLevels;
      activeClass = chillActiveClass;
      break;
    default:
      displayLevels = nsfwLevels;
      activeClass = undefined;
      break;
  }

  return (
    <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-center">
      {displayLevels.map((level) => {
        const isActive = session.level === level.id;
        return (
          <motion.button
            key={level.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLevel(level.id)}
            className={cn(
              "px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold border transition-all min-h-[36px]",
              isActive && activeClass
                ? activeClass[level.id]
                : isActive
                ? cn(getLevelBg(level.id), getLevelColor(level.id))
                : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
            )}
          >
            {level.emoji} {level.name}
          </motion.button>
        );
      })}
    </div>
  );
}

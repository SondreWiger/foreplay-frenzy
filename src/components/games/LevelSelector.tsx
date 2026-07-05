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

export function LevelSelector() {
  const { session, setLevel, currentVibe } = useGameStore();
  if (!session) return null;

  const isParty = currentVibe === "party";
  const displayLevels = isParty ? partyLevels : nsfwLevels;

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
              isActive
                ? isParty
                  ? partyActiveClass[level.id]
                  : cn(getLevelBg(level.id), getLevelColor(level.id))
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

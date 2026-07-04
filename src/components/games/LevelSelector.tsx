"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { cn, getLevelColor, getLevelBg } from "@/lib/utils";
import type { GameLevel } from "@/types";

const levels: { id: GameLevel; name: string; emoji: string }[] = [
  { id: "tease", name: "Tease", emoji: "💋" },
  { id: "sensual", name: "Sensual", emoji: "🔥" },
  { id: "dirty", name: "Dirty", emoji: "😈" },
  { id: "filthy", name: "Filthy", emoji: "🫠" },
  { id: "depraved", name: "Depraved", emoji: "💀" },
];

export function LevelSelector() {
  const { session, setLevel } = useGameStore();
  if (!session) return null;

  return (
    <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-center">
      {levels.map((level) => (
        <motion.button
          key={level.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLevel(level.id)}
          className={cn(
            "px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold border transition-all min-h-[36px]",
            session.level === level.id
              ? getLevelBg(level.id) + " " + getLevelColor(level.id)
              : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
          )}
        >
          {level.emoji} {level.name}
        </motion.button>
      ))}
    </div>
  );
}

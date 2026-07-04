"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { cn } from "@/lib/utils";
import type { ArousalLevel } from "@/types";

const labels: Record<ArousalLevel, string> = {
  1: "Mild",
  2: "Warm",
  3: "Hot",
  4: "Burning",
  5: "On Fire",
};

const colors: Record<ArousalLevel, string> = {
  1: "bg-pink-400",
  2: "bg-rose-400",
  3: "bg-red-500",
  4: "bg-red-600",
  5: "bg-red-700",
};

const textColors: Record<ArousalLevel, string> = {
  1: "text-pink-400",
  2: "text-rose-400",
  3: "text-red-500",
  4: "text-red-600",
  5: "text-red-700",
};

export function ArousalMeter({ playerId }: { playerId: string }) {
  const { players, updatePlayer } = useGameStore();
  const player = players.find((p) => p.id === playerId);
  if (!player) return null;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <span className="text-[10px] sm:text-xs text-white/40 w-12 sm:w-16">Arousal</span>
      <div className="flex gap-0.5 sm:gap-1 flex-1">
        {([1, 2, 3, 4, 5] as ArousalLevel[]).map((level) => (
          <motion.button
            key={level}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => updatePlayer(playerId, { arousal: level })}
            className={cn(
              "w-6 sm:w-8 h-2.5 sm:h-3 rounded-full transition-all min-h-[10px]",
              player.arousal >= level
                ? colors[level]
                : "bg-white/10"
            )}
          />
        ))}
      </div>
      <span className={cn("text-[10px] sm:text-xs font-bold w-12 sm:w-16 text-right", textColors[player.arousal])}>
        {labels[player.arousal]}
      </span>
    </div>
  );
}

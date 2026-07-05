"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { cn } from "@/lib/utils";
import type { ArousalLevel, GameVibe } from "@/types";

const partyLabels: Record<ArousalLevel, string> = {
  1: "Lively",
  2: "Hyped",
  3: "Wild",
  4: "Feral",
  5: "Legendary",
};

const partyColors: Record<ArousalLevel, string> = {
  1: "bg-amber-400",
  2: "bg-amber-500",
  3: "bg-orange-500",
  4: "bg-orange-600",
  5: "bg-yellow-400",
};

const partyTextColors: Record<ArousalLevel, string> = {
  1: "text-amber-400",
  2: "text-amber-500",
  3: "text-orange-500",
  4: "text-orange-600",
  5: "text-yellow-400",
};

const nsfwLabels: Record<ArousalLevel, string> = {
  1: "Mild",
  2: "Warm",
  3: "Hot",
  4: "Burning",
  5: "On Fire",
};

const nsfwColors: Record<ArousalLevel, string> = {
  1: "bg-pink-400",
  2: "bg-rose-400",
  3: "bg-red-500",
  4: "bg-red-600",
  5: "bg-red-700",
};

const nsfwTextColors: Record<ArousalLevel, string> = {
  1: "text-pink-400",
  2: "text-rose-400",
  3: "text-red-500",
  4: "text-red-600",
  5: "text-red-700",
};

export function ArousalMeter({ playerId, vibe }: { playerId: string; vibe?: GameVibe }) {
  const { players, updatePlayer } = useGameStore();
  const player = players.find((p) => p.id === playerId);
  if (!player) return null;

  const isParty = vibe === "party";
  const labels = isParty ? partyLabels : nsfwLabels;
  const colors = isParty ? partyColors : nsfwColors;
  const textColors = isParty ? partyTextColors : nsfwTextColors;
  const meterLabel = isParty ? "Energy" : "Arousal";

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <span className="text-[10px] sm:text-xs text-white/40 w-12 sm:w-16">{meterLabel}</span>
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

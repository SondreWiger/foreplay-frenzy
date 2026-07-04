"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { kinkCategories, createDefaultLimits } from "@/lib/limits";
import type { KinkLimit } from "@/types";
import { cn } from "@/lib/utils";

export function LimitsSetup({ onComplete }: { onComplete: () => void }) {
  const { consentProfiles, updateLimits, players } = useGameStore();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [limits, setLimits] = useState<KinkLimit[]>(createDefaultLimits());

  const currentPlayer = players[currentPlayerIndex];
  const currentCategory = kinkCategories[currentCategoryIndex];

  const updateLimit = (kinkId: string, status: KinkLimit["status"]) => {
    setLimits((prev) =>
      prev.map((l) => (l.id === kinkId ? { ...l, status } : l))
    );
  };

  const updateIntensity = (kinkId: string, intensity: number) => {
    setLimits((prev) =>
      prev.map((l) => (l.id === kinkId ? { ...l, intensity } : l))
    );
  };

  const handleNextCategory = () => {
    if (currentCategoryIndex < kinkCategories.length - 1) {
      setCurrentCategoryIndex((prev) => prev + 1);
    } else {
      updateLimits(currentPlayer.id, limits);
      if (currentPlayerIndex < players.length - 1) {
        setCurrentPlayerIndex((prev) => prev + 1);
        setCurrentCategoryIndex(0);
        const nextPlayer = players[currentPlayerIndex + 1];
        const existing = consentProfiles.find((p) => p.playerId === nextPlayer.id);
        setLimits(existing?.limits || createDefaultLimits());
      } else {
        onComplete();
      }
    }
  };

  const categoryLimits = limits.filter((l) => l.category === currentCategory.name);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Set Your Limits</h2>
        <p className="text-xs sm:text-sm text-white/40">
          {currentPlayer?.name} • Category {currentCategoryIndex + 1}/{kinkCategories.length}
        </p>
        <div className="flex justify-center gap-1 mt-2 sm:mt-3 overflow-x-auto">
          {kinkCategories.map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all flex-shrink-0",
                i === currentCategoryIndex
                  ? "bg-neon-pink w-4 sm:w-6"
                  : i < currentCategoryIndex
                  ? "bg-blood-500"
                  : "bg-white/20"
              )}
            />
          ))}
        </div>
      </div>

      <Card variant="elevated" className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
          <span className="text-xl sm:text-2xl">🏷️</span>
          {currentCategory.name}
        </h3>

        <div className="space-y-2 sm:space-y-3">
          {categoryLimits.map((limit) => (
            <motion.div
              key={limit.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-blood-800/50 rounded-xl p-2.5 sm:p-3"
            >
              <div className="flex items-center justify-between mb-1.5 sm:mb-2 gap-2">
                <span className="text-xs sm:text-sm text-white/90 truncate">{limit.name}</span>
                <div className="flex gap-1 flex-shrink-0">
                  {(["yes", "maybe", "hard-no"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateLimit(limit.id, status)}
                      className={cn(
                        "px-1.5 sm:px-2 py-1 rounded text-[9px] sm:text-[10px] font-bold transition-all min-h-[28px] min-w-[36px]",
                        limit.status === status
                          ? status === "yes"
                            ? "bg-green-500 text-white"
                            : status === "maybe"
                            ? "bg-yellow-500 text-black"
                            : "bg-red-600 text-white"
                          : "bg-white/10 text-white/40 hover:bg-white/20"
                      )}
                    >
                      {status === "yes" ? "YES" : status === "maybe" ? "MAYBE" : "NO"}
                    </button>
                  ))}
                </div>
              </div>

              {limit.status !== "hard-no" && (
                <div className="flex items-center gap-2">
                  <span className="text-[9px] sm:text-[10px] text-white/30 w-10 sm:w-12">Intensity</span>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={limit.intensity}
                    onChange={(e) => updateIntensity(limit.id, parseInt(e.target.value))}
                    className="flex-1 h-1.5 sm:h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-blood-500 min-h-[24px]"
                  />
                  <span className="text-[10px] sm:text-xs text-white/50 w-5 sm:w-6 text-right">{limit.intensity}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Card>

      <Button
        onClick={handleNextCategory}
        variant="primary"
        className="w-full min-h-[48px]"
      >
        {currentCategoryIndex < kinkCategories.length - 1
          ? "Next Category →"
          : currentPlayerIndex < players.length - 1
          ? `Next: ${players[currentPlayerIndex + 1]?.name}`
          : "Done ✓"}
      </Button>
    </div>
  );
}

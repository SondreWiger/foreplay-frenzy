"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { ArousalMeter } from "@/components/ui/ArousalMeter";
import { cn } from "@/lib/utils";

export function Scoreboard() {
  const { session, players, currentVibe } = useGameStore();
  if (!session) return null;

  const sorted = [...players].sort(
    (a, b) => (session.score[b.id] || 0) - (session.score[a.id] || 0)
  );

  return (
    <div className="bg-blood-900/80 border border-blood-700/50 rounded-2xl p-3 sm:p-4">
      <h3 className="text-[10px] sm:text-xs font-bold tracking-widest text-white/40 mb-2 sm:mb-3 text-center">
        SCOREBOARD
      </h3>
      <div className="space-y-2 sm:space-y-3">
        {sorted.map((player, i) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-xl",
              session.currentTurn === player.id && "bg-blood-800/50 border border-blood-600/30"
            )}
          >
            <span className="text-sm sm:text-lg font-bold text-white/30 w-5 sm:w-6 text-center">
              {i + 1}
            </span>
            <span className="text-lg sm:text-xl">{player.avatar}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-bold text-white truncate">{player.name}</p>
              {currentVibe !== "party" && <ArousalMeter playerId={player.id} vibe={currentVibe} />}
            </div>
            <span className="text-base sm:text-lg font-bold text-neon-pink">
              {session.score[player.id] || 0}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

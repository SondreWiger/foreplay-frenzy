"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { formatTime, cn } from "@/lib/utils";

export function Timer() {
  const {
    timerRunning,
    timerElapsed,
    timerDuration,
    timerLabel,
    tickTimer,
  } = useGameStore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => tickTimer(), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerRunning, tickTimer]);

  const progress = timerDuration > 0 ? timerElapsed / timerDuration : 0;
  const remaining = timerDuration - timerElapsed;

  if (timerDuration === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-blood-900/90 border border-blood-700/50 rounded-2xl p-3 sm:p-4 text-center"
    >
      <p className="text-[10px] sm:text-xs text-white/40 mb-2 uppercase tracking-widest">{timerLabel}</p>

      <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="6"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={remaining <= 10 ? "#ef4444" : "#dc2626"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={283}
            strokeDashoffset={283 * (1 - progress)}
            animate={{ strokeDashoffset: 283 * (1 - progress) }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn(
              "text-2xl sm:text-3xl font-mono font-bold",
              remaining <= 10 ? "text-red-400 animate-pulse" : "text-white"
            )}
          >
            {formatTime(remaining)}
          </span>
        </div>
      </div>

      {timerRunning && (
        <p className="text-[10px] sm:text-xs text-white/30">Running...</p>
      )}
      {!timerRunning && timerElapsed >= timerDuration && (
        <p className="text-[10px] sm:text-xs text-neon-pink font-bold">TIME&apos;S UP!</p>
      )}
    </motion.div>
  );
}

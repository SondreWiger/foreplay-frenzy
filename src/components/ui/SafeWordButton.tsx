"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { cn } from "@/lib/utils";
import type { SafeWordStatus } from "@/types";

export function SafeWordButton() {
  const { safeWordStatus, setSafeWordStatus, setShowAftercare } = useGameStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatus = (status: SafeWordStatus) => {
    setSafeWordStatus(status);
    if (status === "red") {
      setShowAftercare(true);
    }
    setIsExpanded(false);
  };

  const colors: Record<SafeWordStatus, string> = {
    green: "bg-green-500 hover:bg-green-400 shadow-green-500/50",
    yellow: "bg-yellow-500 hover:bg-yellow-400 shadow-yellow-500/50",
    red: "bg-red-600 hover:bg-red-500 shadow-red-600/50",
  };

  const labels: Record<SafeWordStatus, string> = {
    green: "GREEN",
    yellow: "YELLOW",
    red: "RED — STOP",
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 safe-bottom">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-14 right-0 sm:bottom-16 bg-blood-900 border border-blood-700/50 rounded-xl p-3 shadow-xl min-w-[180px] sm:min-w-[200px]"
          >
            <p className="text-xs text-white/40 mb-2 text-center">Traffic Light</p>
            {(["green", "yellow", "red"] as SafeWordStatus[]).map((status) => (
              <motion.button
                key={status}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStatus(status)}
                className={cn(
                  "w-full py-3 px-4 rounded-lg text-xs font-bold text-white mb-2 last:mb-0 transition-all min-h-[44px]",
                  safeWordStatus === status ? colors[status] : "bg-white/10 hover:bg-white/20"
                )}
              >
                {labels[status]}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg font-bold text-xs text-white transition-all min-h-[44px] min-w-[44px]",
          colors[safeWordStatus]
        )}
      >
        {safeWordStatus === "green" && "🟢"}
        {safeWordStatus === "yellow" && "🟡"}
        {safeWordStatus === "red" && "🔴"}
      </motion.button>
    </div>
  );
}

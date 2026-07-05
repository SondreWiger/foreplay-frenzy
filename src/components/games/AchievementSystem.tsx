"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ALL_ACHIEVEMENTS, getAchievementProgress } from "@/lib/achievements";
import { getStats, getUnlockedAchievements } from "@/lib/storage";
import { cn } from "@/lib/utils";
import type { Achievement } from "@/types";

export function AchievementSystem() {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [stats, setStats] = useState(getStats());
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all");

  useEffect(() => {
    setUnlockedIds(getUnlockedAchievements());
    setStats(getStats());
  }, []);

  const progress = getAchievementProgress();

  const filtered = ALL_ACHIEVEMENTS.filter((a) => {
    if (filter === "unlocked") return unlockedIds.includes(a.id);
    if (filter === "locked") return !unlockedIds.includes(a.id);
    return true;
  });

  const getCategory = (id: string): string => {
    if (id.startsWith("truth")) return "Truths";
    if (id.startsWith("dare")) return "Dares";
    if (id.startsWith("wild")) return "Wild Cards";
    if (id.startsWith("modes")) return "Variety";
    if (id.startsWith("points")) return "Score";
    if (id.startsWith("play")) return "Levels";
    if (id.startsWith("group")) return "Group Play";
    if (id.startsWith("streak")) return "Streaks";
    if (id.startsWith("night") || id.startsWith("marathon")) return "Time";
    if (id.startsWith("custom")) return "Creator";
    if (id.startsWith("drink")) return "Drinking";
    if (id.startsWith("rounds")) return "Dedication";
    if (id === "prude") return "Special";
    if (id === "first-game") return "Sessions";
    return "Other";
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-1">Achievements</h2>
        <p className="text-xs text-white/40">{progress.unlocked}/{progress.total} unlocked</p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-blood-800/50 rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blood-500 to-neon-pink rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(progress.unlocked / progress.total) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Sessions", value: stats.totalSessions, emoji: "🎮" },
          { label: "Rounds", value: stats.totalRounds, emoji: "🔄" },
          { label: "Points", value: stats.totalPoints, emoji: "💎" },
          { label: "Truths", value: stats.truthsCompleted, emoji: "💋" },
          { label: "Dares", value: stats.daresCompleted, emoji: "🔥" },
          { label: "Modes", value: stats.modesPlayed.length, emoji: "🎲" },
        ].map((s) => (
          <div key={s.label} className="bg-blood-900/50 border border-blood-800/30 rounded-xl p-2.5 text-center">
            <span className="text-sm">{s.emoji}</span>
            <p className="text-sm sm:text-base font-bold text-white">{s.value}</p>
            <p className="text-[9px] text-white/40">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["all", "unlocked", "locked"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all min-h-[32px]",
              filter === f
                ? "bg-neon-pink/20 text-neon-pink border border-neon-pink/40"
                : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10"
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Achievement list */}
      <div className="space-y-2">
        {filtered.map((ach, i) => {
          const unlocked = unlockedIds.includes(ach.id);
          const category = getCategory(ach.id);
          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className={cn(
                "rounded-xl p-3 flex items-center gap-3 border transition-all",
                unlocked
                  ? "bg-blood-800/30 border-neon-pink/20"
                  : "bg-blood-900/30 border-blood-800/30 opacity-60"
              )}
            >
              <span className={cn("text-2xl", !unlocked && "grayscale opacity-50")}>{ach.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={cn("text-sm font-bold", unlocked ? "text-white" : "text-white/50")}>{ach.name}</p>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-blood-800/50 text-white/30">{category}</span>
                </div>
                <p className={cn("text-[10px]", unlocked ? "text-white/40" : "text-white/25")}>{ach.description}</p>
              </div>
              {unlocked && <span className="text-xs text-neon-pink">✓</span>}
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-white/30">
            {filter === "unlocked" ? "No achievements unlocked yet. Play some games!" : "All achievements unlocked! You're a legend."}
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Achievement } from "@/types";

const allAchievements: Achievement[] = [
  { id: "first-game", name: "First Timer", description: "Complete your first game session", emoji: "🎮", condition: "complete_1_session" },
  { id: "truth-teller", name: "Truth Teller", description: "Answer 10 truth cards", emoji: "💋", condition: "10_truths" },
  { id: "dare-devil", name: "Dare Devil", description: "Complete 10 dare cards", emoji: "🔥", condition: "10_dares" },
  { id: "party-animal", name: "Party Animal", description: "Play 5 different game modes", emoji: "🎉", condition: "5_modes" },
  { id: "point-master", name: "Point Master", description: "Earn 100+ points in a single session", emoji: "👑", condition: "100_points" },
  { id: "wild-child", name: "Wild Child", description: "Play on Filthy or Depraved level", emoji: "😈", condition: "play_extreme" },
  { id: "group-gamer", name: "Group Gamer", description: "Play with 4+ players", emoji: "👯", condition: "group_play" },
  { id: "drinker", name: "Cheers!", description: "Complete a drinking game session", emoji: "🍺", condition: "drinking_session" },
  { id: "streak-3", name: "Hat Trick", description: "Play 3 sessions in a row", emoji: "Hat Trick", condition: "3_streak" },
  { id: "night-owl", name: "Night Owl", description: "Play past midnight", emoji: "🦉", condition: "play_late" },
  { id: "custom-creator", name: "Creator", description: "Create a custom card pack", emoji: "🎨", condition: "custom_pack" },
  { id: "marathon", name: "Marathon", description: "Play for 1+ hour", emoji: "🏃", condition: "long_session" },
];

export function AchievementSystem() {
  const [unlocked, setUnlocked] = useState<string[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("achievements") || "[]");
    setUnlocked(stored);
  }, []);

  const newlyUnlocked = allAchievements.filter((a) => unlocked.includes(a.id));
  const locked = allAchievements.filter((a) => !unlocked.includes(a.id));

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-1">Achievements</h2>
        <p className="text-xs text-white/40">
          {unlocked.length}/{allAchievements.length} unlocked
        </p>
      </div>

      {/* Progress */}
      <div className="w-full bg-blood-800/50 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blood-500 to-neon-pink rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(unlocked.length / allAchievements.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Unlocked */}
      {newlyUnlocked.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white/60 tracking-wider">UNLOCKED</h3>
          {newlyUnlocked.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-blood-800/30 border border-neon-pink/20 rounded-xl p-3 flex items-center gap-3"
            >
              <span className="text-2xl">{ach.emoji}</span>
              <div>
                <p className="text-sm font-bold text-white">{ach.name}</p>
                <p className="text-[10px] text-white/40">{ach.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Locked */}
      {locked.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white/40 tracking-wider">LOCKED</h3>
          {locked.map((ach) => (
            <div
              key={ach.id}
              className="bg-blood-900/30 border border-blood-800/30 rounded-xl p-3 flex items-center gap-3 opacity-50"
            >
              <span className="text-2xl grayscale">{ach.emoji}</span>
              <div>
                <p className="text-sm font-bold text-white/60">{ach.name}</p>
                <p className="text-[10px] text-white/30">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper to unlock achievements
export function unlockAchievement(condition: string) {
  const stored = JSON.parse(localStorage.getItem("achievements") || "[]");
  const allIds = allAchievements.map((a) => a.id);
  const match = allAchievements.find((a) => a.condition === condition);
  if (match && !stored.includes(match.id)) {
    stored.push(match.id);
    localStorage.setItem("achievements", JSON.stringify(stored));
  }
}

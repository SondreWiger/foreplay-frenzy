"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { generateId } from "@/lib/utils";
import type { Player, PlayerMode } from "@/types";
import { cn } from "@/lib/utils";

const avatars = [
  "😈", "🥵", "💋", "👅", "🖕", "🍆", "🍑", "💦", "🔥", "😈",
  "🖤", "⛓️", "🎭", "🐾", "👑", "💎", "🌙", "⭐", "🎀", "🖤",
];

const modes: { id: PlayerMode; name: string; emoji: string; description: string }[] = [
  { id: "solo", name: "Solo", emoji: "🪞", description: "Self-tease mode" },
  { id: "couple", name: "Couple", emoji: "💑", description: "Two players" },
  { id: "group", name: "Group", emoji: "👯", description: "3-8 players" },
];

export function PlayerSetup({ onComplete, onSkipLimits }: { onComplete: () => void; onSkipLimits: () => void }) {
  const { players, addPlayer, removePlayer, updatePlayer, playerMode, setPlayerMode } =
    useGameStore();

  const [newName, setNewName] = useState("");

  const handleAddPlayer = () => {
    if (!newName.trim()) return;
    const player: Player = {
      id: generateId(),
      name: newName.trim(),
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
      arousal: 1,
      obediencePoints: 0,
      isSubmissive: false,
      drinks: 0,
    };
    addPlayer(player);
    setNewName("");
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Mode Selection */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 text-center">Game Mode</h2>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {modes.map((mode) => (
            <motion.button
              key={mode.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setPlayerMode(mode.id)}
              className={cn(
                "p-3 sm:p-4 rounded-xl border text-center transition-all min-h-[80px]",
                playerMode === mode.id
                  ? "bg-blood-700/50 border-neon-pink/50 shadow-lg shadow-neon-pink/10"
                  : "bg-blood-900/50 border-blood-700/30 hover:bg-blood-800/50"
              )}
            >
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{mode.emoji}</div>
              <p className="text-xs sm:text-sm font-bold text-white">{mode.name}</p>
              <p className="text-[9px] sm:text-[10px] text-white/40 hidden sm:block">{mode.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Players */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 text-center">Players</h2>
        <div className="space-y-2 sm:space-y-3">
          {players.map((player, i) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="elevated" className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative">
                    <button className="text-2xl sm:text-3xl min-h-[44px] min-w-[44px] flex items-center justify-center">{player.avatar}</button>
                  </div>

                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => updatePlayer(player.id, { name: e.target.value })}
                    className="flex-1 bg-transparent border-b border-white/20 text-white font-bold text-base sm:text-lg focus:outline-none focus:border-neon-pink transition-colors min-h-[44px]"
                    placeholder="Name"
                  />

                  {players.length > 1 && (
                    <button
                      onClick={() => removePlayer(player.id)}
                      className="text-white/30 hover:text-red-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center text-lg"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex gap-1 mt-2 sm:mt-3 flex-wrap">
                  {avatars.map((a) => (
                    <button
                      key={a}
                      onClick={() => updatePlayer(player.id, { avatar: a })}
                      className={cn(
                        "w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-sm sm:text-lg flex items-center justify-center transition-all min-h-[32px] min-w-[32px]",
                        player.avatar === a
                          ? "bg-blood-600 scale-110"
                          : "bg-blood-800/50 hover:bg-blood-700/50"
                      )}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {playerMode !== "solo" && (
          <div className="flex gap-2 mt-3 sm:mt-4">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddPlayer()}
              placeholder="Add player name..."
              className="flex-1 bg-blood-800/50 border border-blood-700/30 rounded-xl px-3 sm:px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neon-pink/50 transition-colors min-h-[44px]"
            />
            <Button onClick={handleAddPlayer} variant="secondary" size="sm" className="min-h-[44px]">
              + Add
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Button onClick={onComplete} variant="primary" size="lg" className="w-full min-h-[52px]">
          Next: Set Limits →
        </Button>
        <Button onClick={onSkipLimits} variant="ghost" size="md" className="w-full min-h-[44px]">
          Skip Limits — Start Playing →
        </Button>
      </div>
    </div>
  );
}

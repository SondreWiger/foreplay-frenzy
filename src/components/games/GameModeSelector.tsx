"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { Card } from "@/components/ui/Card";
import type { GameMode } from "@/types";

const gameModes: {
  id: GameMode;
  name: string;
  emoji: string;
  description: string;
  color: string;
}[] = [
  {
    id: "truth-or-dare",
    name: "Truth or Dare",
    emoji: "💋",
    description: "The classic. Abyss edition.",
    color: "from-pink-500/20 to-red-500/20 border-pink-500/30",
  },
  {
    id: "never-have-i-ever",
    name: "Never Have I Ever",
    emoji: "🤫",
    description: "Confess your sins.",
    color: "from-rose-500/20 to-red-500/20 border-rose-500/30",
  },
  {
    id: "fantasy-dice",
    name: "Fantasy Dice",
    emoji: "🎲",
    description: "Roll for your fate.",
    color: "from-purple-500/20 to-red-500/20 border-purple-500/30",
  },
  {
    id: "roleplay-roulette",
    name: "Roleplay Roulette",
    emoji: "🎭",
    description: "500+ dirty scenarios.",
    color: "from-amber-500/20 to-red-500/20 border-amber-500/30",
  },
  {
    id: "blindfold-sensory",
    name: "Blindfold + Sensory",
    emoji: "🙈",
    description: "Sensory overload.",
    color: "from-teal-500/20 to-red-500/20 border-teal-500/30",
  },
  {
    id: "edging-control",
    name: "Edging & Control",
    emoji: "⏱️",
    description: "Orgasm denial mastery.",
    color: "from-orange-500/20 to-red-500/20 border-orange-500/30",
  },
  {
    id: "free-play",
    name: "Free Play",
    emoji: "🔥",
    description: "No rules. Just play.",
    color: "from-red-500/20 to-red-900/20 border-red-500/30",
  },
];

export function GameModeSelector() {
  const { startSession } = useGameStore();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Choose Your Game</h2>
        <p className="text-xs sm:text-sm text-white/40">How filthy do you want to get?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {gameModes.map((mode, i) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card
              variant="elevated"
              onClick={() => startSession(mode.id)}
              className={`p-4 sm:p-5 bg-gradient-to-br ${mode.color} hover:scale-[1.03] transition-all`}
            >
              <div className="flex items-center gap-3 sm:block">
                <div className="text-3xl sm:text-4xl sm:mb-2">{mode.emoji}</div>
                <div>
                  <h3 className="text-sm sm:text-lg font-bold text-white">{mode.name}</h3>
                  <p className="text-[10px] sm:text-xs text-white/50">{mode.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

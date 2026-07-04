"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { Card } from "@/components/ui/Card";
import type { GameMode, GameVibe } from "@/types";

const gameModes: {
  id: GameMode;
  name: string;
  emoji: string;
  description: string;
  color: string;
  vibe: GameVibe;
  category: "core" | "party" | "spicy" | "extreme";
}[] = [
  // CORE
  { id: "truth-or-dare", name: "Truth or Dare", emoji: "💋", description: "The classic. Abyss edition.", color: "from-pink-500/20 to-red-500/20 border-pink-500/30", vibe: "spicy", category: "core" },
  { id: "never-have-i-ever", name: "Never Have I Ever", emoji: "🤫", description: "Confess your sins.", color: "from-rose-500/20 to-red-500/20 border-rose-500/30", vibe: "spicy", category: "core" },
  { id: "fantasy-dice", name: "Fantasy Dice", emoji: "🎲", description: "Roll for your fate.", color: "from-purple-500/20 to-red-500/20 border-purple-500/30", vibe: "spicy", category: "core" },
  { id: "roleplay-roulette", name: "Roleplay Roulette", emoji: "🎭", description: "500+ dirty scenarios.", color: "from-amber-500/20 to-red-500/20 border-amber-500/30", vibe: "spicy", category: "core" },
  { id: "free-play", name: "Free Play", emoji: "🔥", description: "No rules. Just play.", color: "from-red-500/20 to-red-900/20 border-red-500/30", vibe: "spicy", category: "core" },

  // PARTY
  { id: "drinking-game", name: "Drinking Game", emoji: "🍺", description: "Sip, shot, chug.", color: "from-amber-500/20 to-yellow-500/20 border-amber-500/30", vibe: "party", category: "party" },
  { id: "who-most-likely", name: "Who's Most Likely To", emoji: "👉", description: "Point fingers.", color: "from-orange-500/20 to-red-500/20 border-orange-500/30", vibe: "party", category: "party" },
  { id: "would-you-rather", name: "Would You Rather", emoji: "🤔", description: "Impossible choices.", color: "from-teal-500/20 to-red-500/20 border-teal-500/30", vibe: "party", category: "party" },
  { id: "two-truths-lie", name: "Two Truths & A Lie", emoji: "🤥", description: "Deceive your friends.", color: "from-indigo-500/20 to-red-500/20 border-indigo-500/30", vibe: "party", category: "party" },
  { id: "kink-charades", name: "Dirty Charades", emoji: "🎭", description: "Act it out dirty.", color: "from-fuchsia-500/20 to-red-500/20 border-fuchsia-500/30", vibe: "party", category: "party" },
  { id: "story-builder", name: "Story Builder", emoji: "📖", description: "Build a filthy story.", color: "from-cyan-500/20 to-red-500/20 border-cyan-500/30", vibe: "chill", category: "party" },
  { id: "rate-me", name: "Rate Me", emoji: "⭐", description: "How do they see you?", color: "from-yellow-500/20 to-red-500/20 border-yellow-500/30", vibe: "spicy", category: "party" },
  { id: "hot-take", name: "Hot Takes", emoji: "🔥", description: "Defend your take.", color: "from-red-600/20 to-orange-500/20 border-red-600/30", vibe: "party", category: "party" },
  { id: "this-or-that", name: "This or That", emoji: "⚖️", description: "Pick a side.", color: "from-violet-500/20 to-red-500/20 border-violet-500/30", vibe: "spicy", category: "spicy" },
  { id: "emoji-guess", name: "Emoji Guess", emoji: "猜测", description: "Decode dirty emojis.", color: "from-lime-500/20 to-red-500/20 border-lime-500/30", vibe: "party", category: "party" },
];

const categories = [
  { id: "core", name: "Core Games", emoji: "🎮" },
  { id: "party", name: "Party & Friends", emoji: "🎉" },
  { id: "spicy", name: "Spicy & Intimate", emoji: "🌶️" },
];

export function GameModeSelector() {
  const { startSession } = useGameStore();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Choose Your Game</h2>
        <p className="text-xs sm:text-sm text-white/40">How do you want to play?</p>
      </div>

      {categories.map((cat) => {
        const modes = gameModes.filter((m) => m.category === cat.id);
        if (modes.length === 0) return null;
        return (
          <div key={cat.id} className="space-y-3">
            <h3 className="text-xs font-bold tracking-widest text-white/40 flex items-center gap-2">
              <span>{cat.emoji}</span> {cat.name.toUpperCase()}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {modes.map((mode, i) => (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Card
                    variant="elevated"
                    onClick={() => startSession(mode.id, mode.vibe)}
                    className={`p-3 sm:p-4 bg-gradient-to-br ${mode.color} hover:scale-[1.02] transition-all`}
                  >
                    <div className="flex items-center gap-3 sm:block">
                      <div className="text-2xl sm:text-3xl sm:mb-1">{mode.emoji}</div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-white">{mode.name}</h3>
                        <p className="text-[10px] sm:text-xs text-white/50">{mode.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

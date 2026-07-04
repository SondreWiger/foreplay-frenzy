"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, getLevelColor, getLevelBg } from "@/lib/utils";
import type { GameCard as GameCardType } from "@/types";

interface GameCardProps {
  card: GameCardType;
  onAccept?: () => void;
  onSkip?: () => void;
  showActions?: boolean;
  compact?: boolean;
}

const typeEmojis: Record<string, string> = {
  truth: "💋",
  dare: "🔥",
  wild: "⚡",
  "never-have-i-ever": "🤫",
  dice: "🎲",
  roleplay: "🎭",
  challenge: "🏆",
  hypno: "🌀",
};

const typeLabels: Record<string, string> = {
  truth: "TRUTH",
  dare: "DARE",
  wild: "WILD CARD",
  "never-have-i-ever": "NEVER HAVE I EVER",
  dice: "DICE ROLL",
  roleplay: "ROLEPLAY",
  challenge: "CHALLENGE",
  hypno: "HYPNO",
};

export function GameCard({
  card,
  onAccept,
  onSkip,
  showActions = true,
  compact = false,
}: GameCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "rounded-xl border p-3 sm:p-4",
          getLevelBg(card.level)
        )}
      >
        <div className="flex items-start gap-3">
          <span className="text-xl sm:text-2xl">{typeEmojis[card.type] || "❓"}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold tracking-widest text-white/40">
                {typeLabels[card.type]}
              </span>
              <span className={cn("text-[10px] font-bold tracking-wider", getLevelColor(card.level))}>
                {card.level.toUpperCase()}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/90">{card.text}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="card-flip-container w-full max-w-md mx-auto">
      <motion.div
        className={cn(
          "relative w-full min-h-[260px] sm:min-h-[300px] rounded-2xl border-2 cursor-pointer transition-all duration-300",
          isFlipped
            ? "bg-blood-800 border-blood-500"
            : "bg-gradient-to-br from-blood-900 via-blood-800 to-blood-900 border-blood-600/50"
        )}
        onClick={handleFlip}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        layout
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 text-center"
            >
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">{typeEmojis[card.type] || "❓"}</div>
              <h3 className="text-lg sm:text-xl font-bold text-white/90 mb-2">
                {typeLabels[card.type]}
              </h3>
              <span
                className={cn(
                  "text-[10px] sm:text-xs font-bold tracking-widest px-3 py-1 rounded-full border",
                  getLevelBg(card.level),
                  getLevelColor(card.level)
                )}
              >
                {card.level.toUpperCase()}
              </span>
              <p className="text-xs sm:text-sm text-white/40 mt-4 sm:mt-6">Tap to reveal</p>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col p-4 sm:p-6"
            >
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">{typeEmojis[card.type]}</span>
                <span className={cn("text-[10px] sm:text-xs font-bold tracking-wider", getLevelColor(card.level))}>
                  {card.level.toUpperCase()}
                </span>
                {card.points && (
                  <span className="ml-auto text-[10px] sm:text-xs text-neon-pink font-bold">
                    +{card.points} pts
                  </span>
                )}
              </div>

              <p className="text-sm sm:text-lg text-white/95 font-medium leading-relaxed flex-1">
                {card.text}
              </p>

              {card.requires && card.requires.length > 0 && (
                <div className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-white/40">
                  <span className="font-semibold">Needs:</span>{" "}
                  {card.requires.join(", ")}
                </div>
              )}

              {card.duration && (
                <div className="mt-1 text-[10px] sm:text-xs text-white/40">
                  <span className="font-semibold">Duration:</span>{" "}
                  {Math.floor(card.duration / 60)}m {card.duration % 60}s
                </div>
              )}

              {showActions && (
                <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
                  {onAccept && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAccept();
                      }}
                      className="flex-1 py-3 rounded-xl bg-neon-pink/20 border border-neon-pink/50 text-neon-pink font-bold text-sm hover:bg-neon-pink/30 transition-colors min-h-[44px]"
                    >
                      ACCEPT 🔥
                    </motion.button>
                  )}
                  {onSkip && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSkip();
                      }}
                      className="flex-1 py-3 rounded-xl bg-white/5 border border-white/20 text-white/60 font-bold text-sm hover:bg-white/10 transition-colors min-h-[44px]"
                    >
                      SKIP
                    </motion.button>
                  )}
                </div>
              )}

              <p className="text-[10px] sm:text-xs text-white/30 text-center mt-3 sm:mt-4">Tap to flip back</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/Button";

const nsfwAffirmations = [
  "You are safe. You are loved. You are enough.",
  "That was incredible. You were amazing.",
  "Take a deep breath. You did so well.",
  "You're so brave for trusting me/us.",
  "Let me hold you. You deserve to be cared for.",
  "Drink some water. You've earned it.",
  "Your body is beautiful. Thank you for sharing it.",
  "That took courage. I'm proud of you.",
  "Rest now. You did everything right.",
  "You are desired. You are precious.",
];

const partyAffirmations = [
  "That was a blast! You all crushed it!",
  "What a round! Who's ready for more?",
  "You're a legend. Absolute icon behavior.",
  "That was so fun — we need to do this more often!",
  "Cheers to us! We really know how to party.",
  "You brought the energy tonight. Respect.",
  "That was iconic. No one tops that.",
  "We're basically professional fun-havers at this point.",
  "Take a breather, grab a snack — you earned it!",
  "That's a core memory right there.",
];

const nsfwTips = [
  "💧 Drink water",
  "🤗 Hold each other",
  "💬 Talk about what you liked",
  "🩹 Check for any marks or soreness",
];

const partyTips = [
  "💧 Hydrate!",
  "📸 Take a group selfie",
  "🗣️ Share your favorite moment",
  "🎉 Plan the next round",
];

export function AftercareModal() {
  const { showAftercare, setShowAftercare, endSession, setPhase, currentVibe } = useGameStore();

  const isParty = currentVibe === "party";
  const affirmations = isParty ? partyAffirmations : nsfwAffirmations;
  const tips = isParty ? partyTips : nsfwTips;
  const affirmation = useMemo(() => affirmations[Math.floor(Math.random() * affirmations.length)], [isParty]);

  const handleEnd = () => {
    endSession();
    setShowAftercare(false);
  };

  const handleContinue = () => {
    setPhase("playing");
    setShowAftercare(false);
  };

  return (
    <AnimatePresence>
      {showAftercare && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-blood-900 border border-blood-700/50 rounded-2xl p-5 sm:p-8 max-w-md w-full text-center space-y-4 sm:space-y-6"
          >
            <div className="text-5xl sm:text-6xl">{isParty ? "🎉" : "💚"}</div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {isParty ? "Great Game!" : "Aftercare Time"}
            </h2>

            <div className="bg-blood-800/50 rounded-xl p-3 sm:p-4">
              <p className="text-sm sm:text-base text-white/80 italic">
                &ldquo;{affirmation}&rdquo;
              </p>
            </div>

            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/60">
              {tips.map((tip, i) => (
                <p key={i}>{tip}</p>
              ))}
            </div>

            <div className="flex gap-3">
              <Button onClick={handleEnd} variant="primary" className="flex-1 min-h-[48px]">
                End Session
              </Button>
              <Button onClick={handleContinue} variant="ghost" className="flex-1 min-h-[48px]">
                Keep Playing
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

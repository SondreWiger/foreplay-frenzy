"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/Button";

const affirmations = [
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

export function AftercareModal() {
  const { showAftercare, setShowAftercare, endSession, setPhase } = useGameStore();

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
            <div className="text-5xl sm:text-6xl">💚</div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Aftercare Time</h2>

            <div className="bg-blood-800/50 rounded-xl p-3 sm:p-4">
              <p className="text-sm sm:text-base text-white/80 italic">
                &ldquo;{affirmations[Math.floor(Math.random() * affirmations.length)]}&rdquo;
              </p>
            </div>

            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/60">
              <p>💧 Drink water</p>
              <p>🤗 Hold each other</p>
              <p>💬 Talk about what you liked</p>
              <p>🩹 Check for any marks or soreness</p>
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

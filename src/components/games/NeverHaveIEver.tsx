"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { GameCard } from "@/components/ui/GameCard";
import { Button } from "@/components/ui/Button";
import { ArousalMeter } from "@/components/ui/ArousalMeter";
import { getFilteredRandomCard } from "@/lib/card-engine";

export function NeverHaveIEver() {
  const {
    session,
    players,
    activeCard,
    setActiveCard,
    addToHistory,
    addScore,
    nextTurn,
    setPhase,
    currentVibe,
    round,
  } = useGameStore();

  const [playedIds, setPlayedIds] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [hasDone, setHasDone] = useState<boolean | null>(null);

  const currentPlayer = players.find((p) => p.id === session?.currentTurn);

  const drawCard = useCallback(() => {
    const card = getFilteredRandomCard("never-have-i-ever", currentVibe, round, 3, playedIds);
    if (card) {
      setActiveCard(card);
      setPlayedIds((prev) => [...prev, card.id]);
      setHasDone(null);
    }
  }, [currentVibe, round, playedIds, setActiveCard]);

  const handleAnswer = (done: boolean) => {
    if (!activeCard || !currentPlayer) return;
    setHasDone(done);
    setShowResult(true);
    addToHistory({
      cardId: activeCard.id,
      playerId: currentPlayer.id,
      action: activeCard.text,
      result: done ? "completed" : "skipped",
      points: done ? (activeCard.points || 10) : 0,
    });
    if (done) {
      addScore(currentPlayer.id, activeCard.points || 10);
    }
  };

  const handleNext = () => {
    setShowResult(false);
    setActiveCard(null);
    setHasDone(null);
    nextTurn();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Never Have I Ever</h2>
          <p className="text-xs text-white/40">
            {currentPlayer?.name}&apos;s turn
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setPhase("paused")}>
          ⏸️ Pause
        </Button>
      </div>

      {currentPlayer && <ArousalMeter playerId={currentPlayer.id} vibe={currentVibe} />}

      <AnimatePresence mode="wait">
        {activeCard && !showResult && (
          <motion.div
            key={activeCard.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <GameCard card={activeCard} showActions={false} />
            <div className="flex gap-3 mt-4">
              <Button onClick={() => handleAnswer(true)} variant="danger" className="flex-1">
                I HAVE 🙈
              </Button>
              <Button onClick={() => handleAnswer(false)} variant="ghost" className="flex-1">
                I HAVEN'T
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-center space-y-4"
          >
            <div className="text-5xl">{hasDone ? "🙈" : "😇"}</div>
            <h3 className="text-xl font-bold text-white">
              {hasDone ? "Naughty!" : "Innocent!"}
            </h3>
            <p className="text-sm text-white/50">
              {hasDone
                ? `+${activeCard?.points || 10} points — you've been busy!`
                : "No points. Tell the truth!"}
            </p>
            <Button onClick={handleNext} variant="primary">
              Next Player →
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {!activeCard && !showResult && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Button onClick={drawCard} variant="danger" size="lg">
            🤫 DRAW CARD
          </Button>
        </motion.div>
      )}

      <div className="pt-4 border-t border-white/10">
        <Button variant="ghost" size="sm" onClick={() => setPhase("aftercare")} className="w-full">
          🛑 End Session
        </Button>
      </div>
    </div>
  );
}

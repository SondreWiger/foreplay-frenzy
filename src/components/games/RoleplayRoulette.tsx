"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { GameCard } from "@/components/ui/GameCard";
import { Button } from "@/components/ui/Button";
import { Timer } from "@/components/ui/Timer";
import { ArousalMeter } from "@/components/ui/ArousalMeter";
import { getFilteredRandomCard } from "@/lib/card-engine";

export function RoleplayRoulette() {
  const {
    session,
    players,
    activeCard,
    setActiveCard,
    addToHistory,
    addScore,
    nextTurn,
    setPhase,
    startTimer,
    currentVibe,
    round,
  } = useGameStore();

  const [playedIds, setPlayedIds] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const currentPlayer = players.find((p) => p.id === session?.currentTurn);

  const drawCard = useCallback(() => {
    const card = getFilteredRandomCard("roleplay-roulette", currentVibe, round, 3, playedIds);
    if (card) {
      setActiveCard(card);
      setPlayedIds((prev) => [...prev, card.id]);
    }
  }, [currentVibe, round, playedIds, setActiveCard]);

  const handleAccept = () => {
    if (!activeCard || !currentPlayer) return;
    setShowResult(true);
    addToHistory({
      cardId: activeCard.id,
      playerId: currentPlayer.id,
      action: activeCard.text,
      result: "completed",
      points: activeCard.points || 15,
    });
    addScore(currentPlayer.id, activeCard.points || 15);
    if (activeCard.duration) {
      startTimer(activeCard.duration, "Roleplay Scene");
    }
  };

  const handleNext = () => {
    setShowResult(false);
    setActiveCard(null);
    nextTurn();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Roleplay Roulette</h2>
          <p className="text-xs text-white/40">
            {currentPlayer?.name}&apos;s scene
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setPhase("paused")}>
          ⏸️ Pause
        </Button>
      </div>

      <Timer />

      {currentPlayer && <ArousalMeter playerId={currentPlayer.id} vibe={currentVibe} />}

      <AnimatePresence mode="wait">
        {activeCard && !showResult && (
          <motion.div
            key={activeCard.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <GameCard
              card={activeCard}
              onAccept={handleAccept}
              onSkip={() => { setActiveCard(null); nextTurn(); }}
            />
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
            <div className="text-5xl">🎭</div>
            <h3 className="text-xl font-bold text-white">Scene Set!</h3>
            <p className="text-sm text-white/50">+{activeCard?.points || 15} points</p>
            <Button onClick={handleNext} variant="primary">
              Next Player →
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {!activeCard && !showResult && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Button onClick={drawCard} variant="danger" size="lg">
            🎭 SPIN THE ROULETTE
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

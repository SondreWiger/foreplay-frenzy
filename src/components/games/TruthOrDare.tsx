"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { GameCard } from "@/components/ui/GameCard";
import { Button } from "@/components/ui/Button";
import { Timer } from "@/components/ui/Timer";
import { ArousalMeter } from "@/components/ui/ArousalMeter";
import { defaultPacks, getCardsByLevel, filterByLimits, getRandomCard } from "@/lib/cards";
import { getHardNoIds } from "@/lib/limits";
import type { GameCard as GameCardType } from "@/types";

export function TruthOrDare() {
  const {
    session,
    players,
    activeCard,
    setActiveCard,
    addToHistory,
    addScore,
    nextTurn,
    endSession,
    setPhase,
    consentProfiles,
    startTimer,
  } = useGameStore();

  const [playedIds, setPlayedIds] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [resultType, setResultType] = useState<"completed" | "skipped">("completed");

  const currentPlayer = players.find((p) => p.id === session?.currentTurn);

  // Get all truth or dare cards
  const allCards = defaultPacks.find((p) => p.id === "truth-or-dare-abyss")?.cards || [];

  // Filter by limits
  const hardNos = consentProfiles.flatMap((cp) => getHardNoIds(cp.limits));
  const filteredCards = filterByLimits(allCards, hardNos);

  const drawCard = useCallback(
    (type?: "truth" | "dare" | "wild") => {
      const level = session?.level || "tease";
      let pool = getCardsByLevel(filteredCards, level);
      if (type) {
        pool = pool.filter((c) => c.type === type || c.type === "wild");
      }
      const card = getRandomCard(pool, level, playedIds);
      if (card) {
        setActiveCard(card);
        setPlayedIds((prev) => [...prev, card.id]);
      }
    },
    [filteredCards, session?.level, playedIds, setActiveCard]
  );

  const handleAccept = () => {
    if (!activeCard || !currentPlayer) return;
    setResultType("completed");
    setShowResult(true);
    addToHistory({
      cardId: activeCard.id,
      playerId: currentPlayer.id,
      action: activeCard.text,
      result: "completed",
      points: activeCard.points || 10,
    });
    addScore(currentPlayer.id, activeCard.points || 10);

    // Start timer if card has duration
    if (activeCard.duration) {
      startTimer(activeCard.duration, activeCard.text.slice(0, 40) + "...");
    }
  };

  const handleSkip = () => {
    if (!activeCard || !currentPlayer) return;
    setResultType("skipped");
    setShowResult(true);
    addToHistory({
      cardId: activeCard.id,
      playerId: currentPlayer.id,
      action: activeCard.text,
      result: "skipped",
      points: 0,
    });
  };

  const handleNext = () => {
    setShowResult(false);
    setActiveCard(null);
    nextTurn();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Truth or Dare</h2>
          <p className="text-xs text-white/40">
            {currentPlayer?.name}&apos;s turn • {session?.level?.toUpperCase()} mode
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setPhase("paused")}>
          ⏸️ Pause
        </Button>
      </div>

      {/* Timer */}
      <Timer />

      {/* Arousal Meter */}
      {currentPlayer && <ArousalMeter playerId={currentPlayer.id} />}

      {/* Active Card */}
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
              onSkip={handleSkip}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-center space-y-4"
          >
            <div className="text-5xl">{resultType === "completed" ? "🔥" : "⏭️"}</div>
            <h3 className="text-xl font-bold text-white">
              {resultType === "completed" ? "Well done!" : "Skipped!"}
            </h3>
            <p className="text-sm text-white/50">
              {resultType === "completed"
                ? `+${activeCard?.points || 10} points earned`
                : "No points this time"}
            </p>
            <Button onClick={handleNext} variant="primary">
              Next Player →
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Draw Buttons */}
      {!activeCard && !showResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <p className="text-center text-sm text-white/40">Choose wisely...</p>
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="primary"
              onClick={() => drawCard("truth")}
              className="flex flex-col items-center gap-2 py-6"
            >
              <span className="text-2xl">💋</span>
              <span>Truth</span>
            </Button>
            <Button
              variant="danger"
              onClick={() => drawCard("dare")}
              className="flex flex-col items-center gap-2 py-6"
            >
              <span className="text-2xl">🔥</span>
              <span>Dare</span>
            </Button>
            <Button
              variant="neon"
              onClick={() => drawCard()}
              className="flex flex-col items-center gap-2 py-6"
            >
              <span className="text-2xl">⚡</span>
              <span>Wild</span>
            </Button>
          </div>
        </motion.div>
      )}

      {/* End Session */}
      <div className="pt-4 border-t border-white/10">
        <Button variant="ghost" size="sm" onClick={() => setPhase("aftercare")} className="w-full">
          🛑 End Session (Aftercare)
        </Button>
      </div>
    </div>
  );
}

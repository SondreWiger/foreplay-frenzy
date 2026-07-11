"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/Button";
import { ArousalMeter } from "@/components/ui/ArousalMeter";
import { getFilteredRandomCard } from "@/lib/card-engine";
import { addDrink } from "@/lib/storage";
import { cn } from "@/lib/utils";
import type { GameCard } from "@/types";

export function DrinkingGame() {
  const { session, players, addToHistory, addScore, nextTurn, setPhase, currentVibe, round, nextRound } = useGameStore();
  const [activeCard, setActiveCard] = useState<GameCard | null>(null);
  const [playedIds, setPlayedIds] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [voting, setVoting] = useState(false);
  const [votes, setVotes] = useState<Record<string, number>>({});

  const currentPlayer = players.find((p) => p.id === session?.currentTurn);

  const drawCard = useCallback(() => {
    const card = getFilteredRandomCard("drinking-game", currentVibe, round, 3, playedIds);
    if (card) {
      setActiveCard(card);
      setPlayedIds((prev) => [...prev, card.id]);
      setVotes({});
      setVoting(false);
    }
  }, [currentVibe, round, playedIds]);

  const handleVoting = () => setVoting(true);

  const castVote = (votedId: string) => {
    setVotes((prev) => ({ ...prev, [votedId]: (prev[votedId] || 0) + 1 }));
  };

  const finishVoting = () => {
    const sorted = Object.entries(votes).sort(([, a], [, b]) => b - a);
    if (sorted.length > 0) {
      const loserId = sorted[sorted.length - 1][0];
      const loser = players.find((p) => p.id === loserId);
      if (loser) {
        addToHistory({
          cardId: activeCard?.id,
          playerId: currentPlayer?.id || "",
          action: `${loser.name} drinks! (voted by group)`,
          result: "completed",
          points: 10,
        });
        addDrink();
      }
    }
    setVoting(false);
    setShowResult(true);
    nextRound();
  };

  const handleAccept = () => {
    if (!activeCard || !currentPlayer) return;
    setShowResult(true);
    addDrink();
    addToHistory({
      cardId: activeCard.id,
      playerId: currentPlayer.id,
      action: activeCard.text,
      result: "completed",
      points: activeCard.points || 10,
    });
    addScore(currentPlayer.id, activeCard.points || 10);
    nextRound();
  };

  const handleNext = () => {
    setShowResult(false);
    setActiveCard(null);
    nextTurn();
  };

  const needsVoting = activeCard &&
    (activeCard.text.toLowerCase().includes("who") || activeCard.text.toLowerCase().includes("everyone") || activeCard.text.toLowerCase().includes("rank") || activeCard.text.toLowerCase().includes("point at"));

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white">Drinking Game</h2>
          <p className="text-[10px] sm:text-xs text-white/40">{currentPlayer?.name}&apos;s turn</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setPhase("paused")}>⏸️ Pause</Button>
      </div>

      {currentPlayer && <ArousalMeter playerId={currentPlayer.id} vibe={currentVibe} />}

      <AnimatePresence mode="wait">
        {activeCard && !showResult && !voting && (
          <motion.div key={activeCard.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="bg-blood-900/90 border-2 border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍺</span>
              <span className="text-xs font-bold tracking-wider text-amber-400">{activeCard.type.toUpperCase().replace("-", " ")}</span>
              <span className="ml-auto text-xs text-neon-pink font-bold">+{activeCard.points} pts</span>
            </div>
            <p className="text-base sm:text-lg text-white/95 font-medium leading-relaxed">{activeCard.text}</p>

            {activeCard.optionA && activeCard.optionB && (
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blood-800/50 rounded-xl p-3 text-center">
                  <p className="text-[10px] text-white/40 mb-1">A</p>
                  <p className="text-sm font-bold text-white">{activeCard.optionA}</p>
                </div>
                <div className="bg-blood-800/50 rounded-xl p-3 text-center">
                  <p className="text-[10px] text-white/40 mb-1">B</p>
                  <p className="text-sm font-bold text-white">{activeCard.optionB}</p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {needsVoting ? (
                <Button onClick={handleVoting} variant="primary" className="flex-1 min-h-[48px]">🗳️ Start Voting</Button>
              ) : (
                <Button onClick={handleAccept} variant="primary" className="flex-1 min-h-[48px]">✅ Done / Drink!</Button>
              )}
              <Button onClick={handleNext} variant="ghost" className="min-h-[48px]">⏭️ Skip</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {voting && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="space-y-4">
            <h3 className="text-center text-sm font-bold text-white/60">Tap who you think it is:</h3>
            <div className="grid grid-cols-2 gap-2">
              {players.map((player) => (
                <motion.button key={player.id} whileTap={{ scale: 0.95 }} onClick={() => castVote(player.id)}
                  className={cn("p-3 rounded-xl border text-center transition-all min-h-[60px]",
                    votes[player.id] ? "bg-neon-pink/20 border-neon-pink/50" : "bg-blood-900/50 border-blood-700/30 hover:bg-blood-800/50")}>
                  <span className="text-xl">{player.avatar}</span>
                  <p className="text-xs font-bold text-white">{player.name}</p>
                  {votes[player.id] && <span className="text-[10px] text-neon-pink">{votes[player.id]} votes</span>}
                </motion.button>
              ))}
            </div>
            <Button onClick={finishVoting} variant="danger" className="w-full min-h-[48px]">🔒 Lock In Votes</Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showResult && !voting && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="text-center space-y-4">
            <div className="text-5xl">🍺</div>
            <h3 className="text-xl font-bold text-white">Cheers!</h3>
            <p className="text-sm text-white/50">+{activeCard?.points || 10} points</p>
            <Button onClick={handleNext} variant="primary">Next Player →</Button>
          </motion.div>
        )}
      </AnimatePresence>

      {!activeCard && !showResult && !voting && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Button onClick={drawCard} variant="danger" size="lg" className="min-h-[52px]">🍺 Draw a Card</Button>
        </motion.div>
      )}

      <div className="pt-4 border-t border-white/10">
        <Button variant="ghost" size="sm" onClick={() => setPhase("aftercare")} className="w-full min-h-[44px]">🛑 End Session</Button>
      </div>
    </div>
  );
}

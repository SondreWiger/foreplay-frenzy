"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/Button";
import { ArousalMeter } from "@/components/ui/ArousalMeter";
import { getFilteredRandomCard } from "@/lib/card-engine";
import { cn } from "@/lib/utils";
import type { GameCard, GameMode } from "@/types";

type GameType = "most-likely" | "would-you-rather" | "two-truths" | "this-or-that" | "charades" | "story" | "rate" | "hot-take" | "emoji";

interface GenericPartyGameProps {
  gameType: GameType;
}

const modeMap: Record<GameType, GameMode> = {
  "most-likely": "who-most-likely",
  "would-you-rather": "would-you-rather",
  "two-truths": "two-truths-lie",
  "this-or-that": "this-or-that",
  "charades": "kink-charades",
  "story": "story-builder",
  "rate": "rate-me",
  "hot-take": "hot-take",
  "emoji": "emoji-guess",
};

const titleMap: Record<GameType, string> = {
  "most-likely": "Who's Most Likely To",
  "would-you-rather": "Would You Rather",
  "two-truths": "Two Truths & A Lie",
  "this-or-that": "This or That",
  "charades": "Dirty Charades",
  "story": "Story Builder",
  "rate": "Rate Me",
  "hot-take": "Hot Takes",
  "emoji": "Emoji Guess",
};

const emojiMap: Record<GameType, string> = {
  "most-likely": "👉",
  "would-you-rather": "🤔",
  "two-truths": "🤥",
  "this-or-that": "⚖️",
  "charades": "🎭",
  "story": "📖",
  "rate": "⭐",
  "hot-take": "🔥",
  "emoji": "猜测",
};

export function GenericPartyGame({ gameType }: GenericPartyGameProps) {
  const { session, players, addToHistory, addScore, nextTurn, setPhase, currentVibe, round, nextRound } = useGameStore();
  const [activeCard, setActiveCard] = useState<GameCard | null>(null);
  const [playedIds, setPlayedIds] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timer, setTimer] = useState(0);

  const currentPlayer = players.find((p) => p.id === session?.currentTurn);
  const gameMode = modeMap[gameType];

  const drawCard = useCallback(() => {
    const card = getFilteredRandomCard(gameMode, currentVibe, round, 3, playedIds);
    if (card) {
      setActiveCard(card);
      setPlayedIds((prev) => [...prev, card.id]);
      setTimerActive(false);
      setTimer(0);
    }
  }, [gameMode, currentVibe, round, playedIds]);

  const handleAccept = () => {
    if (!activeCard || !currentPlayer) return;
    if (gameType === "charades" && activeCard.duration) {
      setTimerActive(true);
      setTimer(activeCard.duration);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) { clearInterval(interval); setTimerActive(false); return 0; }
          return prev - 1;
        });
      }, 1000);
      return;
    }
    setShowResult(true);
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

  const handleCharadesDone = () => {
    if (!activeCard || !currentPlayer) return;
    setTimerActive(false);
    setShowResult(true);
    addToHistory({
      cardId: activeCard.id,
      playerId: currentPlayer.id,
      action: activeCard.text,
      result: "completed",
      points: activeCard.points || 15,
    });
    addScore(currentPlayer.id, activeCard.points || 15);
    nextRound();
  };

  const handleNext = () => {
    setShowResult(false);
    setActiveCard(null);
    nextTurn();
  };

  const formatTimer = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white">{titleMap[gameType]}</h2>
          <p className="text-[10px] sm:text-xs text-white/40">{currentPlayer?.name}&apos;s turn</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setPhase("paused")}>⏸️ Pause</Button>
      </div>

      {currentPlayer && <ArousalMeter playerId={currentPlayer.id} vibe={currentVibe} />}

      <AnimatePresence mode="wait">
        {activeCard && !showResult && (
          <motion.div key={activeCard.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="bg-blood-900/90 border-2 border-blood-600/30 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{emojiMap[gameType]}</span>
              <span className="text-xs font-bold tracking-wider text-white/60">{activeCard.type.toUpperCase().replace("-", " ")}</span>
              <span className="ml-auto text-xs text-neon-pink font-bold">+{activeCard.points} pts</span>
            </div>

            <p className="text-base sm:text-lg text-white/95 font-medium leading-relaxed">{activeCard.text}</p>

            {activeCard.optionA && activeCard.optionB && (
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blood-800/50 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-neon-pink mb-1 font-bold">OPTION A</p>
                  <p className="text-sm font-bold text-white">{activeCard.optionA}</p>
                </div>
                <div className="bg-blood-800/50 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-neon-blue mb-1 font-bold">OPTION B</p>
                  <p className="text-sm font-bold text-white">{activeCard.optionB}</p>
                </div>
              </div>
            )}

            {gameType === "charades" && timerActive && (
              <div className="text-center">
                <div className={cn("text-5xl font-mono font-bold", timer <= 10 ? "text-red-400 animate-pulse" : "text-white")}>
                  {formatTimer(timer)}
                </div>
                <p className="text-xs text-white/40 mt-2">Time remaining</p>
              </div>
            )}

            <div className="flex gap-3">
              {gameType === "charades" && !timerActive ? (
                <Button onClick={handleAccept} variant="primary" className="flex-1 min-h-[48px]">⏱️ Start Timer ({activeCard.duration}s)</Button>
              ) : gameType === "charades" && timerActive ? (
                <Button onClick={handleCharadesDone} variant="danger" className="flex-1 min-h-[48px]">✅ Guessed It!</Button>
              ) : (
                <Button onClick={handleAccept} variant="primary" className="flex-1 min-h-[48px]">✅ Accept</Button>
              )}
              {!timerActive && <Button onClick={handleNext} variant="ghost" className="min-h-[48px]">⏭️ Skip</Button>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showResult && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="text-center space-y-4">
            <div className="text-5xl">{emojiMap[gameType]}</div>
            <h3 className="text-xl font-bold text-white">Nice one!</h3>
            <p className="text-sm text-white/50">+{activeCard?.points || 10} points</p>
            <Button onClick={handleNext} variant="primary">Next Player →</Button>
          </motion.div>
        )}
      </AnimatePresence>

      {!activeCard && !showResult && !timerActive && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Button onClick={drawCard} variant="danger" size="lg" className="min-h-[52px]">{emojiMap[gameType]} Draw a Card</Button>
        </motion.div>
      )}

      <div className="pt-4 border-t border-white/10">
        <Button variant="ghost" size="sm" onClick={() => setPhase("aftercare")} className="w-full min-h-[44px]">🛑 End Session</Button>
      </div>
    </div>
  );
}

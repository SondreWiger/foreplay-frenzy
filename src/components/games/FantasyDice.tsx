"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/Button";
import { Timer } from "@/components/ui/Timer";
import { ArousalMeter } from "@/components/ui/ArousalMeter";
import { rollDice } from "@/lib/cards";
import { cn, formatTime } from "@/lib/utils";

export function FantasyDice() {
  const { session, players, addToHistory, addScore, nextTurn, setPhase, startTimer, currentVibe } =
    useGameStore();

  const [result, setResult] = useState<ReturnType<typeof rollDice> | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const currentPlayer = players.find((p) => p.id === session?.currentTurn);

  const handleRoll = () => {
    setIsRolling(true);
    setTimeout(() => {
      const rolled = rollDice();
      setResult(rolled);
      setIsRolling(false);

      if (currentPlayer) {
        addToHistory({
          playerId: currentPlayer.id,
          action: `Rolled: ${rolled.action} + ${rolled.bodyZone} + ${rolled.modifier}`,
          result: "completed",
          points: 20,
        });
        addScore(currentPlayer.id, 20);
      }
    }, 800);
  };

  const handleAccept = () => {
    if (result) {
      startTimer(result.duration, `${result.action} on ${result.bodyZone}`);
    }
    nextTurn();
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Fantasy Dice</h2>
          <p className="text-xs text-white/40">
            {currentPlayer?.name}&apos;s roll
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setPhase("paused")}>
          ⏸️ Pause
        </Button>
      </div>

      <Timer />

      {currentPlayer && <ArousalMeter playerId={currentPlayer.id} vibe={currentVibe} />}

      {/* Dice Animation */}
      <div className="flex justify-center py-8">
        <motion.div
          animate={
            isRolling
              ? { rotate: [0, 90, 180, 270, 360], scale: [1, 1.2, 1] }
              : {}
          }
          transition={{ duration: 0.5, repeat: isRolling ? Infinity : 0 }}
          className="text-8xl select-none"
        >
          {isRolling ? "🎲" : result ? "💀" : "🎲"}
        </motion.div>
      </div>

      {/* Result */}
      <AnimatePresence mode="wait">
        {result && !isRolling && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="bg-blood-900/90 border border-blood-600/50 rounded-2xl p-6 space-y-4">
              <div className="text-center">
                <span className="text-xs font-bold tracking-widest text-white/40">
                  YOUR FATE
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <DiceResult label="Action" value={result.action} emoji="🔥" />
                <DiceResult label="Intensity" value={`${result.intensity}/10`} emoji="📈" />
                <DiceResult label="Body Zone" value={result.bodyZone} emoji="🫦" />
                <DiceResult label="Duration" value={formatTime(result.duration)} emoji="⏱️" />
                <DiceResult label="Toy" value={result.toy} emoji="🔧" />
                <DiceResult label="Hole" value={result.hole} emoji="🎯" />
              </div>

              <div className="bg-blood-800/50 rounded-xl p-4 text-center">
                <span className="text-xs text-white/40">Modifier</span>
                <p className="text-neon-pink font-bold mt-1">{result.modifier}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleAccept} variant="primary" className="flex-1">
                ACCEPT & START TIMER
              </Button>
              <Button onClick={() => { setResult(null); nextTurn(); }} variant="ghost">
                SKIP
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Roll Button */}
      {!result && !isRolling && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Button onClick={handleRoll} variant="danger" size="lg">
            🎲 ROLL THE DICE
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

function DiceResult({
  label,
  value,
  emoji,
}: {
  label: string;
  value: string;
  emoji: string;
}) {
  return (
    <div className="bg-blood-800/50 rounded-xl p-3 text-center">
      <span className="text-lg">{emoji}</span>
      <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-bold text-white mt-0.5">{value}</p>
    </div>
  );
}

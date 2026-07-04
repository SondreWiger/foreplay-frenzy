"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { SessionRecord } from "@/types";

export function SessionHistory() {
  const [history, setHistory] = useState<SessionRecord[]>([]);
  const [showClear, setShowClear] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("session-history") || "[]");
    setHistory(stored);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("session-history");
    setHistory([]);
    setShowClear(false);
  };

  const formatDuration = (mins: number) => {
    if (mins < 60) return `${mins}m`;
    return `${Math.floor(mins / 60)}h ${mins % 60}m`;
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const modeEmoji: Record<string, string> = {
    "truth-or-dare": "💋",
    "never-have-i-ever": "🤫",
    "fantasy-dice": "🎲",
    "drinking-game": "🍺",
    "who-most-likely": "👉",
    "would-you-rather": "🤔",
    "two-truths-lie": "🤥",
    "this-or-that": "⚖️",
    "kink-charades": "🎭",
    "story-builder": "📖",
    "rate-me": "⭐",
    "hot-take": "🔥",
    "free-play": "🔥",
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">📭</div>
        <h3 className="text-lg font-bold text-white">No Sessions Yet</h3>
        <p className="text-sm text-white/40">Play a game to see your history here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-white">Session History</h2>
        <Button variant="ghost" size="sm" onClick={() => setShowClear(!showClear)}>
          {showClear ? "Cancel" : "Clear All"}
        </Button>
      </div>

      {showClear && (
        <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-3 text-center">
          <p className="text-xs text-white/60 mb-2">Clear all session history?</p>
          <Button onClick={clearHistory} variant="danger" size="sm">
            Yes, Clear All
          </Button>
        </div>
      )}

      <div className="space-y-2">
        {history.map((record, i) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-blood-900/50 border border-blood-800/30 rounded-xl p-3 sm:p-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{modeEmoji[record.mode] || "🎮"}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white capitalize">
                    {record.mode.replace(/-/g, " ")}
                  </p>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blood-800/50 text-white/40">
                    {record.vibe}
                  </span>
                </div>
                <p className="text-[10px] text-white/40">
                  {formatDate(record.startedAt)} • {formatDuration(record.duration)} • {record.totalRounds} rounds
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-neon-pink">{record.topScore}</p>
                <p className="text-[10px] text-white/40">{record.topScorer}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

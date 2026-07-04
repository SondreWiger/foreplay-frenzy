"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/Button";
import { SafeWordButton } from "@/components/ui/SafeWordButton";
import { AftercareModal } from "@/components/games/AftercareModal";
import { PlayerSetup } from "@/components/games/PlayerSetup";
import { LimitsSetup } from "@/components/games/LimitsSetup";
import { GameModeSelector } from "@/components/games/GameModeSelector";
import { LevelSelector } from "@/components/games/LevelSelector";
import { Scoreboard } from "@/components/games/Scoreboard";
import { TruthOrDare } from "@/components/games/TruthOrDare";
import { FantasyDice } from "@/components/games/FantasyDice";
import { NeverHaveIEver } from "@/components/games/NeverHaveIEver";
import { RoleplayRoulette } from "@/components/games/RoleplayRoulette";
import { DrinkingGame } from "@/components/games/DrinkingGame";
import { GenericPartyGame } from "@/components/games/GenericPartyGame";
import { CustomCardCreator } from "@/components/games/CustomCardCreator";
import { SessionHistory } from "@/components/games/SessionHistory";
import { AchievementSystem } from "@/components/games/AchievementSystem";

type Screen = "home" | "players" | "limits" | "lobby" | "playing" | "history" | "achievements" | "custom-cards" | "settings";

export default function Home() {
  const { session, setPhase, soundEnabled, toggleSound } = useGameStore();
  const [screen, setScreen] = useState<Screen>("home");

  const renderGame = () => {
    if (!session) return null;
    switch (session.mode) {
      case "truth-or-dare":
        return <TruthOrDare />;
      case "fantasy-dice":
        return <FantasyDice />;
      case "never-have-i-ever":
        return <NeverHaveIEver />;
      case "roleplay-roulette":
        return <RoleplayRoulette />;
      case "drinking-game":
        return <DrinkingGame />;
      case "who-most-likely":
        return <GenericPartyGame gameType="most-likely" />;
      case "would-you-rather":
        return <GenericPartyGame gameType="would-you-rather" />;
      case "two-truths-lie":
        return <GenericPartyGame gameType="two-truths" />;
      case "this-or-that":
        return <GenericPartyGame gameType="this-or-that" />;
      case "kink-charades":
        return <GenericPartyGame gameType="charades" />;
      case "story-builder":
        return <GenericPartyGame gameType="story" />;
      case "rate-me":
        return <GenericPartyGame gameType="rate" />;
      case "hot-take":
        return <GenericPartyGame gameType="hot-take" />;
      case "emoji-guess":
        return <GenericPartyGame gameType="emoji" />;
      default:
        return <TruthOrDare />;
    }
  };

  return (
    <div className="min-h-dvh min-h-screen bg-blood-950 relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.1),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(127,29,29,0.15),transparent_70%)]" />
      </div>

      {session && session.phase === "playing" && <SafeWordButton />}
      <AftercareModal />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6 sm:py-8 safe-bottom">
        <AnimatePresence mode="wait">
          {/* ==================== HOME ==================== */}
          {screen === "home" && !session && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 sm:space-y-8">
              <div className="text-center pt-6 sm:pt-10">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 0.8 }}>
                  <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🔥</div>
                  <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blood-400 via-red-500 to-neon-pink mb-3 sm:mb-4">
                    FOREPLAY FRENZY
                  </h1>
                  <p className="text-sm sm:text-lg text-white/40 max-w-md mx-auto px-2">
                    The ultimate game suite. From teasing to depravity — how deep will you go?
                  </p>
                </motion.div>
              </div>

              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-3">
                <Button onClick={() => setScreen("players")} variant="primary" size="lg" className="w-full text-base sm:text-lg py-4 min-h-[52px]">
                  🎮 Start New Game
                </Button>
                <Button onClick={() => setScreen("lobby")} variant="neon" size="lg" className="w-full min-h-[52px]">
                  🚀 Quick Play
                </Button>
              </motion.div>

              {/* Features Grid */}
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3">
                {[
                  { emoji: "💋", title: "Truth or Dare", desc: "Abyss edition" },
                  { emoji: "🍺", title: "Drinking Games", desc: "Sip or strip" },
                  { emoji: "🎲", title: "Dice Rolling", desc: "Random fate" },
                  { emoji: "🤔", title: "Would You Rather", desc: "Impossible choices" },
                  { emoji: "👉", title: "Most Likely To", desc: "Point fingers" },
                  { emoji: "🎭", title: "Charades", desc: "Act it out" },
                  { emoji: "📖", title: "Story Builder", desc: "Build the scene" },
                  { emoji: "⭐", title: "Rate Me", desc: "How do they see you" },
                  { emoji: "🔥", title: "Hot Takes", desc: "Defend your take" },
                ].map((feat) => (
                  <div key={feat.title} className="bg-blood-900/50 border border-blood-800/30 rounded-xl p-2.5 sm:p-3 text-center">
                    <div className="text-xl sm:text-2xl mb-0.5 sm:mb-1">{feat.emoji}</div>
                    <p className="text-[10px] sm:text-xs font-bold text-white/80">{feat.title}</p>
                    <p className="text-[8px] sm:text-[10px] text-white/30 hidden sm:block">{feat.desc}</p>
                  </div>
                ))}
              </motion.div>

              {/* Bottom Nav */}
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="grid grid-cols-4 gap-2">
                <Button onClick={() => setScreen("history")} variant="ghost" size="sm" className="flex-col gap-1 min-h-[60px]">
                  <span className="text-lg">📜</span>
                  <span className="text-[9px]">History</span>
                </Button>
                <Button onClick={() => setScreen("achievements")} variant="ghost" size="sm" className="flex-col gap-1 min-h-[60px]">
                  <span className="text-lg">🏆</span>
                  <span className="text-[9px]">Badges</span>
                </Button>
                <Button onClick={() => setScreen("custom-cards")} variant="ghost" size="sm" className="flex-col gap-1 min-h-[60px]">
                  <span className="text-lg">🎨</span>
                  <span className="text-[9px]">Custom</span>
                </Button>
                <Button onClick={() => setScreen("settings")} variant="ghost" size="sm" className="flex-col gap-1 min-h-[60px]">
                  <span className="text-lg">⚙️</span>
                  <span className="text-[9px]">Settings</span>
                </Button>
              </motion.div>

              <div className="text-center pt-2">
                <p className="text-[10px] text-white/20">v1.1 • Made with 🔥 & sin</p>
              </div>
            </motion.div>
          )}

          {/* ==================== PLAYER SETUP ==================== */}
          {screen === "players" && !session && (
            <motion.div key="players" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <Button onClick={() => setScreen("home")} variant="ghost" size="sm" className="mb-4 sm:mb-6 min-h-[44px]">← Back</Button>
              <PlayerSetup onComplete={() => setScreen("limits")} />
            </motion.div>
          )}

          {/* ==================== LIMITS ==================== */}
          {screen === "limits" && !session && (
            <motion.div key="limits" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <Button onClick={() => setScreen("players")} variant="ghost" size="sm" className="mb-4 sm:mb-6 min-h-[44px]">← Back</Button>
              <LimitsSetup onComplete={() => setScreen("lobby")} />
            </motion.div>
          )}

          {/* ==================== GAME LOBBY ==================== */}
          {screen === "lobby" && !session && (
            <motion.div key="lobby" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <Button onClick={() => setScreen("home")} variant="ghost" size="sm" className="mb-4 sm:mb-6 min-h-[44px]">← Back</Button>
              <GameModeSelector />
            </motion.div>
          )}

          {/* ==================== HISTORY ==================== */}
          {screen === "history" && !session && (
            <motion.div key="history" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <Button onClick={() => setScreen("home")} variant="ghost" size="sm" className="mb-4 sm:mb-6 min-h-[44px]">← Back</Button>
              <SessionHistory />
            </motion.div>
          )}

          {/* ==================== ACHIEVEMENTS ==================== */}
          {screen === "achievements" && !session && (
            <motion.div key="achievements" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <Button onClick={() => setScreen("home")} variant="ghost" size="sm" className="mb-4 sm:mb-6 min-h-[44px]">← Back</Button>
              <AchievementSystem />
            </motion.div>
          )}

          {/* ==================== CUSTOM CARDS ==================== */}
          {screen === "custom-cards" && !session && (
            <motion.div key="custom" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <CustomCardCreator onClose={() => setScreen("home")} />
            </motion.div>
          )}

          {/* ==================== SETTINGS ==================== */}
          {screen === "settings" && !session && (
            <motion.div key="settings" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-6">
              <Button onClick={() => setScreen("home")} variant="ghost" size="sm" className="mb-4 sm:mb-6 min-h-[44px]">← Back</Button>
              <h2 className="text-xl font-bold text-white">Settings</h2>

              <div className="space-y-3">
                <div className="bg-blood-900/50 border border-blood-800/30 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">Sound Effects</p>
                    <p className="text-[10px] text-white/40">Card flips, dice rolls, etc.</p>
                  </div>
                  <button
                    onClick={toggleSound}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      soundEnabled ? "bg-neon-pink" : "bg-white/20"
                    )}
                  >
                    <span className={cn(
                      "absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all",
                      soundEnabled ? "left-6" : "left-0.5"
                    )} />
                  </button>
                </div>

                <div className="bg-blood-900/50 border border-blood-800/30 rounded-xl p-4">
                  <p className="text-sm font-bold text-white mb-2">About</p>
                  <p className="text-xs text-white/40">Foreplay Frenzy v1.1</p>
                  <p className="text-xs text-white/40">The ultimate kinky game suite for couples and groups.</p>
                  <p className="text-xs text-white/30 mt-2">Built with Next.js 15 + Tailwind v4</p>
                </div>

                <div className="bg-blood-900/50 border border-blood-800/30 rounded-xl p-4">
                  <p className="text-sm font-bold text-white mb-2">Data</p>
                  <p className="text-xs text-white/40 mb-3">All data is stored locally on your device.</p>
                  <Button
                    onClick={() => {
                      if (confirm("Clear all data? This cannot be undone.")) {
                        localStorage.clear();
                        window.location.reload();
                      }
                    }}
                    variant="danger"
                    size="sm"
                  >
                    🗑️ Clear All Data
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== PLAYING ==================== */}
          {session && session.phase === "playing" && (
            <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 sm:space-y-6">
              <LevelSelector />
              <Scoreboard />
              {renderGame()}
            </motion.div>
          )}

          {/* ==================== PAUSED ==================== */}
          {session && session.phase === "paused" && (
            <motion.div key="paused" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4 sm:space-y-6 pt-12 sm:pt-20">
              <div className="text-5xl sm:text-6xl">⏸️</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Paused</h2>
              <p className="text-sm text-white/40 px-4">Take a breather. We&apos;re right here when you&apos;re ready.</p>
              <div className="space-y-3 max-w-xs mx-auto px-4">
                <Button onClick={() => setPhase("playing")} variant="primary" className="w-full min-h-[52px]">▶️ Resume</Button>
                <Button onClick={() => setPhase("aftercare")} variant="ghost" className="w-full min-h-[48px]">🛑 End Session</Button>
                <Button onClick={() => { useGameStore.getState().endSession(); useGameStore.getState().setShowAftercare(false); setScreen("home"); }} variant="ghost" className="w-full min-h-[48px]">🏠 Quit to Menu</Button>
              </div>
            </motion.div>
          )}

          {/* ==================== ENDED ==================== */}
          {session && session.phase === "ended" && (
            <motion.div key="ended" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4 sm:space-y-6 pt-8 sm:pt-12">
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }} className="text-5xl sm:text-6xl">🎉</motion.div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Session Complete!</h2>
              <Scoreboard />
              <div className="space-y-3 max-w-xs mx-auto pt-4 px-4">
                <Button onClick={() => { useGameStore.getState().endSession(); setScreen("lobby"); }} variant="primary" className="w-full min-h-[52px]">🔄 Play Again</Button>
                <Button onClick={() => { useGameStore.getState().endSession(); setScreen("home"); }} variant="ghost" className="w-full min-h-[48px]">🏠 Home</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

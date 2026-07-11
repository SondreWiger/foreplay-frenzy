"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
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
import { PackStore } from "@/components/store/PackStore";
import { ToastContainer } from "@/components/ui/Toast";
import { AgeGate } from "@/components/ui/AgeGate";
import { getProgressionLevel, getEscalationMessage } from "@/lib/card-engine";
import { cn } from "@/lib/utils";
import type { GameVibe } from "@/types";

type Screen = "home" | "players" | "limits" | "lobby" | "playing" | "history" | "achievements" | "custom-cards" | "store" | "settings";

const vibes: { id: GameVibe; name: string; emoji: string; description: string; color: string; bgColor: string }[] = [
  { id: "party", name: "Party", emoji: "🎉", description: "Fun for friend groups. SFW. No NSFW content.", color: "text-amber-400", bgColor: "from-amber-500/20 to-orange-500/20 border-amber-500/30" },
  { id: "chill", name: "Chill", emoji: "😌", description: "Light flirting. Couples or close friends.", color: "text-teal-400", bgColor: "from-teal-500/20 to-cyan-500/20 border-teal-500/30" },
  { id: "spicy", name: "Spicy", emoji: "🌶️", description: "NSFW. Dares, truths, roleplay. Gets heated.", color: "text-neon-pink", bgColor: "from-pink-500/20 to-red-500/20 border-pink-500/30" },
  { id: "dark", name: "Dark", emoji: "🖤", description: "Extreme. BDSM, degradation, no limits. Adults only.", color: "text-red-400", bgColor: "from-red-700/30 to-red-900/30 border-red-700/40" },
];

export default function Home() {
  const { session, setPhase, currentVibe, setVibe, round } = useGameStore();
  const [screen, setScreen] = useState<Screen>("home");
  const [hasChosenVibe, setHasChosenVibe] = useState(false);
  const [hoveredVibe, setHoveredVibe] = useState<GameVibe | null>(null);

  // The displayed vibe is the hovered one (for preview) or the actual selected one
  const displayVibe = hoveredVibe || currentVibe;

  // Check if vibe was previously set
  useEffect(() => {
    if (currentVibe !== "spicy") setHasChosenVibe(true);
  }, []);

  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  const renderGame = () => {
    if (!session) return null;
    switch (session.mode) {
      case "truth-or-dare": return <TruthOrDare />;
      case "fantasy-dice": return <FantasyDice />;
      case "never-have-i-ever": return <NeverHaveIEver />;
      case "roleplay-roulette": return <RoleplayRoulette />;
      case "drinking-game": return <DrinkingGame />;
      case "who-most-likely": return <GenericPartyGame gameType="most-likely" />;
      case "would-you-rather": return <GenericPartyGame gameType="would-you-rather" />;
      case "two-truths-lie": return <GenericPartyGame gameType="two-truths" />;
      case "this-or-that": return <GenericPartyGame gameType="this-or-that" />;
      case "kink-charades": return <GenericPartyGame gameType="charades" />;
      case "story-builder": return <GenericPartyGame gameType="story" />;
      case "rate-me": return <GenericPartyGame gameType="rate" />;
      case "hot-take": return <GenericPartyGame gameType="hot-take" />;
      case "emoji-guess": return <GenericPartyGame gameType="emoji" />;
      case "compliment-battle": return <GenericPartyGame gameType="compliment" />;
      case "kink-roulette": return <GenericPartyGame gameType="roulette" />;
      case "twenty-questions": return <GenericPartyGame gameType="questions" />;
      case "body-language": return <GenericPartyGame gameType="charades" />;
      case "scream-or-drink": return <GenericPartyGame gameType="scream" />;
      default: return <TruthOrDare />;
    }
  };

  const escalationMsg = session ? getEscalationMessage(round, currentVibe) : null;
  const currentLevel = session ? getProgressionLevel(round, currentVibe) : "tease";

  return (
    <div className={cn("min-h-dvh min-h-screen relative overflow-x-hidden transition-colors duration-500", `vibe-${screen === "home" && !session && !hasChosenVibe ? displayVibe : currentVibe}`)} style={{ background: "var(--vibe-card)" }}>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--vibe-bg-from),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,var(--vibe-bg-to),transparent_70%)]" />
      </div>

      {session && session.phase === "playing" && <SafeWordButton />}
      <AftercareModal />
      <ToastContainer />
      <AgeGate />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6 sm:py-8 safe-bottom">
        <AnimatePresence mode="wait">

          {/* ==================== VIBE SELECTOR (first time) ==================== */}
          {screen === "home" && !session && !hasChosenVibe && (
            <motion.div key="vibe-pick" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 pt-8 sm:pt-16">
              <div className="text-center">
                <div className="text-6xl sm:text-8xl mb-4">🔥</div>
                <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blood-400 via-red-500 to-neon-pink mb-3">
                  FOREPLAY FRENZY
                </h1>
                <p className="text-base sm:text-lg text-white/50 mb-2">Choose your vibe</p>
                <p className="text-xs text-white/30">This controls what content you see. You can change it anytime.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vibes.map((v, i) => (
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onMouseEnter={() => setHoveredVibe(v.id)}
                    onMouseLeave={() => setHoveredVibe(null)}
                  >
                    <Card
                      variant="elevated"
                      onClick={() => { setVibe(v.id); setHasChosenVibe(true); }}
                      className={`p-5 sm:p-6 bg-gradient-to-br ${v.bgColor} hover:scale-[1.03] transition-all cursor-pointer`}
                    >
                      <div className="text-center">
                        <div className="text-4xl sm:text-5xl mb-3">{v.emoji}</div>
                        <h3 className={cn("text-lg sm:text-xl font-bold mb-1", v.color)}>{v.name}</h3>
                        <p className="text-xs sm:text-sm text-white/50">{v.description}</p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ==================== HOME (after vibe chosen) ==================== */}
          {screen === "home" && !session && hasChosenVibe && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5 sm:space-y-6">
              {/* Vibe Switcher */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-1.5">
                  {vibes.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => { setVibe(v.id); }}
                      className={cn(
                        "px-2.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold border transition-all min-h-[32px]",
                        currentVibe === v.id
                          ? `${v.bgColor} ${v.color}`
                          : "bg-white/5 border-white/10 text-white/30 hover:bg-white/10"
                      )}
                    >
                      {v.emoji} {v.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center pt-2 sm:pt-4">
                <div className="text-5xl sm:text-7xl mb-3 sm:mb-4">🔥</div>
                <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blood-400 via-red-500 to-neon-pink mb-2">
                  FOREPLAY FRENZY
                </h1>
                <p className="text-xs sm:text-sm text-white/40">
                  {currentVibe === "party" && "Fun games for friend groups. Keep it clean!"}
                  {currentVibe === "chill" && "Light flirting. Perfect for couples night."}
                  {currentVibe === "spicy" && "Things are about to get heated."}
                  {currentVibe === "dark" && "No limits. Welcome to the abyss."}
                </p>
              </div>

              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-3">
                <Button onClick={() => setScreen("players")} variant="primary" size="lg" className="w-full text-base sm:text-lg py-4 min-h-[52px]">
                  🎮 Start New Game
                </Button>
                <Button onClick={() => setScreen("lobby")} variant="neon" size="lg" className="w-full min-h-[52px]">
                  🚀 Quick Play
                </Button>
              </motion.div>

              {/* Feature grid changes based on vibe */}
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="grid grid-cols-3 gap-2">
                {currentVibe === "party" && [
                  { emoji: "💋", title: "Truth or Dare" },
                  { emoji: "🤫", title: "NHIE" },
                  { emoji: "🤔", title: "Would You Rather" },
                  { emoji: "👉", title: "Most Likely To" },
                  { emoji: "🍺", title: "Drinking Games" },
                  { emoji: "🎭", title: "Charades" },
                  { emoji: "📖", title: "Story Builder" },
                  { emoji: "⭐", title: "Rate Me" },
                  { emoji: "🔥", title: "Hot Takes" },
                ].map((f) => (
                  <div key={f.title} className="border rounded-xl p-2.5 text-center" style={{ backgroundColor: "var(--vibe-card)", borderColor: "var(--vibe-card-border)" }}>
                    <div className="text-xl mb-0.5">{f.emoji}</div>
                    <p className="text-[9px] sm:text-[10px] font-bold text-white/70">{f.title}</p>
                  </div>
                ))}
                {currentVibe === "chill" && [
                  { emoji: "💋", title: "Flirty Dares" },
                  { emoji: "🤫", title: "NHIE" },
                  { emoji: "🤔", title: "Would You Rather" },
                  { emoji: "🎲", title: "Dice Rolling" },
                  { emoji: "💋", title: "Sensual Truths" },
                  { emoji: "🎭", title: "Roleplay" },
                  { emoji: "📖", title: "Story Builder" },
                  { emoji: "⏰", title: "Timed Challenges" },
                  { emoji: "🌟", title: "Rate & Rank" },
                ].map((f) => (
                  <div key={f.title} className="border rounded-xl p-2.5 text-center" style={{ backgroundColor: "var(--vibe-card)", borderColor: "var(--vibe-card-border)" }}>
                    <div className="text-xl mb-0.5">{f.emoji}</div>
                    <p className="text-[9px] sm:text-[10px] font-bold text-white/70">{f.title}</p>
                  </div>
                ))}
                {currentVibe === "spicy" && [
                  { emoji: "💋", title: "Truth or Dare" },
                  { emoji: "🤫", title: "NHIE" },
                  { emoji: "🎲", title: "Fantasy Dice" },
                  { emoji: "🎭", title: "Roleplay" },
                  { emoji: "🍺", title: "Drinking Games" },
                  { emoji: "🤔", title: "Would You Rather" },
                  { emoji: "👉", title: "Most Likely To" },
                  { emoji: "🔥", title: "Hot Takes" },
                  { emoji: "😈", title: "Gets Filthy" },
                ].map((f) => (
                  <div key={f.title} className="border rounded-xl p-2.5 text-center" style={{ backgroundColor: "var(--vibe-card)", borderColor: "var(--vibe-card-border)" }}>
                    <div className="text-xl mb-0.5">{f.emoji}</div>
                    <p className="text-[9px] sm:text-[10px] font-bold text-white/70">{f.title}</p>
                  </div>
                ))}
                {currentVibe === "dark" && [
                  { emoji: "💋", title: "Extreme Truths" },
                  { emoji: "🔥", title: "Extreme Dares" },
                  { emoji: "⚡", title: "Wild Cards" },
                  { emoji: "🎭", title: "Dark Roleplay" },
                  { emoji: "🌀", title: "Hypno & Control" },
                  { emoji: "🎲", title: "Extreme Dice" },
                  { emoji: "💀", title: "Depraved Acts" },
                  { emoji: "⛓️", title: "BDSM Prompts" },
                  { emoji: "🖤", title: "No Limits" },
                ].map((f) => (
                  <div key={f.title} className="border rounded-xl p-2.5 text-center" style={{ backgroundColor: "var(--vibe-card)", borderColor: "var(--vibe-card-border)" }}>
                    <div className="text-xl mb-0.5">{f.emoji}</div>
                    <p className="text-[9px] sm:text-[10px] font-bold text-white/70">{f.title}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="grid grid-cols-5 gap-2">
                <Button onClick={() => setScreen("history")} variant="ghost" size="sm" className="flex-col gap-1 min-h-[56px]">
                  <span className="text-lg">📜</span><span className="text-[9px]">History</span>
                </Button>
                <Button onClick={() => setScreen("achievements")} variant="ghost" size="sm" className="flex-col gap-1 min-h-[56px]">
                  <span className="text-lg">🏆</span><span className="text-[9px]">Badges</span>
                </Button>
                <Button onClick={() => setScreen("store")} variant="ghost" size="sm" className="flex-col gap-1 min-h-[56px]">
                  <span className="text-lg">🛒</span><span className="text-[9px]">Packs</span>
                </Button>
                <Button onClick={() => setScreen("custom-cards")} variant="ghost" size="sm" className="flex-col gap-1 min-h-[56px]">
                  <span className="text-lg">🎨</span><span className="text-[9px]">Custom</span>
                </Button>
                <Button onClick={() => setScreen("settings")} variant="ghost" size="sm" className="flex-col gap-1 min-h-[56px]">
                  <span className="text-lg">⚙️</span><span className="text-[9px]">Settings</span>
                </Button>
              </motion.div>

              <div className="text-center pt-1">
                <p className="text-[10px] text-white/20">v2.1 • Made with 🔥 & sin</p>
              </div>
            </motion.div>
          )}

          {/* ==================== PLAYER SETUP ==================== */}
          {screen === "players" && !session && (
            <motion.div key="players" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <Button onClick={() => setScreen("home")} variant="ghost" size="sm" className="mb-4 sm:mb-6 min-h-[44px]">← Back</Button>
              <PlayerSetup onComplete={() => currentVibe === "party" ? setScreen("lobby") : setScreen("limits")} onSkipLimits={() => setScreen("lobby")} />
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

          {/* ==================== PACK STORE ==================== */}
          {screen === "store" && !session && (
            <motion.div key="store" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <PackStore onClose={() => setScreen("home")} />
            </motion.div>
          )}

          {/* ==================== SETTINGS ==================== */}
          {screen === "settings" && !session && (
            <motion.div key="settings" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-6">
              <Button onClick={() => setScreen("home")} variant="ghost" size="sm" className="mb-4 sm:mb-6 min-h-[44px]">← Back</Button>
              <h2 className="text-xl font-bold text-white">Settings</h2>
              <div className="space-y-3">
                <div className="border rounded-xl p-4" style={{ backgroundColor: "var(--vibe-card)", borderColor: "var(--vibe-card-border)" }}>
                  <p className="text-sm font-bold text-white mb-2">Current Vibe</p>
                  <div className="grid grid-cols-2 gap-2">
                    {vibes.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setVibe(v.id)}
                        className={cn(
                          "p-3 rounded-xl border text-center transition-all text-xs",
                          currentVibe === v.id ? `${v.bgColor} ${v.color} font-bold` : "text-white/40 hover:bg-white/10"
                        )}
                        style={currentVibe !== v.id ? { backgroundColor: "var(--vibe-card-elevated)", borderColor: "var(--vibe-card-border)" } : undefined}
                      >
                        {v.emoji} {v.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="border rounded-xl p-4" style={{ backgroundColor: "var(--vibe-card)", borderColor: "var(--vibe-card-border)" }}>
                  <p className="text-sm font-bold text-white mb-2">Data</p>
                  <p className="text-xs text-white/40 mb-3">All data is stored locally on your device.</p>
                  <Button onClick={() => { if (confirm("Clear all data? This cannot be undone.")) { localStorage.clear(); window.location.reload(); } }} variant="danger" size="sm">🗑️ Clear All Data</Button>
                </div>
                <div className="border rounded-xl p-4 space-y-2" style={{ backgroundColor: "var(--vibe-card)", borderColor: "var(--vibe-card-border)" }}>
                  <p className="text-sm font-bold text-white mb-2">Legal</p>
                  <a href="/terms" className="block text-xs text-white/40 hover:text-white/60 transition-colors min-h-[36px] flex items-center">📄 Terms of Service</a>
                  <a href="/privacy" className="block text-xs text-white/40 hover:text-white/60 transition-colors min-h-[36px] flex items-center">🔒 Privacy Policy</a>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== PLAYING ==================== */}
          {session && session.phase === "playing" && (
            <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 sm:space-y-5">
              {/* Progression Banner */}
              <div className="border rounded-xl px-3 py-2 flex items-center justify-between" style={{ backgroundColor: "var(--vibe-banner-from)", borderColor: "var(--vibe-banner-border)" }}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white/40">Round {round + 1}</span>
                  {currentVibe === "party" ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                      PARTY
                    </span>
                  ) : (
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full",
                      currentLevel === "tease" && (currentVibe === "chill" ? "bg-teal-500/20 text-teal-400" : "bg-pink-500/20 text-pink-400"),
                      currentLevel === "sensual" && (currentVibe === "chill" ? "bg-cyan-500/20 text-cyan-400" : "bg-rose-500/20 text-rose-400"),
                      currentLevel === "dirty" && (currentVibe === "chill" ? "bg-pink-500/20 text-pink-400" : "bg-red-500/20 text-red-400"),
                      currentLevel === "filthy" && "bg-red-600/20 text-red-500",
                      currentLevel === "depraved" && "bg-red-900/30 text-red-400",
                    )}>
                      {currentVibe === "chill"
                        ? (currentLevel === "tease" ? "FLIRTY" : currentLevel === "sensual" ? "TOUCHY" : "NAUGHTY")
                        : currentLevel.toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-white/30 capitalize">{currentVibe} mode</span>
              </div>

              {/* Escalation Message (hidden in party mode) */}
              <AnimatePresence>
                {escalationMsg && currentVibe !== "party" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="border rounded-xl p-3 text-center"
                    style={{ background: "linear-gradient(to right, var(--vibe-banner-from), var(--vibe-accent-dim))", borderColor: "var(--vibe-card-border)" }}
                  >
                    <p className="text-sm font-bold" style={{ color: "var(--vibe-accent)" }}>{escalationMsg}</p>
                  </motion.div>
                )}
              </AnimatePresence>

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
              <p className="text-xs text-white/40">You reached {currentLevel.toUpperCase()} level after {round + 1} rounds</p>
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

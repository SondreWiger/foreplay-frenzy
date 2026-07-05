import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Player,
  GameSession,
  GameMode,
  GameLevel,
  GameAction,
  GameCard,
  ConsentProfile,
  KinkLimit,
  SafeWordStatus,
  PlayerMode,
  GameVibe,
  SessionRecord,
} from "@/types";
import { generateId } from "@/lib/utils";

interface GameState {
  // Players
  players: Player[];
  playerMode: PlayerMode;

  // Session
  session: GameSession | null;
  currentVibe: GameVibe;
  round: number;

  // Consent
  consentProfiles: ConsentProfile[];

  // Safe word
  safeWordStatus: SafeWordStatus;

  // Active card
  activeCard: GameCard | null;

  // Timer
  timerRunning: boolean;
  timerElapsed: number;
  timerDuration: number;
  timerLabel: string;

  // UI state
  showLimits: boolean;
  showAftercare: boolean;
  darkMode: boolean;
  soundEnabled: boolean;

  // Actions
  setPlayerMode: (mode: PlayerMode) => void;
  setVibe: (vibe: GameVibe) => void;
  nextRound: () => void;
  addPlayer: (player: Player) => void;
  removePlayer: (id: string) => void;
  updatePlayer: (id: string, updates: Partial<Player>) => void;

  startSession: (mode: GameMode, vibe?: GameVibe) => void;
  endSession: () => void;
  setPhase: (phase: GameSession["phase"]) => void;
  setLevel: (level: GameLevel) => void;
  nextTurn: () => void;

  addToHistory: (action: Omit<GameAction, "id" | "timestamp">) => void;
  addScore: (playerId: string, points: number) => void;
  addDrink: (playerId: string, amount: number) => void;

  setActiveCard: (card: GameCard | null) => void;

  // Consent
  updateLimits: (playerId: string, limits: KinkLimit[]) => void;
  setSafeWordStatus: (status: SafeWordStatus) => void;

  // Timer
  startTimer: (duration: number, label: string) => void;
  stopTimer: () => void;
  tickTimer: () => void;
  resetTimer: () => void;

  // UI
  setShowLimits: (show: boolean) => void;
  setShowAftercare: (show: boolean) => void;
  toggleDarkMode: () => void;
  toggleSound: () => void;

  // Reset
  resetAll: () => void;
}

const defaultPlayer: Player = {
  id: "player-1",
  name: "Player 1",
  avatar: "😈",
  arousal: 1,
  obediencePoints: 0,
  isSubmissive: false,
  drinks: 0,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      players: [defaultPlayer],
      playerMode: "couple",
      session: null,
      currentVibe: "spicy",
      round: 0,
      consentProfiles: [],
      safeWordStatus: "green",
      activeCard: null,
      timerRunning: false,
      timerElapsed: 0,
      timerDuration: 0,
      timerLabel: "",
      showLimits: false,
      showAftercare: false,
      darkMode: true,
      soundEnabled: false,

      setPlayerMode: (mode) => set({ playerMode: mode }),

      setVibe: (vibe) => set({ currentVibe: vibe, round: 0 }),

      nextRound: () => set((s) => ({ round: s.round + 1 })),

      addPlayer: (player) =>
        set((s) => ({ players: [...s.players, player] })),

      removePlayer: (id) =>
        set((s) => ({ players: s.players.filter((p) => p.id !== id) })),

      updatePlayer: (id, updates) =>
        set((s) => ({
          players: s.players.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),

      startSession: (mode, vibe?: GameVibe) => {
        const { players, currentVibe } = get();
        const effectiveVibe = vibe || currentVibe;
        const session: GameSession = {
          id: generateId(),
          mode,
          players: [...players],
          currentTurn: players[0]?.id || "",
          phase: "playing",
          level: "tease",
          score: Object.fromEntries(players.map((p) => [p.id, 0])),
          startedAt: new Date().toISOString(),
          history: [],
          vibe: effectiveVibe,
        };
        set({ session, safeWordStatus: "green", round: 0, currentVibe: effectiveVibe });
      },

      endSession: () => {
        const { session, players } = get();
        if (session) {
          // Save to history
          const record: SessionRecord = {
            id: session.id,
            mode: session.mode,
            vibe: session.vibe,
            playerNames: players.map((p) => p.name),
            totalRounds: session.history.length,
            topScorer: Object.entries(session.score).sort(([, a], [, b]) => b - a)[0]?.[0]
              ? players.find((p) => p.id === Object.entries(session.score).sort(([, a], [, b]) => b - a)[0][0])?.name || ""
              : "",
            topScore: Math.max(...Object.values(session.score), 0),
            startedAt: session.startedAt,
            endedAt: new Date().toISOString(),
            duration: Math.round(
              (new Date().getTime() - new Date(session.startedAt).getTime()) / 60000
            ),
          };
          const history = JSON.parse(localStorage.getItem("session-history") || "[]");
          history.unshift(record);
          // Keep last 50 sessions
          if (history.length > 50) history.splice(50);
          localStorage.setItem("session-history", JSON.stringify(history));
        }
        set((s) => ({
          session: s.session
            ? { ...s.session, phase: "ended", endedAt: new Date().toISOString() }
            : null,
          activeCard: null,
        }));
      },

      setPhase: (phase) =>
        set((s) => ({
          session: s.session ? { ...s.session, phase } : null,
        })),

      setLevel: (level) =>
        set((s) => ({
          session: s.session ? { ...s.session, level } : null,
        })),

      nextTurn: () =>
        set((s) => {
          if (!s.session) return {};
          const { players, currentTurn } = s.session;
          const idx = players.findIndex((p) => p.id === currentTurn);
          const next = players[(idx + 1) % players.length];
          return {
            session: { ...s.session, currentTurn: next.id },
          };
        }),

      addToHistory: (action) =>
        set((s) => {
          if (!s.session) return {};
          const entry: GameAction = {
            ...action,
            id: generateId(),
            timestamp: new Date().toISOString(),
          };
          return {
            session: {
              ...s.session,
              history: [...s.session.history, entry],
            },
          };
        }),

      addScore: (playerId, points) =>
        set((s) => ({
          session: s.session
            ? {
                ...s.session,
                score: {
                  ...s.session.score,
                  [playerId]: (s.session.score[playerId] || 0) + points,
                },
              }
            : null,
        })),

      addDrink: (playerId, amount) =>
        set((s) => ({
          players: s.players.map((p) =>
            p.id === playerId ? { ...p, drinks: p.drinks + amount } : p
          ),
        })),

      setActiveCard: (card) => set({ activeCard: card }),

      updateLimits: (playerId, limits) =>
        set((s) => {
          const existing = s.consentProfiles.find(
            (p) => p.playerId === playerId
          );
          if (existing) {
            return {
              consentProfiles: s.consentProfiles.map((p) =>
                p.playerId === playerId ? { ...p, limits, lastUpdated: new Date().toISOString() } : p
              ),
            };
          }
          return {
            consentProfiles: [
              ...s.consentProfiles,
              {
                playerId,
                limits,
                safeWord: "red",
                trafficLight: "green",
                lastUpdated: new Date().toISOString(),
                version: 1,
              },
            ],
          };
        }),

      setSafeWordStatus: (status) => set({ safeWordStatus: status }),

      startTimer: (duration, label) =>
        set({
          timerRunning: true,
          timerElapsed: 0,
          timerDuration: duration,
          timerLabel: label,
        }),

      stopTimer: () => set({ timerRunning: false }),

      tickTimer: () =>
        set((s) => {
          if (!s.timerRunning) return {};
          const next = s.timerElapsed + 1;
          if (next >= s.timerDuration) {
            return { timerElapsed: s.timerDuration, timerRunning: false };
          }
          return { timerElapsed: next };
        }),

      resetTimer: () =>
        set({ timerRunning: false, timerElapsed: 0, timerDuration: 0, timerLabel: "" }),

      setShowLimits: (show) => set({ showLimits: show }),
      setShowAftercare: (show) => set({ showAftercare: show }),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),

      resetAll: () =>
        set({
          players: [defaultPlayer],
          session: null,
          consentProfiles: [],
          safeWordStatus: "green",
          activeCard: null,
          timerRunning: false,
          timerElapsed: 0,
          timerDuration: 0,
          timerLabel: "",
        }),
    }),
    {
      name: "foreplay-frenzy-store",
      partialize: (state) => ({
        players: state.players,
        playerMode: state.playerMode,
        consentProfiles: state.consentProfiles,
        darkMode: state.darkMode,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
);

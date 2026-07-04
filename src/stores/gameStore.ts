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
} from "@/types";
import { generateId } from "@/lib/utils";

interface GameState {
  // Players
  players: Player[];
  playerMode: PlayerMode;

  // Session
  session: GameSession | null;

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

  // Actions
  setPlayerMode: (mode: PlayerMode) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (id: string) => void;
  updatePlayer: (id: string, updates: Partial<Player>) => void;

  startSession: (mode: GameMode) => void;
  endSession: () => void;
  setPhase: (phase: GameSession["phase"]) => void;
  setLevel: (level: GameLevel) => void;
  nextTurn: () => void;

  addToHistory: (action: Omit<GameAction, "id" | "timestamp">) => void;
  addScore: (playerId: string, points: number) => void;

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
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      players: [defaultPlayer],
      playerMode: "couple",
      session: null,
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

      setPlayerMode: (mode) => set({ playerMode: mode }),

      addPlayer: (player) =>
        set((s) => ({ players: [...s.players, player] })),

      removePlayer: (id) =>
        set((s) => ({ players: s.players.filter((p) => p.id !== id) })),

      updatePlayer: (id, updates) =>
        set((s) => ({
          players: s.players.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),

      startSession: (mode) => {
        const { players } = get();
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
        };
        set({ session });
      },

      endSession: () =>
        set((s) => ({
          session: s.session
            ? { ...s.session, phase: "ended", endedAt: new Date().toISOString() }
            : null,
          activeCard: null,
        })),

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
      }),
    }
  )
);

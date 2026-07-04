// ============================================================
// CORE TYPES – Foreplay Frenzy
// ============================================================

export type PlayerMode = "solo" | "couple" | "group" | "long-distance";

export type ArousalLevel = 1 | 2 | 3 | 4 | 5;

export type GameLevel = "tease" | "sensual" | "dirty" | "filthy" | "depraved";

export type CardType =
  | "truth"
  | "dare"
  | "wild"
  | "never-have-i-ever"
  | "dice"
  | "roleplay"
  | "challenge"
  | "hypno";

export type ConsentStatus = "pending" | "approved" | "denied";

export type SafeWordStatus = "green" | "yellow" | "red";

export type SessionPhase = "setup" | "playing" | "paused" | "aftercare" | "ended";

// ============================================================
// PLAYER
// ============================================================

export interface Player {
  id: string;
  name: string;
  avatar: string;
  arousal: ArousalLevel;
  obediencePoints: number;
  isSubmissive: boolean;
}

// ============================================================
// LIMITS / CONSENT
// ============================================================

export interface KinkLimit {
  id: string;
  name: string;
  category: string;
  intensity: number; // 1-10
  status: "yes" | "maybe" | "hard-no";
  notes?: string;
}

export interface ConsentProfile {
  playerId: string;
  limits: KinkLimit[];
  safeWord: string;
  trafficLight: SafeWordStatus;
  lastUpdated: string;
  version: number;
}

// ============================================================
// CARDS / PACKS
// ============================================================

export interface GameCard {
  id: string;
  type: CardType;
  level: GameLevel;
  text: string;
  description?: string;
  tags: string[];
  requires?: string[];
  limitsConflict?: string[];
  duration?: number; // seconds
  points?: number;
  isExtreme?: boolean;
}

export interface CardPack {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
  cards: GameCard[];
  isOfficial: boolean;
  tags: string[];
}

// ============================================================
// GAMES
// ============================================================

export type GameMode =
  | "truth-or-dare"
  | "never-have-i-ever"
  | "fantasy-dice"
  | "blindfold-sensory"
  | "strip-power"
  | "roleplay-roulette"
  | "edging-control"
  | "kink-charades"
  | "free-play";

export interface GameSession {
  id: string;
  mode: GameMode;
  players: Player[];
  currentTurn: string; // player id
  phase: SessionPhase;
  level: GameLevel;
  score: Record<string, number>;
  startedAt: string;
  endedAt?: string;
  history: GameAction[];
}

export interface GameAction {
  id: string;
  cardId?: string;
  playerId: string;
  action: string;
  result?: "completed" | "skipped" | "failed";
  timestamp: string;
  points: number;
}

// ============================================================
// DICE
// ============================================================

export interface DiceRoll {
  action: string;
  intensity: number;
  bodyZone: string;
  duration: number;
  toy?: string;
  hole?: string;
  modifier?: string;
}

// ============================================================
// MEDIA
// ============================================================

export interface MediaEntry {
  id: string;
  sessionId: string;
  type: "photo" | "video" | "audio";
  url: string;
  encrypted: boolean;
  createdAt: string;
  tags: string[];
}

// ============================================================
// TIMER
// ============================================================

export interface TimerState {
  isRunning: boolean;
  elapsed: number; // seconds
  duration: number; // total seconds
  label: string;
}

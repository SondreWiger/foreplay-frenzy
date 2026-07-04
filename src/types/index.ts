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
  | "hypno"
  | "would-you-rather"
  | "most-likely-to"
  | "two-truths-lie"
  | "drinking"
  | "charades"
  | "story"
  | "this-or-that"
  | "rate"
  | "question";

export type ConsentStatus = "pending" | "approved" | "denied";

export type SafeWordStatus = "green" | "yellow" | "red";

export type SessionPhase = "setup" | "playing" | "paused" | "aftercare" | "ended";

export type GameVibe = "spicy" | "party" | "chill" | "dark";

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
  drinks: number;
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
  optionA?: string;
  optionB?: string;
  choices?: string[];
  drinking?: boolean;
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
  vibe?: GameVibe;
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
  | "free-play"
  // Party / Friend group
  | "drinking-game"
  | "who-most-likely"
  | "would-you-rather"
  | "two-truths-lie"
  | "story-builder"
  | "this-or-that"
  | "rate-me"
  | "king-of-the-table"
  | "hot-take"
  | "emoji-guess";

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
  vibe: GameVibe;
}

export interface GameAction {
  id: string;
  cardId?: string;
  playerId: string;
  action: string;
  result?: "completed" | "skipped" | "failed" | "voted";
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
// DRINKING
// ============================================================

export interface DrinkingAction {
  type: "sip" | "shot" | "chug" | "skip" | "give" | "take";
  amount: number;
  target?: string; // player id
  reason: string;
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

// ============================================================
// SESSION HISTORY
// ============================================================

export interface SessionRecord {
  id: string;
  mode: GameMode;
  vibe: GameVibe;
  playerNames: string[];
  totalRounds: number;
  topScorer: string;
  topScore: number;
  startedAt: string;
  endedAt: string;
  duration: number; // minutes
}

// ============================================================
// ACHIEVEMENTS
// ============================================================

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlockedAt?: string;
  condition: string;
}

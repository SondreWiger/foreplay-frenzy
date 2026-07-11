import type { SessionRecord, Achievement, GameCard, CardPack } from "@/types";

// ============================================================
// CENTRALIZED LOCAL STORAGE MANAGER
// ============================================================

const KEYS = {
  SESSION_HISTORY: "ff-session-history",
  ACHIEVEMENTS: "ff-achievements",
  CUSTOM_PACKS: "ff-custom-packs",
  STATS: "ff-stats",
  PLAYER_PREFS: "ff-player-prefs",
} as const;

// ============================================================
// STATS TRACKING
// ============================================================

export interface GameStats {
  totalSessions: number;
  totalRounds: number;
  totalPoints: number;
  modesPlayed: string[];
  truthsCompleted: number;
  daresCompleted: number;
  wildsCompleted: number;
  drinksTaken: number;
  maxStreak: number;
  currentStreak: number;
  lastPlayDate: string | null;
  highestLevel: string;
  maxPlayersInSession: number;
  totalPlayTimeMinutes: number;
  customPacksCreated: number;
  cardsSkipped: number;
}

const defaultStats: GameStats = {
  totalSessions: 0,
  totalRounds: 0,
  totalPoints: 0,
  modesPlayed: [],
  truthsCompleted: 0,
  daresCompleted: 0,
  wildsCompleted: 0,
  drinksTaken: 0,
  maxStreak: 0,
  currentStreak: 0,
  lastPlayDate: null,
  highestLevel: "tease",
  maxPlayersInSession: 0,
  totalPlayTimeMinutes: 0,
  customPacksCreated: 0,
  cardsSkipped: 0,
};

export function getStats(): GameStats {
  if (typeof window === "undefined") return defaultStats;
  try {
    const raw = localStorage.getItem(KEYS.STATS);
    return raw ? { ...defaultStats, ...JSON.parse(raw) } : defaultStats;
  } catch {
    return defaultStats;
  }
}

export function saveStats(stats: GameStats): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEYS.STATS, JSON.stringify(stats));
}

export function updateStats(update: Partial<GameStats>): void {
  const stats = getStats();
  const merged = { ...stats, ...update };

  // Handle array append for modesPlayed
  if (update.modesPlayed && update.modesPlayed.length > stats.modesPlayed.length) {
    merged.modesPlayed = [...new Set(update.modesPlayed)];
  }

  saveStats(merged);
}

export function recordRound(data: {
  cardType: string;
  points: number;
  skipped: boolean;
  level: string;
  mode: string;
  playerCount: number;
}): void {
  const stats = getStats();
  stats.totalRounds += 1;
  stats.totalPoints += data.points;
  if (!stats.modesPlayed.includes(data.mode)) {
    stats.modesPlayed.push(data.mode);
  }

  if (data.cardType === "truth") stats.truthsCompleted += 1;
  if (data.cardType === "dare") stats.daresCompleted += 1;
  if (data.cardType === "wild") stats.wildsCompleted += 1;
  if (data.skipped) stats.cardsSkipped += 1;

  const levelOrder = ["tease", "sensual", "dirty", "filthy", "depraved"];
  const currentIdx = levelOrder.indexOf(stats.highestLevel);
  const newIdx = levelOrder.indexOf(data.level);
  if (newIdx > currentIdx) stats.highestLevel = data.level;

  if (data.playerCount > stats.maxPlayersInSession) {
    stats.maxPlayersInSession = data.playerCount;
  }

  saveStats(stats);
}

export function recordSessionComplete(session: SessionRecord): void {
  const stats = getStats();
  stats.totalSessions += 1;
  stats.totalPlayTimeMinutes += session.duration;

  // Streak calculation
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (stats.lastPlayDate === today) {
    // Same day, keep streak
  } else if (stats.lastPlayDate === yesterday) {
    stats.currentStreak += 1;
  } else {
    stats.currentStreak = 1;
  }

  stats.lastPlayDate = today;
  if (stats.currentStreak > stats.maxStreak) {
    stats.maxStreak = stats.currentStreak;
  }

  saveStats(stats);
}

// ============================================================
// SESSION HISTORY
// ============================================================

export function getSessionHistory(): SessionRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEYS.SESSION_HISTORY) || "[]");
  } catch {
    return [];
  }
}

export function saveSession(record: SessionRecord): void {
  const history = getSessionHistory();
  history.unshift(record);
  if (history.length > 100) history.splice(100);
  localStorage.setItem(KEYS.SESSION_HISTORY, JSON.stringify(history));
}

export function clearSessionHistory(): void {
  localStorage.removeItem(KEYS.SESSION_HISTORY);
}

// ============================================================
// ACHIEVEMENTS
// ============================================================

export function getUnlockedAchievements(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEYS.ACHIEVEMENTS) || "[]");
  } catch {
    return [];
  }
}

export function unlockAchievement(id: string): boolean {
  const unlocked = getUnlockedAchievements();
  if (unlocked.includes(id)) return false;
  unlocked.push(id);
  localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(unlocked));
  return true;
}

export function isUnlocked(id: string): boolean {
  return getUnlockedAchievements().includes(id);
}

// ============================================================
// CUSTOM PACKS
// ============================================================

export function getCustomPacks(): CardPack[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEYS.CUSTOM_PACKS) || "[]");
  } catch {
    return [];
  }
}

export function saveCustomPack(pack: CardPack): void {
  const packs = getCustomPacks();
  packs.push(pack);
  localStorage.setItem(KEYS.CUSTOM_PACKS, JSON.stringify(packs));

  const stats = getStats();
  stats.customPacksCreated += 1;
  saveStats(stats);
}

export function deleteCustomPack(id: string): void {
  const packs = getCustomPacks().filter((p) => p.id !== id);
  localStorage.setItem(KEYS.CUSTOM_PACKS, JSON.stringify(packs));
}

// ============================================================
// DRINK TRACKING
// ============================================================

export function addDrink(): void {
  const stats = getStats();
  stats.drinksTaken += 1;
  saveStats(stats);
}

// ============================================================
// ACHIEVEMENT CHECKING (runs after each round)
// ============================================================

export function checkAchievements(context: {
  cardType?: string;
  level?: string;
  mode?: string;
  playerCount?: number;
  points?: number;
  duration?: number;
}): string[] {
  const stats = getStats();
  const newlyUnlocked: string[] = [];

  const tryUnlock = (id: string) => {
    if (unlockAchievement(id)) newlyUnlocked.push(id);
  };

  // First game session
  if (stats.totalSessions >= 1) tryUnlock("first-game");

  // Truth Teller
  if (stats.truthsCompleted >= 10) tryUnlock("truth-teller-10");
  if (stats.truthsCompleted >= 50) tryUnlock("truth-teller-50");
  if (stats.truthsCompleted >= 100) tryUnlock("truth-teller-100");

  // Dare Devil
  if (stats.daresCompleted >= 10) tryUnlock("dare-devil-10");
  if (stats.daresCompleted >= 50) tryUnlock("dare-devil-50");
  if (stats.daresCompleted >= 100) tryUnlock("dare-devil-100");

  // Wild Child
  if (stats.wildsCompleted >= 10) tryUnlock("wild-child-10");

  // Party Animal (different modes)
  if (stats.modesPlayed.length >= 3) tryUnlock("modes-3");
  if (stats.modesPlayed.length >= 5) tryUnlock("modes-5");
  if (stats.modesPlayed.length >= 10) tryUnlock("modes-10");
  if (stats.modesPlayed.length >= 15) tryUnlock("modes-all");

  // Point Master
  if (stats.totalPoints >= 100) tryUnlock("points-100");
  if (stats.totalPoints >= 500) tryUnlock("points-500");
  if (stats.totalPoints >= 1000) tryUnlock("points-1000");
  if (stats.totalPoints >= 5000) tryUnlock("points-5000");

  // Extreme player
  const levelOrder = ["tease", "sensual", "dirty", "filthy", "depraved"];
  if (levelOrder.indexOf(stats.highestLevel) >= 3) tryUnlock("play-filthy");
  if (levelOrder.indexOf(stats.highestLevel) >= 4) tryUnlock("play-depraved");

  // Group Gamer
  if (stats.maxPlayersInSession >= 4) tryUnlock("group-4");
  if (stats.maxPlayersInSession >= 6) tryUnlock("group-6");
  if (stats.maxPlayersInSession >= 8) tryUnlock("group-8");

  // Streak
  if (stats.currentStreak >= 3 || stats.maxStreak >= 3) tryUnlock("streak-3");
  if (stats.currentStreak >= 7 || stats.maxStreak >= 7) tryUnlock("streak-7");

  // Night Owl
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 5) tryUnlock("night-owl");

  // Marathon
  if (stats.totalPlayTimeMinutes >= 60) tryUnlock("marathon-60");
  if (stats.totalPlayTimeMinutes >= 180) tryUnlock("marathon-180");

  // Creator
  if (stats.customPacksCreated >= 1) tryUnlock("custom-creator");
  if (stats.customPacksCreated >= 5) tryUnlock("custom-prolific");

  // Drinking
  if (stats.drinksTaken >= 10) tryUnlock("drinker-10");
  if (stats.drinksTaken >= 50) tryUnlock("drinker-50");

  // Skipped
  if (stats.cardsSkipped >= 50) tryUnlock("prude");

  // Rounds
  if (stats.totalRounds >= 100) tryUnlock("rounds-100");
  if (stats.totalRounds >= 500) tryUnlock("rounds-500");
  if (stats.totalRounds >= 1000) tryUnlock("rounds-1000");

  return newlyUnlocked;
}

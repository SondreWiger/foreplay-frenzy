import type { GameCard, GameVibe, GameLevel, GameMode } from "@/types";
import { getAllCards } from "@/lib/cards";
import { getSFWCards } from "@/lib/sfw-cards";
import { getPartyCards } from "@/lib/party-cards";
import { getExtremeCards } from "@/lib/extreme-cards";
import { getNewGamePacks } from "@/lib/new-cards";
import { getCustomPacks } from "@/lib/storage";
import { getRandomItem } from "@/lib/utils";

// ============================================================
// VIBE-BASED CARD FILTERING
// ============================================================

/**
 * Returns the max allowed level based on vibe.
 * - party: tease only (SFW)
 * - chill: tease → dirty (flirty to naughty)
 * - spicy: tease → depraved (the full journey)
 * - dark: everything (tease → depraved, more extreme cards)
 */
function getMaxLevelForVibe(vibe: GameVibe): number {
  const levels: GameLevel[] = ["tease", "sensual", "dirty", "filthy", "depraved"];
  switch (vibe) {
    case "party": return 0; // tease only
    case "chill": return 2; // tease → dirty
    case "spicy": return 4; // tease → depraved (full range)
    case "dark": return 4;  // everything + extreme cards
    default: return 4;
  }
}

function getLevelIndex(level: GameLevel): number {
  const levels: GameLevel[] = ["tease", "sensual", "dirty", "filthy", "depraved"];
  return levels.indexOf(level);
}

// ============================================================
// PROGRESSION SYSTEM
// ============================================================

export interface ProgressionState {
  round: number;
  currentLevel: GameLevel;
  autoEscalate: boolean;
  escalateEvery: number; // rounds between escalations
}

/**
 * Calculate the level based on progression.
 * Starts at tease, escalates over rounds.
 */
export function getProgressionLevel(
  round: number,
  vibe: GameVibe,
  escalateEvery: number = 3
): GameLevel {
  const levels: GameLevel[] = ["tease", "sensual", "dirty", "filthy", "depraved"];
  const maxLevelIdx = getMaxLevelForVibe(vibe);
  const escalationStep = Math.floor(round / escalateEvery);
  const levelIdx = Math.min(escalationStep, maxLevelIdx);
  return levels[levelIdx];
}

/**
 * Get the appropriate level label for UI display.
 */
export function getProgressionLabel(round: number, vibe: GameVibe): string {
  const level = getProgressionLevel(round, vibe);
  return level.charAt(0).toUpperCase() + level.slice(1);
}

/**
 * Get escalation message — varies by vibe for context.
 */
export function getEscalationMessage(round: number, vibe: GameVibe, escalateEvery: number = 3): string | null {
  if (round > 0 && round % escalateEvery === 0) {
    const level = getProgressionLevel(round, vibe);
    const messages: Record<GameLevel, string> = {
      tease: vibe === "chill"
        ? "Getting warmed up..."
        : "Time to warm up...",
      sensual: vibe === "chill"
        ? "Things are getting flirty..."
        : "Getting warmer... don't hold back.",
      dirty: vibe === "chill"
        ? "Now we're getting naughty 😏"
        : "Things just got dirty.",
      filthy: "No turning back now. Let go.",
      depraved: "No limits. You asked for this.",
    };
    return messages[level];
  }
  return null;
}

// ============================================================
// GET CARDS BY VIBE & LEVEL
// ============================================================

/**
 * Get all cards appropriate for the current vibe and progression level.
 */
export function getCardsForVibe(
  vibe: GameVibe,
  round: number = 0,
  escalateEvery: number = 3
): GameCard[] {
  const currentLevel = getProgressionLevel(round, vibe);
  const maxLevelIdx = getLevelIndex(currentLevel);

  let cards: GameCard[] = [];

  // Party mode uses SFW cards only
  if (vibe === "party") {
    cards = [...getSFWCards()];
  } else {
    // Always include base cards for non-party vibes
    cards = [...getAllCards()];

    // Chill/spicy include party cards too
    if (vibe === "chill" || vibe === "spicy") {
      cards = [...cards, ...getPartyCards()];
    }

    // Spicy includes extreme up to filthy
    if (vibe === "spicy") {
      cards = [...cards, ...getExtremeCards()];
    }

    // Dark includes everything
    if (vibe === "dark") {
      cards = [...cards, ...getPartyCards(), ...getExtremeCards()];
    }
  }

  // Include new game packs for all vibes (filtered by level)
  const newPacks = getNewGamePacks();
  for (const pack of newPacks) {
    const filteredPackCards = pack.cards.filter((c: GameCard) => {
      if (vibe === "party") return c.level === "tease";
      return getLevelIndex(c.level) <= maxLevelIdx;
    });
    cards = [...cards, ...filteredPackCards];
  }

  // Include custom packs for all vibes (filtered by vibe level)
  const customPacks = getCustomPacks();
  for (const pack of customPacks) {
    if (pack.cards && Array.isArray(pack.cards)) {
      const filteredPackCards = pack.cards.filter((c: GameCard) => {
        if (vibe === "party") return c.level === "tease";
        return getLevelIndex(c.level) <= maxLevelIdx;
      });
      cards = [...cards, ...filteredPackCards];
    }
  }

  // Filter by level
  return cards.filter((c) => getLevelIndex(c.level) <= maxLevelIdx);
}

/**
 * Get cards for a specific game mode filtered by vibe and progression.
 */
export function getCardsForMode(
  mode: GameMode,
  vibe: GameVibe,
  round: number = 0,
  escalateEvery: number = 3
): GameCard[] {
  const allCards = getCardsForVibe(vibe, round, escalateEvery);

  // Map game modes to card types
  const modeTypeMap: Partial<Record<GameMode, string[]>> = {
    "truth-or-dare": ["truth", "dare", "wild"],
    "never-have-i-ever": ["never-have-i-ever"],
    "fantasy-dice": ["dice"],
    "roleplay-roulette": ["roleplay"],
    "drinking-game": ["never-have-i-ever", "would-you-rather", "drinking", "wild"],
    "who-most-likely": ["most-likely-to"],
    "would-you-rather": ["would-you-rather"],
    "two-truths-lie": ["two-truths-lie"],
    "this-or-that": ["this-or-that"],
    "kink-charades": ["charades"],
    "story-builder": ["story"],
    "rate-me": ["rate"],
    "hot-take": ["challenge"],
    "emoji-guess": ["challenge"],
    "compliment-battle": ["challenge"],
    "kink-roulette": ["challenge"],
    "twenty-questions": ["challenge"],
    "body-language": ["charades"],
    "scream-or-drink": ["challenge"],
  };

  const allowedTypes = modeTypeMap[mode] || ["truth", "dare", "wild"];
  return allCards.filter((c) => allowedTypes.includes(c.type));
}

/**
 * Get a random card for a mode with vibe filtering.
 */
export function getFilteredRandomCard(
  mode: GameMode,
  vibe: GameVibe,
  round: number = 0,
  escalateEvery: number = 3,
  excludeIds: string[] = []
): GameCard | null {
  const cards = getCardsForMode(mode, vibe, round, escalateEvery);
  const available = cards.filter((c) => !excludeIds.includes(c.id));
  if (available.length === 0) {
    // Fall back to any card not excluded
    const all = getCardsForVibe(vibe, round, escalateEvery);
    const fallback = all.filter((c) => !excludeIds.includes(c.id));
    return fallback.length > 0 ? getRandomItem(fallback) : null;
  }
  return getRandomItem(available);
}

/**
 * Get SFW cards for party/friend group modes.
 */
export function getPartyModeCards(): GameCard[] {
  return getSFWCards();
}

/**
 * Get extreme cards for dark vibe.
 */
export function getExtremeModeCards(): GameCard[] {
  return getExtremeCards();
}

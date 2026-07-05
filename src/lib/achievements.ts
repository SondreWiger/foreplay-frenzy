import type { Achievement } from "@/types";

export const ALL_ACHIEVEMENTS: Achievement[] = [
  // === SESSIONS ===
  { id: "first-game", name: "First Timer", description: "Complete your first game session", emoji: "🎮", condition: "complete_1_session" },

  // === TRUTHS ===
  { id: "truth-teller-10", name: "Truth Teller", description: "Complete 10 truth cards", emoji: "💋", condition: "10_truths" },
  { id: "truth-teller-50", name: "Truth Serum", description: "Complete 50 truth cards", emoji: "💉", condition: "50_truths" },
  { id: "truth-teller-100", name: "Honest Abe", description: "Complete 100 truth cards", emoji: "🏛️", condition: "100_truths" },

  // === DARES ===
  { id: "dare-devil-10", name: "Dare Devil", description: "Complete 10 dare cards", emoji: "🔥", condition: "10_dares" },
  { id: "dare-devil-50", name: "Fearless", description: "Complete 50 dare cards", emoji: "😈", condition: "50_dares" },
  { id: "dare-devil-100", name: "Untouchable", description: "Complete 100 dare cards", emoji: "💀", condition: "100_dares" },

  // === WILD ===
  { id: "wild-child-10", name: "Wild Card", description: "Complete 10 wild cards", emoji: "⚡", condition: "10_wilds" },

  // === MODES ===
  { id: "modes-3", name: "Versatile", description: "Play 3 different game modes", emoji: "🎲", condition: "3_modes" },
  { id: "modes-5", name: "Party Animal", description: "Play 5 different game modes", emoji: "🎉", condition: "5_modes" },
  { id: "modes-10", name: "Game Master", description: "Play 10 different game modes", emoji: "🏆", condition: "10_modes" },
  { id: "modes-all", name: "Completionist", description: "Play all 15 game modes", emoji: "👑", condition: "all_modes" },

  // === POINTS ===
  { id: "points-100", name: "Hundred Club", description: "Earn 100+ total points", emoji: "💯", condition: "100_points" },
  { id: "points-500", name: "Point Hoarder", description: "Earn 500+ total points", emoji: "💰", condition: "500_points" },
  { id: "points-1000", name: "Point Millionaire", description: "Earn 1,000+ total points", emoji: "🤑", condition: "1000_points" },
  { id: "points-5000", name: "Point God", description: "Earn 5,000+ total points", emoji: "🌟", condition: "5000_points" },

  // === LEVELS ===
  { id: "play-filthy", name: "Filthy Animal", description: "Reach the Filthy level", emoji: "🥵", condition: "play_filthy" },
  { id: "play-depraved", name: "Pure Evil", description: "Reach the Depraved level", emoji: "🖤", condition: "play_depraved" },

  // === GROUP ===
  { id: "group-4", name: "Squad Goals", description: "Play with 4+ players", emoji: "👯", condition: "group_4" },
  { id: "group-6", name: "Party Crew", description: "Play with 6+ players", emoji: "🥳", condition: "group_6" },
  { id: "group-8", name: "Full House", description: "Play with 8+ players", emoji: "🏠", condition: "group_8" },

  // === STREAKS ===
  { id: "streak-3", name: "Hat Trick", description: "Play 3 days in a row", emoji: "🎩", condition: "streak_3" },
  { id: "streak-7", name: "Week Warrior", description: "Play 7 days in a row", emoji: "📅", condition: "streak_7" },

  // === TIME ===
  { id: "night-owl", name: "Night Owl", description: "Play between midnight and 5am", emoji: "🦉", condition: "play_late" },
  { id: "marathon-60", name: "Marathon", description: "Play for 60+ minutes total", emoji: "🏃", condition: "60_min" },
  { id: "marathon-180", name: "No Lifel", description: "Play for 3+ hours total", emoji: "😴", condition: "180_min" },

  // === CREATOR ===
  { id: "custom-creator", name: "Creator", description: "Create a custom card pack", emoji: "🎨", condition: "custom_pack" },
  { id: "custom-prolific", name: "Prolific Creator", description: "Create 5 custom card packs", emoji: "✍️", condition: "5_custom_packs" },

  // === DRINKING ===
  { id: "drinker-10", name: "Lightweight", description: "Take 10 drinks", emoji: "🍺", condition: "10_drinks" },
  { id: "drinker-50", name: "Bottomless", description: "Take 50 drinks", emoji: "🍻", condition: "50_drinks" },

  // === ROUNDS ===
  { id: "rounds-100", name: "Century", description: "Complete 100 rounds", emoji: "💯", condition: "100_rounds" },
  { id: "rounds-500", name: "Dedicated", description: "Complete 500 rounds", emoji: "🎯", condition: "500_rounds" },
  { id: "rounds-1000", name: "Legend", description: "Complete 1,000 rounds", emoji: "⭐", condition: "1000_rounds" },

  // === SPECIAL ===
  { id: "prude", name: "Party Pooper", description: "Skip 50 cards", emoji: "🙄", condition: "50_skips" },
];

export function getAchievementById(id: string): Achievement | undefined {
  return ALL_ACHIEVEMENTS.find((a) => a.id === id);
}

export function getAchievementProgress(): { unlocked: number; total: number } {
  if (typeof window === "undefined") return { unlocked: 0, total: ALL_ACHIEVEMENTS.length };
  try {
    const stored: string[] = JSON.parse(localStorage.getItem("ff-achievements") || "[]");
    return { unlocked: stored.length, total: ALL_ACHIEVEMENTS.length };
  } catch {
    return { unlocked: 0, total: ALL_ACHIEVEMENTS.length };
  }
}

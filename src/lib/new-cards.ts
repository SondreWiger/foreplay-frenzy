import type { GameCard, CardPack, GameLevel } from "@/types";

// ============================================================
// COMPLIMENT BATTLE — Who can give the best compliment?
// ============================================================

const complimentBattleCards: GameCard[] = [
  { id: "cb-1", type: "challenge", level: "tease", text: "Give your partner the most creative compliment about their smile.", tags: ["compliment", "wholesome"], points: 10 },
  { id: "cb-2", type: "challenge", level: "tease", text: "Compliment something nobody usually notices about the person to your left.", tags: ["compliment", "observation"], points: 10 },
  { id: "cb-3", type: "challenge", level: "tease", text: "Give a compliment so smooth it could be a pickup line.", tags: ["compliment", "flirty"], points: 10 },
  { id: "cb-4", type: "challenge", level: "tease", text: "Compliment the person across from you on something non-physical.", tags: ["compliment", "personality"], points: 10 },
  { id: "cb-5", type: "challenge", level: "sensual", text: "Describe what you find most attractive about your partner's body — in detail.", tags: ["compliment", "body"], points: 15 },
  { id: "cb-6", type: "challenge", level: "sensual", text: "Give the dirtiest compliment you can think of to the person on your right.", tags: ["compliment", "dirty"], points: 15 },
  { id: "cb-7", type: "challenge", level: "sensual", text: "Compliment your partner's best skill in bed.", tags: ["compliment", "sexual"], points: 15 },
  { id: "cb-8", type: "challenge", level: "dirty", text: "Describe exactly what you'd do to them based on how they look right now.", tags: ["compliment", "nsfw"], points: 20 },
  { id: "cb-9", type: "challenge", level: "dirty", text: "Give the most vulgar compliment you can think of — winner gets points.", tags: ["compliment", "degrading"], points: 20 },
  { id: "cb-10", type: "challenge", level: "filthy", text: "Compliment their body while touching them in the spot you're describing.", tags: ["compliment", "touch"], points: 25 },
];

// ============================================================
// KINK ROULETTE — Random kink activity selector
// ============================================================

const kinkRouletteCards: GameCard[] = [
  { id: "kr-1", type: "challenge", level: "tease", text: "Blindfold your partner and kiss them in 3 different places.", tags: ["sensory", "kissing"], points: 10, requires: ["blindfold"] },
  { id: "kr-2", type: "challenge", level: "tease", text: "Whisper your dirtiest secret into your partner's ear.", tags: ["dirty-talk", "intimacy"], points: 10 },
  { id: "kr-3", type: "challenge", level: "tease", text: "Hold hands and maintain eye contact for 60 seconds without speaking.", tags: ["intimacy", "eye-contact"], points: 10, duration: 60 },
  { id: "kr-4", type: "challenge", level: "tease", text: "Trace your fingers slowly across your partner's inner thigh.", tags: ["teasing", "touch"], points: 10 },
  { id: "kr-5", type: "challenge", level: "sensual", text: "Use ice cubes to trace a trail down your partner's body.", tags: ["sensory", "ice"], points: 15, requires: ["ice"] },
  { id: "kr-6", type: "challenge", level: "sensual", text: "Massage your partner's most sensitive area for 3 minutes.", tags: ["massage", "touch"], points: 20, duration: 180 },
  { id: "kr-7", type: "challenge", level: "sensual", text: "Take turns giving each other a striptease — clothes off slowly.", tags: ["stripping", "exhibition"], points: 20 },
  { id: "kr-8", type: "challenge", level: "dirty", text: "69 for 5 minutes — whoever stops first does a dare.", tags: ["oral", "69"], points: 30, duration: 300 },
  { id: "kr-9", type: "challenge", level: "dirty", text: "Use a toy on your partner while they're blindfolded.", tags: ["toy", "sensory"], points: 25, requires: ["toy"] },
  { id: "kr-10", type: "challenge", level: "dirty", text: "Tie your partner up and tease them for 5 minutes before giving in.", tags: ["bondage", "teasing"], points: 30, requires: ["rope/bonds"], duration: 300 },
  { id: "kr-11", type: "challenge", level: "filthy", text: "Free use for the next 10 minutes — no asking, just taking.", tags: ["free-use", "domination"], points: 35, duration: 600 },
  { id: "kr-12", type: "challenge", level: "filthy", text: "Edge your partner 3 times, then let them cum however they want.", tags: ["edging", "orgasm"], points: 35, duration: 600 },
  { id: "kr-13", type: "challenge", level: "depraved", text: "Complete obedience for the next 15 minutes — do whatever you're told.", tags: ["submission", "obedience"], points: 40, duration: 900 },
  { id: "kr-14", type: "challenge", level: "depraved", text: "Anal play with your partner's choice of toy or position.", tags: ["anal", "toy"], points: 40, requires: ["toy"] },
];

// ============================================================
// 20 QUESTIONS — Adult edition
// ============================================================

const twentyQuestionsCards: GameCard[] = [
  { id: "tq-1", type: "challenge", level: "tease", text: "Think of your favorite body part on your partner. Others get 20 yes/no questions to guess it.", tags: ["guessing", "body"], points: 10 },
  { id: "tq-2", type: "challenge", level: "tease", text: "Think of your most embarrassing sexual moment. Others get 20 questions to guess what happened.", tags: ["guessing", "embarrassing"], points: 10 },
  { id: "tq-3", type: "challenge", level: "tease", text: "Think of a fantasy you've never told anyone. Others get 20 questions.", tags: ["guessing", "fantasy"], points: 15 },
  { id: "tq-4", type: "challenge", level: "sensual", text: "Think of the kinkiest thing you've done. Others get 20 questions to guess.", tags: ["guessing", "kink"], points: 15 },
  { id: "tq-5", type: "challenge", level: "sensual", text: "Think of a position you've never tried. Others get 20 questions.", tags: ["guessing", "position"], points: 15 },
  { id: "tq-6", type: "challenge", level: "dirty", text: "Think of your dirtiest fantasy. Others get 20 questions to narrow it down.", tags: ["guessing", "fantasy"], points: 20 },
  { id: "tq-7", type: "challenge", level: "dirty", text: "Think of someone famous you'd sleep with and what you'd do. Others guess.", tags: ["guessing", "celebrity"], points: 20 },
];

// ============================================================
// BODY LANGUAGE — Act it out (like charades but NSFW)
// ============================================================

const bodyLanguageCards: GameCard[] = [
  { id: "bl-1", type: "charades", level: "tease", text: "Act out: First kiss with a stranger", tags: ["acting", "romance"], points: 10, duration: 60 },
  { id: "bl-2", type: "charades", level: "tease", text: "Act out: Getting caught checking someone out", tags: ["acting", "funny"], points: 10, duration: 60 },
  { id: "bl-3", type: "charades", level: "tease", text: "Act out: The worst date ever", tags: ["acting", "funny"], points: 10, duration: 60 },
  { id: "bl-4", type: "charades", level: "sensual", text: "Act out: Giving a lap dance", tags: ["acting", "sexy"], points: 15, duration: 60 },
  { id: "bl-5", type: "charades", level: "sensual", text: "Act out: undressing someone with your eyes", tags: ["acting", "teasing"], points: 15, duration: 60 },
  { id: "bl-6", type: "charades", level: "sensual", text: "Act out: Making out in an elevator", tags: ["acting", "risk"], points: 15, duration: 60 },
  { id: "bl-7", type: "charades", level: "dirty", text: "Act out: Your favorite position (no words!)", tags: ["acting", "sexual"], points: 20, duration: 60 },
  { id: "bl-8", type: "charades", level: "dirty", text: "Act out: A threesome gone wrong", tags: ["acting", "funny"], points: 20, duration: 60 },
  { id: "bl-9", type: "charades", level: "filthy", text: "Act out: Your filthiest fantasy — group must guess.", tags: ["acting", "nsfw"], points: 25, duration: 90 },
];

// ============================================================
// SCREAM OR DRINK — Try not to laugh/challenge
// ============================================================

const screamOrDrinkCards: GameCard[] = [
  { id: "sd-1", type: "challenge", level: "tease", text: "Make the most ridiculous sex noise you can. Everyone else judges — worst one drinks.", tags: ["funny", "noise"], points: 10 },
  { id: "sd-2", type: "challenge", level: "tease", text: "Tell a dirty joke. If anyone laughs, they drink. If no one laughs, YOU drink.", tags: ["joke", "funny"], points: 10 },
  { id: "sd-3", type: "challenge", level: "tease", text: "Describe your first kiss like it's a nature documentary. Keep a straight face.", tags: ["funny", "narration"], points: 10 },
  { id: "sd-4", type: "challenge", level: "sensual", text: "Seductively describe making a sandwich. If anyone cracks, they drink.", tags: ["funny", "seduction"], points: 15 },
  { id: "sd-5", type: "challenge", level: "sensual", text: "Do your best impression of someone in the group having sex. They drink if they laugh.", tags: ["funny", "impression"], points: 15 },
  { id: "sd-6", type: "challenge", level: "dirty", text: "Read the nearest book/menu/product label in the sexiest voice possible. Group votes.", tags: ["funny", "voice"], points: 20 },
  { id: "sd-7", type: "challenge", level: "dirty", text: "Describe the most awkward sex position you can think of. Keep a straight face or drink.", tags: ["funny", "position"], points: 20 },
  { id: "sd-8", type: "challenge", level: "filthy", text: "Imitate a pornstar's O-face. If you make anyone laugh, they drink. If not, you drink.", tags: ["funny", "nsfw"], points: 25 },
];

// ============================================================
// PACK DEFINITIONS
// ============================================================

export function getNewGamePacks(): CardPack[] {
  return [
    {
      id: "compliment-battle",
      name: "Compliment Battle",
      description: "Who can give the best compliment?",
      author: "Foreplay Frenzy",
      version: "1.0",
      cards: complimentBattleCards,
      isOfficial: true,
      tags: ["compliment", "group", "flirty"],
    },
    {
      id: "kink-roulette",
      name: "Kink Roulette",
      description: "Random kink activity selector",
      author: "Foreplay Frenzy",
      version: "1.0",
      cards: kinkRouletteCards,
      isOfficial: true,
      tags: ["kink", "challenge", "spicy"],
    },
    {
      id: "twenty-questions",
      name: "20 Questions",
      description: "Adult edition guessing game",
      author: "Foreplay Frenzy",
      version: "1.0",
      cards: twentyQuestionsCards,
      isOfficial: true,
      tags: ["questions", "guessing", "confession"],
    },
    {
      id: "body-language",
      name: "Body Language",
      description: "Act it out — NSFW charades",
      author: "Foreplay Frenzy",
      version: "1.0",
      cards: bodyLanguageCards,
      isOfficial: true,
      tags: ["charades", "acting", "funny"],
    },
    {
      id: "scream-or-drink",
      name: "Scream or Drink",
      description: "Try not to laugh or you drink",
      author: "Foreplay Frenzy",
      version: "1.0",
      cards: screamOrDrinkCards,
      isOfficial: true,
      tags: ["funny", "drinking", "challenge"],
    },
  ];
}

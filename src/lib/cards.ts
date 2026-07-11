import type { GameCard, CardPack, CardType, GameLevel } from "@/types";
import { shuffleArray, getRandomItem } from "@/lib/utils";

// ============================================================
// TRUTH OR DARE – ABYSS EDITION
// ============================================================

const truthOrDareCards: GameCard[] = [
  // --- TEASE (Level 1) ---
  { id: "tod-1", type: "truth", level: "tease", text: "What's the most embarrassing place you've masturbated?", tags: ["solo", "confession"], points: 5 },
  { id: "tod-2", type: "truth", level: "tease", text: "Describe your biggest turn-on in detail.", tags: ["desire", "confession"], points: 5 },
  { id: "tod-3", type: "truth", level: "tease", text: "What's the sexiest dream you've ever had?", tags: ["fantasy", "confession"], points: 5 },
  { id: "tod-4", type: "truth", level: "tease", text: "If your partner could do anything to you right now, what would you want?", tags: ["desire", "tease"], points: 5 },
  { id: "tod-5", type: "truth", level: "tease", text: "What's a body part on your partner that drives you crazy?", tags: ["attraction", "confession"], points: 5 },
  { id: "tod-6", type: "dare", level: "tease", text: "Send your partner a sexy selfie right now.", tags: ["photo", "tease"], points: 10, requires: ["phone"] },
  { id: "tod-7", type: "dare", level: "tease", text: "Kiss your partner for 60 seconds without stopping.", tags: ["kissing", "tease"], points: 10, duration: 60 },
  { id: "tod-8", type: "dare", level: "tease", text: "Remove one piece of clothing slowly while maintaining eye contact.", tags: ["stripping", "tease"], points: 10 },
  { id: "tod-9", type: "dare", level: "tease", text: "Whisper the dirtiest thing you can think of in your partner's ear.", tags: ["dirty-talk", "tease"], points: 10 },
  { id: "tod-10", type: "dare", level: "tease", text: "Massage your partner's neck and shoulders for 2 minutes.", tags: ["massage", "tease"], points: 10, duration: 120 },
  { id: "tod-11", type: "wild", level: "tease", text: "Both players remove one item of clothing.", tags: ["stripping", "wild"], points: 15 },
  { id: "tod-12", type: "wild", level: "tease", text: "Give each other a compliment about something sexual.", tags: ["dirty-talk", "wild"], points: 10 },

  // --- SENSUAL (Level 2) ---
  { id: "tod-13", type: "truth", level: "sensual", text: "What's the kinkiest thing you've ever done with a partner?", tags: ["confession", "kink"], points: 10 },
  { id: "tod-14", type: "truth", level: "sensual", text: "Describe your ideal first time with someone new.", tags: ["fantasy", "confession"], points: 10 },
  { id: "tod-15", type: "truth", level: "sensual", text: "What toy have you always wanted to try but haven't?", tags: ["toy", "curiosity"], points: 10 },
  { id: "tod-16", type: "truth", level: "sensual", text: "Tell me about a time you were caught doing something sexual.", tags: ["risk", "confession"], points: 15 },
  { id: "tod-17", type: "truth", level: "sensual", text: "What's the most you've ever masturbated in one day?", tags: ["solo", "confession"], points: 10 },
  { id: "tod-18", type: "dare", level: "sensual", text: "Give your partner oral for 3 minutes without letting them cum.", tags: ["oral", "edging"], points: 20, duration: 180 },
  { id: "tod-19", type: "dare", level: "sensual", text: "Blindfold your partner and tease them with ice for 2 minutes.", tags: ["sensory", "ice"], points: 20, requires: ["blindfold", "ice"], duration: 120 },
  { id: "tod-20", type: "dare", level: "sensual", text: "Ride your partner for 5 minutes in complete silence.", tags: ["riding", "sensual"], points: 20, duration: 300 },
  { id: "tod-21", type: "dare", level: "sensual", text: "Tie your partner's hands and give them the best handjob/blowjob of their life.", tags: ["bondage", "oral"], points: 25, requires: ["rope/bonds"] },
  { id: "tod-22", type: "dare", level: "sensual", text: "Make yourself cum while your partner watches.", tags: ["solo", "exhibition"], points: 20 },
  { id: "tod-23", type: "wild", level: "sensual", text: "Switch roles for the next 10 minutes — dominant becomes submissive.", tags: ["power-exchange", "wild"], points: 20, duration: 600 },
  { id: "tod-24", type: "wild", level: "sensual", text: "Introduce a toy into whatever you're doing right now.", tags: ["toy", "wild"], points: 20 },

  // --- DIRTY (Level 3) ---
  { id: "tod-25", type: "truth", level: "dirty", text: "What's the most degrading thing you'd enjoy during sex?", tags: ["degradation", "confession"], points: 15 },
  { id: "tod-26", type: "truth", level: "dirty", text: "Have you ever faked an orgasm? When and why?", tags: ["confession", "honesty"], points: 15 },
  { id: "tod-27", type: "truth", level: "dirty", text: "What's the most taboo fantasy you have?", tags: ["taboo", "fantasy"], points: 20 },
  { id: "tod-28", type: "truth", level: "dirty", text: "Describe a time you had sex in a public or risky place.", tags: ["public", "risk"], points: 20 },
  { id: "tod-29", type: "dare", level: "dirty", text: "Let your partner spank you 10 times as hard as they want.", tags: ["spanking", "pain"], points: 25 },
  { id: "tod-30", type: "dare", level: "dirty", text: "Suck on your partner's fingers like they're dicks.", tags: ["oral", "degrading"], points: 25 },
  { id: "tod-31", type: "dare", level: "dirty", text: "Let your partner fuck you from behind while calling you dirty names.", tags: ["dirty-talk", "doggy"], points: 30 },
  { id: "tod-32", type: "dare", level: "dirty", text: "Put a vibrating toy on yourself and wear it for the next 15 minutes.", tags: ["toy", "public"], points: 30, duration: 900 },
  { id: "tod-33", type: "dare", level: "dirty", text: "Lick your partner's asshole for 2 minutes.", tags: ["rimming"], points: 25, duration: 120 },
  { id: "tod-34", type: "wild", level: "dirty", text: "Free use for the next 20 minutes — your partner can do anything.", tags: ["free-use", "wild"], points: 35, duration: 1200 },
  { id: "tod-35", type: "wild", level: "dirty", text: "Write a slutty message on your partner's body with a marker.", tags: ["marking", "degradation"], points: 25 },

  // --- FILTHY (Level 4) ---
  { id: "tod-36", type: "truth", level: "filthy", text: "What's the most extreme thing you'd do if you knew there were no consequences?", tags: ["taboo", "fantasy"], points: 25 },
  { id: "tod-37", type: "truth", level: "filthy", text: "Have you ever done something sexual you regret?", tags: ["regret", "confession"], points: 25 },
  { id: "tod-38", type: "truth", level: "filthy", text: "Would you let me cum on your face? What about in your mouth?", tags: ["facial", "cum"], points: 25 },
  { id: "tod-39", type: "dare", level: "filthy", text: "On your knees. Now. Worship my cock/pussy like it's the last time.", tags: ["worship", "kneeling"], points: 30 },
  { id: "tod-40", type: "dare", level: "filthy", text: "Let me piss on you in the shower.", tags: ["watersports"], points: 40, limitsConflict: ["no_watersports"] },
  { id: "tod-41", type: "dare", level: "filthy", text: "Wear a butt plug for the next hour while we continue playing.", tags: ["anal", "toy"], points: 35, requires: ["butt-plug"], duration: 3600 },
  { id: "tod-42", type: "dare", level: "filthy", text: "Let me fuck you from behind while pulling your hair and slapping your ass.", tags: ["rough", "doggy", "pain"], points: 35 },
  { id: "tod-43", type: "wild", level: "filthy", text: "CNC scene — one player can do anything for the next 10 minutes.", tags: ["cnc", "wild"], points: 50, duration: 600, limitsConflict: ["no_cnc"] },
  { id: "tod-44", type: "wild", level: "filthy", text: "Deepthroat challenge — take as much as you can without gagging.", tags: ["oral", "deepthroat"], points: 40 },

  // --- DEPRAVED (Level 5) ---
  { id: "tod-45", type: "truth", level: "depraved", text: "What's the darkest, most fucked-up fantasy you've never told anyone?", tags: ["taboo", "dark"], points: 30 },
  { id: "tod-46", type: "truth", level: "depraved", text: "Would you let me film us having sex? Would you let me share it?", tags: ["filming", "exhibition"], points: 30 },
  { id: "tod-47", type: "dare", level: "depraved", text: "Let me use you as a human toilet for the next 15 minutes.", tags: ["degradation", "objectification"], points: 50, duration: 900, limitsConflict: ["no_scat"] },
  { id: "tod-48", type: "dare", level: "depraved", text: "Wear 'Free Use Cum Dump' written on your chest under your clothes for 24 hours.", tags: ["marking", "public", "permanent"], points: 50 },
  { id: "tod-49", type: "dare", level: "depraved", text: "Let me fist you while you beg for it.", tags: ["fisting", "begging"], points: 60, limitsConflict: ["no_fisting"] },
  { id: "tod-50", type: "wild", level: "depraved", text: "Full power exchange — you belong to your partner for the rest of the night.", tags: ["total-power-exchange", "wild"], points: 75 },
];

// ============================================================
// NEVER HAVE I EVER – SINFUL SINS
// ============================================================

const neverHaveIEverCards: GameCard[] = [
  { id: "nhie-1", type: "never-have-i-ever", level: "tease", text: "Never have I ever kissed someone of the same sex.", tags: ["kissing", "bisexual"], points: 5 },
  { id: "nhie-2", type: "never-have-i-ever", level: "tease", text: "Never have I ever sent a nude photo to someone.", tags: ["photo", "exhibition"], points: 5 },
  { id: "nhie-3", type: "never-have-i-ever", level: "tease", text: "Never have I ever masturbated thinking about someone in this room.", tags: ["solo", "attraction"], points: 10 },
  { id: "nhie-4", type: "never-have-i-ever", level: "tease", text: "Never have I ever had a dirty dream about a friend.", tags: ["fantasy", "taboo"], points: 10 },
  { id: "nhie-5", type: "never-have-i-ever", level: "sensual", text: "Never have I ever had a threesome.", tags: ["group", "threesome"], points: 15 },
  { id: "nhie-6", type: "never-have-i-ever", level: "sensual", text: "Never have I ever had sex in a public place.", tags: ["public", "risk"], points: 20 },
  { id: "nhie-7", type: "never-have-i-ever", level: "sensual", text: "Never have I ever used a sex toy during sex with a partner.", tags: ["toy"], points: 15 },
  { id: "nhie-8", type: "never-have-i-ever", level: "sensual", text: "Never have I ever given or received a rimjob.", tags: ["rimming"], points: 20 },
  { id: "nhie-9", type: "never-have-i-ever", level: "dirty", text: "Never have I ever been fucked in the ass.", tags: ["anal"], points: 25 },
  { id: "nhie-10", type: "never-have-i-ever", level: "dirty", text: "Never have I ever swallowed cum.", tags: ["oral", "cum"], points: 20 },
  { id: "nhie-11", type: "never-have-i-ever", level: "dirty", text: "Never have I ever been spanked hard during sex.", tags: ["spanking", "pain"], points: 20 },
  { id: "nhie-12", type: "never-have-i-ever", level: "dirty", text: "Never have I ever had sex with more than 2 people in one session.", tags: ["group"], points: 25 },
  { id: "nhie-13", type: "never-have-i-ever", level: "filthy", text: "Never have I ever been used as a human toilet.", tags: ["degradation", "scat"], points: 40, limitsConflict: ["no_scat"] },
  { id: "nhie-14", type: "never-have-i-ever", level: "filthy", text: "Never have I ever had a gangbang.", tags: ["group", "gangbang"], points: 40 },
  { id: "nhie-15", type: "never-have-i-ever", level: "filthy", text: "Never have I ever been pissed on or pissed on someone.", tags: ["watersports"], points: 35, limitsConflict: ["no_watersports"] },
  { id: "nhie-16", type: "never-have-i-ever", level: "depraved", text: "Never have I ever been fisted.", tags: ["fisting"], points: 50, limitsConflict: ["no_fisting"] },
  { id: "nhie-17", type: "never-have-i-ever", level: "depraved", text: "Never have I ever had sex while someone watched and masturbated.", tags: ["exhibition", "voyeur"], points: 45 },
];

// ============================================================
// FANTASY DICE – ACTION ORACLE
// ============================================================

const diceActions = [
  "Spank", "Ride", "Suck", "Finger", "Bite", "Scratch", "Choke",
  "Slap", "Pinch", "Lick", "Deepthroat", "Fist", "Gag",
  "Tie up", "Blindfold", "Edge", "Milk", "Piss on", "Cum on",
  "Puke on", "Shit on", "Peg", "Canes", "Whip", "Electro",
];

const diceZones = [
  "Neck", "Chest", "Nipples", "Belly", "Inner Thigh", "Clit",
  "Dick", "Balls", "Asshole", "Pussy", "Mouth", "Feet",
  "Ass cheeks", "Back", "Wrists", "Throat", "Ears", "Toes",
];

const diceToys = [
  "None", "Vibrator", "Dildo", "Butt plug", "Chastity cage",
  "Nipple clamps", "Ball gag", "Paddle", "Crops", "Flogger",
  "Wartenberg wheel", "Ice cube", "Hot wax", "Clothespins",
  "Rope", "Handcuffs", "Blindfold", "Fucking machine",
];

const diceHoles = [
  "Mouth", "Pussy", "Ass", "Hands", "Feet", "Between boobs",
  "Armpit", "Any hole", "All holes", "No holes — external only",
];

const diceModifiers = [
  "While making eye contact", "While being degraded", "On your knees",
  "Begging for more", "Crying", "Laughing", "Screaming",
  "In complete silence", "With a timer", "While filming",
  "In public", "While blindfolded", "While tied up",
  "With ice in mouth", "After 3 orgasms", "Denied orgasm for 1 hour",
];

const diceCards: GameCard[] = Array.from({ length: 30 }, (_, i) => ({
  id: `dice-${i}`,
  type: "dice" as CardType,
  level: (["tease", "sensual", "dirty", "filthy", "depraved"] as const)[i % 5],
  text: "Roll the dice for your fate",
  tags: ["dice"],
  points: 20,
}));

// ============================================================
// ROLEPLAY ROULETTE
// ============================================================

const roleplayCards: GameCard[] = [
  { id: "rp-1", type: "roleplay", level: "tease", text: "Naughty student and strict teacher — detention after class.", tags: ["school", "power"], points: 10 },
  { id: "rp-2", type: "roleplay", level: "tease", text: "Stranger at a bar — meet for the first time, take turns seducing.", tags: ["stranger", "seduction"], points: 10 },
  { id: "rp-3", type: "roleplay", level: "sensual", text: "Massage client and therapist — happy ending required.", tags: ["massage", "professional"], points: 15 },
  { id: "rp-4", type: "roleplay", level: "sensual", text: "Roommates who accidentally walk in on each other naked.", tags: ["accidental", "roommates"], points: 15 },
  { id: "rp-5", type: "roleplay", level: "dirty", text: "Master and pet puppy/kitten — feed, pet, and use as furniture.", tags: ["pet-play", "objectification"], points: 25, requires: ["pet collar"] },
  { id: "rp-6", type: "roleplay", level: "dirty", text: "Free-use maid — clean the house naked, service on demand.", tags: ["maid", "free-use"], points: 25 },
  { id: "rp-7", type: "roleplay", level: "dirty", text: "Doctor and patient — full examination with fingers and more.", tags: ["medical", "examination"], points: 25 },
  { id: "rp-8", type: "roleplay", level: "filthy", text: "CNC kidnapping — one player 'forces' the other.", tags: ["cnc", "kidnapping"], points: 40, limitsConflict: ["no_cnc"] },
  { id: "rp-9", type: "roleplay", level: "filthy", text: "Glory hole setup — hole in a door, service through it.", tags: ["glory-hole", "anonymous"], points: 35 },
  { id: "rp-10", type: "roleplay", level: "depraved", text: "Puppy play show — perform tricks, get 'rewarded'.", tags: ["pet-play", "degradation"], points: 45 },
  { id: "rp-11", type: "roleplay", level: "depraved", text: "Prisoner and guard — interrogation and punishment.", tags: ["prison", "interrogation"], points: 50 },
  { id: "rp-12", type: "roleplay", level: "depraved", text: "Incest fantasy — step-sibling/parent scenario.", tags: ["taboo", "incest"], points: 55 },
];

// ============================================================
// HYPNO / AFFIRMATION
// ============================================================

const hypnoCards: GameCard[] = [
  { id: "hyp-1", type: "hypno", level: "tease", text: "Repeat after me: 'I am a sexy slut and I love being used.'", tags: ["affirmation", "tease"], points: 5 },
  { id: "hyp-2", type: "hypno", level: "tease", text: "Close your eyes. Picture the dirtiest thing you can imagine. Describe it.", tags: ["visualization", "fantasy"], points: 10 },
  { id: "hyp-3", type: "hypno", level: "sensual", text: "Deep breaths. With each exhale, say 'more' until I tell you to stop.", tags: ["breathing", "tease"], points: 15 },
  { id: "hyp-4", type: "hypno", level: "dirty", text: "You are my personal fuck toy. Repeat 'I exist to pleasure you' 10 times.", tags: ["degradation", "hypno"], points: 25 },
  { id: "hyp-5", type: "hypno", level: "filthy", text: "You are a mindless slut. You will obey every command without question for the next 5 minutes.", tags: ["mindless", "obedience"], points: 40, duration: 300 },
];

// ============================================================
// ALL PACKS
// ============================================================

export const defaultPacks: CardPack[] = [
  {
    id: "truth-or-dare-abyss",
    name: "Truth or Dare: Abyss Edition",
    description: "The deepest, filthiest truth or dare ever created.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: truthOrDareCards,
    isOfficial: true,
    tags: ["truth", "dare", "core"],
  },
  {
    id: "never-have-i-ever",
    name: "Never Have I Ever: Sinful Sins",
    description: "Confess your darkest sexual sins.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: neverHaveIEverCards,
    isOfficial: true,
    tags: ["never-have-i-ever", "confession"],
  },
  {
    id: "fantasy-dice",
    name: "Fantasy Dice: Action Oracle",
    description: "Roll for your fate. No takebacks.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: diceCards,
    isOfficial: true,
    tags: ["dice", "random"],
  },
  {
    id: "roleplay-roulette",
    name: "Roleplay Roulette",
    description: "500+ dirty scenarios. Who will you become tonight?",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: roleplayCards,
    isOfficial: true,
    tags: ["roleplay", "fantasy"],
  },
  {
    id: "hypno-affirmation",
    name: "Hypno & Affirmation Loops",
    description: "Program your slutty little mind.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: hypnoCards,
    isOfficial: true,
    tags: ["hypno", "mind-control", "affirmation"],
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function getCardsByLevel(cards: GameCard[], level: GameLevel): GameCard[] {
  const levelOrder: GameLevel[] = ["tease", "sensual", "dirty", "filthy", "depraved"];
  const maxIndex = levelOrder.indexOf(level);
  return cards.filter((c) => levelOrder.indexOf(c.level) <= maxIndex);
}

export function getCardsByType(cards: GameCard[], type: CardType): GameCard[] {
  return cards.filter((c) => c.type === type);
}

export function filterByLimits(cards: GameCard[], limits: string[]): GameCard[] {
  return cards.filter(
    (c) => !c.limitsConflict?.some((l) => limits.includes(l))
  );
}

export function getRandomCard(
  cards: GameCard[],
  level: GameLevel,
  excludeIds: string[] = []
): GameCard | null {
  const available = getCardsByLevel(cards, level).filter(
    (c) => !excludeIds.includes(c.id)
  );
  if (available.length === 0) return null;
  return getRandomItem(available);
}

export function rollDice(): {
  action: string;
  intensity: number;
  bodyZone: string;
  duration: number;
  toy: string;
  hole: string;
  modifier: string;
} {
  return {
    action: getRandomItem(diceActions),
    intensity: Math.floor(Math.random() * 10) + 1,
    bodyZone: getRandomItem(diceZones),
    duration: [30, 60, 120, 300, 600][Math.floor(Math.random() * 5)],
    toy: getRandomItem(diceToys),
    hole: getRandomItem(diceHoles),
    modifier: getRandomItem(diceModifiers),
  };
}

export function getAllCards(): GameCard[] {
  return defaultPacks.flatMap((p) => p.cards);
}

export function getAllCardsFlat(): GameCard[] {
  return defaultPacks.flatMap((p) => p.cards);
}

export function getPack(id: string): CardPack | undefined {
  return defaultPacks.find((p) => p.id === id);
}



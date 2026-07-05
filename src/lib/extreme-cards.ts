import type { GameCard, CardPack } from "@/types";
import { getRandomItem } from "@/lib/utils";

// ============================================================
// EXTREME CARDS — Only for dark/filthy vibe
// ============================================================

const extremeTruths: GameCard[] = [
  { id: "ext-t-1", type: "truth", level: "dirty", text: "What's the most degrading thing you've whispered during sex?", tags: ["extreme", "nsfw"], points: 20 },
  { id: "ext-t-2", type: "truth", level: "dirty", text: "Have you ever enjoyed being called a dirty name during sex? Which one?", tags: ["extreme", "nsfw"], points: 20 },
  { id: "ext-t-3", type: "truth", level: "filthy", text: "What's the most fucked up thing you've watched in porn?", tags: ["extreme", "nsfw"], points: 25 },
  { id: "ext-t-4", type: "truth", level: "filthy", text: "Have you ever faked being into something to please a partner? What was it?", tags: ["extreme", "nsfw"], points: 25 },
  { id: "ext-t-5", type: "truth", level: "filthy", text: "What's the taboo fantasy you'd never admit to anyone in real life?", tags: ["extreme", "nsfw"], points: 30 },
  { id: "ext-t-6", type: "truth", level: "depraved", text: "Describe the most submissive thing you've done or would do for someone you're attracted to.", tags: ["extreme", "nsfw"], points: 30 },
  { id: "ext-t-7", type: "truth", level: "depraved", text: "Have you ever gotten off to something you're deeply ashamed of? What?", tags: ["extreme", "nsfw"], points: 35 },
  { id: "ext-t-8", type: "truth", level: "depraved", text: "If your partner could do the most degrading thing to you with zero consequences, what would you want?", tags: ["extreme", "nsfw"], points: 35 },
];

const extremeDares: GameCard[] = [
  { id: "ext-d-1", type: "dare", level: "dirty", text: "Send a voice note to someone in this room moaning their name.", tags: ["extreme", "nsfw"], points: 25 },
  { id: "ext-d-2", type: "dare", level: "dirty", text: "Let someone in this room read your last 10 DMs.", tags: ["extreme", "nsfw"], points: 25 },
  { id: "ext-d-3", type: "dare", level: "filthy", text: "Get on your knees and beg the person across from you for attention.", tags: ["extreme", "nsfw"], points: 30 },
  { id: "ext-d-4", type: "dare", level: "filthy", text: "Let the person to your left post any caption they want on your most recent selfie.", tags: ["extreme", "nsfw"], points: 30 },
  { id: "ext-d-5", type: "dare", level: "filthy", text: "Make eye contact with someone for 60 seconds without looking away or laughing.", tags: ["extreme", "nsfw"], points: 30, duration: 60 },
  { id: "ext-d-6", type: "dare", level: "depraved", text: "Write 'I belong to [someone in the room]' on your hand and keep it visible for the rest of the night.", tags: ["extreme", "nsfw"], points: 40 },
  { id: "ext-d-7", type: "dare", level: "depraved", text: "Let the group decide the most embarrassing photo of you that gets posted to your story for 1 hour.", tags: ["extreme", "nsfw"], points: 40 },
  { id: "ext-d-8", type: "dare", level: "depraved", text: "Do whatever the person to your right says for the next 5 minutes — no questions.", tags: ["extreme", "nsfw"], points: 50, duration: 300 },
];

const extremeWild: GameCard[] = [
  { id: "ext-w-1", type: "wild", level: "filthy", text: "FULL EXPOSURE: Everyone shows their most embarrassing photo on their phone.", tags: ["extreme", "nsfw"], points: 30 },
  { id: "ext-w-2", type: "wild", level: "filthy", text: "POWER MOVE: The person with the lowest score has to do a 30-second strip tease.", tags: ["extreme", "nsfw"], points: 35 },
  { id: "ext-w-3", type: "wild", level: "depraved", text: "CHAOS: Everyone swaps phones and texts the last person in each other's DMs.", tags: ["extreme", "nsfw"], points: 45 },
  { id: "ext-w-4", type: "wild", level: "depraved", text: "DUNGEON MASTER: The highest scorer becomes dominant — they can order anyone to do anything for 2 minutes.", tags: ["extreme", "nsfw"], points: 50, duration: 120 },
  { id: "ext-w-5", type: "wild", level: "depraved", text: "FREEDOM: One person gets to write something on another person's body with a marker. They wear it for the rest of the night.", tags: ["extreme", "nsfw"], points: 50 },
  { id: "ext-w-6", type: "wild", level: "depraved", text: "FINAL FORM: Last round. Everyone must do their absolute worst dare. No skipping.", tags: ["extreme", "nsfw"], points: 75 },
];

const extremeRoleplay: GameCard[] = [
  { id: "ext-rp-1", type: "roleplay", level: "filthy", text: "Prisoner and guard — you've been caught. The guard gets to decide your punishment.", tags: ["extreme", "nsfw"], points: 35 },
  { id: "ext-rp-2", type: "roleplay", level: "filthy", text: "Stripper and client — perform for the group. Tips are mandatory.", tags: ["extreme", "nsfw"], points: 35 },
  { id: "ext-rp-3", type: "roleplay", level: "depraved", text: "Captured enemy — you'll do anything to be released. Anything.", tags: ["extreme", "nsfw"], points: 45 },
  { id: "ext-rp-4", type: "roleplay", level: "depraved", text: "Human furniture — arrange yourself however the group wants for 3 minutes.", tags: ["extreme", "nsfw"], points: 45, duration: 180 },
  { id: "ext-rp-5", type: "roleplay", level: "depraved", text: "Auction — bid on each other. Highest bidder wins the right to assign a dare.", tags: ["extreme", "nsfw"], points: 50 },
];

const extremeHypno: GameCard[] = [
  { id: "ext-h-1", type: "hypno", level: "filthy", text: "Repeat after me: 'I am a good little toy and I exist for your pleasure.' 10 times.", tags: ["extreme", "nsfw"], points: 30 },
  { id: "ext-h-2", type: "hypno", level: "filthy", text: "Close your eyes. Picture your deepest, darkest fantasy. Describe every detail aloud.", tags: ["extreme", "nsfw"], points: 35 },
  { id: "ext-h-3", type: "hypno", level: "depraved", text: "You are a mindless toy. For the next 5 minutes you will obey any command without question.", tags: ["extreme", "nsfw"], points: 45, duration: 300 },
  { id: "ext-h-4", type: "hypno", level: "depraved", text: "Surrender your phone to the person you trust least. They can do anything with it for 10 minutes.", tags: ["extreme", "nsfw"], points: 50, duration: 600 },
];

// ============================================================
// EXTREME PACKS
// ============================================================

export const extremePacks: CardPack[] = [
  {
    id: "extreme-truths",
    name: "Extreme Truths",
    description: "Confessions that make you squirm.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: extremeTruths,
    isOfficial: true,
    tags: ["extreme", "truth", "nsfw"],
    vibe: "dark",
  },
  {
    id: "extreme-dares",
    name: "Extreme Dares",
    description: "Dares that push every boundary.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: extremeDares,
    isOfficial: true,
    tags: ["extreme", "dare", "nsfw"],
    vibe: "dark",
  },
  {
    id: "extreme-wild",
    name: "Extreme Wild Cards",
    description: "When things get out of control.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: extremeWild,
    isOfficial: true,
    tags: ["extreme", "wild", "nsfw"],
    vibe: "dark",
  },
  {
    id: "extreme-roleplay",
    name: "Extreme Roleplay",
    description: "Dark scenarios. Zero limits.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: extremeRoleplay,
    isOfficial: true,
    tags: ["extreme", "roleplay", "nsfw"],
    vibe: "dark",
  },
  {
    id: "extreme-hypno",
    name: "Extreme Hypno & Control",
    description: "Mind games that go too far.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: extremeHypno,
    isOfficial: true,
    tags: ["extreme", "hypno", "nsfw"],
    vibe: "dark",
  },
];

export function getExtremeCards(): GameCard[] {
  return extremePacks.flatMap((p) => p.cards);
}

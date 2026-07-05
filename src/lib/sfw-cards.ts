import type { GameCard, CardPack } from "@/types";
import { getRandomItem } from "@/lib/utils";

// ============================================================
// SFW PARTY CARDS — Safe for any friend group, no NSFW content
// ============================================================

const sfwNeverHaveIEver: GameCard[] = [
  { id: "sfw-nhie-1", type: "never-have-i-ever", level: "tease", text: "Never have I ever stalked someone's social media for more than an hour.", tags: ["sfw", "funny"], points: 5 },
  { id: "sfw-nhie-2", type: "never-have-i-ever", level: "tease", text: "Never have I ever sent a drunk text to my ex.", tags: ["sfw", "relatable"], points: 5 },
  { id: "sfw-nhie-3", type: "never-have-i-ever", level: "tease", text: "Never have I ever pretended to be busy to avoid plans.", tags: ["sfw", "relatable"], points: 5 },
  { id: "sfw-nhie-4", type: "never-have-i-ever", level: "tease", text: "Never have I ever cried during a movie in front of other people.", tags: ["sfw", "emotional"], points: 5 },
  { id: "sfw-nhie-5", type: "never-have-i-ever", level: "tease", text: "Never have I ever Googled myself.", tags: ["sfw", "funny"], points: 5 },
  { id: "sfw-nhie-6", type: "never-have-i-ever", level: "tease", text: "Never have I ever eaten food straight from the container at 3am.", tags: ["sfw", "relatable"], points: 5 },
  { id: "sfw-nhie-7", type: "never-have-i-ever", level: "tease", text: "Never have I ever lied about my age to get into somewhere.", tags: ["sfw", "rebellious"], points: 5 },
  { id: "sfw-nhie-8", type: "never-have-i-ever", level: "sensual", text: "Never have I ever had a crush on a teacher or boss.", tags: ["sfw", "spicy"], points: 10 },
  { id: "sfw-nhie-9", type: "never-have-i-ever", level: "sensual", text: "Never have I ever kissed someone I shouldn't have.", tags: ["sfw", "spicy"], points: 10 },
  { id: "sfw-nhie-10", type: "never-have-i-ever", level: "sensual", text: "Never have I ever had a one-night stand.", tags: ["sfw", "spicy"], points: 10 },
  { id: "sfw-nhie-11", type: "never-have-i-ever", level: "sensual", text: "Never have I ever ghosted someone.", tags: ["sfw", "relatable"], points: 10 },
  { id: "sfw-nhie-12", type: "never-have-i-ever", level: "sensual", text: "Never have I ever been caught checking someone out.", tags: ["sfw", "funny"], points: 10 },
  { id: "sfw-nhie-13", type: "never-have-i-ever", level: "dirty", text: "Never have I ever done something I regret while drunk.", tags: ["sfw", "wild"], points: 15 },
  { id: "sfw-nhie-14", type: "never-have-i-ever", level: "dirty", text: "Never have I ever gotten in trouble with the law.", tags: ["sfw", "rebellious"], points: 15 },
  { id: "sfw-nhie-15", type: "never-have-i-ever", level: "dirty", text: "Never have I ever slept with a friend's ex.", tags: ["sfw", "drama"], points: 15 },
];

const sfwWouldYouRather: GameCard[] = [
  { id: "sfw-wyr-1", type: "would-you-rather", level: "tease", text: "Would you rather...", optionA: "Always have bad hair", optionB: "Always have bad breath", tags: ["sfw", "funny"], points: 5 },
  { id: "sfw-wyr-2", type: "would-you-rather", level: "tease", text: "Would you rather...", optionA: "Have everything you think appear as a speech bubble", optionB: "Have your phone screen mirrored to a public TV", tags: ["sfw", "embarrassing"], points: 5 },
  { id: "sfw-wyr-3", type: "would-you-rather", level: "tease", text: "Would you rather...", optionA: "Only communicate through song lyrics", optionB: "Only communicate through animal noises", tags: ["sfw", "silly"], points: 5 },
  { id: "sfw-wyr-4", type: "would-you-rather", level: "sensual", text: "Would you rather...", optionA: "Have your mom as your wedding planner", optionB: "Have your dad officiate your wedding", tags: ["sfw", "cringe"], points: 10 },
  { id: "sfw-wyr-5", type: "would-you-rather", level: "sensual", text: "Would you rather...", optionA: "Replay your most embarrassing moment on loop", optionB: "Let everyone read your search history", tags: ["sfw", "embarrassing"], points: 10 },
  { id: "sfw-wyr-6", type: "would-you-rather", level: "sensual", text: "Would you rather...", optionA: "Never be able to use sarcasm again", optionB: "Never be able to lie again", tags: ["sfw", "deep"], points: 10 },
  { id: "sfw-wyr-7", type: "would-you-rather", level: "dirty", text: "Would you rather...", optionA: "Have a pause button for life", optionB: "Have a rewind button for life", tags: ["sfw", "deep"], points: 15 },
  { id: "sfw-wyr-8", type: "would-you-rather", level: "dirty", text: "Would you rather...", optionA: "Be famous but hated", optionB: "Be anonymous but loved by everyone who knows you", tags: ["sfw", "philosophical"], points: 15 },
];

const sfwMostLikely: GameCard[] = [
  { id: "sfw-mlt-1", type: "most-likely-to", level: "tease", text: "Who's most likely to...", optionA: "Become a meme", optionB: "Become a reality TV star", tags: ["sfw", "funny"], points: 5 },
  { id: "sfw-mlt-2", type: "most-likely-to", level: "tease", text: "Who's most likely to...", optionA: "Survive a zombie apocalypse", optionB: "Die first in a horror movie", tags: ["sfw", "funny"], points: 5 },
  { id: "sfw-mlt-3", type: "most-likely-to", level: "tease", text: "Who's most likely to...", optionA: "Accidentally text their boss something inappropriate", optionB: "Get caught lying about being sick", tags: ["sfw", "relatable"], points: 5 },
  { id: "sfw-mlt-4", type: "most-likely-to", level: "sensual", text: "Who's most likely to...", optionA: "Cry during a commercial", optionB: "Laugh at a funeral", tags: ["sfw", "emotional"], points: 10 },
  { id: "sfw-mlt-5", type: "most-likely-to", level: "sensual", text: "Who's most likely to...", optionA: "Hook up with a stranger on vacation", optionB: "Marry their college sweetheart", tags: ["sfw", "spicy"], points: 10 },
  { id: "sfw-mlt-6", type: "most-likely-to", level: "sensual", text: "Who's most likely to...", optionA: "Go viral for something dumb", optionB: "Go viral for something genius", tags: ["sfw", "funny"], points: 10 },
  { id: "sfw-mlt-7", type: "most-likely-to", level: "dirty", text: "Who's most likely to...", optionA: "Still be friends with their ex", optionB: "Block their ex everywhere", tags: ["sfw", "drama"], points: 15 },
  { id: "sfw-mlt-8", type: "most-likely-to", level: "dirty", text: "Who's most likely to...", optionA: "Have the messiest room", optionB: "Have the cleanest room", tags: ["sfw", "relatable"], points: 15 },
];

const sfwTruthOrDare: GameCard[] = [
  { id: "sfw-tod-1", type: "truth", level: "tease", text: "What's the most embarrassing thing on your phone right now?", tags: ["sfw", "truth"], points: 5 },
  { id: "sfw-tod-2", type: "truth", level: "tease", text: "What's the worst lie you've ever told to get out of plans?", tags: ["sfw", "truth"], points: 5 },
  { id: "sfw-tod-3", type: "truth", level: "tease", text: "What's your most embarrassing autocorrect fail?", tags: ["sfw", "truth"], points: 5 },
  { id: "sfw-tod-4", type: "truth", level: "tease", text: "What's the weird thing you do when nobody's watching?", tags: ["sfw", "truth"], points: 5 },
  { id: "sfw-tod-5", type: "truth", level: "sensual", text: "What's the most attractive thing about the person on your left?", tags: ["sfw", "compliment"], points: 10 },
  { id: "sfw-tod-6", type: "truth", level: "sensual", text: "Who in this room would you want on your team in a zombie apocalypse?", tags: ["sfw", "flirty"], points: 10 },
  { id: "sfw-tod-7", type: "dare", level: "tease", text: "Send a selfie to the last person you texted with the caption 'I miss you'.", tags: ["sfw", "dare"], points: 10 },
  { id: "sfw-tod-8", type: "dare", level: "tease", text: "Do your best impression of someone in this room.", tags: ["sfw", "dare"], points: 10 },
  { id: "sfw-tod-9", type: "dare", level: "tease", text: "Post a story on social media saying 'I love this group'.", tags: ["sfw", "dare"], points: 10 },
  { id: "sfw-tod-10", type: "dare", level: "sensual", text: "Let the person to your right post anything they want on your social media (draft only).", tags: ["sfw", "dare"], points: 15 },
  { id: "sfw-tod-11", type: "dare", level: "sensual", text: "Make a sexy pose and hold it for 15 seconds while everyone takes photos.", tags: ["sfw", "dare"], points: 15 },
  { id: "sfw-tod-12", type: "dare", level: "sensual", text: "Talk in a British accent for the next 3 rounds.", tags: ["sfw", "dare"], points: 10 },
  { id: "sfw-tod-13", type: "dare", level: "dirty", text: "Let the group pick your dating app profile picture for 24 hours.", tags: ["sfw", "dare"], points: 15 },
  { id: "sfw-tod-14", type: "dare", level: "dirty", text: "Do 20 pushups right now or take 3 sips.", tags: ["sfw", "physical"], points: 15 },
  { id: "sfw-tod-15", type: "wild", level: "dirty", text: "Everyone swaps phones and reads the last 5 text conversations aloud.", tags: ["sfw", "wild"], points: 20 },
];

const sfwChallenge: GameCard[] = [
  { id: "sfw-ch-1", type: "challenge", level: "tease", text: "Make up a rap about the person to your right. You have 30 seconds.", tags: ["sfw", "creative"], points: 10 },
  { id: "sfw-ch-2", type: "challenge", level: "tease", text: "Do a dramatic reading of the last text you received.", tags: ["sfw", "funny"], points: 10 },
  { id: "sfw-ch-3", type: "challenge", level: "tease", text: "Sing the chorus of the last song you listened to, no matter what it is.", tags: ["sfw", "singing"], points: 10 },
  { id: "sfw-ch-4", type: "challenge", level: "sensual", text: "Do your best model walk across the room. Group rates 1-10.", tags: ["sfw", "physical"], points: 15 },
  { id: "sfw-ch-5", type: "challenge", level: "sensual", text: "Recreate a famous movie scene using only items in this room.", tags: ["sfw", "creative"], points: 15 },
  { id: "sfw-ch-6", type: "challenge", level: "sensual", text: "Tell a lie so convincing that the group has to guess if it's true.", tags: ["sfw", "deception"], points: 15 },
  { id: "sfw-ch-7", type: "challenge", level: "dirty", text: "Let the group go through your camera roll for 15 seconds.", tags: ["sfw", "embarrassing"], points: 20 },
  { id: "sfw-ch-8", type: "challenge", level: "dirty", text: "Post a throwback photo that's embarrassing. Keep it up for 1 hour.", tags: ["sfw", "social"], points: 20 },
];

const sfwCharades: GameCard[] = [
  { id: "sfw-char-1", type: "charades", level: "tease", text: "Act out: Your morning routine when you're running late", tags: ["sfw", "charades"], points: 10, duration: 60 },
  { id: "sfw-char-2", type: "charades", level: "tease", text: "Act out: Trying to sneak food at a movie theater", tags: ["sfw", "charades"], points: 10, duration: 60 },
  { id: "sfw-char-3", type: "charades", level: "tease", text: "Act out: Pretending to laugh at your boss's joke", tags: ["sfw", "charades"], points: 10, duration: 60 },
  { id: "sfw-char-4", type: "charades", level: "sensual", text: "Act out: Your worst date ever", tags: ["sfw", "charades"], points: 15, duration: 60 },
  { id: "sfw-char-5", type: "charades", level: "sensual", text: "Act out: Trying to take a sneaky selfie with a celebrity", tags: ["sfw", "charades"], points: 15, duration: 60 },
  { id: "sfw-char-6", type: "charades", level: "dirty", text: "Act out: Your reaction when your crush texts back immediately", tags: ["sfw", "charades"], points: 20, duration: 60 },
];

const sfwStory: GameCard[] = [
  { id: "sfw-sb-1", type: "story", level: "tease", text: "Start a story: 'The worst date I ever went on started when...'. Everyone adds one sentence.", tags: ["sfw", "story"], points: 10 },
  { id: "sfw-sb-2", type: "story", level: "sensual", text: "Start a story: 'If I woke up as a celebrity tomorrow, the first thing I'd do is...'. Continue the story.", tags: ["sfw", "story"], points: 15 },
  { id: "sfw-sb-3", type: "story", level: "dirty", text: "Start a story: 'The most chaotic thing that ever happened at a party was...'. Build on it.", tags: ["sfw", "story"], points: 20 },
];

const sfwRate: GameCard[] = [
  { id: "sfw-rate-1", type: "rate", level: "tease", text: "Everyone rates how good your selfie game is (1-10).", tags: ["sfw", "rating"], points: 5 },
  { id: "sfw-rate-2", type: "rate", level: "tease", text: "Everyone rates how likely you are to survive a horror movie (1-10).", tags: ["sfw", "rating"], points: 5 },
  { id: "sfw-rate-3", type: "rate", level: "sensual", text: "Everyone rates your outfit tonight (1-10). Lowest score drinks.", tags: ["sfw", "rating"], points: 10 },
  { id: "sfw-rate-4", type: "rate", level: "sensual", text: "Everyone rates how good of a kisser they think you are (1-10).", tags: ["sfw", "flirty"], points: 10 },
];

const sfwHotTake: GameCard[] = [
  { id: "sfw-ht-1", type: "challenge", level: "tease", text: "Hot take: 'Pineapple belongs on pizza.' Defend this for 30 seconds.", tags: ["sfw", "debate"], points: 5 },
  { id: "sfw-ht-2", type: "challenge", level: "tease", text: "Hot take: 'Cats are better than dogs.' Convince us.", tags: ["sfw", "debate"], points: 5 },
  { id: "sfw-ht-3", type: "challenge", level: "sensual", text: "Hot take: 'Social media has ruined dating.' Prove it.", tags: ["sfw", "debate"], points: 10 },
  { id: "sfw-ht-4", type: "challenge", level: "sensual", text: "Hot take: 'Long-distance relationships never work.' Defend this.", tags: ["sfw", "debate"], points: 10 },
  { id: "sfw-ht-5", type: "challenge", level: "dirty", text: "Hot take: 'Cheating can be forgiven.' Change our minds.", tags: ["sfw", "debate"], points: 15 },
];

const sfwEmoji: GameCard[] = [
  { id: "sfw-eg-1", type: "challenge", level: "tease", text: "🍕🏖️😴 = ? (What happened?)", tags: ["sfw", "emoji"], points: 5 },
  { id: "sfw-eg-2", type: "challenge", level: "tease", text: "🐶📱💔 = ? (What's the story?)", tags: ["sfw", "emoji"], points: 5 },
  { id: "sfw-eg-3", type: "challenge", level: "sensual", text: "Create an emoji combo that describes your last week. Others guess.", tags: ["sfw", "emoji"], points: 10 },
  { id: "sfw-eg-4", type: "challenge", level: "sensual", text: "Describe your dream vacation using only 5 emojis.", tags: ["sfw", "emoji"], points: 10 },
];

// ============================================================
// SFW PARTY PACKS
// ============================================================

export const sfwPacks: CardPack[] = [
  {
    id: "sfw-nhie",
    name: "Never Have I Ever: Fun Edition",
    description: "Confess your embarrassing moments. No NSFW.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: sfwNeverHaveIEver,
    isOfficial: true,
    tags: ["sfw", "party", "never-have-i-ever"],
    vibe: "party",
  },
  {
    id: "sfw-wyr",
    name: "Would You Rather: Fun Edition",
    description: "Impossible choices that are safe for everyone.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: sfwWouldYouRather,
    isOfficial: true,
    tags: ["sfw", "party", "would-you-rather"],
    vibe: "party",
  },
  {
    id: "sfw-mlt",
    name: "Who's Most Likely To: Fun Edition",
    description: "Point fingers, no NSFW content.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: sfwMostLikely,
    isOfficial: true,
    tags: ["sfw", "party", "most-likely-to"],
    vibe: "party",
  },
  {
    id: "sfw-tod",
    name: "Truth or Dare: Fun Edition",
    description: "Spicy but safe truths and dares.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: sfwTruthOrDare,
    isOfficial: true,
    tags: ["sfw", "party", "truth-or-dare"],
    vibe: "party",
  },
  {
    id: "sfw-challenges",
    name: "Challenges & Tasks",
    description: "Physical, creative, and social challenges.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: sfwChallenge,
    isOfficial: true,
    tags: ["sfw", "party", "challenge"],
    vibe: "party",
  },
  {
    id: "sfw-charades",
    name: "Charades: Fun Edition",
    description: "Act out funny and relatable scenarios.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: sfwCharades,
    isOfficial: true,
    tags: ["sfw", "party", "charades"],
    vibe: "party",
  },
  {
    id: "sfw-story",
    name: "Story Builder: Fun Edition",
    description: "Build hilarious stories together.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: sfwStory,
    isOfficial: true,
    tags: ["sfw", "party", "story"],
    vibe: "party",
  },
  {
    id: "sfw-rate",
    name: "Rate Me: Fun Edition",
    description: "How do your friends see you?",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: sfwRate,
    isOfficial: true,
    tags: ["sfw", "party", "rate"],
    vibe: "party",
  },
  {
    id: "sfw-hot-take",
    name: "Hot Takes: Fun Edition",
    description: "Defend your opinions on important topics.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: sfwHotTake,
    isOfficial: true,
    tags: ["sfw", "party", "debate"],
    vibe: "party",
  },
  {
    id: "sfw-emoji",
    name: "Emoji Guess: Fun Edition",
    description: "Decode and create emoji stories.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: sfwEmoji,
    isOfficial: true,
    tags: ["sfw", "party", "emoji"],
    vibe: "party",
  },
];

export function getSFWCards(): GameCard[] {
  return sfwPacks.flatMap((p) => p.cards);
}

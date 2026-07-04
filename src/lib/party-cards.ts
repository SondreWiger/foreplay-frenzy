import type { GameCard, CardPack } from "@/types";
import { getRandomItem } from "@/lib/utils";

// ============================================================
// DRINKING GAMES PACK
// ============================================================

const drinkingCards: GameCard[] = [
  // --- NEVER HAVE I EVER (DRINKING) ---
  { id: "dr-nhie-1", type: "never-have-i-ever", level: "tease", text: "Never have I ever slept with someone I just met.", tags: ["drinking", "nsfw"], points: 5, drinking: true },
  { id: "dr-nhie-2", type: "never-have-i-ever", level: "tease", text: "Never have I ever stalked an ex on social media for more than an hour.", tags: ["drinking", "funny"], points: 5, drinking: true },
  { id: "dr-nhie-3", type: "never-have-i-ever", level: "tease", text: "Never have I ever faked an orgasm.", tags: ["drinking", "nsfw"], points: 5, drinking: true },
  { id: "dr-nhie-4", type: "never-have-i-ever", level: "tease", text: "Never have I ever sent a drunk text to an ex.", tags: ["drinking", "relatable"], points: 5, drinking: true },
  { id: "dr-nhie-5", type: "never-have-i-ever", level: "tease", text: "Never have I ever googled how to do something in bed.", tags: ["drinking", "nsfw"], points: 5, drinking: true },
  { id: "dr-nhie-6", type: "never-have-i-ever", level: "sensual", text: "Never have I ever kissed someone of the same sex.", tags: ["drinking", "curiosity"], points: 10, drinking: true },
  { id: "dr-nhie-7", type: "never-have-i-ever", level: "sensual", text: "Never have I ever had a threesome.", tags: ["drinking", "nsfw"], points: 15, drinking: true },
  { id: "dr-nhie-8", type: "never-have-i-ever", level: "sensual", text: "Never have I ever had sex in a public place.", tags: ["drinking", "risk"], points: 15, drinking: true },
  { id: "dr-nhie-9", type: "never-have-i-ever", level: "dirty", text: "Never have I ever been caught masturbating.", tags: ["drinking", "embarrassing"], points: 20, drinking: true },
  { id: "dr-nhie-10", type: "never-have-i-ever", level: "dirty", text: "Never have I ever had sex with more than 3 people in one week.", tags: ["drinking", "nsfw"], points: 20, drinking: true },
  { id: "dr-nhie-11", type: "never-have-i-ever", level: "filthy", text: "Never have I ever gotten a lap dance.", tags: ["drinking", "nsfw"], points: 25, drinking: true },
  { id: "dr-nhie-12", type: "never-have-i-ever", level: "filthy", text: "Never have I ever watched porn in a group setting.", tags: ["drinking", "nsfw"], points: 25, drinking: true },

  // --- WOULD YOU RATHER (DRINKING) ---
  { id: "dr-wyr-1", type: "would-you-rather", level: "tease", text: "Would you rather...", optionA: "Only give oral for the rest of your life", optionB: "Only receive oral for the rest of your life", tags: ["drinking", "nsfw"], points: 10, drinking: true },
  { id: "dr-wyr-2", type: "would-you-rather", level: "tease", text: "Would you rather...", optionA: "Never be able to orgasm again", optionB: "Only be able to orgasm in public", tags: ["drinking", "nsfw"], points: 10, drinking: true },
  { id: "dr-wyr-3", type: "would-you-rather", level: "sensual", text: "Would you rather...", optionA: "Always be the dominant one", optionB: "Always be the submissive one", tags: ["drinking", "bdsm"], points: 15, drinking: true },
  { id: "dr-wyr-4", type: "would-you-rather", level: "sensual", text: "Would you rather...", optionA: "Have a partner who talks dirty constantly", optionB: "Have a partner who is completely silent", tags: ["drinking", "nsfw"], points: 15, drinking: true },
  { id: "dr-wyr-5", type: "would-you-rather", level: "dirty", text: "Would you rather...", optionA: "Only have slow, romantic sex", optionB: "Only have rough, aggressive sex", tags: ["drinking", "nsfw"], points: 20, drinking: true },
  { id: "dr-wyr-6", type: "would-you-rather", level: "dirty", text: "Would you rather...", optionA: "Your partner moans your name during sex", optionB: "Your partner calls you dirty names", tags: ["drinking", "nsfw"], points: 20, drinking: true },
  { id: "dr-wyr-7", type: "would-you-rather", level: "filthy", text: "Would you rather...", optionA: "Have sex recorded but never shared", optionB: "Have anonymous strangers watch you have sex live", tags: ["drinking", "nsfw"], points: 25, drinking: true },
  { id: "dr-wyr-8", type: "would-you-rather", level: "filthy", text: "Would you rather...", optionA: "Never use a sex toy again", optionB: "Only use sex toys, never hands/mouth", tags: ["drinking", "nsfw"], points: 25, drinking: true },

  // --- TRUTH OR DARE (DRINKING) ---
  { id: "dr-tod-1", type: "truth", level: "tease", text: "What's the most embarrassing place you've masturbated? DRINK if you won't tell.", tags: ["drinking", "truth"], points: 10, drinking: true },
  { id: "dr-tod-2", type: "truth", level: "tease", text: "What's the biggest lie you've told to get someone into bed?", tags: ["drinking", "truth"], points: 10, drinking: true },
  { id: "dr-tod-3", type: "dare", level: "tease", text: "Take a shot and send your crush a flirty text right now.", tags: ["drinking", "dare"], points: 15, drinking: true },
  { id: "dr-tod-4", type: "dare", level: "tease", text: "Let the person to your left post anything they want on your social media (draft only).", tags: ["drinking", "dare"], points: 15, drinking: true },
  { id: "dr-tod-5", type: "dare", level: "sensual", text: "Make your best sex noise. Everyone else drinks if they laugh.", tags: ["drinking", "dare"], points: 15, drinking: true },
  { id: "dr-tod-6", type: "dare", level: "sensual", text: "Demonstrate how you kiss using your hand. Everyone rates 1-10.", tags: ["drinking", "dare"], points: 15, drinking: true },
  { id: "dr-tod-7", type: "dare", level: "dirty", text: "Describe your worst sexual experience in detail. Everyone drinks to forget it.", tags: ["drinking", "dare"], points: 20, drinking: true },
  { id: "dr-tod-8", type: "dare", level: "dirty", text: "Let the group pick your dating app bio for the next 24 hours.", tags: ["drinking", "dare"], points: 25, drinking: true },
  { id: "dr-tod-9", type: "wild", level: "filthy", text: "EVERYONE DRINKS. Bottoms up!", tags: ["drinking", "wild"], points: 5, drinking: true },
  { id: "dr-tod-10", type: "wild", level: "filthy", text: "Pick someone to drink twice. They can pass one to someone else.", tags: ["drinking", "wild"], points: 10, drinking: true },

  // --- DRINKING ACTIONS ---
  { id: "dr-act-1", type: "drinking", level: "tease", text: "Take 2 sips if you've ever faked a laugh during sex.", tags: ["drinking", "action"], points: 5, drinking: true },
  { id: "dr-act-2", type: "drinking", level: "tease", text: "Everyone points at who they think gives the best head. Loser drinks.", tags: ["drinking", "action"], points: 10, drinking: true },
  { id: "dr-act-3", type: "drinking", level: "sensual", text: "Take a shot if you've ever googled 'how to give a handjob/blowjob'.", tags: ["drinking", "action"], points: 10, drinking: true },
  { id: "dr-act-4", type: "drinking", level: "sensual", text: "Take a shot if you've ever moaned louder than necessary to fake it.", tags: ["drinking", "action"], points: 10, drinking: true },
  { id: "dr-act-5", type: "drinking", level: "dirty", text: "Chug for 5 seconds if you've ever had a one-night stand.", tags: ["drinking", "action"], points: 15, drinking: true },
  { id: "dr-act-6", type: "drinking", level: "dirty", text: "Take a shot if you've ever slept with a friend's ex.", tags: ["drinking", "action"], points: 20, drinking: true },
  { id: "dr-act-7", type: "drinking", level: "filthy", text: "Take 3 sips if you've done something in bed you've never told anyone about.", tags: ["drinking", "action"], points: 20, drinking: true },
  { id: "dr-act-8", type: "drinking", level: "filthy", text: "Take a shot if you've ever been caught having sex.", tags: ["drinking", "action"], points: 20, drinking: true },
];

// ============================================================
// WHO'S MOST LIKELY TO
// ============================================================

const mostLikelyCards: GameCard[] = [
  { id: "mlt-1", type: "most-likely-to", level: "tease", text: "Who's most likely to...", optionA: "Send a nude by accident", optionB: "Accidentally call someone 'baby' on a first date", tags: ["party", "funny"], points: 5 },
  { id: "mlt-2", type: "most-likely-to", level: "tease", text: "Who's most likely to...", optionA: "Cry during sex", optionB: "Laugh during sex", tags: ["party", "nsfw"], points: 5 },
  { id: "mlt-3", type: "most-likely-to", level: "tease", text: "Who's most likely to...", optionA: "Still be a virgin and lie about it", optionB: "Have the most bodies", tags: ["party", "nsfw"], points: 10 },
  { id: "mlt-4", type: "most-likely-to", level: "sensual", text: "Who's most likely to...", optionA: "Masturbate in a hotel room", optionB: "Masturbate in a public bathroom", tags: ["party", "nsfw"], points: 10 },
  { id: "mlt-5", type: "most-likely-to", level: "sensual", text: "Who's most likely to...", optionA: "Join a swinger couple", optionB: "Become a sex worker", tags: ["party", "nsfw"], points: 15 },
  { id: "mlt-6", type: "most-likely-to", level: "sensual", text: "Who's most likely to...", optionA: "Have a foot fetish they're hiding", optionB: "Have a kink they're too embarrassed to mention", tags: ["party", "kink"], points: 15 },
  { id: "mlt-7", type: "most-likely-to", level: "dirty", text: "Who's most likely to...", optionA: "Give the best head", optionB: "Be the most selfish lover", tags: ["party", "nsfw"], points: 20 },
  { id: "mlt-8", type: "most-likely-to", level: "dirty", text: "Who's most likely to...", optionA: "Get caught sexting at work", optionB: "Get caught watching porn at work", tags: ["party", "nsfw"], points: 20 },
  { id: "mlt-9", type: "most-likely-to", level: "dirty", text: "Who's most likely to...", optionA: "Have a threesome with a stranger", optionB: "Sleep with their boss", tags: ["party", "nsfw"], points: 20 },
  { id: "mlt-10", type: "most-likely-to", level: "filthy", text: "Who's most likely to...", optionA: "Enjoy being degraded the most", optionB: "Be the most dominant in the bedroom", tags: ["party", "bdsm"], points: 25 },
  { id: "mlt-11", type: "most-likely-to", level: "filthy", text: "Who's most likely to...", optionA: "Try every kink on the list", optionB: "Be into the wildest shit nobody expects", tags: ["party", "kink"], points: 25 },
  { id: "mlt-12", type: "most-likely-to", level: "depraved", text: "Who's most likely to...", optionA: "Join a gangbang", optionB: "Organize one", tags: ["party", "nsfw"], points: 30 },
];

// ============================================================
// TWO TRUTHS AND A LIE
// ============================================================

const twoTruthsCards: GameCard[] = [
  { id: "ttl-1", type: "two-truths-lie", level: "tease", text: "Tell two truths and a lie about your sexual history. The group guesses which is the lie.", tags: ["party", "truth"], points: 10 },
  { id: "ttl-2", type: "two-truths-lie", level: "tease", text: "Tell two truths and a lie about your most embarrassing moment. The group guesses.", tags: ["party", "embarrassing"], points: 10 },
  { id: "ttl-3", type: "two-truths-lie", level: "sensual", text: "Tell two truths and a lie about your kinks. The group guesses.", tags: ["party", "kink"], points: 15 },
  { id: "ttl-4", type: "two-truths-lie", level: "sensual", text: "Tell two truths and a lie about your body count. The group guesses.", tags: ["party", "nsfw"], points: 15 },
  { id: "ttl-5", type: "two-truths-lie", level: "dirty", text: "Tell two truths and a lie about the wildest thing you've done. The group guesses.", tags: ["party", "nsfw"], points: 20 },
  { id: "ttl-6", type: "two-truths-lie", level: "dirty", text: "Tell two truths and a lie about who in this room you'd sleep with. The group guesses.", tags: ["party", "nsfw"], points: 25 },
];

// ============================================================
// WOULD YOU RATHER (SFW + SPICY)
// ============================================================

const wouldYouRatherCards: GameCard[] = [
  { id: "wyr-1", type: "would-you-rather", level: "tease", text: "Would you rather...", optionA: "Only have sex in the missionary position forever", optionB: "Never have missionary position again", tags: ["spicy", "nsfw"], points: 10 },
  { id: "wyr-2", type: "would-you-rather", level: "tease", text: "Would you rather...", optionA: "Have a partner who always talks during sex", optionB: "Have a partner who is dead silent", tags: ["spicy", "nsfw"], points: 10 },
  { id: "wyr-3", type: "would-you-rather", level: "sensual", text: "Would you rather...", optionA: "Give up oral sex forever", optionB: "Give up penetration forever", tags: ["spicy", "nsfw"], points: 15 },
  { id: "wyr-4", type: "would-you-rather", level: "sensual", text: "Would you rather...", optionA: "Only have quickies (5 min max)", optionB: "Only have marathon sessions (2+ hours)", tags: ["spicy", "nsfw"], points: 15 },
  { id: "wyr-5", type: "would-you-rather", level: "dirty", text: "Would you rather...", optionA: "Have your parents walk in on you", optionB: "Walk in on your parents", tags: ["spicy", "embarrassing"], points: 20 },
  { id: "wyr-6", type: "would-you-rather", level: "dirty", text: "Would you rather...", optionA: "Be caught watching porn by your boss", optionB: "Be caught masturbating by your roommate", tags: ["spicy", "embarrassing"], points: 20 },
  { id: "wyr-7", type: "would-you-rather", level: "filthy", text: "Would you rather...", optionA: "Have everyone know your search history", optionB: "Have everyone know your body count", tags: ["spicy", "nsfw"], points: 25 },
  { id: "wyr-8", type: "would-you-rather", level: "filthy", text: "Would you rather...", optionA: "Only have sex with lights on", optionB: "Never see your partner naked again", tags: ["spicy", "nsfw"], points: 25 },
];

// ============================================================
// THIS OR THAT (SPICY)
// ============================================================

const thisOrThatCards: GameCard[] = [
  { id: "tot-1", type: "this-or-that", level: "tease", text: "This or That:", optionA: "Morning sex", optionB: "Late night sex", tags: ["spicy", "preference"], points: 5 },
  { id: "tot-2", type: "this-or-that", level: "tease", text: "This or That:", optionA: "Dominant partner", optionB: "Submissive partner", tags: ["spicy", "bdsm"], points: 5 },
  { id: "tot-3", type: "this-or-that", level: "tease", text: "This or That:", optionA: "Slow and sensual", optionB: "Hard and fast", tags: ["spicy", "nsfw"], points: 10 },
  { id: "tot-4", type: "this-or-that", level: "sensual", text: "This or That:", optionA: "Blowjob", optionB: "Cunnilingus", tags: ["spicy", "nsfw"], points: 10 },
  { id: "tot-5", type: "this-or-that", level: "sensual", text: "This or That:", optionA: "Doggy style", optionB: "Cowgirl/Reverse cowgirl", tags: ["spicy", "nsfw"], points: 10 },
  { id: "tot-6", type: "this-or-that", level: "sensual", text: "This or That:", optionA: "Give", optionB: "Receive", tags: ["spicy", "nsfw"], points: 10 },
  { id: "tot-7", type: "this-or-that", level: "dirty", text: "This or That:", optionA: "Facial", optionB: "Creampie", tags: ["spicy", "nsfw"], points: 15 },
  { id: "tot-8", type: "this-or-that", level: "dirty", text: "This or That:", optionA: "Anal", optionB: "Deepthroat", tags: ["spicy", "nsfw"], points: 15 },
  { id: "tot-9", type: "this-or-that", level: "dirty", text: "This or That:", optionA: "Rough hair pulling", optionB: "Rough spanking", tags: ["spicy", "nsfw"], points: 15 },
  { id: "tot-10", type: "this-or-that", level: "filthy", text: "This or That:", optionA: "Public sex", optionB: "Threesome", tags: ["spicy", "nsfw"], points: 20 },
  { id: "tot-11", type: "this-or-that", level: "filthy", text: "This or That:", optionA: "Orgasm denial", optionB: "Multiple orgasms forced", tags: ["spicy", "nsfw"], points: 20 },
  { id: "tot-12", type: "this-or-that", level: "depraved", text: "This or That:", optionA: "CNC scenario", optionB: "Degradation scene", tags: ["spicy", "nsfw"], points: 25 },
];

// ============================================================
// CHARADES (DIRTY)
// ============================================================

const charadesCards: GameCard[] = [
  { id: "ch-1", type: "charades", level: "tease", text: "Act out: Giving a hickey", tags: ["charades", "tease"], points: 10, duration: 60 },
  { id: "ch-2", type: "charades", level: "tease", text: "Act out: Stripping slowly", tags: ["charades", "tease"], points: 10, duration: 60 },
  { id: "ch-3", type: "charades", level: "tease", text: "Act out: The sound someone makes when they cum", tags: ["charades", "nsfw"], points: 15, duration: 60 },
  { id: "ch-4", type: "charades", level: "sensual", text: "Act out: Oral sex (give)", tags: ["charades", "nsfw"], points: 15, duration: 60 },
  { id: "ch-5", type: "charades", level: "sensual", text: "Act out: Being tied up", tags: ["charades", "bdsm"], points: 15, duration: 60 },
  { id: "ch-6", type: "charades", level: "sensual", text: "Act out: Using a vibrator", tags: ["charades", "nsfw"], points: 15, duration: 60 },
  { id: "ch-7", type: "charades", level: "dirty", text: "Act out: 69 position", tags: ["charades", "nsfw"], points: 20, duration: 60 },
  { id: "ch-8", type: "charades", level: "dirty", text: "Act out: Spanking someone", tags: ["charades", "nsfw"], points: 20, duration: 60 },
  { id: "ch-9", type: "charades", level: "dirty", text: "Act out: Deepthroating", tags: ["charades", "nsfw"], points: 25, duration: 60 },
  { id: "ch-10", type: "charades", level: "filthy", text: "Act out: Being fucked from behind", tags: ["charades", "nsfw"], points: 25, duration: 60 },
  { id: "ch-11", type: "charades", level: "filthy", text: "Act out: Riding someone reverse cowgirl", tags: ["charades", "nsfw"], points: 25, duration: 60 },
  { id: "ch-12", type: "charades", level: "depraved", text: "Act out: A full BDSM scene in 60 seconds", tags: ["charades", "bdsm"], points: 30, duration: 60 },
];

// ============================================================
// STORY BUILDER
// ============================================================

const storyCards: GameCard[] = [
  { id: "sb-1", type: "story", level: "tease", text: "Start a story: 'It was a dark and horny night when I...'. Each person adds 1-2 sentences. Make it as dirty as possible.", tags: ["story", "creative"], points: 10 },
  { id: "sb-2", type: "story", level: "sensual", text: "Start a story: 'The first time we met, I knew I wanted to...'. Each person adds a sentence.", tags: ["story", "romantic"], points: 15 },
  { id: "sb-3", type: "story", level: "dirty", text: "Start a story: 'The handcuffs were tight but she/he/they said...'. Continue the story.", tags: ["story", "nsfw"], points: 20 },
  { id: "sb-4", type: "story", level: "filthy", text: "Start a story: 'The stranger at the hotel bar whispered...'. Build on it.", tags: ["story", "nsfw"], points: 25 },
  { id: "sb-5", type: "story", level: "depraved", text: "Start a story: 'The safe word was agreed but then...'. Make it as extreme as you dare.", tags: ["story", "cnc"], points: 30 },
];

// ============================================================
// RATE ME
// ============================================================

const rateCards: GameCard[] = [
  { id: "rt-1", type: "rate", level: "tease", text: "Everyone rates how good of a kisser they think you are (1-10). Average is your score.", tags: ["rate", "nsfw"], points: 10 },
  { id: "rt-2", type: "rate", level: "tease", text: "Everyone rates how likely you are to be a 'slut' in bed (1-10). Average is your score.", tags: ["rate", "nsfw"], points: 10 },
  { id: "rt-3", type: "rate", level: "sensual", text: "Everyone rates how good you'd be at giving head (1-10). Average is your score.", tags: ["rate", "nsfw"], points: 15 },
  { id: "rt-4", type: "rate", level: "sensual", text: "Everyone rates how dominant/submissive you look (1=sub, 10=dom). Average is your score.", tags: ["rate", "bdsm"], points: 15 },
  { id: "rt-5", type: "rate", level: "dirty", text: "Everyone rates how wild they think you are in bed (1-10). Average is your score.", tags: ["rate", "nsfw"], points: 20 },
  { id: "rt-6", type: "rate", level: "filthy", text: "Everyone rates how many kinks they think you have (1-10). Average is your score.", tags: ["rate", "kink"], points: 25 },
];

// ============================================================
// KING OF THE TABLE (RANKING)
// ============================================================

const kingCards: GameCard[] = [
  { id: "kot-1", type: "challenge", level: "tease", text: "Everyone ranks who in this room is most to least attractive. Last place drinks.", tags: ["ranking", "nsfw"], points: 10 },
  { id: "kot-2", type: "challenge", level: "sensual", text: "Everyone ranks who gives the best head (by reputation). Last place drinks.", tags: ["ranking", "nsfw"], points: 15 },
  { id: "kot-3", type: "challenge", level: "dirty", text: "Everyone ranks who is the biggest slut in the room. Last place drinks.", tags: ["ranking", "nsfw"], points: 20 },
  { id: "kot-4", type: "challenge", level: "filthy", text: "Everyone ranks who is the most freak in the sheets. Last place drinks.", tags: ["ranking", "nsfw"], points: 25 },
];

// ============================================================
// HOT TAKES
// ============================================================

const hotTakeCards: GameCard[] = [
  { id: "ht-1", type: "challenge", level: "tease", text: "Hot take: 'Oral sex is overrated.' Defend this position for 30 seconds. Group votes.", tags: ["debate", "nsfw"], points: 10 },
  { id: "ht-2", type: "challenge", level: "tease", text: "Hot take: 'Size doesn't matter.' Prove it with a compelling argument.", tags: ["debate", "nsfw"], points: 10 },
  { id: "ht-3", type: "challenge", level: "sensual", text: "Hot take: 'Missionary is the best position.' Defend it.", tags: ["debate", "nsfw"], points: 15 },
  { id: "ht-4", type: "challenge", level: "sensual", text: "Hot take: 'Dirty talk is cringe.' Change our minds.", tags: ["debate", "nsfw"], points: 15 },
  { id: "ht-5", type: "challenge", level: "dirty", text: "Hot take: 'Sexting is better than phone sex.' Prove it.", tags: ["debate", "nsfw"], points: 20 },
  { id: "ht-6", type: "challenge", level: "dirty", text: "Hot take: 'First time sex is always awkward.' Give your hottest counter-argument.", tags: ["debate", "nsfw"], points: 20 },
  { id: "ht-7", type: "challenge", level: "filthy", text: "Hot take: 'Everyone has a kink they haven't admitted.' Expose yourself.", tags: ["debate", "kink"], points: 25 },
];

// ============================================================
// EMOJI GUESS
// ============================================================

const emojiCards: GameCard[] = [
  { id: "eg-1", type: "challenge", level: "tease", text: "🍆🍑💦 = ? (Everyone guesses what sexual act this represents)", tags: ["emoji", "funny"], points: 5 },
  { id: "eg-2", type: "challenge", level: "tease", text: "👅🔥😈 = ? (Guess the kink)", tags: ["emoji", "funny"], points: 5 },
  { id: "eg-3", type: "challenge", level: "sensual", text: "⛓️🖤⛓️ = ? (Guess the kink)", tags: ["emoji", "bdsm"], points: 10 },
  { id: "eg-4", type: "challenge", level: "sensual", text: "🪢🙈🩹 = ? (Guess the act)", tags: ["emoji", "bdsm"], points: 10 },
  { id: "eg-5", type: "challenge", level: "dirty", text: "Create your own dirty emoji combo. Others must guess what it means.", tags: ["emoji", "creative"], points: 15 },
  { id: "eg-6", type: "challenge", level: "filthy", text: "Describe your wildest kink using only 3 emojis. Others must guess.", tags: ["emoji", "kink"], points: 20 },
];

// ============================================================
// ALL PACKS EXPORT
// ============================================================

export const partyPacks: CardPack[] = [
  {
    id: "drinking-games",
    name: "Drinking Games",
    description: "Sip, shot, chug. Never Have I Ever, Would You Rather, and more.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: drinkingCards,
    isOfficial: true,
    tags: ["drinking", "party", "sfw"],
    vibe: "party",
  },
  {
    id: "whos-most-likely",
    name: "Who's Most Likely To",
    description: "Point fingers, assign drinks, expose the group.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: mostLikelyCards,
    isOfficial: true,
    tags: ["party", "voting", "nsfw"],
    vibe: "party",
  },
  {
    id: "two-truths-lie",
    name: "Two Truths & A Lie",
    description: "Deceive your friends. Discover their darkest secrets.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: twoTruthsCards,
    isOfficial: true,
    tags: ["party", "truth", "deception"],
    vibe: "party",
  },
  {
    id: "would-you-rather-spicy",
    name: "Would You Rather: Spicy",
    description: "The impossible choice. Choose wisely or drink.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: wouldYouRatherCards,
    isOfficial: true,
    tags: ["party", "choices", "nsfw"],
    vibe: "spicy",
  },
  {
    id: "this-or-that",
    name: "This or That: NSFW Edition",
    description: "Pick a side. There's no going back.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: thisOrThatCards,
    isOfficial: true,
    tags: ["party", "preferences", "nsfw"],
    vibe: "spicy",
  },
  {
    id: "dirty-charades",
    name: "Dirty Charades",
    description: "Act it out. No words. Maximum embarrassment.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: charadesCards,
    isOfficial: true,
    tags: ["party", "charades", "nsfw"],
    vibe: "party",
  },
  {
    id: "story-builder",
    name: "Story Builder",
    description: "Build the filthiest story together, one sentence at a time.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: storyCards,
    isOfficial: true,
    tags: ["party", "creative", "nsfw"],
    vibe: "chill",
  },
  {
    id: "rate-me",
    name: "Rate Me",
    description: "How do they see you? Find out.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: rateCards,
    isOfficial: true,
    tags: ["party", "rating", "nsfw"],
    vibe: "spicy",
  },
  {
    id: "king-of-table",
    name: "King of the Table",
    description: "Rank your friends. Last place pays the price.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: kingCards,
    isOfficial: true,
    tags: ["party", "ranking", "nsfw"],
    vibe: "party",
  },
  {
    id: "hot-takes",
    name: "Hot Takes",
    description: "Defend the indefensible. Win the argument or take a shot.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: hotTakeCards,
    isOfficial: true,
    tags: ["party", "debate", "nsfw"],
    vibe: "party",
  },
  {
    id: "emoji-guess",
    name: "Emoji Guess",
    description: "Decode the dirty emojis. Or create your own.",
    author: "Foreplay Frenzy",
    version: "1.0",
    cards: emojiCards,
    isOfficial: true,
    tags: ["party", "emoji", "funny"],
    vibe: "party",
  },
];

export function getDrinkingCards(): GameCard[] {
  return drinkingCards;
}

export function getPartyCards(): GameCard[] {
  return partyPacks.flatMap((p) => p.cards);
}

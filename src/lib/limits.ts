import type { KinkLimit } from "@/types";

export interface KinkCategory {
  name: string;
  kinks: { id: string; name: string }[];
}

export const kinkCategories: KinkCategory[] = [
  {
    name: "Oral",
    kinks: [
      { id: "oral_giving", name: "Giving oral" },
      { id: "oral_receiving", name: "Receiving oral" },
      { id: "deepthroat", name: "Deepthroating" },
      { id: "face_fucking", name: "Face fucking" },
      { id: "cum_swallowing", name: "Swallowing cum" },
      { id: "facial", name: "Facial" },
      { id: "69", name: "69 position" },
      { id: "rimming_giving", name: "Giving rimjobs" },
      { id: "rimming_receiving", name: "Receiving rimjobs" },
    ],
  },
  {
    name: "Anal",
    kinks: [
      { id: "anal_receiving", name: "Receiving anal" },
      { id: "anal_giving", name: "Giving anal" },
      { id: "anal_toys", name: "Anal toys" },
      { id: "fisting", name: "Fisting" },
      { id: "ass_to_mouth", name: "Ass to mouth" },
      { id: "rimming", name: "Rimming" },
    ],
  },
  {
    name: "BDSM",
    kinks: [
      { id: "bondage", name: "Bondage" },
      { id: "rope_bondage", name: "Rope bondage" },
      { id: "handcuffs", name: "Handcuffs" },
      { id: "blindfold", name: "Blindfolding" },
      { id: "ball_gag", name: "Ball gag" },
      { id: "chastity", name: "Chastity" },
      { id: "dominance", name: "Being dominant" },
      { id: "submission", name: "Being submissive" },
      { id: "switching", name: "Switching roles" },
    ],
  },
  {
    name: "Pain & Impact",
    kinks: [
      { id: "spanking", name: "Spanking" },
      { id: "slapping", name: "Slapping" },
      { id: "hair_pulling", name: "Hair pulling" },
      { id: "biting", name: "Biting" },
      { id: "scratching", name: "Scratching" },
      { id: "pinching", name: "Pinching" },
      { id: "caning", name: "Caning" },
      { id: "flogging", name: "Flogging" },
      { id: "whipping", name: "Whipping" },
      { id: "nipple_clamps", name: "Nipple clamps" },
      { id: "electro", name: "Electro play" },
      { id: "needles", name: "Needle play" },
      { id: "clothespins", name: "Clothespins" },
    ],
  },
  {
    name: "Sensation",
    kinks: [
      { id: "ice", name: "Ice play" },
      { id: "wax", name: "Hot wax" },
      { id: "feathers", name: "Feather teasing" },
      { id: "vibrators", name: "Vibrators" },
      { id: "suction", name: "Suction toys" },
      { id: "temperature", name: "Temperature play" },
    ],
  },
  {
    name: "Power Exchange",
    kinks: [
      { id: "dom_sub", name: "D/s dynamic" },
      { id: "master_slave", name: "Master/slave" },
      { id: "owner_pet", name: "Owner/pet" },
      { id: "free_use", name: "Free use" },
      { id: "service", name: "Service submissives" },
      { id: "training", name: "Training" },
      { id: "protocol", name: "Protocol & rules" },
    ],
  },
  {
    name: "Degradation & Humiliation",
    kinks: [
      { id: "name_calling", name: "Name calling" },
      { id: "degradation", name: "Degradation" },
      { id: "humiliation", name: "Humiliation" },
      { id: "objectification", name: "Objectification" },
      { id: "foot_worship", name: "Foot worship" },
      { id: "boot_licking", name: "Boot/shoe licking" },
      { id: "body_writing", name: "Body writing/marking" },
    ],
  },
  {
    name: "Cum & Fluids",
    kinks: [
      { id: "cum_on_face", name: "Cum on face" },
      { id: "cum_swallow", name: "Swallowing cum" },
      { id: "creampie", name: "Creampie" },
      { id: "cum_play", name: "Cum play" },
      { id: "sloppy_seconds", name: "Sloppy seconds" },
      { id: "dripping", name: "Dripping/licking off" },
    ],
  },
  {
    name: "Public & Risk",
    kinks: [
      { id: "public_sex", name: "Public sex" },
      { id: "public_nudity", name: "Public nudity" },
      { id: "public_toys", name: "Wearing toys in public" },
      { id: "voyeurism", name: "Voyeurism" },
      { id: "exhibitionism", name: "Exhibitionism" },
      { id: "swinging", name: "Swinging" },
      { id: "threesome", name: "Threesome" },
      { id: "gangbang", name: "Gangbang/group" },
    ],
  },
  {
    name: "Taboo",
    kinks: [
      { id: "incest_fantasy", name: "Incest fantasy" },
      { id: "rape_fantasy", name: "Rape/CNC fantasy" },
      { id: "age_play", name: "Age play" },
      { id: "race_play", name: "Race play" },
      { id: "cuckold", name: "Cuckolding" },
      { id: "hotwife", name: "Hotwife" },
      { id: "taboo_talk", name: "Taboo dirty talk" },
    ],
  },
  {
    name: "Watersports & Scat",
    kinks: [
      { id: "golden_shower_giving", name: "Giving golden showers" },
      { id: "golden_shower_receiving", name: "Receiving golden showers" },
      { id: "scat", name: "Scat play" },
      { id: "diaper", name: "Diaper play" },
    ],
  },
  {
    name: "Orgasm Control",
    kinks: [
      { id: "edging", name: "Edging" },
      { id: "denial", name: "Orgasm denial" },
      { id: "ruined_orgasm", name: "Ruined orgasms" },
      { id: "forced_orgasm", name: "Forced orgasms" },
      { id: "multiple_orgasm", name: "Multiple orgasms" },
      { id: "milking", name: "Milking" },
      { id: "chastity_orgasm", name: "Chastity control" },
    ],
  },
  {
    name: "Breath & Choking",
    kinks: [
      { id: "choking", name: "Choking/strangling" },
      { id: "breath_play", name: "Breath play" },
      { id: "smothering", name: "Smothering" },
      { id: "asphyxiation", name: "Asphyxiation" },
    ],
  },
  {
    name: "Pet Play",
    kinks: [
      { id: "puppy_play", name: "Puppy play" },
      { id: "kitten_play", name: "Kitten play" },
      { id: "pony_play", name: "Pony play" },
      { id: "pet_care", name: "Pet care/feeding" },
    ],
  },
  {
    name: "Mind Control & Hypno",
    kinks: [
      { id: "hypnosis", name: "Hypnosis" },
      { id: "mind_control", name: "Mind control fantasy" },
      { id: "programming", name: "Programming/affirmations" },
      { id: "trigger_words", name: "Trigger words" },
    ],
  },
];

export function createDefaultLimits(): KinkLimit[] {
  return kinkCategories.flatMap((cat) =>
    cat.kinks.map((k) => ({
      id: k.id,
      name: k.name,
      category: cat.name,
      intensity: 5,
      status: "maybe" as const,
    }))
  );
}

export function getHardNoIds(limits: KinkLimit[]): string[] {
  return limits.filter((l) => l.status === "hard-no").map((l) => l.id);
}

export function getYesIds(limits: KinkLimit[]): string[] {
  return limits.filter((l) => l.status === "yes").map((l) => l.id);
}

export function getMaybeIds(limits: KinkLimit[]): string[] {
  return limits.filter((l) => l.status === "maybe").map((l) => l.id);
}

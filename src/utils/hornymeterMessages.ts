// Hornymeter Message System
// Dynamic, non-repetitive messages that scale with intensity

interface MessageSet {
  range: [number, number];
  messages: string[];
  tone: string;
}

const messageSets: MessageSet[] = [
  {
    range: [0, 15],
    tone: "Warming Up",
    messages: [
      "Just stretching… nothing too dangerous yet 😉",
      "You're browsing with intent, but still behaving.",
      "Mild curiosity detected. Let's see where this goes.",
      "Calm… composed… but not innocent.",
      "Testing the waters, are we?",
      "Playing it cool… for now.",
      "Sneaking a peek, nothing serious.",
      "Keeping it casual… barely.",
    ]
  },
  {
    range: [16, 35],
    tone: "Interest Sparked",
    messages: [
      "Okay, you're definitely paying attention now.",
      "That look? Yeah, we noticed.",
      "You're warming up nicely. No turning back.",
      "Curiosity just became interest.",
      "The plot thickens.",
      "Something caught your eye, didn't it?",
      "Your attention span just improved dramatically.",
      "Now we're getting somewhere interesting.",
    ]
  },
  {
    range: [36, 60],
    tone: "Heat Rising",
    messages: [
      "You're starting to lose focus.",
      "This is getting interesting… and dangerous.",
      "Restraint is slipping.",
      "You didn't come this far to stay calm.",
      "Temperature's rising in here.",
      "Control is becoming negotiable.",
      "Things are escalating quickly.",
      "Your poker face is cracking.",
    ]
  },
  {
    range: [61, 80],
    tone: "Danger Zone",
    messages: [
      "Self-control is on life support.",
      "You should probably stop… but you won't.",
      "You're officially in risky territory.",
      "This is where good decisions go to die.",
      "Rational thinking has left the building.",
      "The point of no return is behind you.",
      "Consequences seem abstract right now, don't they?",
      "Someone's playing with fire.",
    ]
  },
  {
    range: [81, 100],
    tone: "Unhinged",
    messages: [
      "You're cooked. Absolutely finished.",
      "There's no pretending anymore.",
      "You crossed the line and kept going.",
      "You didn't stand a chance.",
      "This meter wasn't built for you.",
      "Maximum chaos achieved.",
      "Composure? Never heard of her.",
      "The dial broke. Congratulations.",
      "You've ascended to a different level.",
      "Self-control has been permanently disabled.",
    ]
  }
];

// Track the last used message index per range to avoid repetition
const lastMessageIndices: { [key: string]: number } = {};

/**
 * Get a dynamic message based on horniness value
 * Prevents repeating the same message twice in a row
 */
export const getHornymeterMessage = (value: number): string => {
  // Find the appropriate message set
  const messageSet = messageSets.find(
    (set) => value >= set.range[0] && value <= set.range[1]
  );

  if (!messageSet) {
    return "Something's happening here...";
  }

  const rangeKey = `${messageSet.range[0]}-${messageSet.range[1]}`;
  const messages = messageSet.messages;
  const lastIndex = lastMessageIndices[rangeKey] ?? -1;

  // Get a random index that's different from the last one
  let newIndex: number;
  if (messages.length === 1) {
    newIndex = 0;
  } else {
    do {
      newIndex = Math.floor(Math.random() * messages.length);
    } while (newIndex === lastIndex && messages.length > 1);
  }

  lastMessageIndices[rangeKey] = newIndex;
  return messages[newIndex];
};

/**
 * Get the tone/level name for a given value
 */
export const getHorninessTone = (value: number): string => {
  const messageSet = messageSets.find(
    (set) => value >= set.range[0] && value <= set.range[1]
  );
  return messageSet?.tone || "Unknown";
};

/**
 * Get emoji based on horniness value
 */
export const getHorninessEmoji = (value: number): string => {
  if (value <= 15) return "😊";
  if (value <= 35) return "😏";
  if (value <= 60) return "😍";
  if (value <= 80) return "🔥";
  return "💦";
};

/**
 * Get micro-copy for unlocking community access
 */
export const getCommunityUnlockMessage = (value: number): string | null => {
  if (value >= 60) {
    return "You're in. Come meet the community 😈";
  }
  return null;
};

/**
 * Check if value is high enough to unlock community
 */
export const hasUnlockedCommunity = (value: number): boolean => {
  return value >= 60;
};

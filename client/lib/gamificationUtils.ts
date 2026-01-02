import { Sentiment, Badge } from "@/store/gameStore";

/**
 * Calculate XP gain based on habit completion, streak, and sentiment
 */
export function calculateXPGain(params: {
  baseXP?: number;
  streak: number;
  sentiment: Sentiment;
}): number {
  const { baseXP = 10, streak, sentiment } = params;
  let totalXP = baseXP;

  // Streak milestone bonus (every 7 days)
  if (streak > 0 && streak % 7 === 0) {
    totalXP += 20;
  }

  // Sentiment bonus
  if (sentiment === "positive") {
    totalXP += 10;
  } else if (sentiment === "neutral") {
    // No bonus, no penalty
    totalXP += 0;
  } else if (sentiment === "negative") {
    // No penalty, but no bonus either
    totalXP += 0;
  }

  return totalXP;
}

/**
 * Calculate user level from total XP
 * Level increases every 100 XP
 */
export function calculateLevel(totalXP: number): number {
  return Math.floor(totalXP / 100) + 1;
}

/**
 * Calculate progress towards next level
 */
export function calculateLevelProgress(totalXP: number): {
  current: number;
  target: number;
  percentage: number;
} {
  const currentLevel = calculateLevel(totalXP);
  const xpForCurrentLevel = (currentLevel - 1) * 100;
  const xpForNextLevel = currentLevel * 100;

  const current = totalXP - xpForCurrentLevel;
  const target = xpForNextLevel - xpForCurrentLevel;
  const percentage = (current / target) * 100;

  return {
    current,
    target,
    percentage: Math.min(percentage, 100),
  };
}

/**
 * Get sentiment-based UI properties
 */
export function getSentimentConfig(sentiment: Sentiment) {
  const configs = {
    positive: {
      emoji: "🎉",
      message: "Let's lock this habit in!",
      description:
        "Fantastic! You're building momentum. Your consistency is inspiring.",
      xpBonus: 10,
      bgColor: "from-secondary/20 to-yellow-200/20",
      borderColor: "border-secondary/30",
      avatarReaction: "celebrate",
    },
    neutral: {
      emoji: "🌟",
      message: "Consistency matters.",
      description:
        "Every step forward counts. You're doing better than you think.",
      xpBonus: 0,
      bgColor: "from-blue-200/20 to-cyan-200/20",
      borderColor: "border-blue-300/30",
      avatarReaction: "calm",
    },
    negative: {
      emoji: "💙",
      message: "Small steps still count.",
      description:
        "You showed up. That takes courage. Tomorrow is a fresh start.",
      xpBonus: 0,
      bgColor: "from-accent/20 to-green-200/20",
      borderColor: "border-accent/30",
      avatarReaction: "supportive",
    },
  };

  return configs[sentiment];
}

/**
 * Check if a badge should be unlocked based on current state
 */
export function checkBadgeUnlock(params: {
  streak: number;
  totalXP: number;
  level: number;
  totalCompletions: number;
  allHabitsStreak: number[];
}): Badge[] {
  const unlockedBadges: Badge[] = [];

  // 7-Day Streak
  if (params.streak >= 7) {
    unlockedBadges.push({
      id: "streak-7",
      name: "7-Day Streak",
      emoji: "🔥",
      unlocked: true,
    });
  }

  // 30-Day Streak
  if (params.streak >= 30) {
    unlockedBadges.push({
      id: "streak-30",
      name: "30-Day Streak",
      emoji: "⭐",
      unlocked: true,
    });
  }

  // Perfect Week (all 7 days with positive sentiment)
  if (params.allHabitsStreak.length > 0 && params.allHabitsStreak[0] >= 7) {
    unlockedBadges.push({
      id: "perfect-week",
      name: "Perfect Week",
      emoji: "🎯",
      unlocked: true,
    });
  }

  // Level 5
  if (params.level >= 5) {
    unlockedBadges.push({
      id: "level-5",
      name: "Level 5",
      emoji: "👑",
      unlocked: true,
    });
  }

  // Consistent (20+ completions)
  if (params.totalCompletions >= 20) {
    unlockedBadges.push({
      id: "consistent",
      name: "Consistent",
      emoji: "💪",
      unlocked: true,
    });
  }

  return unlockedBadges;
}

/**
 * Get avatar reaction based on sentiment
 */
export function getAvatarReaction(sentiment: Sentiment): string {
  const reactions = {
    positive: "celebrate",
    neutral: "calm",
    negative: "supportive",
  };
  return reactions[sentiment];
}

/**
 * Get encouragement message based on sentiment
 */
export function getEncouragementMessage(sentiment: Sentiment): string {
  const messages = {
    positive:
      "You're in a great headspace! Keep channeling that energy. ✅",
    neutral: "Consistency matters. You showed up, and that counts.",
    negative:
      "It's okay, small steps still count. Rest and try again tomorrow.",
  };
  return messages[sentiment];
}

/**
 * Check if streak should be protected (not reset on missed day)
 */
export function shouldProtectStreak(sentiment: Sentiment): boolean {
  // Only protect streak on negative sentiment to encourage retention
  return sentiment === "negative";
}

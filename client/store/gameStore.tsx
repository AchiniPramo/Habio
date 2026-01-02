import React, { createContext, useContext, useReducer, ReactNode } from "react";

export type Sentiment = "positive" | "neutral" | "negative";

export type Badge = {
  id: string;
  name: string;
  emoji: string;
  unlocked: boolean;
  unlockedAt?: Date;
};

export type Habit = {
  id: string;
  name: string;
  emoji: string;
  category: string;
  frequency: "daily" | "weekly";
  effort: "low" | "medium" | "high";
  streak: number;
  bestStreak: number;
  lastCompleted: Date | null;
  totalCompletions: number;
  emotionalSupport: boolean;
};

export type GameState = {
  userId: string;
  level: number;
  totalXP: number;
  habits: Habit[];
  badges: Badge[];
  completedToday: string[];
  lastSentiment: Sentiment | null;
};

export type GameAction =
  | { type: "INIT_USER"; payload: GameState }
  | { type: "ADD_XP"; payload: number }
  | { type: "ADD_HABIT"; payload: Habit }
  | {
      type: "COMPLETE_HABIT";
      payload: { habitId: string; sentiment: Sentiment };
    }
  | { type: "UNLOCK_BADGE"; payload: Badge }
  | { type: "SET_SENTIMENT"; payload: Sentiment }
  | { type: "RESET_ALL_DATA" };

const initialState: GameState = {
  userId: "user-1",
  level: 1,
  totalXP: 0,
  habits: [],
  badges: [
    {
      id: "streak-7",
      name: "7-Day Streak",
      emoji: "🔥",
      unlocked: false,
    },
    {
      id: "streak-30",
      name: "30-Day Streak",
      emoji: "⭐",
      unlocked: false,
    },
    {
      id: "perfect-week",
      name: "Perfect Week",
      emoji: "🎯",
      unlocked: false,
    },
    {
      id: "level-5",
      name: "Level 5",
      emoji: "👑",
      unlocked: false,
    },
    {
      id: "consistent",
      name: "Consistent",
      emoji: "💪",
      unlocked: false,
    },
  ],
  completedToday: [],
  lastSentiment: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "INIT_USER":
      return action.payload;

    case "ADD_XP": {
      const newTotalXP = state.totalXP + action.payload;
      const newLevel = Math.floor(newTotalXP / 100) + 1;
      return {
        ...state,
        totalXP: newTotalXP,
        level: newLevel,
      };
    }

    case "ADD_HABIT":
      return {
        ...state,
        habits: [...state.habits, action.payload],
      };

    case "COMPLETE_HABIT": {
      const habitIndex = state.habits.findIndex(
        (h) => h.id === action.payload.habitId
      );
      if (habitIndex === -1) return state;

      const habit = state.habits[habitIndex];
      const today = new Date();
      const lastCompleted = habit.lastCompleted
        ? new Date(habit.lastCompleted)
        : null;

      let newStreak = habit.streak;
      if (!lastCompleted) {
        newStreak = 1;
      } else {
        const diffTime = today.getTime() - lastCompleted.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          newStreak = habit.streak + 1;
        } else if (diffDays === 0) {
          newStreak = habit.streak;
        } else {
          newStreak = 1;
        }
      }

      const newBestStreak = Math.max(newStreak, habit.bestStreak);

      const updatedHabit: Habit = {
        ...habit,
        streak: newStreak,
        bestStreak: newBestStreak,
        lastCompleted: today,
        totalCompletions: habit.totalCompletions + 1,
      };

      const updatedHabits = [...state.habits];
      updatedHabits[habitIndex] = updatedHabit;

      let xpGain = 10;

      if (newStreak > 0 && newStreak % 7 === 0) {
        xpGain += 20;
      }

      if (action.payload.sentiment === "positive") {
        xpGain += 10;
      }

      const newTotalXP = state.totalXP + xpGain;
      const newLevel = Math.floor(newTotalXP / 100) + 1;

      return {
        ...state,
        totalXP: newTotalXP,
        level: newLevel,
        habits: updatedHabits,
        completedToday: [...state.completedToday, action.payload.habitId],
        lastSentiment: action.payload.sentiment,
      };
    }

    case "UNLOCK_BADGE": {
      const badgeIndex = state.badges.findIndex((b) => b.id === action.payload.id);
      if (badgeIndex === -1) return state;

      const updatedBadges = [...state.badges];
      updatedBadges[badgeIndex] = {
        ...action.payload,
        unlocked: true,
        unlockedAt: new Date(),
      };

      return {
        ...state,
        badges: updatedBadges,
      };
    }

    case "SET_SENTIMENT":
      return {
        ...state,
        lastSentiment: action.payload,
      };

    case "RESET_ALL_DATA":
      return initialState;

    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  addXP: (xp: number) => void;
  completeHabit: (habitId: string, sentiment: Sentiment) => void;
  addHabit: (habit: Habit) => void;
  unlockBadge: (badge: Badge) => void;
  setSentiment: (sentiment: Sentiment) => void;
  resetAllData: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const value: GameContextType = {
    state,
    dispatch,
    addXP: (xp: number) => dispatch({ type: "ADD_XP", payload: xp }),
    completeHabit: (habitId: string, sentiment: Sentiment) =>
      dispatch({ type: "COMPLETE_HABIT", payload: { habitId, sentiment } }),
    addHabit: (habit: Habit) =>
      dispatch({ type: "ADD_HABIT", payload: habit }),
    unlockBadge: (badge: Badge) =>
      dispatch({ type: "UNLOCK_BADGE", payload: badge }),
    setSentiment: (sentiment: Sentiment) =>
      dispatch({ type: "SET_SENTIMENT", payload: sentiment }),
    resetAllData: () => dispatch({ type: "RESET_ALL_DATA" }),
  };

  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

import { useEffect, useState } from 'react';
import type { Habit, Badge, Sentiment, GameState } from '@/store/gameStore';

// Lazy load database service to avoid errors if SQLite is not installed
let databaseService: any = null;
let isWebMode = false;

try {
  databaseService = require('@/services/database.service').databaseService;
  console.log('[Hooks] Using SQLite database service');
} catch (e) {
  console.log('[Hooks] SQLite not available, using fallback localStorage');
  isWebMode = true;
}

/**
 * Hook to initialize database
 */
export function useDatabaseInit() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initDB = async () => {
      try {
        if (!isWebMode && databaseService) {
          await databaseService.initialize();
          await databaseService.initializeUser('user-1');
        } else {
          console.log('[Database] Running in web mode - using localStorage fallback');
        }
        setIsReady(true);
      } catch (err) {
        console.log('[Database] Falling back to localStorage mode');
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsReady(true); // Still mark as ready even if there's an error
      }
    };

    initDB();

    return () => {
      if (!isWebMode && databaseService?.closeDatabase) {
        databaseService.closeDatabase();
      }
    };
  }, []);

  return { isReady, error };
}

/**
 * Hook to load user data (level, XP, sentiment)
 */
export function useUserData(userId: string = 'user-1') {
  const [data, setData] = useState<{
    level: number;
    totalXP: number;
    lastSentiment: Sentiment | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await databaseService.getUserData(userId);
        setData(userData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  return { data, loading, error };
}

/**
 * Hook to update user XP and level
 */
export function useUpdateUserXP() {
  const updateXP = async (totalXP: number, level: number, userId: string = 'user-1') => {
    try {
      await databaseService.updateUserXP(userId, totalXP, level);
    } catch (err) {
      console.error('Error updating XP:', err);
      throw err;
    }
  };

  return { updateXP };
}

/**
 * Hook to load all habits
 */
export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = async () => {
    try {
      setLoading(true);
      if (!isWebMode && databaseService) {
        const habitsData = await databaseService.getAllHabits();
        setHabits(habitsData);
      } else {
        // Use fallback
        const stored = localStorage.getItem('smarthabit_data');
        if (stored) {
          const data = JSON.parse(stored);
          setHabits(data.habits || []);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { habits, loading, error, refresh };
}

/**
 * Hook to create a new habit
 */
export function useCreateHabit() {
  const createHabit = async (habit: Habit) => {
    try {
      await databaseService.createHabit(habit);
    } catch (err) {
      console.error('Error creating habit:', err);
      throw err;
    }
  };

  return { createHabit };
}

/**
 * Hook to get single habit
 */
export function useHabit(habitId: string) {
  const [habit, setHabit] = useState<Habit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadHabit = async () => {
      try {
        const habitData = await databaseService.getHabitById(habitId);
        setHabit(habitData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    if (habitId) {
      loadHabit();
    }
  }, [habitId]);

  return { habit, loading, error };
}

/**
 * Hook to update a habit
 */
export function useUpdateHabit() {
  const updateHabit = async (habit: Habit) => {
    try {
      await databaseService.updateHabit(habit);
    } catch (err) {
      console.error('Error updating habit:', err);
      throw err;
    }
  };

  return { updateHabit };
}

/**
 * Hook to delete a habit
 */
export function useDeleteHabit() {
  const deleteHabit = async (habitId: string) => {
    try {
      await databaseService.deleteHabit(habitId);
    } catch (err) {
      console.error('Error deleting habit:', err);
      throw err;
    }
  };

  return { deleteHabit };
}

/**
 * Hook to load all badges
 */
export function useBadges() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadBadges = async () => {
      try {
        const badgesData = await databaseService.getAllBadges();
        setBadges(badgesData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    loadBadges();
  }, []);

  return { badges, loading, error };
}

/**
 * Hook to unlock a badge
 */
export function useUnlockBadge() {
  const unlockBadge = async (badgeId: string) => {
    try {
      await databaseService.unlockBadge(badgeId);
    } catch (err) {
      console.error('Error unlocking badge:', err);
      throw err;
    }
  };

  return { unlockBadge };
}

/**
 * Hook to record habit completion
 */
export function useRecordCompletion() {
  const recordCompletion = async (habitId: string, sentiment: Sentiment, reflection?: string) => {
    try {
      await databaseService.recordCompletion(habitId, sentiment, reflection);
    } catch (err) {
      console.error('Error recording completion:', err);
      throw err;
    }
  };

  return { recordCompletion };
}

/**
 * Hook to get habit completions
 */
export function useHabitCompletions(habitId: string) {
  const [completions, setCompletions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCompletions = async () => {
      try {
        const data = await databaseService.getCompletionsForHabit(habitId);
        setCompletions(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    if (habitId) {
      loadCompletions();
    }
  }, [habitId]);

  return { completions, loading, error };
}

/**
 * Hook to export all data
 */
export function useExportData() {
  const exportData = async (): Promise<GameState> => {
    try {
      return await databaseService.exportAllData();
    } catch (err) {
      console.error('Error exporting data:', err);
      throw err;
    }
  };

  return { exportData };
}

/**
 * Hook to reset database
 */
export function useResetDatabase() {
  const resetDatabase = async () => {
    try {
      await databaseService.resetDatabase();
    } catch (err) {
      console.error('Error resetting database:', err);
      throw err;
    }
  };

  return { resetDatabase };
}

/**
 * Hook to update user sentiment
 */
export function useUpdateSentiment() {
  const updateSentiment = async (sentiment: Sentiment, userId: string = 'user-1') => {
    try {
      await databaseService.updateUserSentiment(userId, sentiment);
    } catch (err) {
      console.error('Error updating sentiment:', err);
      throw err;
    }
  };

  return { updateSentiment };
}

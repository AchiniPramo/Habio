import { useEffect, useState } from 'react';
import type { Habit, Badge, Sentiment, GameState } from '@/store/gameStore';

const STORAGE_KEY = 'smarthabit_data';

// Simple localStorage-based fallback
class LocalStorageDB {
  getData(): GameState {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      userId: 'user-1',
      level: 1,
      totalXP: 0,
      habits: [],
      badges: [],
      completedToday: [],
      lastSentiment: null,
    };
  }

  saveData(data: GameState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

const localDB = new LocalStorageDB();

export function useHabitsFallback() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    const data = localDB.getData();
    setHabits(data.habits);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return { habits, loading, error: null, refresh };
}

export function useCreateHabitFallback() {
  const createHabit = (habit: Habit) => {
    const data = localDB.getData();
    data.habits.push(habit);
    localDB.saveData(data);
  };

  return { createHabit };
}

export function useUpdateHabitFallback() {
  const updateHabit = (habit: Habit) => {
    const data = localDB.getData();
    const index = data.habits.findIndex(h => h.id === habit.id);
    if (index >= 0) {
      data.habits[index] = habit;
      localDB.saveData(data);
    }
  };

  return { updateHabit };
}

export function useRecordCompletionFallback() {
  const recordCompletion = (_habitId: string, _sentiment: Sentiment) => {
    // Simple fallback - just log it
    console.log('[Fallback] Completion recorded (localStorage)');
  };

  return { recordCompletion };
}

export function useSaveDataFallback() {
  const saveData = (state: GameState) => {
    localDB.saveData(state);
  };

  return { saveData };
}

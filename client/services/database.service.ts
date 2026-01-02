import type { GameState, Habit, Badge, Sentiment } from '@/store/gameStore';
import type { CapacitorSQLite as CapacitorSQLiteType } from '@capacitor-community/sqlite';

// Lazy load Capacitor SQLite - will be null on web if packages not installed
let CapacitorSQLite: typeof CapacitorSQLiteType | null = null;
let SQLiteConnection: any = null;
let SQLiteDBConnection: any = null;

try {
  const sqliteModule = require('@capacitor-community/sqlite');
  CapacitorSQLite = sqliteModule.CapacitorSQLite;
  SQLiteConnection = sqliteModule.SQLiteConnection;
  SQLiteDBConnection = sqliteModule.SQLiteDBConnection;
} catch (e) {
  console.log('[Database] SQLite packages not installed - database operations will be unavailable in web mode');
}

// Database name
const DB_NAME = 'smarthabit.db';
const DB_VERSION = 1;

// Table names
const TABLES = {
  USER: 'user',
  HABITS: 'habits',
  BADGES: 'badges',
  COMPLETIONS: 'completions',
};

export class DatabaseService {
  private db: SQLiteDBConnection | null = null;
  private sqlite: SQLiteConnection | null = null;

  async initialize(): Promise<void> {
    try {
      // Skip database initialization if SQLite is not available (web mode)
      if (!CapacitorSQLite || !SQLiteConnection) {
        console.log('[Database] SQLite not available - skipping database initialization');
        return;
      }

      this.sqlite = new SQLiteConnection(CapacitorSQLite);

      // Check if database exists
      const result = await this.sqlite.checkConnectionsConsistency();
      const isConnected = result.result &&
        result.dbList &&
        result.dbList.includes(DB_NAME);

      if (!isConnected) {
        // Create new database
        await this.sqlite.createConnection(DB_NAME, false, 'no-encryption', DB_VERSION, false);
      }

      // Get connection
      this.db = await this.sqlite.retrieveConnection(DB_NAME);

      // Open database
      await this.db.open();

      // Create tables if they don't exist
      await this.createTables();
    } catch (error) {
      console.error('Database initialization error:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    // User table
    await this.db.run(`
      CREATE TABLE IF NOT EXISTS ${TABLES.USER} (
        id TEXT PRIMARY KEY,
        level INTEGER DEFAULT 1,
        totalXP INTEGER DEFAULT 0,
        lastSentiment TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Habits table
    await this.db.run(`
      CREATE TABLE IF NOT EXISTS ${TABLES.HABITS} (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        emoji TEXT,
        category TEXT,
        frequency TEXT,
        effort TEXT,
        streak INTEGER DEFAULT 0,
        bestStreak INTEGER DEFAULT 0,
        lastCompleted DATETIME,
        totalCompletions INTEGER DEFAULT 0,
        emotionalSupport INTEGER DEFAULT 1,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Badges table
    await this.db.run(`
      CREATE TABLE IF NOT EXISTS ${TABLES.BADGES} (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        emoji TEXT,
        unlocked INTEGER DEFAULT 0,
        unlockedAt DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Completions table (for tracking daily completions)
    await this.db.run(`
      CREATE TABLE IF NOT EXISTS ${TABLES.COMPLETIONS} (
        id TEXT PRIMARY KEY,
        habitId TEXT NOT NULL,
        sentiment TEXT,
        reflection TEXT,
        completedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (habitId) REFERENCES ${TABLES.HABITS}(id) ON DELETE CASCADE
      )
    `);
  }

  // User operations
  async initializeUser(userId: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const result = await this.db.query(`SELECT * FROM ${TABLES.USER} WHERE id = ?`, [userId]);
    
    if (!result.values || result.values.length === 0) {
      await this.db.run(
        `INSERT INTO ${TABLES.USER} (id, level, totalXP) VALUES (?, ?, ?)`,
        [userId, 1, 0]
      );
    }
  }

  async getUserData(userId: string): Promise<{
    level: number;
    totalXP: number;
    lastSentiment: Sentiment | null;
  } | null> {
    if (!this.db) throw new Error('Database not initialized');

    const result = await this.db.query(
      `SELECT level, totalXP, lastSentiment FROM ${TABLES.USER} WHERE id = ?`,
      [userId]
    );

    if (result.values && result.values.length > 0) {
      return result.values[0] as any;
    }
    return null;
  }

  async updateUserXP(userId: string, totalXP: number, newLevel: number): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.run(
      `UPDATE ${TABLES.USER} SET totalXP = ?, level = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
      [totalXP, newLevel, userId]
    );
  }

  async updateUserSentiment(userId: string, sentiment: Sentiment): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.run(
      `UPDATE ${TABLES.USER} SET lastSentiment = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
      [sentiment, userId]
    );
  }

  // Habit operations
  async createHabit(habit: Habit): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.run(
      `INSERT INTO ${TABLES.HABITS} (
        id, name, emoji, category, frequency, effort, streak, bestStreak,
        totalCompletions, emotionalSupport
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        habit.id,
        habit.name,
        habit.emoji,
        habit.category,
        habit.frequency,
        habit.effort,
        habit.streak,
        habit.bestStreak,
        habit.totalCompletions,
        habit.emotionalSupport ? 1 : 0,
      ]
    );
  }

  async getAllHabits(): Promise<Habit[]> {
    if (!this.db) throw new Error('Database not initialized');

    const result = await this.db.query(`SELECT * FROM ${TABLES.HABITS} ORDER BY createdAt DESC`);

    if (!result.values) return [];

    return result.values.map((row: any) => ({
      id: row.id,
      name: row.name,
      emoji: row.emoji,
      category: row.category,
      frequency: row.frequency,
      effort: row.effort,
      streak: row.streak,
      bestStreak: row.bestStreak,
      lastCompleted: row.lastCompleted ? new Date(row.lastCompleted) : null,
      totalCompletions: row.totalCompletions,
      emotionalSupport: row.emotionalSupport === 1,
    }));
  }

  async getHabitById(habitId: string): Promise<Habit | null> {
    if (!this.db) throw new Error('Database not initialized');

    const result = await this.db.query(
      `SELECT * FROM ${TABLES.HABITS} WHERE id = ?`,
      [habitId]
    );

    if (!result.values || result.values.length === 0) return null;

    const row = result.values[0];
    return {
      id: row.id,
      name: row.name,
      emoji: row.emoji,
      category: row.category,
      frequency: row.frequency,
      effort: row.effort,
      streak: row.streak,
      bestStreak: row.bestStreak,
      lastCompleted: row.lastCompleted ? new Date(row.lastCompleted) : null,
      totalCompletions: row.totalCompletions,
      emotionalSupport: row.emotionalSupport === 1,
    };
  }

  async updateHabit(habit: Habit): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.run(
      `UPDATE ${TABLES.HABITS} SET
        name = ?, emoji = ?, category = ?, frequency = ?, effort = ?,
        streak = ?, bestStreak = ?, lastCompleted = ?, totalCompletions = ?,
        emotionalSupport = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [
        habit.name,
        habit.emoji,
        habit.category,
        habit.frequency,
        habit.effort,
        habit.streak,
        habit.bestStreak,
        habit.lastCompleted?.toISOString(),
        habit.totalCompletions,
        habit.emotionalSupport ? 1 : 0,
        habit.id,
      ]
    );
  }

  async deleteHabit(habitId: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.run(`DELETE FROM ${TABLES.HABITS} WHERE id = ?`, [habitId]);
  }

  // Badge operations
  async initializeBadges(badges: Badge[]): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    for (const badge of badges) {
      const result = await this.db.query(
        `SELECT id FROM ${TABLES.BADGES} WHERE id = ?`,
        [badge.id]
      );

      if (!result.values || result.values.length === 0) {
        await this.db.run(
          `INSERT INTO ${TABLES.BADGES} (id, name, emoji, unlocked) VALUES (?, ?, ?, ?)`,
          [badge.id, badge.name, badge.emoji, badge.unlocked ? 1 : 0]
        );
      }
    }
  }

  async getAllBadges(): Promise<Badge[]> {
    if (!this.db) throw new Error('Database not initialized');

    const result = await this.db.query(`SELECT * FROM ${TABLES.BADGES}`);

    if (!result.values) return [];

    return result.values.map((row: any) => ({
      id: row.id,
      name: row.name,
      emoji: row.emoji,
      unlocked: row.unlocked === 1,
      unlockedAt: row.unlockedAt ? new Date(row.unlockedAt) : undefined,
    }));
  }

  async unlockBadge(badgeId: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.run(
      `UPDATE ${TABLES.BADGES} SET unlocked = 1, unlockedAt = CURRENT_TIMESTAMP WHERE id = ?`,
      [badgeId]
    );
  }

  // Completion tracking
  async recordCompletion(
    habitId: string,
    sentiment: Sentiment,
    reflection?: string
  ): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const id = `completion-${Date.now()}`;
    await this.db.run(
      `INSERT INTO ${TABLES.COMPLETIONS} (id, habitId, sentiment, reflection) VALUES (?, ?, ?, ?)`,
      [id, habitId, sentiment, reflection || null]
    );
  }

  async getCompletionsForHabit(habitId: string): Promise<any[]> {
    if (!this.db) throw new Error('Database not initialized');

    const result = await this.db.query(
      `SELECT * FROM ${TABLES.COMPLETIONS} WHERE habitId = ? ORDER BY completedAt DESC`,
      [habitId]
    );

    return result.values || [];
  }

  // Database maintenance
  async exportAllData(): Promise<GameState> {
    if (!this.db) throw new Error('Database not initialized');

    const habits = await this.getAllHabits();
    const badges = await this.getAllBadges();
    const userData = await this.getUserData('user-1');

    return {
      userId: 'user-1',
      level: userData?.level || 1,
      totalXP: userData?.totalXP || 0,
      habits,
      badges,
      completedToday: [],
      lastSentiment: (userData?.lastSentiment as Sentiment) || null,
    };
  }

  async resetDatabase(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    // Delete all data from tables
    await this.db.run(`DELETE FROM ${TABLES.COMPLETIONS}`);
    await this.db.run(`DELETE FROM ${TABLES.HABITS}`);
    await this.db.run(`DELETE FROM ${TABLES.BADGES}`);
    await this.db.run(`DELETE FROM ${TABLES.USER}`);
  }

  async closeDatabase(): Promise<void> {
    if (this.db) {
      await this.sqlite?.closeConnection(DB_NAME);
      this.db = null;
    }
  }
}

// Singleton instance
export const databaseService = new DatabaseService();

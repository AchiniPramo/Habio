import { useNavigate } from "react-router-dom";
import { useGame } from "@/store/gameStore";
import { calculateLevel, calculateLevelProgress } from "@/lib/gamificationUtils";

export default function Progress() {
  const navigate = useNavigate();
  const { state: gameState } = useGame();

  const levelProgress = calculateLevelProgress(gameState.totalXP);
  const totalHabits = gameState.habits.length;
  const totalCompletions = gameState.habits.reduce(
    (sum, h) => sum + h.totalCompletions,
    0
  );
  const maxStreak = Math.max(
    0,
    ...gameState.habits.map((h) => h.bestStreak)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      <button
        onClick={() => navigate("/home")}
        className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Your Progress
        </h1>

        {/* Level & XP Ring */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-border mb-8 text-center">
          <div className="inline-flex relative w-40 h-40 items-center justify-center mb-6">
            {/* XP Ring Background */}
            <svg
              className="absolute transform -rotate-90"
              width="160"
              height="160"
              viewBox="0 0 160 160"
            >
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeDasharray={`${(levelProgress.percentage / 100) * 439} 439`}
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" style={{ stopColor: "rgb(99, 102, 241)" }} />
                  <stop offset="100%" style={{ stopColor: "rgb(249, 115, 22)" }} />
                </linearGradient>
              </defs>
            </svg>
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">
                {gameState.level}
              </p>
              <p className="text-xs text-muted-foreground">Level</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-foreground">
              {levelProgress.current} / {levelProgress.target} XP
            </p>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                style={{ width: `${levelProgress.percentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground">
              Total XP: {gameState.totalXP}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white rounded-lg p-4 border border-border text-center">
            <p className="text-2xl font-bold text-primary mb-1">
              {totalHabits}
            </p>
            <p className="text-xs text-muted-foreground">Active Habits</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-border text-center">
            <p className="text-2xl font-bold text-secondary mb-1">
              {totalCompletions}
            </p>
            <p className="text-xs text-muted-foreground">Completions</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-border text-center">
            <p className="text-2xl font-bold text-accent mb-1">{maxStreak}</p>
            <p className="text-xs text-muted-foreground">Best Streak</p>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Achievements</h2>
          <div className="grid grid-cols-3 gap-3">
            {gameState.badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-lg text-center border-2 transition-all ${
                  badge.unlocked
                    ? "bg-white border-primary shadow-md"
                    : "bg-muted border-muted opacity-50"
                }`}
              >
                <p
                  className="text-3xl mb-2 filter"
                  style={{ filter: badge.unlocked ? "none" : "grayscale(100%)" }}
                >
                  {badge.emoji}
                </p>
                <p className="text-xs font-semibold text-foreground">
                  {badge.name}
                </p>
                {badge.unlocked && (
                  <p className="text-xs text-accent mt-1">✓</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Habit Stats */}
        {gameState.habits.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">
              Habit Stats
            </h2>
            <div className="space-y-3">
              {gameState.habits.map((habit) => (
                <div
                  key={habit.id}
                  className="bg-white rounded-lg p-4 border border-border hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-xl">{habit.emoji}</p>
                    <p className="font-semibold text-foreground flex-1">
                      {habit.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Current: {habit.streak} days {habit.streak > 0 && "🔥"}
                    </span>
                    <span className="text-accent font-semibold">
                      Best: {habit.bestStreak} days
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {habit.totalCompletions} completions
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {gameState.habits.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center border border-border mb-32">
            <p className="text-muted-foreground mb-4">
              No habits created yet. Start your journey!
            </p>
            <button
              onClick={() => navigate("/habit-intent")}
              className="inline-block bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:shadow-md transition-all"
            >
              Create First Habit
            </button>
          </div>
        )}

        {/* Padding for bottom navigation */}
        <div className="h-24"></div>
      </div>
    </div>
  );
}

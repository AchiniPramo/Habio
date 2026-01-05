import { useNavigate } from "react-router-dom";
import { useGame } from "@/store/gameStore";
import { calculateLevelProgress } from "@/lib/gamificationUtils";

export default function Home() {
  const navigate = useNavigate();
  const { state: gameState } = useGame();

  const levelProgress = calculateLevelProgress(gameState.totalXP);

  // Get top habit by streak for mood display
  const topHabitByStreak = gameState.habits.reduce(
    (max, habit) => (habit.streak > (max?.streak || 0) ? habit : max),
    null as any,
  );

  const getMoodEmoji = () => {
    if (gameState.level >= 5) return "🌟";
    if (gameState.totalXP >= 50) return "😊";
    return "😐";
  };

  const completedTodayCount = gameState.completedToday.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      {/* Header with Avatar & Mood */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-2xl shadow-md">
            ✨
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Mood</p>
            <p className="text-lg font-semibold flex items-center gap-1">
              {getMoodEmoji()} Great
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/settings")}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>

      {/* XP Bar & Level */}
      <div className="bg-white rounded-xl p-4 mb-8 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold text-foreground">
            Level {gameState.level}
          </p>
          <p className="text-sm text-muted-foreground">
            {levelProgress.current} / {levelProgress.target} XP
          </p>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
            style={{ width: `${levelProgress.percentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Total XP: {gameState.totalXP}
        </p>
      </div>

      {/* Today's Habits */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Today's Habits</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full">
              {completedTodayCount} / {gameState.habits.length}
            </span>
            <button
              onClick={() => navigate("/habit-creation")}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold py-2 px-3 rounded-lg hover:shadow-md transition-all"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v14M5 12h14"
                />
              </svg>
              Create New Habit
            </button>
          </div>
        </div>

        {gameState.habits.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-border">
            <p className="text-muted-foreground mb-4">No habits yet</p>
            <button
              onClick={() => navigate("/habit-creation")}
              className="inline-block bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:shadow-md transition-all"
            >
              Create Your First Habit
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {gameState.habits.map((habit, idx) => {
              const isCompleted = gameState.completedToday.includes(habit.id);
              return (
                <button
                  key={habit.id}
                  onClick={() => navigate(`/habit-detail/${idx}`)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                    isCompleted
                      ? "bg-primary/20 border-2 border-primary"
                      : "bg-white border-2 border-border hover:border-primary hover:shadow-md"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => {}}
                    className="w-5 h-5 rounded-md cursor-pointer"
                  />
                  <span className="text-xl">{habit.emoji}</span>
                  <div className="flex-1 text-left">
                    <p
                      className={`font-semibold ${isCompleted ? "line-through text-muted-foreground" : "text-foreground"}`}
                    >
                      {habit.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Streak: {habit.streak} days
                      {habit.streak > 0 && " 🔥"}
                    </p>
                  </div>
                  <span className="text-lg">→</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-br from-accent/20 to-secondary/20 rounded-xl p-4 mb-32 border border-accent/30">
        <p className="text-sm text-foreground">
          {gameState.level >= 3 ? (
            <span>
              <span className="font-bold">🚀 You're leveling up fast!</span>{" "}
              Keep the momentum going.
            </span>
          ) : (
            <span>
              <span className="font-bold">💡 Tip:</span> Consistent habits build
              strong streaks.
            </span>
          )}
        </p>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-3 flex items-center justify-around">
        <button className="flex flex-col items-center gap-1 text-primary">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v16.5A2.25 2.25 0 003.75 22.5h16.5a2.25 2.25 0 002.25-2.25V10.5" />
            <path d="M13.5 3.75v6.75m6.75-6.75v6.75" />
          </svg>
          <span className="text-xs font-semibold">Home</span>
        </button>
        <button
          onClick={() => navigate("/progress")}
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="text-xs font-semibold">Progress</span>
        </button>
      </div>
    </div>
  );
}

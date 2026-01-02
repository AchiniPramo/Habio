import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGame } from "@/store/gameStore";

export default function HabitDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state: gameState } = useGame();
  const [isMarking, setIsMarking] = useState(false);

  const habitIndex = parseInt(id || "0");
  const habit = gameState.habits[habitIndex];

  if (!habit) {
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

        <div className="max-w-md mx-auto text-center mt-20">
          <p className="text-lg text-muted-foreground">Habit not found</p>
        </div>
      </div>
    );
  }

  const handleMarkDone = () => {
    setIsMarking(true);
    setTimeout(() => {
      navigate("/daily-reflection", {
        state: { habitId: habit.id },
      });
    }, 300);
  };

  // Get day of week for calendar
  const getDayOfWeek = (offset: number) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - offset));
    return date;
  };

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const isCompletedToday = gameState.completedToday.includes(habit.id);

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
        <h1 className="text-3xl font-bold text-foreground mb-6">
          {habit.emoji} {habit.name}
        </h1>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-border mb-8 space-y-6">
          {/* Streak Info */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Current Streak</p>
            <p className="text-4xl font-bold text-foreground">
              🔥 {habit.streak} days
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Best: {habit.bestStreak} days
            </p>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mb-3">Completions</p>
            <p className="text-2xl font-bold text-accent">
              {habit.totalCompletions} times
            </p>
          </div>

          {/* Week Calendar */}
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mb-4">This Week</p>
            <div className="flex gap-2 justify-between">
              {daysOfWeek.map((day, idx) => {
                const dayDate = getDayOfWeek(idx);
                const isToday =
                  dayDate.toDateString() === new Date().toDateString();
                const isCompleted = isCompletedToday && isToday;

                return (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-bold transition-all ${
                        isCompleted
                          ? "bg-primary text-primary-foreground shadow-md"
                          : isToday
                            ? "bg-secondary text-secondary-foreground"
                            : idx < 5
                              ? "bg-accent/20 text-accent"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? "✓" : ""}
                    </div>
                    <span className="text-xs text-muted-foreground">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Habit Details */}
          <div className="border-t border-border pt-4 grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Frequency</p>
              <p className="font-semibold text-foreground capitalize">
                {habit.frequency}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Effort</p>
              <p className="font-semibold text-foreground capitalize">
                {habit.effort}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Support</p>
              <p className="font-semibold text-foreground">
                {habit.emotionalSupport ? "✓" : "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Mark as Done Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent px-4 py-6">
          <button
            onClick={handleMarkDone}
            disabled={isCompletedToday || isMarking}
            className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
              isCompletedToday
                ? "bg-primary/50 text-primary-foreground cursor-not-allowed"
                : isMarking
                  ? "scale-95 opacity-90"
                  : "bg-primary text-primary-foreground shadow-lg hover:shadow-xl active:scale-95"
            }`}
          >
            {isCompletedToday ? "✓ Completed Today" : "Mark as Done"}
          </button>
        </div>

        {/* Padding for fixed button */}
        <div className="h-24"></div>
      </div>
    </div>
  );
}

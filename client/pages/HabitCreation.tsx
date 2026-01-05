import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGame } from "@/store/gameStore";
import type { Habit } from "@/store/gameStore";
import {
  calculateLevelProgress,
  calculateXPGain,
} from "@/lib/gamificationUtils";

export default function HabitCreation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addHabit } = useGame();
  const { state: gameState } = useGame();
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [effort, setEffort] = useState("medium");
  const [emotionalSupport, setEmotionalSupport] = useState(true);

  const categoryEmojis: { [key: string]: string } = {
    health: "🏃",
    focus: "🧠",
    learning: "📘",
    mindfulness: "🌿",
  };

  const handleSave = () => {
    if (habitName.trim()) {
      const category = (location.state?.category as string) || "health";
      const newHabit: Habit = {
        id: `habit-${Date.now()}`,
        name: habitName,
        emoji: categoryEmojis[category] || "✨",
        category,
        frequency: frequency as "daily" | "weekly",
        effort: effort as "low" | "medium" | "high",
        streak: 0,
        bestStreak: 0,
        lastCompleted: null,
        totalCompletions: 0,
        emotionalSupport,
      };
      addHabit(newHabit);
      navigate("/home");
    }
  };

  // Estimate XP based on selected effort and neutral sentiment
  const baseXP = effort === "low" ? 5 : effort === "high" ? 20 : 10;
  const estimatedXP = calculateXPGain({
    baseXP,
    streak: 0,
    sentiment: "neutral",
  });
  const projected = calculateLevelProgress(gameState.totalXP + estimatedXP);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate("/habit-intent")}
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

      {/* Header */}
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Create Your Habit
        </h1>
        <p className="text-muted-foreground text-sm">
          Define the habit you want to build
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6 mb-32">
        {/* Habit Name Input */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Habit Name
          </label>
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            placeholder="e.g., Morning Run, Read Daily"
            className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none transition-colors bg-white"
          />
        </div>

        {/* Frequency Toggle */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Frequency
          </label>
          <div className="flex gap-3">
            {["daily", "weekly"].map((freq) => (
              <button
                key={freq}
                onClick={() => setFrequency(freq)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                  frequency === freq
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Effort Level */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Effort Level
          </label>
          <div className="flex gap-2">
            {["low", "medium", "high"].map((level) => (
              <button
                key={level}
                onClick={() => setEffort(level)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                  effort === level
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* XP Preview */}
        <div className="bg-white rounded-lg p-4 border border-border">
          <p className="text-sm font-semibold text-foreground mb-2">
            Estimated XP
          </p>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-lg font-bold">{estimatedXP} XP</p>
              <p className="text-xs text-muted-foreground">
                per completion (preview)
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Level Progress</p>
              <p className="text-sm font-semibold">
                {projected.current} / {projected.target} XP
              </p>
            </div>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
              style={{ width: `${projected.percentage}%` }}
            />
          </div>
        </div>

        {/* Emotional Support Toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-accent/10 border border-accent/20">
          <div>
            <p className="font-semibold text-foreground">Emotional Support</p>
            <p className="text-xs text-muted-foreground">
              Get supportive messages and celebrations
            </p>
          </div>
          <button
            onClick={() => setEmotionalSupport(!emotionalSupport)}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              emotionalSupport ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                emotionalSupport ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent px-4 py-6">
        <button
          onClick={handleSave}
          disabled={!habitName.trim()}
          className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
            habitName.trim()
              ? "bg-primary text-primary-foreground shadow-lg hover:shadow-xl"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          Save Habit
        </button>
      </div>
    </div>
  );
}

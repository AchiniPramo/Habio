import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/store/gameStore";
import type { Sentiment } from "@/store/gameStore";

export default function DailyReflection() {
  const navigate = useNavigate();
  const { setSentiment } = useGame();
  const [mood, setMood] = useState(2);
  const [reflection, setReflection] = useState("");

  const moods = [
    { emoji: "😔", label: "Low", value: 0, sentiment: "negative" as Sentiment },
    { emoji: "😐", label: "Neutral", value: 1, sentiment: "neutral" as Sentiment },
    { emoji: "😊", label: "Positive", value: 2, sentiment: "positive" as Sentiment },
  ];

  const handleDone = () => {
    const sentiment = moods[mood].sentiment;
    setSentiment(sentiment);
    navigate("/emotional-response", {
      state: { mood: moods[mood].label, sentiment, reflection },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      <button
        onClick={() => navigate("/habit-detail/0")}
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
        <h1 className="text-3xl font-bold text-foreground mb-2">
          How did today feel?
        </h1>
        <p className="text-muted-foreground mb-8">
          Your feelings help us understand your journey better.
        </p>

        {/* Emoji Slider */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-border mb-8 text-center">
          <p className="text-6xl mb-6 animate-pulse-soft">{moods[mood].emoji}</p>
          <div className="flex gap-2 justify-center mb-6">
            {moods.map((m) => (
              <button
                key={m.value}
                onClick={() => setMood(m.value)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  mood === m.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <input
            type="range"
            min="0"
            max="2"
            value={mood}
            onChange={(e) => setMood(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Optional Text Input */}
        <div className="mb-32">
          <label className="block text-sm font-semibold text-foreground mb-3">
            Optional: How was your day?
          </label>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none transition-colors bg-white resize-none h-32"
          />
        </div>

        {/* Done Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent px-4 py-6">
          <button
            onClick={handleDone}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

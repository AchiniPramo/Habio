import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGame } from "@/store/gameStore";
import type { Sentiment } from "@/store/gameStore";
import { getSentimentConfig, calculateLevel } from "@/lib/gamificationUtils";
import { Confetti, LevelUpAnimation, XPPopup } from "@/components/XPPopup";

interface LocationState {
  mood: string;
  sentiment: Sentiment;
  reflection?: string;
  habitId?: string;
  xpGain?: number;
}

export default function EmotionalResponse() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state: gameState, completeHabit, addXP } = useGame();

  const locationState = (location.state as LocationState) || {};
  const sentiment = locationState.sentiment || "neutral";
  const xpGain = locationState.xpGain || 10;

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showXPPopup, setShowXPPopup] = useState(false);
  const [previousLevel, setPreviousLevel] = useState(gameState.level);
  const [autoNavigate, setAutoNavigate] = useState(false);

  const config = getSentimentConfig(sentiment);

  // Check if level up occurred
  useEffect(() => {
    if (gameState.level > previousLevel) {
      setShowLevelUp(true);
      setShowConfetti(true);
    }
  }, [gameState.level, previousLevel]);

  // Auto navigate after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setAutoNavigate(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (autoNavigate) {
      navigate("/home");
    }
  }, [autoNavigate, navigate]);

  const handleSkipToHome = () => {
    navigate("/home");
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-8 cursor-pointer bg-gradient-to-b ${config.bgColor}`}
      onClick={handleSkipToHome}
    >
      {/* Confetti animation */}
      {showConfetti && <Confetti duration={2000} />}

      {/* Level up animation */}
      {showLevelUp && <LevelUpAnimation level={gameState.level} />}

      {/* XP Popup */}
      {showXPPopup && (
        <XPPopup
          xp={xpGain}
          x={window.innerWidth / 2}
          y={window.innerHeight / 2 - 100}
        />
      )}

      <div className="text-center max-w-md">
        {/* Avatar Celebration */}
        <div className="mb-8">
          <div className="inline-flex relative w-32 h-32 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-white/50 animate-pulse-soft"></div>
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg animate-float">
              <p className="text-6xl animate-bounce">{config.emoji}</p>
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-foreground mb-3">
          {config.message}
        </h1>
        <p className="text-muted-foreground text-base mb-8">
          {config.description}
        </p>

        {/* XP & Stats Card */}
        <div className="bg-white rounded-xl p-6 border-2 border-border mb-8 space-y-4">
          {/* XP Gained */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">XP Earned</p>
            <p className="text-3xl font-bold text-secondary">+{xpGain} XP</p>
          </div>

          {/* Level & Progress */}
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mb-2">
              Level {gameState.level}
            </p>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                style={{
                  width: `${((gameState.totalXP % 100) / 100) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {gameState.totalXP % 100} / 100 XP
            </p>
          </div>
        </div>

        {/* Sentiment-based message */}
        <div
          className={`p-4 rounded-lg bg-white/50 border-2 ${config.borderColor} mb-6`}
        >
          <p className="text-sm font-semibold text-foreground">
            {sentiment === "positive" &&
              "You're in a great headspace! Keep channeling that energy. ✅"}
            {sentiment === "neutral" &&
              "Consistency matters. You showed up, and that counts."}
            {sentiment === "negative" &&
              "It's okay, small steps still count. Rest and try again tomorrow."}
          </p>
        </div>

        {/* Continue Hint */}
        <p className="text-sm text-muted-foreground animate-pulse">
          Tap anywhere to continue...
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const [sentimentAnalysis, setSentimentAnalysis] = useState(true);
  const [avatarReactions, setAvatarReactions] = useState(true);
  const [notificationStyle, setNotificationStyle] = useState("gentle");

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
        <h1 className="text-3xl font-bold text-foreground mb-8">Settings</h1>

        {/* Preferences Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Preferences</h2>

          {/* Sentiment Analysis Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-white border border-border mb-3 hover:shadow-sm transition-all">
            <div>
              <p className="font-semibold text-foreground">Sentiment Analysis</p>
              <p className="text-xs text-muted-foreground">
                Understand your mood patterns
              </p>
            </div>
            <button
              onClick={() => setSentimentAnalysis(!sentimentAnalysis)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                sentimentAnalysis ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  sentimentAnalysis ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Avatar Reactions Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-white border border-border mb-3 hover:shadow-sm transition-all">
            <div>
              <p className="font-semibold text-foreground">Avatar Reactions</p>
              <p className="text-xs text-muted-foreground">
                See your companion react to habits
              </p>
            </div>
            <button
              onClick={() => setAvatarReactions(!avatarReactions)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                avatarReactions ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  avatarReactions ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Notification Style */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Notification Style
          </h2>
          <div className="space-y-2">
            {[
              { value: "gentle", label: "Gentle", description: "Soft reminders" },
              {
                value: "energetic",
                label: "Energetic",
                description: "Enthusiastic motivation",
              },
            ].map((style) => (
              <button
                key={style.value}
                onClick={() => setNotificationStyle(style.value)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  notificationStyle === style.value
                    ? "bg-primary/10 border-primary"
                    : "bg-white border-border hover:border-primary/30"
                }`}
              >
                <p className="font-semibold text-foreground">{style.label}</p>
                <p className="text-sm text-muted-foreground">
                  {style.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="mb-32">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Data & Privacy
          </h2>
          <div className="space-y-2">
            <button
              onClick={() => navigate("/privacy-policy")}
              className="w-full text-left p-4 rounded-lg bg-white border border-border hover:shadow-sm transition-all group"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-foreground">Privacy Policy</p>
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            <button
              onClick={() => navigate("/delete-my-data")}
              className="w-full text-left p-4 rounded-lg bg-white border border-border hover:shadow-sm transition-all group"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-foreground">Delete My Data</p>
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            <button
              onClick={() => navigate("/about")}
              className="w-full text-left p-4 rounded-lg bg-white border border-border hover:shadow-sm transition-all group"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-foreground">About</p>
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      <button
        onClick={() => navigate("/settings")}
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

      <div className="max-w-2xl mx-auto mb-32">
        {/* Header */}
        <div className="mb-8">
          <div className="text-5xl mb-4 text-center">✨</div>
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
            Smart Habit Tracker
          </h1>
          <p className="text-center text-muted-foreground">
            Version 1.0.0
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl p-6 border border-border space-y-8">
          {/* Mission */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Our Mission
            </h2>
            <p className="text-foreground leading-relaxed">
              To help people build positive routines with engaging, emotion-aware
              feedback. We don't just track habits — we celebrate progress and
              support you through setbacks.
            </p>
          </section>

          {/* Why We Built This */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Why We Built This
            </h2>
            <p className="text-foreground leading-relaxed">
              We wanted an app that feels human, motivating, and positive,
              because building habits should feel like growth, not guilt. Most
              habit trackers punish failure and ignore emotions. We built Smart
              Habit Tracker to be your genuine companion.
            </p>
          </section>

          {/* Key Features */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              Key Features
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="text-3xl">🎮</div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Gamification</h3>
                  <p className="text-sm text-muted-foreground">
                    Earn XP, level up, unlock badges, and celebrate streaks with
                    engaging rewards
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="text-3xl">💙</div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">
                    Sentiment Awareness
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    The app reacts to your mood, making your journey supportive
                    and personalized for every day
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="text-3xl">🔒</div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">
                    Streak Protection
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Even on tough days, your habits are encouraged, not punished
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="text-3xl">📊</div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">
                    Progress Tracking
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    View detailed stats, streaks, and achievements to see your
                    growth over time
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-2xl">❤️</span>
              Our Values
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <p className="text-2xl mb-2">🤝</p>
                <p className="font-semibold text-foreground text-sm">
                  User-Centric
                </p>
              </div>
              <div className="bg-accent/10 rounded-lg p-4 text-center">
                <p className="text-2xl mb-2">🔐</p>
                <p className="font-semibold text-foreground text-sm">
                  Privacy First
                </p>
              </div>
              <div className="bg-secondary/10 rounded-lg p-4 text-center">
                <p className="text-2xl mb-2">✨</p>
                <p className="font-semibold text-foreground text-sm">
                  Transparent
                </p>
              </div>
              <div className="bg-accent/10 rounded-lg p-4 text-center">
                <p className="text-2xl mb-2">💪</p>
                <p className="font-semibold text-foreground text-sm">
                  Empowering
                </p>
              </div>
            </div>
          </section>

          {/* Contact & Support */}
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-2xl">💬</span>
              Get in Touch
            </h2>
            <p className="text-sm text-foreground mb-4">
              We'd love to hear from you! Have questions, suggestions, or just
              want to say hello?
            </p>
            <div className="space-y-2">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <p className="font-semibold text-foreground">
                  support@smarthabittracker.com
                </p>
              </div>
            </div>
          </section>

          {/* Gratitude */}
          <section className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl p-6 text-center border border-primary/30">
            <p className="text-lg font-semibold text-foreground mb-2">
              Thank you for using Smart Habit Tracker!
            </p>
            <p className="text-sm text-muted-foreground">
              Together, we're building better habits, one day at a time. 🚀
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

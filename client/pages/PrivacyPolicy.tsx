import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
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
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: Today
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl p-6 border border-border space-y-8">
          {/* Intro */}
          <section>
            <p className="text-sm leading-relaxed text-foreground">
              At <span className="font-semibold">Smart Habit Tracker</span>, your
              privacy and data security are our top priorities. We believe in
              keeping your personal information safe while helping you build
              healthy habits.
            </p>
          </section>

          {/* What We Collect */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              What We Collect
            </h2>
            <div className="space-y-3 text-sm text-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Habit Data
                </h3>
                <p className="text-muted-foreground">
                  Completed habits, streaks, and progress information
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Mood & Sentiment Data
                </h3>
                <p className="text-muted-foreground">
                  Emoji or text reflections (optional and user-initiated)
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Usage Analytics
                </h3>
                <p className="text-muted-foreground">
                  For app improvement and bug fixing
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Your Data */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              How We Use Your Data
            </h2>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>To personalize your habit journey</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>To calculate streaks, XP, and gamification rewards</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>
                  To provide insights and trends for your habits
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>To improve app functionality and performance</span>
              </li>
            </ul>
          </section>

          {/* Your Choices */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-2xl">⚙️</span>
              Your Choices
            </h2>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-primary/10 rounded-lg">
                <p className="text-foreground font-semibold mb-1">
                  Opt-Out of Sentiment Tracking
                </p>
                <p className="text-muted-foreground">
                  You can disable sentiment analysis anytime in Settings
                </p>
              </div>
              <div className="p-3 bg-accent/10 rounded-lg">
                <p className="text-foreground font-semibold mb-1">
                  Request Data Deletion
                </p>
                <p className="text-muted-foreground">
                  You can permanently delete all your data at any time
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              Data Security
            </h2>
            <p className="text-sm text-foreground leading-relaxed">
              We use industry-standard encryption and security practices to
              protect your information. Your data is stored securely and never
              shared with third parties without your explicit consent.
            </p>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-2xl">📝</span>
              Updates to Privacy Policy
            </h2>
            <p className="text-sm text-foreground leading-relaxed">
              We may update this policy from time to time. We will notify you of
              significant changes in the app and request your consent if
              required.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t border-border pt-8">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-2xl">💬</span>
              Questions?
            </h2>
            <p className="text-sm text-foreground mb-3">
              If you have any questions about our privacy practices, please
              reach out to us:
            </p>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-foreground font-semibold">
                Email: support@smarthabittracker.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

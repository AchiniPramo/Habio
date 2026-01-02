import { useNavigate, useParams } from "react-router-dom";

export default function MissedDayRecovery() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8 flex flex-col items-center justify-center">
      <div className="max-w-md text-center">
        {/* Avatar Support */}
        <div className="mb-8">
          <div className="inline-flex relative w-32 h-32 items-center justify-center">
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg">
              <p className="text-6xl">💙</p>
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-foreground mb-3">
          You took a pause.
        </h1>
        <p className="text-muted-foreground mb-8">
          Want to continue with your habit? No pressure — we're here to support you.
        </p>

        {/* Options */}
        <div className="space-y-3 mb-32">
          <button
            onClick={() => navigate("/home")}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:shadow-lg transition-all"
          >
            Resume Habit
          </button>
          <button
            onClick={() => navigate("/home")}
            className="w-full border-2 border-border text-foreground font-semibold py-3 rounded-xl hover:bg-muted transition-all"
          >
            Adjust Goal
          </button>
          <button
            onClick={() => navigate("/home")}
            className="w-full border-2 border-border text-foreground font-semibold py-3 rounded-xl hover:bg-muted transition-all"
          >
            Take a Break
          </button>
        </div>
      </div>
    </div>
  );
}

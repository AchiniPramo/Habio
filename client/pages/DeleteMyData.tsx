import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/store/gameStore";

export default function DeleteMyData() {
  const navigate = useNavigate();
  const { resetAllData } = useGame();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleting(true);
    // Simulate deletion process
    setTimeout(() => {
      resetAllData();
      setIsDeleting(false);
      // Redirect to home after deletion
      setTimeout(() => {
        navigate("/home");
      }, 500);
    }, 1000);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

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

      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Delete My Data
          </h1>
          <p className="text-sm text-muted-foreground">
            Permanent data deletion
          </p>
        </div>

        {/* Warning Card */}
        <div className="bg-destructive/10 border-2 border-destructive rounded-xl p-6 mb-8">
          <div className="flex gap-4">
            <div className="text-3xl flex-shrink-0">⚠️</div>
            <div>
              <h2 className="font-bold text-destructive mb-2">
                This action is irreversible
              </h2>
              <p className="text-sm text-foreground">
                Make sure you really want to delete everything before
                proceeding. This cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* What Gets Deleted */}
        <div className="bg-white rounded-xl p-6 border border-border mb-8">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="text-xl">🗑️</span>
            What gets deleted:
          </h2>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm">
              <span className="text-destructive font-bold">✕</span>
              <span className="text-foreground">
                All habit and progress data
              </span>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="text-destructive font-bold">✕</span>
              <span className="text-foreground">
                Your streaks, XP, and achievements
              </span>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="text-destructive font-bold">✕</span>
              <span className="text-foreground">
                Sentiment history and reflections
              </span>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="text-destructive font-bold">✕</span>
              <span className="text-foreground">
                All personal information
              </span>
            </li>
          </ul>
        </div>

        {/* What Remains */}
        <div className="bg-accent/10 rounded-xl p-6 mb-32">
          <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="text-xl">ℹ️</span>
            After deletion:
          </h2>
          <p className="text-sm text-foreground">
            You can create a new account and start fresh with new habits and
            progress.
          </p>
        </div>

        {/* Delete Button - Only show if not in confirmation mode */}
        {!showConfirmation && (
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent px-4 py-6">
            <button
              onClick={handleDeleteClick}
              className="w-full bg-destructive text-destructive-foreground font-semibold py-3 rounded-xl hover:shadow-lg transition-all active:scale-95"
            >
              Delete My Data
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-scale-in">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Delete Everything?
              </h2>
              <p className="text-sm text-muted-foreground">
                This will permanently erase all your habits, streaks, XP, badges,
                and reflections.
              </p>
            </div>

            {/* Confirmation Details */}
            <div className="bg-destructive/5 rounded-lg p-4 mb-6">
              <p className="text-xs text-foreground font-semibold text-center">
                This action cannot be undone.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                disabled={isDeleting}
                className="flex-1 bg-muted text-foreground font-semibold py-3 rounded-lg hover:bg-muted/80 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className={`flex-1 bg-destructive text-destructive-foreground font-semibold py-3 rounded-lg transition-all ${
                  isDeleting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-lg active:scale-95"
                }`}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success State (brief) */}
      {isDeleting && (
        <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-pulse">✓</div>
            <h2 className="text-xl font-bold text-foreground">Deleting...</h2>
          </div>
        </div>
      )}
    </div>
  );
}

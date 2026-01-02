import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const handleGetStarted = () => {
    setIsClicked(true);
    setTimeout(() => {
      navigate("/habit-intent");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white flex flex-col items-center justify-center px-4 py-8">
      {/* Animated Avatar */}
      <div className="mb-12 mt-6">
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse-soft"></div>

          {/* Avatar circle */}
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg animate-float">
            {/* Avatar emoji/character */}
            <div className="text-6xl select-none">✨</div>
          </div>

          {/* Floating particles effect */}
          <div className="absolute top-2 right-2 w-3 h-3 bg-secondary rounded-full animate-pulse-soft opacity-70"></div>
          <div className="absolute bottom-4 left-2 w-2 h-2 bg-accent rounded-full animate-pulse-soft opacity-50"></div>
        </div>
      </div>

      {/* Headline */}
      <div className="text-center mb-8 max-w-sm">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Build habits that stick — with a companion that cares.
        </h1>
        <p className="text-base text-muted-foreground">
          Your personal habit tracker with emotional intelligence and genuine support.
        </p>
      </div>

      {/* Get Started Button */}
      <button
        onClick={handleGetStarted}
        disabled={isClicked}
        className={`mt-10 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl text-lg transition-all duration-300 transform hover:shadow-lg ${
          isClicked
            ? "scale-95 opacity-90"
            : "hover:scale-105 active:scale-98 shadow-md"
        }`}
      >
        Get Started
      </button>

      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-20 left-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}

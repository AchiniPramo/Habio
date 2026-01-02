import { useEffect, useState } from "react";

interface XPPopupProps {
  xp: number;
  x: number;
  y: number;
  onComplete?: () => void;
}

export function XPPopup({ xp, x, y, onComplete }: XPPopupProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none font-bold text-lg z-50 animate-float"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        color: "rgb(234, 88, 12)",
        textShadow: "0 2px 4px rgba(0,0,0,0.2)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease-out",
      }}
    >
      +{xp} XP
    </div>
  );
}

interface ConfettiProps {
  duration?: number;
}

export function Confetti({ duration = 2000 }: ConfettiProps) {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      left: number;
      delay: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      duration: 2 + Math.random() * 0.5,
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-bounce"
          style={{
            left: `${particle.left}%`,
            top: "-10px",
            fontSize: "1.5rem",
            animation: `fall ${particle.duration}s linear ${particle.delay}s forwards`,
          }}
        >
          {["🎉", "⭐", "🔥", "💫", "✨"][Math.floor(Math.random() * 5)]}
        </div>
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

interface LevelUpProps {
  level: number;
}

export function LevelUpAnimation({ level }: LevelUpProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="animate-scale-in">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-soft"></div>
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary to-secondary flex flex-col items-center justify-center shadow-2xl">
            <p className="text-5xl mb-2">👑</p>
            <p className="text-white font-bold text-sm">LEVEL {level}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

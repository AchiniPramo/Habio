import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HabitIntent() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: "health",
      name: "Health",
      emoji: "🏃",
      description: "Exercise, nutrition & wellness",
      color: "from-red-100 to-orange-100",
      borderColor: "border-orange-300",
    },
    {
      id: "focus",
      name: "Focus",
      emoji: "🧠",
      description: "Productivity & concentration",
      color: "from-blue-100 to-cyan-100",
      borderColor: "border-blue-300",
    },
    {
      id: "learning",
      name: "Learning",
      emoji: "📘",
      description: "Knowledge & growth",
      color: "from-purple-100 to-pink-100",
      borderColor: "border-purple-300",
    },
    {
      id: "mindfulness",
      name: "Mindfulness",
      emoji: "🌿",
      description: "Peace & mental wellness",
      color: "from-green-100 to-emerald-100",
      borderColor: "border-green-300",
    },
  ];

  const handleContinue = () => {
    if (selectedCategory) {
      navigate("/habit-creation", { state: { category: selectedCategory } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
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
      <div className="mb-10 mt-4">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          What do you want to work on?
        </h1>
        <p className="text-muted-foreground text-sm">
          Choose the area of your life you'd like to build better habits in.
        </p>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 transform ${
              selectedCategory === category.id
                ? `bg-gradient-to-br ${category.color} border-2 ${category.borderColor} shadow-lg scale-105`
                : `bg-white border-2 border-transparent hover:border-gray-200 hover:shadow-md`
            }`}
          >
            {/* Decorative background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-30 transition-opacity`}
            ></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="text-4xl mb-3">{category.emoji}</div>
              <h3 className="text-xl font-bold text-foreground mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            </div>

            {/* Selection indicator */}
            {selectedCategory === category.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-scale-in">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent px-4 py-6">
        <button
          onClick={handleContinue}
          disabled={!selectedCategory}
          className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
            selectedCategory
              ? "bg-primary text-primary-foreground shadow-lg hover:shadow-xl"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>

      {/* Padding for fixed button */}
      <div className="h-24"></div>
    </div>
  );
}

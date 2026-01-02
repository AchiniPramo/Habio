import { useEffect, useState } from "react";

interface AppInitializerProps {
  children: React.ReactNode;
}

export function AppInitializer({ children }: AppInitializerProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Lazy import platform utilities to avoid import errors on web
        const { initializePlatform, setupErrorHandling } = await import(
          "@/lib/platformInit"
        );

        // Setup error handling first
        setupErrorHandling();

        // Initialize platform (database, native features, etc.)
        await initializePlatform();

        // Slight delay to ensure all initialization is complete
        await new Promise((resolve) => setTimeout(resolve, 300));

        setIsInitialized(true);
      } catch (err) {
        console.error("App initialization error:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
        // Still mark as initialized even if there's an error
        // The app can work with fallbacks
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="text-5xl mb-4">✨</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Initializing App
          </h1>
          <p className="text-muted-foreground">Setting up your habit tracker...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.warn(
      "App initialized with warnings. Running in limited mode:",
      error.message
    );
  }

  return <>{children}</>;
}

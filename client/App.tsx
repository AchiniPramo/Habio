import "./global.css";

import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "@/store/gameStore";
import { initializePlatform, setupErrorHandling } from "@/lib/platformInit";
import Welcome from "./pages/Welcome";
import HabitIntent from "./pages/HabitIntent";
import HabitCreation from "./pages/HabitCreation";
import Home from "./pages/Home";
import HabitDetail from "./pages/HabitDetail";
import DailyReflection from "./pages/DailyReflection";
import EmotionalResponse from "./pages/EmotionalResponse";
import Progress from "./pages/Progress";
import MissedDayRecovery from "./pages/MissedDayRecovery";
import Settings from "./pages/Settings";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DeleteMyData from "./pages/DeleteMyData";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import { AppInitializer } from "@/components/AppInitializer";

const queryClient = new QueryClient();

const App = () => (
  <AppInitializer>
    <GameProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/habit-intent" element={<HabitIntent />} />
              <Route path="/habit-creation" element={<HabitCreation />} />
              <Route path="/home" element={<Home />} />
              <Route path="/habit-detail/:id" element={<HabitDetail />} />
              <Route path="/daily-reflection" element={<DailyReflection />} />
              <Route path="/emotional-response" element={<EmotionalResponse />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/missed-day-recovery/:id" element={<MissedDayRecovery />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/delete-my-data" element={<DeleteMyData />} />
              <Route path="/about" element={<About />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </GameProvider>
  </AppInitializer>
);

createRoot(document.getElementById("root")!).render(<App />);

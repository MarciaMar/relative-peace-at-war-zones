
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TechniquesList from "./pages/TechniquesList";
import Research from "./pages/Research";
import KidsHome from "./pages/KidsHome";
import KidsBreathing from "./pages/KidsBreathing";
import BreathingTechnique from "./pages/BreathingTechnique";
import JournalingTechnique from "./pages/JournalingTechnique";
import GroundingTechnique from "./pages/GroundingTechnique";
import PMRTechnique from "./pages/PMRTechnique";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/techniques" element={<TechniquesList />} />
          <Route path="/research" element={<Research />} />
          <Route path="/kids" element={<KidsHome />} />
          <Route path="/kids/breathe" element={<KidsBreathing />} />
          <Route path="/technique/breathing" element={<BreathingTechnique />} />
          <Route path="/technique/journaling" element={<JournalingTechnique />} />
          <Route path="/technique/grounding" element={<GroundingTechnique />} />
          <Route path="/technique/pmr" element={<PMRTechnique />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

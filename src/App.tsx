import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import RouteProgressBar from "./components/RouteProgressBar";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { ChatBot } from "./components/chatbot";

const DroneControllerCursor = lazy(() => import("./components/3d/DroneControllerCursor"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Suspense fallback={null}>
          <DroneControllerCursor />
        </Suspense>
        <ChatBot />
        <BrowserRouter>
          <RouteProgressBar />
          <ScrollToTop />
          <ScrollToTopButton />
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

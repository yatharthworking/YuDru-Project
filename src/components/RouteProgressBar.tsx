import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const RouteProgressBar = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timers
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Start loading
    setIsVisible(true);
    setProgress(0);

    // Quickly animate to ~30%
    requestAnimationFrame(() => {
      setProgress(30);
    });

    // Gradually increase to ~80% over time
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 80) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    // Complete the progress after a short delay (simulating page load)
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(100);

      // Hide after completion
      setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 300);
    }, 400);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [location.pathname]);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] h-0.5",
        "pointer-events-none",
        "transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-border/30" />

      {/* Progress bar */}
      <div
        className={cn(
          "h-full bg-primary relative",
          "transition-all duration-300 ease-out"
        )}
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.5)",
        }}
      >
        {/* Glowing tip */}
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-20",
            "bg-gradient-to-r from-transparent to-primary",
            progress > 0 && progress < 100 ? "animate-pulse" : ""
          )}
          style={{
            boxShadow: "0 0 15px hsl(var(--primary)), 0 0 30px hsl(var(--primary) / 0.4)",
          }}
        />
      </div>
    </div>
  );
};

export default RouteProgressBar;

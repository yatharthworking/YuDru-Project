import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = useCallback(() => {
    setIsPressed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setIsPressed(false), 150);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <button
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      aria-label="Scroll to top"
      tabIndex={0}
      className={cn(
        "fixed bottom-24 right-6 z-40 md:bottom-28",
        "w-11 h-11 md:w-12 md:h-12",
        "rounded-full",
        "flex items-center justify-center",
        "bg-secondary/50 backdrop-blur-lg",
        "border border-primary/20",
        "cursor-pointer",
        "outline-none focus-visible:ring-2 focus-visible:ring-primary",
        "transition-all duration-300 ease-out",
        "hover:border-primary/40 hover:bg-secondary/70",
        "group",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none",
        isPressed && "scale-90",
        "motion-reduce:transition-none"
      )}
      style={{
        boxShadow: isVisible ? "0 0 20px hsl(192 95% 55% / 0.12)" : "none",
      }}
    >
      {/* Minimal chevron */}
      <svg
        viewBox="0 0 24 24"
        className={cn(
          "w-5 h-5",
          "transition-transform duration-200",
          "group-hover:-translate-y-0.5",
          isPressed && "translate-y-0.5"
        )}
        fill="none"
      >
        <path
          d="M6 14L12 8L18 14"
          stroke="hsl(192 95% 55%)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;

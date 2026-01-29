import { Link, useLocation } from "react-router-dom";
import { Home, Package, FlaskConical, GraduationCap, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Products", path: "/products", icon: Package },
  { name: "R&D", path: "/research", icon: FlaskConical },
  { name: "Training", path: "/training", icon: GraduationCap },
  { name: "Repair", path: "/repair", icon: Wrench },
];

const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <nav 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-background/95 backdrop-blur-xl border-t border-border/50"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[60px] rounded-lg transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <Icon className={cn("w-5 h-5 transition-transform", isActive && "scale-110")} />
                {isActive && (
                  <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md -z-10" />
                )}
              </div>
              <span className={cn(
                "text-[10px] font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;

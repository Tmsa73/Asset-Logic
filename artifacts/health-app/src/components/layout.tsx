import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Home, Utensils, Dumbbell, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/language-context";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] w-full bg-background flex justify-center">
      <div className="w-full max-w-[430px] bg-background min-h-[100dvh] relative flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto scrollbar-thin" style={{ paddingBottom: "90px" }}>
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

function BottomNav() {
  const [location] = useLocation();
  const { t } = useLang();

  const isActive = (href: string) =>
    href === "/profile"
      ? location === "/profile" || location === "/achievements" || location === "/settings"
      : location === href;

  const renderTab = (tab: { href: string; icon: typeof Home; label: string }) => {
    const Icon = tab.icon;
    const active = isActive(tab.href);
    return (
      <Link
        key={tab.href}
        href={tab.href}
        className="flex-1 flex flex-col items-center justify-center py-2 relative group press-scale"
      >
        <div
          className={cn(
            "relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
            active ? "bg-primary/15" : "bg-transparent group-hover:bg-muted/50"
          )}
        >
          <Icon
            className={cn(
              "w-5 h-5 transition-colors",
              active ? "text-primary" : "text-muted-foreground"
            )}
            strokeWidth={active ? 2.5 : 1.8}
          />
          {active && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute inset-0 rounded-xl bg-primary/20 glow-primary"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
        </div>
        <span
          className={cn(
            "text-[10px] font-medium mt-0.5 transition-colors",
            active ? "text-primary" : "text-muted-foreground"
          )}
        >
          {tab.label}
        </span>
      </Link>
    );
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] h-[70px] glass border-t border-border/50 flex items-center px-2 z-50">
      {renderTab({ href: "/fitness", icon: Dumbbell, label: t("nav_fitness") })}
      {renderTab({ href: "/ai-coach", icon: Sparkles, label: "AI" })}
      {renderTab({ href: "/", icon: Home, label: t("nav_home") })}
      {renderTab({ href: "/nutrition", icon: Utensils, label: t("nav_nutrition") })}
      {renderTab({ href: "/profile", icon: User, label: t("nav_profile") })}
    </nav>
  );
}

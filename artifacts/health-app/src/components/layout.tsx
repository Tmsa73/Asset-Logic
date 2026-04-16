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

  const tabs = [
    { href: "/fitness", icon: Dumbbell, label: t("nav_fitness") },
    { href: "/ai-coach", icon: Sparkles, label: "AI" },
    { href: "/", icon: Home, label: t("nav_home") },
    { href: "/nutrition", icon: Utensils, label: t("nav_nutrition") },
    { href: "/profile", icon: User, label: t("nav_profile") },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card/95 backdrop-blur-xl border-t border-border/40 z-50" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="flex items-stretch h-[62px] px-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const active = isActive(tab.href);
          return (
            <Link key={tab.href} href={tab.href} className="flex-1 flex flex-col items-center justify-center gap-0.5 relative press-scale">
              {active && (
                <motion.div layoutId="tab-pill" className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-b-full bg-primary" transition={{ type: "spring", bounce: 0.3, duration: 0.35 }} />
              )}
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200",
                active ? "bg-primary/12" : ""
              )}>
                <Icon className={cn("transition-all duration-200", active ? "w-5 h-5 text-primary" : "w-5 h-5 text-muted-foreground/70")} strokeWidth={active ? 2.5 : 1.8} />
              </div>
              <span className={cn("text-[10px] font-semibold leading-none transition-colors", active ? "text-primary" : "text-muted-foreground/60")}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

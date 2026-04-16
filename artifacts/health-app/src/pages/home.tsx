import { useState } from "react";
import { useGetDashboard, useGetAiInsights, useGetWaterIntake, useGetSteps, useGetProgress, useGetLifeBalance, useGetNotifications, useMarkNotificationRead, useLogWater, getGetWaterIntakeQueryKey, getGetDashboardQueryKey, getGetNotificationsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Bell, Droplets, Footprints, Moon, Flame, Zap, TrendingUp, TrendingDown, Dumbbell, Utensils, Sparkles, Brain, X, Trophy, Crown, ChevronRight, Coins, Sword, CheckCheck, Star, BedDouble, Activity } from "lucide-react";
import { Link } from "wouter";
import { getActiveTitle, calcLevel, calcMomentumScore, getStoredTitleId } from "@/lib/gamification";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/contexts/language-context";
import { MealIqQuiz } from "@/components/meal-iq-quiz";
import { playGamificationSound } from "@/lib/sounds";

export default function Home() {
  const [notifOpen, setNotifOpen] = useState(false);
  const { data: dashboard, isLoading } = useGetDashboard();
  const { data: insights } = useGetAiInsights();
  const { data: water } = useGetWaterIntake();
  const { data: steps } = useGetSteps();
  const { data: progress } = useGetProgress();
  const { data: balance } = useGetLifeBalance();
  const { data: notifications } = useGetNotifications();
  const markRead = useMarkNotificationRead();
  const logWater = useLogWater();
  const qc = useQueryClient();
  const { toast } = useToast();
  const { t } = useLang();

  const [acceptedChallenges] = useState<{id: string; title: string; icon: string; read: boolean}[]>(() => {
    try { return JSON.parse(localStorage.getItem("bodylogic-accepted-challenges") ?? "[]"); } catch { return []; }
  });
  const [localChallengeRead, setLocalChallengeRead] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem("bodylogic-challenge-read") ?? "[]")); } catch { return new Set(); }
  });

  const unreadCount = (notifications?.filter(n => !n.read).length ?? 0) + acceptedChallenges.filter(c => !localChallengeRead.has(c.id)).length;

  const addWater = (ml: number) => {
    logWater.mutate({ data: { amountMl: ml } }, {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getGetWaterIntakeQueryKey() });
        qc.invalidateQueries({ queryKey: getGetDashboardQueryKey() });
        toast({ title: `+${ml}ml added 💧`, description: "Water intake updated!" });
        playGamificationSound("xp");
      }
    });
  };

  if (isLoading || !dashboard) return <HomeSkeleton />;

  const levelInfo = progress ? calcLevel(progress.xp) : null;
  const calPct = Math.min(100, Math.round((dashboard.todayCalories / dashboard.calorieGoal) * 100));
  const stepsPct = Math.min(100, Math.round(((steps?.todaySteps ?? dashboard.todaySteps) / (steps?.stepGoal ?? dashboard.stepGoal)) * 100));
  const waterPct = Math.min(100, Math.round(((water?.totalMl ?? dashboard.waterMl) / (water?.goalMl ?? dashboard.waterGoalMl)) * 100));

  const momentumData = calcMomentumScore({
    currentStreak: progress?.stats?.currentStreak ?? 0,
    totalWorkoutsThisWeek: Math.ceil((progress?.stats?.totalWorkouts ?? 0) / 4),
    mealsLoggedToday: Math.min(3, Math.floor(dashboard.todayCalories / 500)),
    waterGoalMet: waterPct >= 100,
    sleepHoursLast: dashboard.lastSleepHours,
  });

  const getBalanceGradeColor = (score: number) => {
    if (score >= 80) return "text-primary";
    if (score >= 60) return "text-yellow-400";
    if (score >= 40) return "text-orange-400";
    return "text-destructive";
  };

  const getMealIQColor = (score: number | null | undefined) => {
    if (!score) return "text-muted-foreground";
    if (score >= 22) return "text-primary";
    if (score >= 16) return "text-yellow-400";
    if (score >= 10) return "text-orange-400";
    return "text-destructive";
  };

  const getMealIQGrade = (score: number | null | undefined) => {
    if (!score) return "N/A";
    if (score >= 25) return "A+";
    if (score >= 22) return "A";
    if (score >= 19) return "B+";
    if (score >= 16) return "B";
    if (score >= 13) return "C+";
    return "C";
  };

  const tip = insights?.tips?.[0];
  const tipColors: Record<string, string> = {
    nutrition: "from-primary/20 to-primary/5 border-primary/30",
    fitness: "from-secondary/20 to-secondary/5 border-secondary/30",
    sleep: "from-accent/20 to-accent/5 border-accent/30",
    water: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
    general: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30",
  };
  const tipIconColors: Record<string, string> = {
    nutrition: "text-primary", fitness: "text-secondary", sleep: "text-accent", water: "text-blue-400", general: "text-yellow-400"
  };

  const balanceScore = balance?.overallScore ?? dashboard.lifeBalanceScore;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (balanceScore / 100) * circumference;
  const activeTitle = progress ? getActiveTitle(progress.level, getStoredTitleId()) : null;

  return (
    <div className="min-h-full bg-background">
      {/* Notification Drawer */}
      <AnimatePresence>
        {notifOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={() => setNotifOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed right-0 top-0 bottom-0 w-[88%] max-w-[380px] bg-card border-l border-border z-50 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-card">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-black text-base leading-none">{t("home_notifications")}</h2>
                    {unreadCount > 0 && <p className="text-[10px] text-primary font-bold mt-0.5">{unreadCount} unread</p>}
                  </div>
                </div>
                <button onClick={() => setNotifOpen(false)} className="w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center hover:bg-muted transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
                {(!notifications?.length && !acceptedChallenges.length) ? (
                  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                    <div className="w-16 h-16 rounded-full bg-muted/40 flex items-center justify-center mb-4">
                      <Bell className="w-7 h-7 opacity-30" />
                    </div>
                    <p className="text-sm font-bold">All caught up!</p>
                    <p className="text-xs opacity-60 mt-1">No new notifications</p>
                  </div>
                ) : (
                  <>
                    {/* Challenge notifications */}
                    {acceptedChallenges.map(c => {
                      const isRead = localChallengeRead.has(c.id);
                      return (
                        <motion.div key={c.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                          onClick={() => {
                            const next = new Set(localChallengeRead);
                            next.add(c.id);
                            setLocalChallengeRead(next);
                            try { localStorage.setItem("bodylogic-challenge-read", JSON.stringify([...next])); } catch {}
                          }}
                          className={cn("flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all active:scale-[0.98]",
                            isRead ? "bg-muted/20 border-border/30 opacity-60" : "bg-destructive/10 border-destructive/25 hover:bg-destructive/15"
                          )}>
                          <div className="w-10 h-10 rounded-xl bg-destructive/15 flex items-center justify-center shrink-0 text-lg">
                            {c.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-black">Challenge Accepted!</p>
                              {!isRead && <div className="w-2 h-2 rounded-full bg-destructive shrink-0" />}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">"{c.title}" is active — stay consistent!</p>
                            <span className="inline-flex mt-1.5 items-center gap-1 bg-destructive/10 text-destructive text-[9px] font-black px-1.5 py-0.5 rounded-full border border-destructive/20">
                              <Sword className="w-2.5 h-2.5" /> BOSS CHALLENGE
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* API notifications */}
                    {notifications?.map((n, i) => {
                      type NotifType = "water" | "meal" | "workout" | "achievement" | "sleep" | "system";
                      const typeConfig: Record<NotifType, { icon: typeof Bell; bg: string; iconColor: string; border: string; badge: string; badgeCls: string }> = {
                        water:       { icon: Droplets,  bg: "bg-blue-500/12",   iconColor: "text-blue-400",    border: "border-blue-400/25",   badge: "HYDRATION",   badgeCls: "bg-blue-400/10 text-blue-400 border-blue-400/20" },
                        meal:        { icon: Utensils,  bg: "bg-primary/10",    iconColor: "text-primary",     border: "border-primary/25",    badge: "NUTRITION",   badgeCls: "bg-primary/10 text-primary border-primary/20" },
                        workout:     { icon: Dumbbell,  bg: "bg-orange-400/12", iconColor: "text-orange-400",  border: "border-orange-400/25", badge: "FITNESS",     badgeCls: "bg-orange-400/10 text-orange-400 border-orange-400/20" },
                        achievement: { icon: Trophy,    bg: "bg-yellow-400/12", iconColor: "text-yellow-400",  border: "border-yellow-400/25", badge: "ACHIEVEMENT", badgeCls: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20" },
                        sleep:       { icon: BedDouble, bg: "bg-accent/12",     iconColor: "text-accent",      border: "border-accent/25",     badge: "SLEEP",       badgeCls: "bg-accent/10 text-accent border-accent/20" },
                        system:      { icon: Activity,  bg: "bg-secondary/12",  iconColor: "text-secondary",   border: "border-secondary/25",  badge: "SYSTEM",      badgeCls: "bg-secondary/10 text-secondary border-secondary/20" },
                      };
                      const cfg = typeConfig[n.type as NotifType] ?? typeConfig.system;
                      const Icon = cfg.icon;
                      return (
                        <motion.div key={n.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                          onClick={() => { if (!n.read) { markRead.mutate({ id: n.id }); qc.invalidateQueries({ queryKey: getGetNotificationsQueryKey() }); } }}
                          className={cn("flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all active:scale-[0.98]",
                            n.read ? "bg-muted/20 border-border/30 opacity-60" : cn("border hover:opacity-90", cfg.bg, cfg.border)
                          )}>
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", n.read ? "bg-muted/40" : cfg.bg)}>
                            <Icon className={cn("w-5 h-5", n.read ? "text-muted-foreground" : cfg.iconColor)} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className={cn("text-sm font-black leading-tight", n.read && "text-muted-foreground")}>{n.title}</p>
                              {!n.read && <div className={cn("w-2 h-2 rounded-full shrink-0", cfg.iconColor.replace("text-", "bg-"))} />}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-2">{n.message}</p>
                            <span className={cn("inline-flex mt-1.5 items-center text-[9px] font-black px-1.5 py-0.5 rounded-full border", cfg.badgeCls)}>
                              {cfg.badge}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </>
                )}
              </div>

              {/* Footer */}
              {(notifications?.some(n => !n.read) || acceptedChallenges.some(c => !localChallengeRead.has(c.id))) && (
                <div className="p-4 border-t border-border/50">
                  <button onClick={() => {
                    notifications?.filter(n => !n.read).forEach(n => { markRead.mutate({ id: n.id }); });
                    qc.invalidateQueries({ queryKey: getGetNotificationsQueryKey() });
                    const allIds = acceptedChallenges.map(c => c.id);
                    const next = new Set(allIds);
                    setLocalChallengeRead(next);
                    try { localStorage.setItem("bodylogic-challenge-read", JSON.stringify(allIds)); } catch {}
                  }} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-muted/50 hover:bg-muted text-xs font-bold text-muted-foreground transition-colors">
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark all as read
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="p-5 pb-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <img src="/bodylogic-logo.png" alt="BodyLogic" className="w-8 h-8 rounded-lg" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
            <span className="font-black text-lg gradient-text">BodyLogic</span>
          </div>
          <div className="flex items-center gap-2">
            {progress && levelInfo && (
              <Link href="/achievements" className="press-scale">
                <div className="relative w-10 h-10">
                  <svg width="40" height="40" viewBox="0 0 40 40" className="-rotate-90">
                    <circle cx="20" cy="20" r="16" fill="none" stroke="hsl(var(--muted))" strokeWidth="3.5" />
                    <circle cx="20" cy="20" r="16" fill="none" stroke="url(#xpGrad)" strokeWidth="3.5" strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 16}
                      strokeDashoffset={(2 * Math.PI * 16) * (1 - levelInfo.progressPct / 100)}
                      className="transition-all duration-1000" />
                    <defs>
                      <linearGradient id="xpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#EF4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-black text-yellow-400 leading-none">{progress.level}</span>
                  </div>
                </div>
              </Link>
            )}
            <button onClick={() => setNotifOpen(true)} className="relative p-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors press-scale">
              <Bell className="w-5 h-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-black tracking-tight">{dashboard.greeting} 👋</h1>
          {activeTitle && (
            <p className={cn("text-sm font-bold mt-0.5", activeTitle.color)}>{activeTitle.name}</p>
          )}
          <p className="text-xs text-muted-foreground mt-0.5">{t("home_snapshot")}</p>
        </div>

        {/* 4 Stat Cards Row */}
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-1 bg-card rounded-2xl p-3 border border-border/50 hover-elevate">
            <div className="w-7 h-7 rounded-lg bg-orange-500/15 flex items-center justify-center mb-2">
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-lg font-black text-foreground leading-none">{dashboard.todayCalories}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{t("home_kcal")}</p>
            <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: `${calPct}%` }} />
            </div>
          </div>
          <div className="col-span-1 bg-card rounded-2xl p-3 border border-border/50 hover-elevate">
            <div className="w-7 h-7 rounded-lg bg-secondary/15 flex items-center justify-center mb-2">
              <Footprints className="w-4 h-4 text-secondary" />
            </div>
            <p className="text-lg font-black leading-none">{(steps?.todaySteps ?? dashboard.todaySteps).toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{t("home_steps")}</p>
            <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${stepsPct}%` }} />
            </div>
          </div>
          <div className="col-span-1 bg-card rounded-2xl p-3 border border-border/50 hover-elevate">
            <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center mb-2">
              <Droplets className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-lg font-black leading-none">{((water?.totalMl ?? dashboard.waterMl) / 1000).toFixed(1)}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{t("home_water")}</p>
            <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-blue-400 rounded-full transition-all" style={{ width: `${waterPct}%` }} />
            </div>
          </div>
          <div className="col-span-1 bg-card rounded-2xl p-3 border border-border/50 hover-elevate">
            <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center mb-2">
              <Moon className="w-4 h-4 text-accent" />
            </div>
            <p className="text-lg font-black leading-none">{dashboard.lastSleepHours.toFixed(1)}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{t("home_sleep")}</p>
            <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${Math.min(100, (dashboard.lastSleepHours / 8) * 100)}%` }} />
            </div>
          </div>
        </div>

        {/* Life Balance + Momentum Row */}
        {(() => {
          const streak = progress?.stats?.currentStreak ?? 0;
          const pillars = [
            { label: "Food", score: calPct, color: "bg-primary", icon: Utensils },
            { label: "Fitness", score: stepsPct, color: "bg-secondary", icon: Dumbbell },
            { label: "Sleep", score: Math.min(100, Math.round((dashboard.lastSleepHours / 8) * 100)), color: "bg-accent", icon: Moon },
            { label: "Habit", score: Math.min(100, Math.round((streak / 7) * 100)), color: "bg-yellow-400", icon: Flame },
          ];
          const getPillarTag = (s: number) =>
            s >= 75 ? { label: "Great", cls: "text-primary" } :
            s >= 50 ? { label: "Good", cls: "text-yellow-400" } :
            s >= 25 ? { label: "Fair", cls: "text-orange-400" } :
            { label: "Low", cls: "text-destructive" };

          const rawGrade = balance?.grade?.replace("_", " ") ?? (balanceScore >= 80 ? "Excellent" : balanceScore >= 65 ? "Good" : balanceScore >= 45 ? "Fair" : "Needs Work");
          const gradeStyle: Record<string, string> = {
            "Excellent": "bg-primary/15 text-primary border-primary/30",
            "Good": "bg-secondary/15 text-secondary border-secondary/30",
            "Fair": "bg-orange-400/15 text-orange-400 border-orange-400/30",
            "Needs Work": "bg-destructive/15 text-destructive border-destructive/30",
          };

          const streakPts = streak >= 7 ? 30 : streak >= 3 ? 20 : streak >= 1 ? 10 : 0;
          const wkPts = Math.ceil((progress?.stats?.totalWorkouts ?? 0) / 4);
          const workoutPts = wkPts >= 5 ? 25 : wkPts >= 3 ? 15 : wkPts >= 1 ? 8 : 0;
          const mealsToday = Math.min(3, Math.floor(dashboard.todayCalories / 500));
          const mealPts = mealsToday >= 3 ? 20 : mealsToday >= 2 ? 12 : mealsToday >= 1 ? 5 : 0;
          const waterPts = waterPct >= 100 ? 15 : 0;
          const sleepPts = dashboard.lastSleepHours >= 7 ? 10 : dashboard.lastSleepHours >= 6 ? 5 : 0;
          const factors = [
            { label: "Streak", pts: streakPts, max: 30, icon: Flame, color: "bg-orange-400" },
            { label: "Workouts", pts: workoutPts, max: 25, icon: Dumbbell, color: "bg-secondary" },
            { label: "Meals", pts: mealPts, max: 20, icon: Utensils, color: "bg-primary" },
            { label: "Water", pts: waterPts, max: 15, icon: Droplets, color: "bg-blue-400" },
            { label: "Sleep", pts: sleepPts, max: 10, icon: Moon, color: "bg-accent" },
          ];
          return (
            <div className="grid grid-cols-2 gap-3">
              {/* Life Balance */}
              <div className="bg-card rounded-2xl p-4 border border-border/50 hover-elevate">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("home_life_balance")}</span>
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap", gradeStyle[rawGrade] ?? gradeStyle["Fair"])}>
                    {rawGrade === "Needs Work" ? "Low" : rawGrade}
                  </span>
                </div>
                <div className="flex items-center justify-center py-1">
                  <svg width="80" height="80" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} transform="rotate(-90 50 50)" className="transition-all duration-1000" />
                    <text x="50" y="54" textAnchor="middle" style={{ fill: "hsl(var(--foreground))", fontSize: "22px", fontWeight: "900" }}>{balanceScore}</text>
                  </svg>
                </div>
                <div className="space-y-1.5 mt-1">
                  {pillars.map(p => {
                    const tag = getPillarTag(p.score);
                    const PIcon = p.icon;
                    return (
                      <div key={p.label} className="flex items-center gap-1.5">
                        <PIcon className="w-3 h-3 text-muted-foreground shrink-0" />
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full transition-all", p.color)} style={{ width: `${p.score}%` }} />
                        </div>
                        <span className={cn("text-[9px] font-black w-7 text-right", tag.cls)}>{tag.label}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground">
                  {balance?.trend === "improving" ? <TrendingUp className="w-3 h-3 text-primary" /> : balance?.trend === "declining" ? <TrendingDown className="w-3 h-3 text-destructive" /> : <Minus className="w-3 h-3" />}
                  <span className={balance?.trend === "improving" ? "text-primary font-bold" : balance?.trend === "declining" ? "text-destructive font-bold" : ""}>{balance?.trend ?? "stable"}</span>
                </div>
              </div>

              {/* Momentum */}
              <div className="bg-card rounded-2xl p-4 border border-border/50 hover-elevate">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("home_momentum")}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-base">{momentumData.emoji}</span>
                    <span className={cn("text-xs font-black", momentumData.color)}>{momentumData.score}</span>
                  </div>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-2">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" initial={{ width: 0 }} animate={{ width: `${momentumData.score}%` }} transition={{ duration: 1, ease: "easeOut" }} />
                </div>
                <p className={cn("text-[10px] font-black mb-2", momentumData.color)}>{momentumData.label}</p>
                <div className="space-y-1.5">
                  {factors.map(f => {
                    const pct = Math.round((f.pts / f.max) * 100);
                    const FIcon = f.icon;
                    return (
                      <div key={f.label} className="flex items-center gap-1.5">
                        <FIcon className="w-3 h-3 text-muted-foreground shrink-0" />
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full transition-all", f.color)} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[9px] text-muted-foreground w-5 text-right">{f.pts}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

        {/* XP + Coins Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-500/15 via-orange-500/10 to-yellow-500/15 border border-yellow-500/20 p-4">
          <div className="absolute right-0 top-0 w-24 h-24 bg-yellow-400/10 rounded-full -translate-y-6 translate-x-6 blur-2xl" />
          <div className="flex items-center gap-4 relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-2 border-yellow-400/40 flex items-center justify-center">
              <p className="text-lg font-black text-yellow-400 leading-none">{progress?.level ?? dashboard.level}</p>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-foreground">{progress?.title ?? activeTitle?.name ?? "Achiever"}</p>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs font-black text-yellow-400">{(progress?.xp ?? dashboard.xp).toLocaleString()} XP</span>
                </div>
                <div className="flex items-center gap-1">
                  <Coins className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs font-bold text-yellow-400">{progress?.coins ?? dashboard.coins} coins</span>
                </div>
              </div>
              <div className="h-1.5 bg-yellow-500/20 rounded-full mt-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${levelInfo?.progressPct ?? 0}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
            <Link href="/achievements" className="shrink-0">
              <div className="flex items-center gap-1 bg-yellow-500/20 border border-yellow-500/30 px-2.5 py-1.5 rounded-full press-scale">
                <Trophy className="w-3 h-3 text-yellow-400" />
                <ChevronRight className="w-3 h-3 text-yellow-400" />
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Add Water */}
        <div className="bg-card rounded-2xl p-4 border border-border/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold">{t("home_quick_water")}</span>
            </div>
            <span className="text-xs text-muted-foreground">{water?.glasses ?? Math.floor(dashboard.waterMl / 250)} {t("home_glasses")} · {waterPct}% {t("home_goal")}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[150, 250, 330, 500].map(ml => (
              <button key={ml} onClick={() => addWater(ml)} className="py-2.5 px-1 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 text-xs font-bold transition-all press-scale active:scale-95">
                +{ml}ml
              </button>
            ))}
          </div>
          {waterPct < 100 && (
            <p className="text-[10px] text-blue-400/70 mt-2 text-center">
              {((water?.goalMl ?? dashboard.waterGoalMl) - (water?.totalMl ?? dashboard.waterMl)).toLocaleString()} {t("home_remaining")}
            </p>
          )}
        </div>

        {/* Meal IQ + AI Tip Row */}
        <div className="grid grid-cols-2 gap-3">
          <MealIqQuiz score={dashboard.mealIqScore}>
          <button className="bg-card rounded-2xl p-4 border border-border/50 hover-elevate text-left press-scale">
            <div className="flex items-center gap-1.5 mb-2">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("home_meal_iq")}</span>
            </div>
            <p className={cn("text-4xl font-black leading-none", getMealIQColor(dashboard.mealIqScore))}>
              {dashboard.mealIqScore ?? "—"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">/ 28 max score</p>
            <div className={cn("mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold", getMealIQColor(dashboard.mealIqScore) === "text-primary" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground")}>
              Grade: {getMealIQGrade(dashboard.mealIqScore)}
            </div>
          </button>
          </MealIqQuiz>

          <div className={cn("rounded-2xl p-4 border bg-gradient-to-br hover-elevate", tipColors[tip?.category ?? "general"] ?? tipColors.general)}>
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className={cn("w-4 h-4", tipIconColors[tip?.category ?? "general"])} />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("home_ai_tip")}</span>
            </div>
            <p className="text-xs font-bold text-foreground leading-snug line-clamp-3">{tip?.title ?? "Stay consistent!"}</p>
            <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{tip?.description ?? "Every healthy choice adds up."}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">{t("home_quick_log")}</h2>
          <div className="grid grid-cols-4 gap-2">
            <Link href="/nutrition" className="flex flex-col items-center gap-2 p-3 bg-primary/10 rounded-2xl border border-primary/20 press-scale hover:bg-primary/15 transition-colors">
              <Utensils className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-bold text-primary">{t("home_meal")}</span>
            </Link>
            <Link href="/fitness" className="flex flex-col items-center gap-2 p-3 bg-secondary/10 rounded-2xl border border-secondary/20 press-scale hover:bg-secondary/15 transition-colors">
              <Dumbbell className="w-5 h-5 text-secondary" />
              <span className="text-[10px] font-bold text-secondary">{t("home_workout")}</span>
            </Link>
            <button onClick={() => addWater(250)} className="flex flex-col items-center gap-2 p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 press-scale hover:bg-blue-500/15 transition-colors">
              <Droplets className="w-5 h-5 text-blue-400" />
              <span className="text-[10px] font-bold text-blue-400">{t("home_water_label")}</span>
            </button>
            <Link href="/fitness" className="flex flex-col items-center gap-2 p-3 bg-accent/10 rounded-2xl border border-accent/20 press-scale hover:bg-accent/15 transition-colors">
              <Moon className="w-5 h-5 text-accent" />
              <span className="text-[10px] font-bold text-accent">{t("home_sleep_label")}</span>
            </Link>
          </div>
        </div>

        {/* 30-Day Streak Calendar */}
        {progress && (
          <div className="bg-card rounded-2xl p-4 border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-bold">Activity Streak</span>
              </div>
              <div className="flex items-center gap-1.5 bg-orange-400/10 border border-orange-400/20 px-2.5 py-1 rounded-full">
                <Flame className="w-3 h-3 text-orange-400" />
                <span className="text-xs font-black text-orange-400">{progress.stats?.currentStreak ?? 0} day{(progress.stats?.currentStreak ?? 0) !== 1 ? "s" : ""}</span>
              </div>
            </div>
            {(() => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const activityDates = new Set(
                (dashboard.recentActivity ?? []).map((a: any) => {
                  const d = new Date(a.date ?? a.createdAt ?? "");
                  d.setHours(0, 0, 0, 0);
                  return d.getTime();
                })
              );
              const streak = progress.stats?.currentStreak ?? 0;
              const days = Array.from({ length: 30 }, (_, i) => {
                const d = new Date(today);
                d.setDate(today.getDate() - (29 - i));
                const daysAgo = 29 - i;
                const inStreak = daysAgo < streak;
                const hasActivity = activityDates.has(d.getTime()) || inStreak;
                const isToday = daysAgo === 0;
                return { date: d, hasActivity, inStreak, isToday };
              });
              const weeks: typeof days[] = [];
              for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
              const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
              return (
                <div>
                  <div className="grid grid-cols-7 gap-1 mb-1">
                    {dayLabels.map((d, i) => (
                      <div key={i} className="text-center text-[9px] font-bold text-muted-foreground/50">{d}</div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {weeks.map((week, wi) => (
                      <div key={wi} className="grid grid-cols-7 gap-1">
                        {week.map((day, di) => (
                          <div
                            key={di}
                            className={cn(
                              "aspect-square rounded-lg flex flex-col items-center justify-center gap-0.5 text-[8px] font-black",
                              day.isToday
                                ? "ring-2 ring-primary ring-offset-1 ring-offset-card"
                                : "",
                              day.hasActivity
                                ? "bg-gradient-to-br from-primary to-secondary"
                                : "bg-muted/40 border border-border/30"
                            )}
                          >
                            <span className={cn(day.hasActivity ? "text-white" : "text-muted-foreground")}>{day.date.getMonth() + 1}/{day.date.getDate()}</span>
                            {day.isToday && <div className={cn("w-1.5 h-1.5 rounded-full", day.hasActivity ? "bg-white/80" : "bg-primary")} />}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-2.5 justify-end">
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2.5 rounded-sm bg-gradient-to-br from-primary to-secondary" />
                      <span className="text-[9px] text-muted-foreground">Active</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2.5 rounded-sm bg-muted/40 border border-border/30" />
                      <span className="text-[9px] text-muted-foreground">Rest</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* AI Behavior Analysis */}
        {insights?.behaviorAnalysis && (
          <div className="bg-gradient-to-br from-secondary/10 to-accent/5 rounded-2xl p-4 border border-secondary/20">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-secondary" />
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">{t("home_ai_analysis")}</span>
            </div>
            <div className="space-y-2">
              {insights.behaviorAnalysis
                .split(/(?<=[.!?])\s+/)
                .filter((s: string) => s.trim().length > 5)
                .slice(0, 3)
                .map((sentence: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                    <p className="text-xs font-semibold text-foreground/80 leading-snug">{sentence.trim()}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {dashboard.recentActivity.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t("home_recent")}</h2>
              <Link href="/history" className="text-xs text-primary font-semibold">{t("home_view_all")}</Link>
            </div>
            <div className="space-y-2">
              {dashboard.recentActivity.slice(0, 4).map((item) => {
                const iconMap: Record<string, typeof Utensils> = { meal: Utensils, workout: Dumbbell, sleep: Moon, water: Droplets, steps: Footprints };
                const colorMap: Record<string, string> = { meal: "text-primary bg-primary/10", workout: "text-secondary bg-secondary/10", sleep: "text-accent bg-accent/10", water: "text-blue-400 bg-blue-400/10", steps: "text-yellow-400 bg-yellow-400/10" };
                const Icon = iconMap[item.type] ?? Utensils;
                const colors = colorMap[item.type] ?? colorMap.meal;
                const time = new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border/50 hover-elevate">
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", colors)}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">{time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Minus({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round"/></svg>;
}

function HomeSkeleton() {
  return (
    <div className="p-5 space-y-5 animate-pulse">
      <div className="flex items-center justify-between pt-2">
        <div className="h-8 w-32 bg-muted rounded-lg shimmer" />
        <div className="h-9 w-9 bg-muted rounded-xl shimmer" />
      </div>
      <div className="h-10 w-56 bg-muted rounded-lg shimmer" />
      <div className="grid grid-cols-4 gap-2">
        {[1,2,3,4].map(i => <div key={i} className="h-24 bg-muted rounded-2xl shimmer" />)}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[1,2].map(i => <div key={i} className="h-44 bg-muted rounded-2xl shimmer" />)}
      </div>
      <div className="h-20 bg-muted rounded-2xl shimmer" />
    </div>
  );
}

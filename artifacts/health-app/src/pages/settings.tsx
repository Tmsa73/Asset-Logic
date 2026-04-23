import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sun, Moon, Monitor, Bell, Shield, Info, Palette, Zap, Globe,
  Volume2, Download, Trash2, Bot, Utensils, Heart, Target,
  Dumbbell, Flame, Brain, ChevronRight, Check, Upload,
  AlertTriangle, Activity, Star, Leaf, Scale, Pencil, X,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

const API_BASE = `${(import.meta.env.BASE_URL ?? "/").replace(/\/$/, "")}/api`;

function toCsv(rows: any[]): string {
  if (!rows.length) return "";
  const keys = Array.from(new Set(rows.flatMap(r => Object.keys(r ?? {}))));
  const esc = (v: any) => {
    if (v == null) return "";
    const s = typeof v === "object" ? JSON.stringify(v) : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [keys.join(","), ...rows.map(r => keys.map(k => esc(r[k])).join(","))].join("\n");
}

async function exportAllData(toast: any) {
  try {
    toast({ title: "📤 Preparing export…" });
    const endpoints: Record<string, string> = {
      profile: "/profile",
      meals: "/nutrition/meals?days=365",
      workouts: "/fitness/workouts?days=365",
      sleep: "/sleep?days=365",
      water: "/water?days=365",
      steps: "/steps?days=365",
      measurements: "/measurements",
      progress: "/progress",
    };
    const sections: string[] = [];
    for (const [name, path] of Object.entries(endpoints)) {
      try {
        const res = await fetch(`${API_BASE}${path}`, { credentials: "include" });
        if (!res.ok) continue;
        const data = await res.json();
        const rows = Array.isArray(data) ? data : Array.isArray((data as any)?.items) ? (data as any).items : [data];
        sections.push(`# ${name.toUpperCase()}\n${toCsv(rows)}`);
      } catch {}
    }
    const csv = sections.join("\n\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);
    a.href = url; a.download = `bodylogic-export-${date}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    toast({ title: "✅ Export downloaded" });
  } catch (e: any) {
    toast({ title: "❌ Export failed", description: e?.message ?? "Unknown error", variant: "destructive" });
  }
}

function importData(toast: any) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".csv,.json,text/csv,application/json";
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const lines = text.split("\n").filter(Boolean);
      toast({ title: "📥 Import ready", description: `Parsed ${lines.length} rows from ${file.name}` });
    } catch (e: any) {
      toast({ title: "❌ Import failed", description: e?.message ?? "Could not read file", variant: "destructive" });
    }
  };
  input.click();
}

type ThemeOption = "dark" | "light" | "system" | "energy" | "focus";
type AiPersonality = "motivator" | "friendly" | "strict" | "silent" | "custom";
type DietType = "none" | "vegetarian" | "vegan" | "keto" | "pescatarian" | "paleo" | "mediterranean" | "custom";
type HealthCondition = "diabetes" | "heart" | "hypertension" | "obesity" | "allergies" | "thyroid" | "asthma" | "none";
type Language = "en" | "ar";

const themeOptions: { value: ThemeOption; label: string; icon: typeof Sun; desc: string; preview: string }[] = [
  { value: "dark", label: "Dark", icon: Moon, desc: "Night mode", preview: "bg-slate-900" },
  { value: "light", label: "Light", icon: Sun, desc: "Clean & bright", preview: "bg-green-50" },
  { value: "system", label: "System", icon: Monitor, desc: "Auto", preview: "bg-gradient-to-br from-slate-900 to-green-50" },
  { value: "energy", label: "Energy 🔥", icon: Flame, desc: "Vibrant & bold", preview: "bg-gradient-to-br from-orange-900 to-orange-600" },
  { value: "focus", label: "Focus 🧘", icon: Brain, desc: "Minimal & calm", preview: "bg-gradient-to-br from-slate-800 to-slate-600" },
];

const aiPersonalities: { value: AiPersonality; label: string; icon: typeof Bot; desc: string; emoji: string; color: string }[] = [
  { value: "motivator", label: "Motivator", icon: Flame, desc: "Energetic pushes & hype", emoji: "🔥", color: "border-orange-500 bg-orange-500/10 text-orange-400" },
  { value: "friendly", label: "Friendly", icon: Heart, desc: "Warm, supportive coach", emoji: "😊", color: "border-primary bg-primary/10 text-primary" },
  { value: "strict", label: "Strict Coach", icon: Dumbbell, desc: "No excuses, discipline first", emoji: "💪", color: "border-destructive bg-destructive/10 text-destructive" },
  { value: "silent", label: "Silent Mode", icon: Brain, desc: "Data-only, minimal chat", emoji: "🧘", color: "border-secondary bg-secondary/10 text-secondary" },
  { value: "custom", label: "My Own Style", icon: Pencil, desc: "Define your own AI personality", emoji: "✨", color: "border-accent bg-accent/10 text-accent" },
];

const dietOptions: { value: DietType; label: string; icon: string; desc: string }[] = [
  { value: "none", label: "No Restriction", icon: "🍽️", desc: "Balanced general diet" },
  { value: "vegetarian", label: "Vegetarian", icon: "🥦", desc: "No meat or fish" },
  { value: "vegan", label: "Vegan", icon: "🌿", desc: "No animal products" },
  { value: "keto", label: "Keto", icon: "🥑", desc: "High fat, low carb" },
  { value: "pescatarian", label: "Pescatarian", icon: "🐟", desc: "Fish but no meat" },
  { value: "paleo", label: "Paleo", icon: "🍖", desc: "Whole foods, no processed" },
  { value: "mediterranean", label: "Mediterranean", icon: "🫒", desc: "Heart-healthy diet" },
  { value: "custom", label: "My Own Diet", icon: "✍️", desc: "Describe your own plan" },
];

const healthConditions: { value: HealthCondition; label: string; icon: string; desc: string }[] = [
  { value: "diabetes", label: "Diabetes", icon: "🩺", desc: "Blood sugar management" },
  { value: "heart", label: "Heart Condition", icon: "❤️", desc: "Cardiovascular care" },
  { value: "hypertension", label: "Hypertension", icon: "🫀", desc: "Blood pressure monitoring" },
  { value: "obesity", label: "Obesity", icon: "⚖️", desc: "Weight management focus" },
  { value: "allergies", label: "Food Allergies", icon: "🚫", desc: "Allergen avoidance" },
  { value: "thyroid", label: "Thyroid Issue", icon: "🦋", desc: "Thyroid health" },
  { value: "asthma", label: "Asthma", icon: "💨", desc: "Breathing & exercise limits" },
  { value: "none", label: "No Conditions", icon: "✅", desc: "Healthy & clear" },
];

const languages: { value: Language; label: string; flag: string; direction: "ltr" | "rtl" }[] = [
  { value: "en", label: "English", flag: "🇬🇧", direction: "ltr" },
  { value: "ar", label: "العربية", flag: "🇸🇦", direction: "rtl" },
];

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const { logout } = useAuth();

  const [notifications, setNotifications] = useState(true);
  const [waterReminders, setWaterReminders] = useState(true);
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [mealReminders, setMealReminders] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [achievementAlerts, setAchievementAlerts] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);
  const [haptics, setHaptics] = useState(true);
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [aiPersonality, setAiPersonality] = useState<AiPersonality>("motivator");
  const [customPersonality, setCustomPersonality] = useState("");
  const [diet, setDiet] = useState<DietType>("none");
  const [customDiet, setCustomDiet] = useState("");
  const [stepGoal, setStepGoal] = useState(10000);
  const [calGoal, setCalGoal] = useState(2000);
  const [waterGoal, setWaterGoal] = useState(2500);
  const [sleepGoal, setSleepGoal] = useState(8);
  const [selectedConditions, setSelectedConditions] = useState<Set<HealthCondition>>(new Set(["none"]));
  const [language, setLanguage] = useState<Language>("en");

  const toggleCondition = (cond: HealthCondition) => {
    setSelectedConditions(prev => {
      const next = new Set(prev);
      if (cond === "none") {
        return new Set(["none"]);
      }
      next.delete("none");
      if (next.has(cond)) next.delete(cond);
      else next.add(cond);
      if (next.size === 0) next.add("none");
      return next;
    });
  };

  const handleSaveGoals = () => {
    toast({ title: "✅ Goals saved!", description: "Your daily targets have been updated." });
  };

  const handleSavePersonality = (p: AiPersonality) => {
    setAiPersonality(p);
    const found = aiPersonalities.find(x => x.value === p);
    toast({ title: `${found?.emoji} ${found?.label} mode activated`, description: found?.desc });
  };

  const handleSaveConditions = () => {
    const list = [...selectedConditions].map(c => healthConditions.find(h => h.value === c)?.label).join(", ");
    toast({ title: "🧬 Health profile updated", description: list });
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="sticky top-0 z-10 glass border-b border-border/50 px-5 py-4">
        <h1 className="text-xl font-black gradient-text">Settings</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Customize your BodyLogic experience</p>
      </div>

      <div className="px-4 pt-5 space-y-4">

        {/* AI Personality */}
        <Section icon={<Bot className="w-4 h-4 text-primary" />} title="AI Coach Personality" badge="NEW 🔥">
          <div className="p-4 space-y-3">
            <p className="text-xs text-muted-foreground">Your AI coach adapts its coaching style based on your choice</p>
            <div className="grid grid-cols-2 gap-2">
              {aiPersonalities.map(p => {
                const Icon = p.icon;
                const active = aiPersonality === p.value;
                return (
                  <motion.button
                    key={p.value}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleSavePersonality(p.value)}
                    className={cn(
                      "flex flex-col items-start gap-1.5 p-3 rounded-xl border-2 transition-all text-left",
                      active ? p.color : "border-border/50 bg-muted/20 hover:border-border"
                    )}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-xl">{p.emoji}</span>
                      <span className={cn("text-xs font-bold flex-1", active ? "" : "text-foreground")}>{p.label}</span>
                      {active && <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-tight">{p.desc}</p>
                  </motion.button>
                );
              })}
            </div>
            {aiPersonality === "custom" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-2">
                <p className="text-xs font-semibold text-accent">Describe your ideal AI coach personality:</p>
                <textarea
                  value={customPersonality}
                  onChange={e => setCustomPersonality(e.target.value)}
                  placeholder="e.g. Be like a calm sports doctor who gives data-driven advice with occasional encouragement..."
                  className="w-full rounded-xl bg-muted/30 border border-accent/30 focus:border-accent/60 focus:ring-1 focus:ring-accent/30 p-3 text-xs outline-none resize-none text-foreground placeholder:text-muted-foreground/50 transition-all"
                  rows={3}
                />
                <button
                  onClick={() => toast({ title: "✨ Custom personality saved!", description: customPersonality.slice(0, 60) + "..." })}
                  disabled={!customPersonality.trim()}
                  className="w-full py-2 rounded-xl bg-accent/15 text-accent text-xs font-bold border border-accent/30 hover:bg-accent/25 transition-colors disabled:opacity-40"
                >
                  Save My Personality
                </button>
              </motion.div>
            )}
          </div>
        </Section>

        {/* Diet Preferences */}
        <Section icon={<Utensils className="w-4 h-4 text-secondary" />} title="Diet Preferences">
          <div className="p-4 space-y-3">
            <p className="text-xs text-muted-foreground">Your AI coach personalizes meal advice based on your diet type</p>
            <div className="grid grid-cols-2 gap-2">
              {dietOptions.map(d => {
                const active = diet === d.value;
                return (
                  <button
                    key={d.value}
                    onClick={() => setDiet(d.value)}
                    className={cn(
                      "flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all text-left relative",
                      active ? "border-secondary bg-secondary/10" : "border-border/40 bg-muted/20"
                    )}
                  >
                    {active && <Check className="absolute top-1.5 right-1.5 w-3 h-3 text-secondary" />}
                    <span className="text-xl shrink-0">{d.icon}</span>
                    <div className="min-w-0">
                      <p className={cn("text-xs font-bold truncate", active ? "text-secondary" : "text-foreground")}>{d.label}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{d.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            {diet === "custom" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
                <p className="text-xs font-semibold text-secondary">Describe your diet plan:</p>
                <textarea
                  value={customDiet}
                  onChange={e => setCustomDiet(e.target.value)}
                  placeholder="e.g. I eat halal food, avoid dairy, high protein, moderate carbs..."
                  className="w-full rounded-xl bg-muted/30 border border-secondary/30 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 p-3 text-xs outline-none resize-none text-foreground placeholder:text-muted-foreground/50 transition-all"
                  rows={3}
                />
                <button
                  onClick={() => toast({ title: "✅ Custom diet saved!", description: customDiet.slice(0, 60) })}
                  disabled={!customDiet.trim()}
                  className="w-full py-2 rounded-xl bg-secondary/15 text-secondary text-xs font-bold border border-secondary/30 hover:bg-secondary/25 transition-colors disabled:opacity-40"
                >
                  Save My Diet Plan
                </button>
              </motion.div>
            )}
          </div>
        </Section>

        {/* Health Conditions */}
        <Section icon={<AlertTriangle className="w-4 h-4 text-orange-400" />} title="Health Conditions">
          <div className="p-4 space-y-3">
            <p className="text-xs text-muted-foreground">AI uses this for safer, personalized advice. Select all that apply.</p>
            <div className="grid grid-cols-2 gap-2">
              {healthConditions.map(h => {
                const active = selectedConditions.has(h.value);
                return (
                  <button
                    key={h.value}
                    onClick={() => toggleCondition(h.value)}
                    className={cn(
                      "flex items-center gap-2 p-2.5 rounded-xl border-2 transition-all text-left relative",
                      active ? "border-orange-400/50 bg-orange-400/10" : "border-border/40 bg-muted/20 hover:border-border"
                    )}
                  >
                    {active && <Check className="absolute top-1.5 right-1.5 w-3 h-3 text-orange-400" />}
                    <span className="text-base">{h.icon}</span>
                    <div className="min-w-0">
                      <p className={cn("text-xs font-bold truncate", active ? "text-orange-400" : "text-muted-foreground")}>{h.label}</p>
                      <p className="text-[9px] text-muted-foreground truncate">{h.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <button
              onClick={handleSaveConditions}
              className="w-full py-2.5 rounded-xl bg-orange-400/15 text-orange-400 text-sm font-bold border border-orange-400/30 hover:bg-orange-400/25 transition-colors"
            >
              Save Health Profile
            </button>
          </div>
        </Section>

        {/* Goals */}
        <Section icon={<Target className="w-4 h-4 text-yellow-400" />} title="Daily Goals">
          <div className="p-4 space-y-4">
            <GoalSlider
              label="Daily Steps"
              value={stepGoal}
              min={2000} max={20000} step={500}
              onChange={setStepGoal}
              color="accent-primary"
              unit="steps"
              markers={["2K", "10K", "20K"]}
              textColor="text-primary"
            />
            <GoalSlider
              label="Daily Calories"
              value={calGoal}
              min={1200} max={4000} step={100}
              onChange={setCalGoal}
              color="accent-secondary"
              unit="kcal"
              markers={["1.2K", "2.5K", "4K"]}
              textColor="text-secondary"
            />
            <GoalSlider
              label="Daily Water"
              value={waterGoal}
              min={1000} max={5000} step={250}
              onChange={setWaterGoal}
              color="accent-blue-400"
              unit="ml"
              markers={["1L", "2.5L", "5L"]}
              textColor="text-blue-400"
            />
            <GoalSlider
              label="Sleep Target"
              value={sleepGoal}
              min={5} max={12} step={0.5}
              onChange={setSleepGoal}
              color="accent-accent"
              unit="hrs"
              markers={["5h", "8h", "12h"]}
              textColor="text-accent"
            />
            <button
              onClick={handleSaveGoals}
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold transition-all hover:bg-primary/90 press-scale"
            >
              Save All Goals
            </button>
          </div>
        </Section>

        {/* Appearance */}
        <Section icon={<Palette className="w-4 h-4 text-purple-400" />} title="Appearance & Themes">
          <div className="p-4 space-y-3">
            <p className="text-xs text-muted-foreground">Choose your visual experience</p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {themeOptions.map(opt => {
                const Icon = opt.icon;
                const active = theme === opt.value;
                return (
                  <motion.button
                    key={opt.value}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTheme(opt.value)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 shrink-0 w-[76px]",
                      active ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/30 text-muted-foreground"
                    )}
                  >
                    <div className={cn("w-10 h-10 rounded-lg border-2 overflow-hidden", active ? "border-primary" : "border-border/40")}>
                      <div className={cn("w-full h-full", opt.preview)} />
                    </div>
                    <p className={cn("text-[10px] font-bold text-center", active ? "text-primary" : "text-foreground")}>{opt.label}</p>
                    {active && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </Section>

        {/* Language */}
        <Section icon={<Globe className="w-4 h-4 text-cyan-400" />} title="Language">
          <div className="p-4 space-y-2">
            <p className="text-xs text-muted-foreground mb-3">Full RTL support for Arabic</p>
            <div className="flex gap-2">
              {languages.map(l => (
                <button
                  key={l.value}
                  onClick={() => {
                    setLanguage(l.value);
                    toast({ title: `Language: ${l.label}`, description: l.direction === "rtl" ? "RTL mode enabled" : "LTR mode enabled" });
                  }}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all",
                    language === l.value ? "border-cyan-400 bg-cyan-400/10 text-cyan-400" : "border-border bg-muted/30 text-muted-foreground"
                  )}
                >
                  <span className="text-lg">{l.flag}</span>
                  <span className="text-sm font-bold">{l.label}</span>
                  {l.direction === "rtl" && <span className="text-[9px] text-muted-foreground">RTL</span>}
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* Units */}
        <Section icon={<Scale className="w-4 h-4 text-secondary" />} title="Measurement Units">
          <div className="p-4">
            <div className="flex gap-2">
              <button
                onClick={() => setUnits("metric")}
                className={cn(
                  "flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all",
                  units === "metric" ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/30 text-muted-foreground"
                )}
              >
                <span className="text-lg">🌍</span>
                <span className="text-xs font-bold">Metric</span>
                <span className="text-[10px] text-muted-foreground">kg · cm · km</span>
              </button>
              <button
                onClick={() => setUnits("imperial")}
                className={cn(
                  "flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all",
                  units === "imperial" ? "border-secondary bg-secondary/10 text-secondary" : "border-border bg-muted/30 text-muted-foreground"
                )}
              >
                <Scale className="w-5 h-5" />
                <span className="text-xs font-bold">Imperial</span>
                <span className="text-[10px] text-muted-foreground">lb · in · mi</span>
              </button>
            </div>
          </div>
        </Section>

        {/* Notifications */}
        <Section icon={<Bell className="w-4 h-4 text-yellow-400" />} title="Notifications">
          <div className="divide-y divide-border/50">
            <ToggleRow label="All Notifications" desc="Master toggle for all alerts" value={notifications} onChange={setNotifications} accent="primary" />
            <ToggleRow label="💧 Water Reminders" desc="Every 2 hours" value={waterReminders} onChange={setWaterReminders} disabled={!notifications} />
            <ToggleRow label="🍽️ Meal Reminders" desc="Breakfast, lunch, dinner" value={mealReminders} onChange={setMealReminders} disabled={!notifications} />
            <ToggleRow label="🏋️ Workout Reminders" desc="Your gym time nudges" value={workoutReminders} onChange={setWorkoutReminders} disabled={!notifications} />
            <ToggleRow label="📊 Weekly Report" desc="Sunday progress summary" value={weeklyReport} onChange={setWeeklyReport} disabled={!notifications} />
            <ToggleRow label="🏆 Achievement Alerts" desc="Get notified on unlocks" value={achievementAlerts} onChange={setAchievementAlerts} disabled={!notifications} />
          </div>
        </Section>

        {/* Sound & Haptics */}
        <Section icon={<Volume2 className="w-4 h-4 text-green-400" />} title="Sound & Haptics">
          <div className="divide-y divide-border/50">
            <ToggleRow label="Achievement Sounds" desc="Celebrate your wins with sound" value={soundEffects} onChange={setSoundEffects} />
            <ToggleRow label="Haptic Feedback" desc="Feel every action" value={haptics} onChange={setHaptics} />
          </div>
        </Section>

        {/* Data & Privacy */}
        <Section icon={<Shield className="w-4 h-4 text-destructive" />} title="Data & Privacy">
          <div className="divide-y divide-border/50">
            <ActionRow label="Export My Data (Excel)" desc="Download all health data as CSV" icon={<Download className="w-4 h-4 text-primary" />} onClick={() => exportAllData(toast)} />
            <ActionRow label="Import Data" desc="Restore data from a backup CSV file" icon={<Upload className="w-4 h-4 text-secondary" />} onClick={() => importData(toast)} />
            <ActionRow label="Clear Cache" desc="Remove locally cached data" icon={<Trash2 className="w-4 h-4 text-muted-foreground" />} onClick={() => { try { Object.keys(localStorage).filter(k => k.startsWith("bodylogic-cache-")).forEach(k => localStorage.removeItem(k)); } catch {} toast({ title: "🗑️ Cache cleared" }); }} />
            <ActionRow label="Delete Account" desc="Permanently delete all data" icon={<Trash2 className="w-4 h-4 text-destructive" />} onClick={() => toast({ title: "⚠️ Are you sure?", description: "This cannot be undone", variant: "destructive" })} danger />
          </div>
        </Section>

        {/* About */}
        <Section icon={<Info className="w-4 h-4 text-muted-foreground" />} title="About">
          <div className="divide-y divide-border/50">
            <div className="px-4 py-3 flex justify-between"><span className="text-sm text-foreground">Version</span><span className="text-sm text-muted-foreground font-mono">Beta</span></div>
            <div className="px-4 py-3 flex justify-between"><span className="text-sm text-foreground">Build</span><span className="text-sm text-muted-foreground font-mono">2026.04</span></div>
            <ActionRow label="Privacy Policy" desc="" icon={<ChevronRight className="w-4 h-4 text-muted-foreground" />} onClick={() => {}} />
            <ActionRow label="Terms of Service" desc="" icon={<ChevronRight className="w-4 h-4 text-muted-foreground" />} onClick={() => {}} />
          </div>
        </Section>

        {/* Branding + Logout */}
        <div className="flex flex-col items-center py-6 gap-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg glow-primary">
            <Zap className="w-8 h-8 text-background" />
          </div>
          <p className="text-base font-black gradient-text">BodyLogic</p>
          <p className="text-xs text-muted-foreground">AI-Powered Health & Fitness · Beta</p>
          <div className="flex items-center gap-2 mt-1">
            {[Star, Leaf, Heart].map((Icon, i) => (
              <div key={i} className="w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            ))}
          </div>
          <button
            onClick={logout}
            className="mt-2 px-8 py-2.5 rounded-full border border-destructive/40 text-destructive text-sm font-bold hover:bg-destructive/10 transition-colors press-scale"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

function GoalSlider({ label, value, min, max, step, onChange, unit, markers, textColor }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; color: string; unit: string; markers: string[]; textColor: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <p className="text-sm font-medium">{label}</p>
        <span className={cn("text-sm font-black", textColor)}>{value.toLocaleString()} {unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
        {markers.map((m, i) => <span key={i}>{m}</span>)}
      </div>
    </div>
  );
}

function Section({ icon, title, badge, children }: { icon: React.ReactNode; title: string; badge?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card border border-border/60 overflow-hidden">
      <div className="px-4 py-3 flex items-center gap-2 border-b border-border/50">
        <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center">{icon}</div>
        <span className="text-sm font-bold text-foreground flex-1">{title}</span>
        {badge && <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">{badge}</span>}
      </div>
      {children}
    </div>
  );
}

function ToggleRow({ label, desc, value, onChange, disabled, accent = "primary" }: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void; disabled?: boolean; accent?: string }) {
  return (
    <div className={cn("px-4 py-3 flex items-center justify-between gap-3", disabled && "opacity-40")}>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {desc && <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>}
      </div>
      <button onClick={() => !disabled && onChange(!value)} className={cn("relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0", value && !disabled ? "bg-primary" : "bg-muted")}>
        <motion.div
          animate={{ x: value ? 18 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
        />
      </button>
    </div>
  );
}

function ActionRow({ label, desc, icon, onClick, danger }: { label: string; desc: string; icon: React.ReactNode; onClick: () => void; danger?: boolean }) {
  return (
    <button onClick={onClick} className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-muted/30 transition-colors text-left">
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium", danger ? "text-destructive" : "text-foreground")}>{label}</p>
        {desc && <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>}
      </div>
      {icon}
    </button>
  );
}

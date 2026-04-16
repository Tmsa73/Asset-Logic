import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useLang } from "@/contexts/language-context";

type Mode = "login" | "register";

const GOALS = [
  { value: "lose_weight", label: "Lose Weight", emoji: "⚡" },
  { value: "build_muscle", label: "Build Muscle", emoji: "💪" },
  { value: "improve_fitness", label: "Improve Fitness", emoji: "🏃" },
  { value: "maintain", label: "Maintain Weight", emoji: "⚖️" },
];

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("25");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [goal, setGoal] = useState("improve_fitness");
  const [gender, setGender] = useState("unspecified");

  const { toast } = useToast();
  const { login } = useAuth();
  const { t } = useLang();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      login(data);
    } catch (err: any) {
      toast({ title: "Login failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password, age: Number(age), gender, weight: Number(weight), height: Number(height), goal }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      login(data);
      toast({ title: "Welcome to BodyLogic!", description: `Your journey starts now, ${data.name}!` });
    } catch (err: any) {
      toast({ title: "Registration failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background flex justify-center">
      <div className="w-full max-w-[430px] min-h-[100dvh] flex flex-col relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 py-10 relative z-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-3">
              <img src="/logo.png" alt="BodyLogic Logo" className="object-contain" style={{ width: 148, height: 148, filter: "drop-shadow(0 0 14px rgba(34,197,94,0.4)) drop-shadow(0 4px 16px rgba(0,0,0,0.25))" }} />
            </div>
            <h1 className="text-2xl font-black gradient-text">BodyLogic</h1>
            <p className="text-sm text-muted-foreground mt-1">{t("auth_tagline")}</p>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-muted rounded-2xl p-1 mb-6">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setStep(1); }}
                className={cn(
                  "flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200",
                  mode === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                )}
              >
                {m === "login" ? t("auth_signin") : t("auth_signup")}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <Field icon={<Mail className="w-4 h-4" />} label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
                <PasswordField value={password} onChange={setPassword} show={showPw} onToggle={() => setShowPw(!showPw)} />

                <button
                  type="submit"
                  disabled={loading || !email || !password}
                  className="w-full h-12 bg-gradient-to-r from-primary to-secondary text-background font-bold rounded-2xl flex items-center justify-center gap-2 press-scale disabled:opacity-50 mt-2"
                >
                  {loading ? <LoadingDots /> : <><span>{t("auth_signin_btn")}</span><ArrowRight className="w-4 h-4" /></>}
                </button>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  {t("auth_no_account")}{" "}
                  <button type="button" onClick={() => setMode("register")} className="text-primary font-bold">
                    {t("auth_signup_free")}
                  </button>
                </p>
              </motion.form>
            ) : (
              <motion.form
                key={`register-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleRegister}
                className="space-y-4"
              >
                {step === 1 ? (
                  <>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{t("auth_step1")}</p>
                    <Field icon={<User className="w-4 h-4" />} label={t("auth_name")} type="text" value={name} onChange={setName} placeholder={t("auth_name_placeholder")} />
                    <Field icon={<Mail className="w-4 h-4" />} label={t("auth_email")} type="email" value={email} onChange={setEmail} placeholder={t("auth_email_placeholder")} />
                    <PasswordField value={password} onChange={setPassword} show={showPw} onToggle={() => setShowPw(!showPw)} />
                    <button
                      type="submit"
                      disabled={!name || !email || !password}
                      className="w-full h-12 bg-gradient-to-r from-primary to-secondary text-background font-bold rounded-2xl flex items-center justify-center gap-2 press-scale disabled:opacity-50"
                    >
                      <span>{t("auth_continue")}</span><ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{t("auth_step2")}</p>

                    {/* Goal */}
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-2 block">{t("auth_goal")}</label>
                      <div className="grid grid-cols-2 gap-2">
                        {GOALS.map(g => (
                          <button
                            key={g.value}
                            type="button"
                            onClick={() => setGoal(g.value)}
                            className={cn(
                              "p-3 rounded-xl border-2 text-sm font-bold flex items-center gap-2 transition-all",
                              goal === g.value ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/30 text-foreground"
                            )}
                          >
                            <span>{g.emoji}</span>{g.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-2 block">{t("auth_gender")}</label>
                      <div className="flex gap-2">
                        {(["male", "female", "unspecified"] as const).map(g => (
                          <button key={g} type="button" onClick={() => setGender(g)}
                            className={cn("flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-all",
                              gender === g ? "border-secondary bg-secondary/10 text-secondary" : "border-border bg-muted/30 text-foreground")}
                          >{g === "male" ? t("auth_male") : g === "female" ? t("auth_female") : t("auth_other")}</button>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-1 block">Age</label>
                        <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full h-10 rounded-xl bg-muted border border-border/50 text-sm text-center font-bold focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-1 block">Weight (kg)</label>
                        <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full h-10 rounded-xl bg-muted border border-border/50 text-sm text-center font-bold focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-1 block">Height (cm)</label>
                        <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full h-10 rounded-xl bg-muted border border-border/50 text-sm text-center font-bold focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button type="button" onClick={() => setStep(1)}
                        className="flex-1 h-12 bg-muted text-foreground font-bold rounded-2xl press-scale">
                        Back
                      </button>
                      <button type="submit" disabled={loading}
                        className="flex-1 h-12 bg-gradient-to-r from-primary to-secondary text-background font-bold rounded-2xl flex items-center justify-center gap-2 press-scale disabled:opacity-50">
                        {loading ? <LoadingDots /> : <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>}
                      </button>
                    </div>
                  </>
                )}

                <p className="text-center text-xs text-muted-foreground">
                  Already have an account?{" "}
                  <button type="button" onClick={() => setMode("login")} className="text-primary font-bold">Sign in</button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Field({ icon, label, type, value, onChange, placeholder }: {
  icon: React.ReactNode; label: string; type: string; value: string; onChange: (v: string) => void; placeholder: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={type === "email" ? "email" : "name"}
          className="w-full h-12 pl-10 pr-4 rounded-2xl bg-card border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
        />
      </div>
    </div>
  );
}

function PasswordField({ value, onChange, show, onToggle }: {
  value: string; onChange: (v: string) => void; show: boolean; onToggle: () => void;
}) {
  const { t } = useLang();
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">{t("auth_password")}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"><Lock className="w-4 h-4" /></span>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={t("auth_pw_placeholder")}
          autoComplete="current-password"
          className="w-full h-12 pl-10 pr-12 rounded-2xl bg-card border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
        />
        <button type="button" onClick={onToggle} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <div className="flex gap-1">
      {[0, 150, 300].map((d) => (
        <span key={d} className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
      ))}
    </div>
  );
}

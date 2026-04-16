import { useMemo, useState } from "react";
import { Brain, CheckCircle2, RotateCcw, Sparkles, XCircle, Coins } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { playGamificationSound } from "@/lib/sounds";

const COINS_KEY = "bodylogic-coins";
function addCoins(amount: number) {
  try {
    const current = parseInt(localStorage.getItem(COINS_KEY) ?? "0", 10);
    localStorage.setItem(COINS_KEY, String(current + amount));
  } catch {}
}

type Question = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

const BASE_QUESTIONS: Question[] = [
  { question: "Which plate is usually best for steady energy?", options: ["Mostly refined carbs", "Protein + fiber + colorful plants", "Only fruit juice", "Skipping meals"], correct: 1, explanation: "Protein, fiber, and plants slow digestion and keep energy more stable." },
  { question: "What raises Meal IQ most for a meal?", options: ["More sugar", "Balanced macros and micronutrients", "Eating very fast", "No water all day"], correct: 1, explanation: "Meal IQ rewards protein, fiber, healthy carbs/fats, and nutrient density." },
  { question: "A quick way to improve lunch is to add:", options: ["A sugary drink", "A lean protein source", "Extra fried toppings", "Nothing but bread"], correct: 1, explanation: "Lean protein supports fullness, muscle repair, and balanced calories." },
  { question: "Which snack is the smartest default?", options: ["Greek yogurt with berries", "Candy only", "Soda", "Plain chips"], correct: 0, explanation: "It combines protein, fiber, and micronutrients without a large sugar spike." },
  { question: "If dinner is low in fiber, add:", options: ["Leafy greens or beans", "More butter only", "A second dessert", "Skip water"], correct: 0, explanation: "Greens and beans are efficient ways to boost fiber and fullness." },
  { question: "For hydration, a good first step is:", options: ["Wait until night", "Drink water with meals", "Only drink caffeine", "Avoid fluids"], correct: 1, explanation: "Pairing water with meals makes hydration easier to remember." },
];

function pickQuestions() {
  return [...BASE_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 4);
}

export function MealIqQuiz({ children, score }: { children: React.ReactNode; score?: number | null }) {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>(() => pickQuestions());
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [coinsAwarded, setCoinsAwarded] = useState(false);
  const current = questions[index]!;
  const answered = answers[index] !== undefined;
  const selected = answers[index];
  const correctCount = answers.reduce((sum, answer, i) => sum + (answer === questions[i]?.correct ? 1 : 0), 0);
  const complete = answers.length === questions.length;
  const recommendation = useMemo(() => {
    if (!score) return "Log more meals to unlock more personalized nutrition questions.";
    if (score >= 22) return "Your Meal IQ is strong. Focus on consistency and variety.";
    if (score >= 16) return "You are close. Add protein and fiber to push your score higher.";
    return "Start simple: protein, vegetables, water, and fewer sugary extras.";
  }, [score]);

  const reset = () => {
    setQuestions(pickQuestions());
    setIndex(0);
    setAnswers([]);
    setCoinsEarned(0);
    setCoinsAwarded(false);
  };

  const choose = (answer: number) => {
    if (answered) return;
    const next = [...answers];
    next[index] = answer;
    setAnswers(next);
    playGamificationSound(answer === current.correct ? "xp" : "toggle");
    const newCorrect = next.reduce((sum, a, i) => sum + (a === questions[i]?.correct ? 1 : 0), 0);
    if (next.length === questions.length && !coinsAwarded) {
      const earned = newCorrect >= questions.length ? 15 : newCorrect >= questions.length - 1 ? 10 : newCorrect >= 2 ? 5 : 2;
      addCoins(earned);
      setCoinsEarned(earned);
      setCoinsAwarded(true);
      playGamificationSound("coins");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (v) reset(); }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[95vw] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Meal IQ Challenge
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-1">
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-primary uppercase tracking-wider">Card {Math.min(index + 1, questions.length)} of {questions.length}</span>
              <span className="text-xs font-bold text-muted-foreground">{correctCount}/{questions.length} correct</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-2">
              <div className="h-full bg-gradient-to-r from-primary to-secondary transition-all" style={{ width: `${(answers.length / questions.length) * 100}%` }} />
            </div>
          </div>

          {!complete ? (
            <>
              <div>
                <p className="text-lg font-black leading-tight">{current.question}</p>
                <p className="text-xs text-muted-foreground mt-1">{recommendation}</p>
              </div>
              <div className="space-y-2">
                {current.options.map((option, i) => {
                  const isCorrect = i === current.correct;
                  const isSelected = selected === i;
                  return (
                    <button
                      key={option}
                      onClick={() => choose(i)}
                      className={cn(
                        "w-full p-3 rounded-2xl border text-left text-sm font-bold transition-all",
                        !answered && "bg-card border-border/50 hover:border-primary/40",
                        answered && isCorrect && "bg-primary/10 border-primary/40 text-primary",
                        answered && isSelected && !isCorrect && "bg-destructive/10 border-destructive/40 text-destructive",
                        answered && !isSelected && !isCorrect && "bg-muted/30 border-border/30 text-muted-foreground"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {answered && isCorrect && <CheckCircle2 className="w-4 h-4" />}
                        {answered && isSelected && !isCorrect && <XCircle className="w-4 h-4" />}
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
              {answered && (
                <div className="rounded-2xl bg-muted/40 border border-border/40 p-3">
                  <p className="text-xs text-muted-foreground leading-relaxed">{current.explanation}</p>
                  <Button className="w-full mt-3 rounded-xl" onClick={() => setIndex(i => i + 1)}>
                    {index === questions.length - 1 ? "Finish Challenge" : "Next Card"}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-2 space-y-4">
              <div className="w-20 h-20 rounded-3xl bg-primary/15 flex items-center justify-center mx-auto">
                <Sparkles className="w-9 h-9 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-black">{correctCount}/{questions.length}</p>
                <p className="text-sm text-muted-foreground">Meal IQ challenge complete!</p>
              </div>
              {coinsEarned > 0 && (
                <div className="flex items-center justify-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl py-3 px-4">
                  <Coins className="w-5 h-5 text-yellow-400" />
                  <p className="text-lg font-black text-yellow-400">+{coinsEarned} Coins Earned!</p>
                </div>
              )}
              <div className={cn("rounded-xl p-2.5 text-xs font-semibold text-center",
                correctCount === questions.length ? "bg-primary/10 text-primary" :
                correctCount >= questions.length - 1 ? "bg-yellow-400/10 text-yellow-400" :
                "bg-muted/40 text-muted-foreground"
              )}>
                {correctCount === questions.length ? "Perfect score! You're a nutrition pro." :
                 correctCount >= questions.length - 1 ? "Great job! One step from perfect." :
                 correctCount >= 2 ? "Good effort! Keep building your nutrition knowledge." :
                 "Keep practicing — every quiz makes you smarter!"}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="rounded-xl" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" /> Replay</Button>
                <Button className="rounded-xl" onClick={() => setOpen(false)}>Done</Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
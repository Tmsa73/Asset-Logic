import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Brain, Apple, Dumbbell, Moon, Droplets, Heart, Zap, ChevronRight, Star, Check, X, Trophy, Sparkles, Target, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Topic {
  id: string;
  title: string;
  category: string;
  icon: typeof BookOpen;
  color: string;
  bg: string;
  xp: number;
  duration: string;
  content: string[];
  quiz: { question: string; options: string[]; correct: number; explanation: string };
}

const topics: Topic[] = [
  {
    id: "protein",
    title: "Protein & Muscle Growth",
    category: "Nutrition",
    icon: Apple,
    color: "text-primary",
    bg: "bg-primary/10",
    xp: 50,
    duration: "3 min",
    content: [
      "Protein is essential for muscle repair and growth. Each gram provides 4 calories and contains amino acids your body can't make on its own.",
      "Aim for 0.7–1g of protein per pound of bodyweight daily. Active individuals may need up to 1.2g/lb.",
      "Best sources: chicken breast (31g/100g), Greek yogurt (17g/170g), eggs (6g each), legumes (15g/cup), tofu (8g/100g).",
      "Timing matters — consuming protein within 2 hours post-workout helps maximize muscle protein synthesis by up to 25%.",
      "Spread protein across meals for best absorption. Most people can use ~40g per meal effectively.",
    ],
    quiz: {
      question: "How much protein should an active person generally aim for per pound of bodyweight?",
      options: ["0.3–0.5g/lb", "0.7–1.2g/lb", "2–3g/lb", "0.1–0.2g/lb"],
      correct: 1,
      explanation: "Active individuals generally benefit from 0.7–1.2g of protein per pound of bodyweight to support muscle repair and growth.",
    },
  },
  {
    id: "sleep",
    title: "Sleep & Recovery Science",
    category: "Sleep",
    icon: Moon,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    xp: 45,
    duration: "4 min",
    content: [
      "Sleep is when 80% of muscle repair happens. Growth hormone is primarily released during deep sleep (stages 3-4).",
      "7–9 hours is optimal for adults. Even one night of poor sleep can reduce performance by 10–30% and spike cortisol.",
      "Sleep debt is real — you cannot fully 'catch up' on missed sleep. Chronic deprivation alters fat storage hormones.",
      "Pre-sleep habits that work: dim lights 1hr before bed, keep room at 65–68°F (18–20°C), no screens 30 minutes before.",
      "Magnesium glycinate (200–400mg), L-theanine, and chamomile tea are evidence-based sleep supplements.",
    ],
    quiz: {
      question: "When is the majority of muscle repair and growth hormone release during sleep?",
      options: ["REM sleep", "Light sleep (stage 1-2)", "Deep sleep (stage 3-4)", "Just before waking"],
      correct: 2,
      explanation: "About 80% of muscle repair occurs during deep sleep (stages 3-4), when growth hormone is released in its largest pulses.",
    },
  },
  {
    id: "hiit",
    title: "HIIT vs. Steady-State Cardio",
    category: "Fitness",
    icon: Dumbbell,
    color: "text-secondary",
    bg: "bg-secondary/10",
    xp: 55,
    duration: "4 min",
    content: [
      "HIIT (High-Intensity Interval Training) burns 25–30% more calories than continuous moderate exercise in less time.",
      "HIIT creates EPOC (Excess Post-exercise Oxygen Consumption) — you burn calories at an elevated rate for up to 24 hours after.",
      "Steady-state cardio (jogging, cycling) is better for active recovery, building aerobic base, and lower injury risk.",
      "Optimal split: 2–3 HIIT sessions/week with 48hr recovery, supplemented by 2–3 steady-state sessions.",
      "Zone 2 training (60–70% max HR for 30–60min) builds mitochondrial density — the foundation of all endurance.",
    ],
    quiz: {
      question: "What is EPOC in the context of HIIT training?",
      options: ["A type of heart rate zone", "Elevated calorie burn after exercise", "A specific HIIT protocol", "The rest period between intervals"],
      correct: 1,
      explanation: "EPOC (Excess Post-exercise Oxygen Consumption) is the elevated metabolic rate that continues for hours after intense exercise, burning additional calories.",
    },
  },
  {
    id: "hydration",
    title: "Hydration & Performance",
    category: "Hydration",
    icon: Droplets,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    xp: 40,
    duration: "3 min",
    content: [
      "Even 2% dehydration impairs cognitive performance and can reduce physical output by up to 10%.",
      "General guideline: drink 35–45ml per kg of bodyweight daily, more in heat or during exercise.",
      "Electrolytes (sodium, potassium, magnesium) are critical — plain water alone can cause hyponatremia during heavy exercise.",
      "Urine color is the easiest hydration gauge. Pale yellow = well hydrated. Dark yellow = drink more.",
      "Drink 500ml of water in the morning to rehydrate after overnight fasting — this also boosts metabolism by ~24% for an hour.",
    ],
    quiz: {
      question: "At what level of dehydration does physical performance start to noticeably decline?",
      options: ["0.5% bodyweight", "2% bodyweight", "5% bodyweight", "10% bodyweight"],
      correct: 1,
      explanation: "Research shows that just 2% dehydration can reduce physical performance by up to 10% and impair cognitive function.",
    },
  },
  {
    id: "cortisol",
    title: "Stress, Cortisol & Fat",
    category: "Mental Health",
    icon: Brain,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    xp: 60,
    duration: "5 min",
    content: [
      "Cortisol is the primary stress hormone. In bursts it's useful; chronically elevated it's destructive to body composition.",
      "High cortisol promotes fat storage (especially visceral/belly fat), breaks down muscle, and disrupts sleep.",
      "Chronic stress elevates cortisol, increasing cravings for high-calorie foods by activating reward pathways.",
      "Evidence-based stress reducers: 10 min daily meditation (reduces cortisol by ~14%), cold showers, 30-min walks in nature.",
      "Adaptogens like Ashwagandha (600mg/day) have clinical evidence for reducing cortisol by up to 28%.",
    ],
    quiz: {
      question: "Where does chronically elevated cortisol preferentially promote fat storage?",
      options: ["Arms and legs", "Visceral/abdominal area", "Back and shoulders", "Evenly distributed"],
      correct: 1,
      explanation: "Chronically high cortisol specifically promotes visceral fat storage in the abdominal area, which is associated with higher metabolic risk.",
    },
  },
  {
    id: "vo2max",
    title: "VO2 Max: Longevity Marker",
    category: "Fitness",
    icon: Heart,
    color: "text-red-400",
    bg: "bg-red-500/10",
    xp: 65,
    duration: "5 min",
    content: [
      "VO2 max is the maximum rate at which your body can use oxygen during exercise — the gold standard for cardiovascular fitness.",
      "People in the top 25% for VO2 max live on average 5 years longer than those in the bottom 25%.",
      "You can improve VO2 max at any age. Even 12 weeks of consistent cardio can improve it by 15–25%.",
      "Best exercises for VO2 max: interval training, rowing, cycling, swimming — anything that elevates HR to 90%+ max.",
      "Calculate estimated VO2 max: run 1.5 miles as fast as possible. Use online calculators with your time and HR.",
    ],
    quiz: {
      question: "What does VO2 max measure?",
      options: ["Maximum heart rate", "Lung capacity at rest", "Max oxygen consumption during exercise", "Blood oxygen saturation"],
      correct: 2,
      explanation: "VO2 max measures your body's maximum capacity to use oxygen during intense exercise — the best single metric for cardiovascular fitness and longevity.",
    },
  },
];

const categoryColors: Record<string, string> = {
  Nutrition: "text-primary bg-primary/10 border-primary/20",
  Sleep: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  Fitness: "text-secondary bg-secondary/10 border-secondary/20",
  Hydration: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  "Mental Health": "text-orange-400 bg-orange-500/10 border-orange-500/20",
};

export default function Learn() {
  const { toast } = useToast();
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [lessonStep, setLessonStep] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [totalXP, setTotalXP] = useState(0);

  const openTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setLessonStep(0);
    setQuizMode(false);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
  };

  const nextStep = () => {
    if (!selectedTopic) return;
    if (lessonStep < selectedTopic.content.length - 1) {
      setLessonStep(s => s + 1);
    } else {
      setQuizMode(true);
    }
  };

  const submitQuiz = () => {
    if (selectedAnswer === null || !selectedTopic) return;
    setQuizSubmitted(true);
    if (selectedAnswer === selectedTopic.quiz.correct) {
      setCompletedTopics(prev => new Set([...prev, selectedTopic.id]));
      setTotalXP(prev => prev + selectedTopic.xp);
      setTimeout(() => {
        toast({ title: `+${selectedTopic.xp} XP Earned!`, description: "Lesson complete! Keep learning to level up." });
        setSelectedTopic(null);
      }, 1500);
    }
  };

  if (selectedTopic) {
    const isComplete = completedTopics.has(selectedTopic.id);
    return (
      <div className="min-h-full bg-background">
        <div className="p-5 space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => setSelectedTopic(null)} className="p-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors press-scale">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="font-black text-lg leading-tight">{selectedTopic.title}</h1>
              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", categoryColors[selectedTopic.category] || "text-muted-foreground bg-muted/50")}>
                {selectedTopic.category}
              </span>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-primary">+{selectedTopic.xp} XP</div>
              <div className="text-[10px] text-muted-foreground">{selectedTopic.duration}</div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!quizMode ? (
              <motion.div key={`step-${lessonStep}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Step {lessonStep + 1} of {selectedTopic.content.length}</span>
                    <span>Quiz next</span>
                  </div>
                  <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((lessonStep + 1) / (selectedTopic.content.length + 1)) * 100}%` }} />
                  </div>
                </div>

                {/* Content card */}
                <div className={cn("rounded-2xl p-5 border min-h-[200px] flex flex-col justify-between", selectedTopic.bg, "border-current/20")}>
                  <div>
                    <selectedTopic.icon className={cn("w-8 h-8 mb-4", selectedTopic.color)} />
                    <p className="text-base font-medium leading-relaxed text-foreground">{selectedTopic.content[lessonStep]}</p>
                  </div>
                </div>

                <Button onClick={nextStep} className="w-full">
                  {lessonStep < selectedTopic.content.length - 1 ? "Next →" : "Take Quiz →"}
                </Button>
              </motion.div>
            ) : (
              <motion.div key="quiz" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                {/* Quiz header */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <h2 className="font-black text-base">Knowledge Check</h2>
                    <p className="text-xs text-muted-foreground">Answer correctly to earn XP</p>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-4 border border-border/50">
                  <p className="font-semibold text-sm leading-relaxed mb-4">{selectedTopic.quiz.question}</p>
                  <div className="space-y-2.5">
                    {selectedTopic.quiz.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => !quizSubmitted && setSelectedAnswer(i)}
                        className={cn(
                          "w-full text-left p-3 rounded-xl border text-sm font-medium transition-all",
                          selectedAnswer === i && !quizSubmitted ? "border-primary bg-primary/10 text-primary" : "border-border/50 bg-muted/30 hover:bg-muted/50",
                          quizSubmitted && i === selectedTopic.quiz.correct ? "border-primary bg-primary/10 text-primary" : "",
                          quizSubmitted && selectedAnswer === i && i !== selectedTopic.quiz.correct ? "border-destructive bg-destructive/10 text-destructive" : "",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full border-2 border-current/30 flex items-center justify-center text-[10px] font-black shrink-0">
                            {quizSubmitted && i === selectedTopic.quiz.correct ? <Check className="w-3 h-3" /> : quizSubmitted && selectedAnswer === i ? <X className="w-3 h-3" /> : String.fromCharCode(65 + i)}
                          </span>
                          {opt}
                        </div>
                      </button>
                    ))}
                  </div>
                  {quizSubmitted && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn("mt-3 p-3 rounded-xl text-xs", selectedAnswer === selectedTopic.quiz.correct ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive")}>
                      <p className="font-bold mb-0.5">{selectedAnswer === selectedTopic.quiz.correct ? "✓ Correct!" : "✗ Incorrect"}</p>
                      <p className="text-foreground/80">{selectedTopic.quiz.explanation}</p>
                    </motion.div>
                  )}
                </div>

                {!quizSubmitted ? (
                  <Button onClick={submitQuiz} disabled={selectedAnswer === null} className="w-full">
                    Submit Answer
                  </Button>
                ) : selectedAnswer !== selectedTopic.quiz.correct ? (
                  <Button variant="outline" onClick={() => { setSelectedAnswer(null); setQuizSubmitted(false); }} className="w-full">
                    Try Again
                  </Button>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  const totalPossibleXP = topics.reduce((s, t) => s + t.xp, 0);
  const earnedXP = topics.filter(t => completedTopics.has(t.id)).reduce((s, t) => s + t.xp, 0);

  return (
    <div className="min-h-full bg-background">
      <div className="p-5 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Health Academy</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Learn & earn XP</p>
          </div>
          <div className="text-right bg-primary/10 border border-primary/20 rounded-2xl px-3 py-2">
            <div className="text-lg font-black text-primary">{earnedXP}</div>
            <div className="text-[10px] text-muted-foreground">XP earned</div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-card rounded-2xl p-4 border border-border/50">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-bold">Course Progress</span>
            </div>
            <span className="text-xs text-muted-foreground">{completedTopics.size}/{topics.length} lessons</span>
          </div>
          <div className="h-2 bg-muted/50 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all" style={{ width: `${(completedTopics.size / topics.length) * 100}%` }} />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{earnedXP} / {totalPossibleXP} XP possible</span>
            <span className="text-primary font-bold">{Math.round((completedTopics.size / topics.length) * 100)}% complete</span>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="space-y-3">
          <h2 className="text-sm font-black uppercase tracking-wider text-muted-foreground">Available Lessons</h2>
          {topics.map((topic) => {
            const isCompleted = completedTopics.has(topic.id);
            const Icon = topic.icon;
            return (
              <motion.button
                key={topic.id}
                onClick={() => openTopic(topic)}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full text-left bg-card rounded-2xl p-4 border transition-all hover-elevate",
                  isCompleted ? "border-primary/30 bg-primary/5" : "border-border/50"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", topic.bg)}>
                    <Icon className={cn("w-5 h-5", topic.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm leading-tight">{topic.title}</h3>
                      {isCompleted && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full border", categoryColors[topic.category] || "text-muted-foreground")}>
                        {topic.category}
                      </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" /> {topic.duration}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={cn("text-xs font-black", isCompleted ? "text-primary" : "text-yellow-400")}>
                      {isCompleted ? "✓ Done" : `+${topic.xp} XP`}
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground mt-1 ml-auto" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Completion badge */}
        {completedTopics.size === topics.length && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-4 border border-primary/30 text-center">
            <div className="text-3xl mb-2">🎓</div>
            <h3 className="font-black text-base gradient-text">Academy Complete!</h3>
            <p className="text-sm text-muted-foreground mt-1">You've mastered the BodyLogic curriculum. {earnedXP} XP total earned!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

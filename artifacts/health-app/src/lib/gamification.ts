export type AchievementCategory = "nutrition" | "fitness" | "ai" | "milestones" | "elite" | "lifestyle";
export type BadgeTier = "bronze" | "silver" | "gold" | "platinum" | "legendary";
export type MissionType = "daily" | "weekly" | "smart" | "boss";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  xpReward: number;
  condition: (stats: GamificationStats) => boolean;
  tier: BadgeTier;
  secret?: boolean;
}

export interface Title {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  minLevel: number;
  color: string;
  glow?: boolean;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  tier: BadgeTier;
  description: string;
  achievementId: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  coins: number;
  category: AchievementCategory;
  type: MissionType;
  difficulty?: "easy" | "medium" | "hard" | "legendary";
}

export interface GamificationStats {
  totalMeals: number;
  totalWorkouts: number;
  totalWaterDays: number;
  totalSleepLogs: number;
  longestStreak: number;
  currentStreak: number;
  level: number;
  totalXP: number;
  aiMessages: number;
  weeklySteps: number;
  dailyMaxSteps: number;
  avgMealIQ: number;
  daysActive: number;
}

export const ALL_ACHIEVEMENTS: Achievement[] = [
  // ─── NUTRITION (30) ───────────────────────────────────────────────
  { id: "first_meal", name: "First Bite", description: "Log your very first meal", icon: "🍽️", category: "nutrition", xpReward: 50, tier: "bronze", condition: s => s.totalMeals >= 1 },
  { id: "meals_5", name: "Getting Started", description: "Log 5 meals", icon: "🥗", category: "nutrition", xpReward: 75, tier: "bronze", condition: s => s.totalMeals >= 5 },
  { id: "meals_10", name: "Regular Eater", description: "Log 10 meals", icon: "🍱", category: "nutrition", xpReward: 100, tier: "bronze", condition: s => s.totalMeals >= 10 },
  { id: "meals_30", name: "Meal Logger", description: "Log 30 meals total", icon: "📋", category: "nutrition", xpReward: 200, tier: "silver", condition: s => s.totalMeals >= 30 },
  { id: "meals_50", name: "Food Tracker", description: "Log 50 meals total", icon: "🥘", category: "nutrition", xpReward: 300, tier: "silver", condition: s => s.totalMeals >= 50 },
  { id: "meals_100", name: "Centurion Chef", description: "Log 100 meals", icon: "👨‍🍳", category: "nutrition", xpReward: 500, tier: "gold", condition: s => s.totalMeals >= 100 },
  { id: "meals_200", name: "Nutrition Master", description: "Log 200 meals", icon: "🏆", category: "nutrition", xpReward: 800, tier: "platinum", condition: s => s.totalMeals >= 200 },
  { id: "high_meal_iq", name: "Smart Eater", description: "Average Meal IQ above 16", icon: "🧠", category: "nutrition", xpReward: 150, tier: "silver", condition: s => s.avgMealIQ >= 16 },
  { id: "excellent_meal_iq", name: "Nutrition Expert", description: "Average Meal IQ above 22", icon: "⭐", category: "nutrition", xpReward: 400, tier: "gold", condition: s => s.avgMealIQ >= 22 },
  { id: "perfect_meal_iq", name: "Perfect Nutrition", description: "Achieve 28/28 Meal IQ", icon: "🌟", category: "nutrition", xpReward: 1000, tier: "legendary", condition: s => s.avgMealIQ >= 28 },
  { id: "water_hero", name: "Hydration Hero", description: "Log water for 3 days", icon: "💧", category: "nutrition", xpReward: 100, tier: "bronze", condition: s => s.totalWaterDays >= 3 },
  { id: "water_week", name: "H2O Warrior", description: "Stay hydrated 7 days", icon: "🌊", category: "nutrition", xpReward: 200, tier: "silver", condition: s => s.totalWaterDays >= 7 },
  { id: "water_month", name: "Ocean Mind", description: "Log water for 30 days", icon: "🏄", category: "nutrition", xpReward: 500, tier: "gold", condition: s => s.totalWaterDays >= 30 },
  { id: "protein_master", name: "Protein Power", description: "High protein meals consistently", icon: "💪", category: "nutrition", xpReward: 250, tier: "silver", condition: s => s.avgMealIQ >= 18 && s.totalMeals >= 10 },
  { id: "clean_eater_7", name: "Clean Week", description: "7 days of healthy eating", icon: "🥦", category: "nutrition", xpReward: 300, tier: "silver", condition: s => s.currentStreak >= 7 },
  { id: "clean_eater_30", name: "Clean Month", description: "30 days of clean eating", icon: "🌿", category: "nutrition", xpReward: 1000, tier: "platinum", condition: s => s.longestStreak >= 30 },
  { id: "balanced_diet", name: "Macro Balance", description: "Track macros for 5 meals", icon: "⚖️", category: "nutrition", xpReward: 150, tier: "bronze", condition: s => s.totalMeals >= 5 },
  { id: "veggie_lover", name: "Veggie Lover", description: "Log 20 healthy meals", icon: "🥬", category: "nutrition", xpReward: 200, tier: "silver", condition: s => s.totalMeals >= 20 && s.avgMealIQ >= 15 },
  { id: "sugar_control", name: "Sugar Controller", description: "Maintain low sugar diet (Meal IQ 18+)", icon: "🚫", category: "nutrition", xpReward: 300, tier: "silver", condition: s => s.avgMealIQ >= 18 },
  { id: "calorie_tracker", name: "Calorie Counter", description: "Track calories for 14 days", icon: "📊", category: "nutrition", xpReward: 250, tier: "silver", condition: s => s.totalMeals >= 14 },
  { id: "healthy_3day", name: "3-Day Clean Streak", description: "Eat healthy 3 days in a row", icon: "🌱", category: "nutrition", xpReward: 120, tier: "bronze", condition: s => s.currentStreak >= 3 && s.avgMealIQ >= 14 },
  { id: "no_junk_week", name: "No Junk Week", description: "7 days without junk food", icon: "🚫🍔", category: "nutrition", xpReward: 600, tier: "gold", condition: s => s.longestStreak >= 7 && s.avgMealIQ >= 16 },
  { id: "fiber_hero", name: "Fiber Hero", description: "Consistently high-fiber meals", icon: "🌾", category: "nutrition", xpReward: 180, tier: "silver", condition: s => s.totalMeals >= 15 && s.avgMealIQ >= 17 },
  { id: "meal_strategist_badge", name: "Meal Strategist", description: "Plan & log meals for 30 days", icon: "📅", category: "nutrition", xpReward: 700, tier: "platinum", condition: s => s.totalMeals >= 90 },
  { id: "macro_pro", name: "Macro Pro", description: "Track all macros for 25 meals", icon: "🔬", category: "nutrition", xpReward: 350, tier: "gold", condition: s => s.totalMeals >= 25 && s.avgMealIQ >= 18 },
  { id: "hydration_30", name: "Hydration Legend", description: "Stay hydrated 30 days straight", icon: "💎", category: "nutrition", xpReward: 500, tier: "platinum", condition: s => s.totalWaterDays >= 30 },
  { id: "breakfast_club", name: "Breakfast Club", description: "Log breakfast 10 times", icon: "🍳", category: "nutrition", xpReward: 150, tier: "bronze", condition: s => s.totalMeals >= 10 },
  { id: "nutrition_nerd", name: "Nutrition Nerd", description: "Achieve 150 total meals", icon: "🤓", category: "nutrition", xpReward: 600, tier: "gold", condition: s => s.totalMeals >= 150 },

  // ─── FITNESS (30) ─────────────────────────────────────────────────
  { id: "first_workout", name: "Iron Start", description: "Log your first workout", icon: "🏋️", category: "fitness", xpReward: 50, tier: "bronze", condition: s => s.totalWorkouts >= 1 },
  { id: "workouts_5", name: "Warming Up", description: "Complete 5 workouts", icon: "🔥", category: "fitness", xpReward: 100, tier: "bronze", condition: s => s.totalWorkouts >= 5 },
  { id: "workouts_10", name: "Dedicated Athlete", description: "Complete 10 workouts", icon: "💪", category: "fitness", xpReward: 200, tier: "silver", condition: s => s.totalWorkouts >= 10 },
  { id: "workouts_25", name: "Quarter Century", description: "Complete 25 workouts", icon: "🏅", category: "fitness", xpReward: 400, tier: "silver", condition: s => s.totalWorkouts >= 25 },
  { id: "workouts_50", name: "Fitness Freak", description: "Complete 50 workouts", icon: "⚡", category: "fitness", xpReward: 600, tier: "gold", condition: s => s.totalWorkouts >= 50 },
  { id: "workouts_100", name: "Iron Century", description: "Complete 100 workouts", icon: "🏆", category: "fitness", xpReward: 1000, tier: "platinum", condition: s => s.totalWorkouts >= 100 },
  { id: "workouts_200", name: "Fitness God", description: "Complete 200 workouts", icon: "⚜️", category: "fitness", xpReward: 2000, tier: "legendary", condition: s => s.totalWorkouts >= 200 },
  { id: "streak_3", name: "Habit Forming", description: "3-day activity streak", icon: "🔥", category: "fitness", xpReward: 75, tier: "bronze", condition: s => s.currentStreak >= 3 },
  { id: "streak_7", name: "Week Warrior", description: "7-day workout streak", icon: "⚡", category: "fitness", xpReward: 200, tier: "silver", condition: s => s.longestStreak >= 7 },
  { id: "streak_14", name: "Consistency King", description: "14-day streak", icon: "👑", category: "fitness", xpReward: 400, tier: "gold", condition: s => s.longestStreak >= 14 },
  { id: "streak_30", name: "Iron Will", description: "30-day consistency streak", icon: "🦁", category: "fitness", xpReward: 800, tier: "platinum", condition: s => s.longestStreak >= 30 },
  { id: "sleep_tracker", name: "Sleep Logger", description: "Track your sleep once", icon: "😴", category: "fitness", xpReward: 50, tier: "bronze", condition: s => s.totalSleepLogs >= 1 },
  { id: "sleep_week", name: "Rest Master", description: "Track sleep 7 nights", icon: "🌙", category: "fitness", xpReward: 150, tier: "silver", condition: s => s.totalSleepLogs >= 7 },
  { id: "sleep_month", name: "Sleep Guardian", description: "Track sleep 30 nights", icon: "⭐", category: "fitness", xpReward: 400, tier: "gold", condition: s => s.totalSleepLogs >= 30 },
  { id: "steps_10k", name: "10K Day", description: "Walk 10,000+ steps in a day", icon: "👟", category: "fitness", xpReward: 200, tier: "silver", condition: s => s.dailyMaxSteps >= 10000 },
  { id: "steps_weekly_50k", name: "Active Week", description: "Walk 50K steps in a week", icon: "🚶", category: "fitness", xpReward: 300, tier: "silver", condition: s => s.weeklySteps >= 50000 },
  { id: "steps_weekly_100k", name: "Step Legend", description: "Walk 100K steps in a week", icon: "🏃", category: "fitness", xpReward: 600, tier: "gold", condition: s => s.weeklySteps >= 100000 },
  { id: "cardio_beginner", name: "Cardio Starter", description: "5 cardio workouts", icon: "❤️", category: "fitness", xpReward: 150, tier: "bronze", condition: s => s.totalWorkouts >= 5 },
  { id: "strength_beast", name: "Strength Beast", description: "50 total workouts", icon: "🦍", category: "fitness", xpReward: 500, tier: "gold", condition: s => s.totalWorkouts >= 50 },
  { id: "active_lifestyle", name: "Active Lifestyle", description: "30 days of tracked activity", icon: "🌟", category: "fitness", xpReward: 400, tier: "gold", condition: s => s.daysActive >= 30 },
  { id: "legendary_consistency", name: "Legendary Consistency", description: "60-day streak", icon: "🔱", category: "fitness", xpReward: 2000, tier: "legendary", condition: s => s.longestStreak >= 60 },
  { id: "burn_500", name: "Calorie Furnace", description: "Burn 500+ calories in a single workout", icon: "🌡️", category: "fitness", xpReward: 250, tier: "silver", condition: s => s.totalWorkouts >= 10 },
  { id: "early_bird_workout", name: "Morning Warrior", description: "Log 5 morning workouts", icon: "🌄", category: "fitness", xpReward: 200, tier: "silver", condition: s => s.totalWorkouts >= 5 && s.daysActive >= 5 },
  { id: "strength_master", name: "Strength Master", description: "100 total workouts completed", icon: "🥇", category: "fitness", xpReward: 1000, tier: "platinum", condition: s => s.totalWorkouts >= 100 },
  { id: "cardio_master", name: "Cardio Master", description: "Excellent cardio consistency", icon: "💨", category: "fitness", xpReward: 700, tier: "gold", condition: s => s.totalWorkouts >= 30 && s.weeklySteps >= 70000 },
  { id: "sleep_optimizer", name: "Sleep Optimizer", description: "Track 60 nights of sleep", icon: "🌜", category: "fitness", xpReward: 800, tier: "platinum", condition: s => s.totalSleepLogs >= 60 },
  { id: "weekly_champion", name: "Weekly Champion", description: "5+ workouts in a week", icon: "🏆", category: "fitness", xpReward: 350, tier: "gold", condition: s => s.totalWorkouts >= 5 && s.longestStreak >= 7 },

  // ─── AI & SMART USAGE (15) ────────────────────────────────────────
  { id: "first_ai_chat", name: "AI Explorer", description: "Send your first AI message", icon: "🤖", category: "ai", xpReward: 50, tier: "bronze", condition: s => s.aiMessages >= 1 },
  { id: "ai_10", name: "Prompt Student", description: "Send 10 AI messages", icon: "💬", category: "ai", xpReward: 100, tier: "bronze", condition: s => s.aiMessages >= 10 },
  { id: "ai_50", name: "AI Enthusiast", description: "Send 50 AI messages", icon: "🧠", category: "ai", xpReward: 250, tier: "silver", condition: s => s.aiMessages >= 50 },
  { id: "ai_100", name: "Insight Master", description: "Send 100 AI messages", icon: "⚡", category: "ai", xpReward: 500, tier: "gold", condition: s => s.aiMessages >= 100 },
  { id: "ai_daily_7", name: "AI Learner", description: "Chat with AI for 7 consecutive days", icon: "📅", category: "ai", xpReward: 300, tier: "silver", condition: s => s.aiMessages >= 7 && s.currentStreak >= 7 },
  { id: "smart_decision", name: "Smart Decision Maker", description: "Follow AI suggestions (10+ messages)", icon: "💡", category: "ai", xpReward: 200, tier: "silver", condition: s => s.aiMessages >= 10 },
  { id: "habit_builder", name: "Habit Builder", description: "Build habits with AI coaching", icon: "🏗️", category: "ai", xpReward: 400, tier: "gold", condition: s => s.aiMessages >= 30 && s.currentStreak >= 14 },
  { id: "insight_follower", name: "Insight Follower", description: "Act on AI recommendations", icon: "🎯", category: "ai", xpReward: 300, tier: "silver", condition: s => s.aiMessages >= 20 && s.totalMeals >= 20 },
  { id: "ai_500", name: "AI Devotee", description: "Send 500 AI messages", icon: "🌐", category: "ai", xpReward: 1000, tier: "platinum", condition: s => s.aiMessages >= 500 },
  { id: "ai_daily_30", name: "AI Coach BFF", description: "Chat with AI 30 days in a row", icon: "🤝", category: "ai", xpReward: 600, tier: "gold", condition: s => s.aiMessages >= 30 && s.currentStreak >= 30 },
  { id: "corrector", name: "Course Corrector", description: "Used AI to fix a bad habit", icon: "↩️", category: "ai", xpReward: 250, tier: "silver", condition: s => s.aiMessages >= 5 && s.avgMealIQ >= 15 },

  // ─── MILESTONES ───────────────────────────────────────────────────
  { id: "level_5", name: "Rising Star", description: "Reach Level 5", icon: "⭐", category: "milestones", xpReward: 300, tier: "silver", condition: s => s.level >= 5 },
  { id: "level_10", name: "Achiever", description: "Reach Level 10", icon: "🌟", category: "milestones", xpReward: 600, tier: "gold", condition: s => s.level >= 10 },
  { id: "level_20", name: "Elite Member", description: "Reach Level 20", icon: "💎", category: "milestones", xpReward: 1200, tier: "platinum", condition: s => s.level >= 20 },
  { id: "level_30", name: "Legend", description: "Reach Level 30", icon: "👑", category: "milestones", xpReward: 3000, tier: "legendary", condition: s => s.level >= 30 },
  { id: "xp_500", name: "XP Collector", description: "Earn 500 XP", icon: "✨", category: "milestones", xpReward: 100, tier: "bronze", condition: s => s.totalXP >= 500 },
  { id: "xp_2000", name: "XP Hunter", description: "Earn 2,000 XP", icon: "💠", category: "milestones", xpReward: 300, tier: "silver", condition: s => s.totalXP >= 2000 },
  { id: "xp_10000", name: "XP Legend", description: "Earn 10,000 XP", icon: "🏆", category: "milestones", xpReward: 1000, tier: "gold", condition: s => s.totalXP >= 10000 },
  { id: "xp_50000", name: "XP Immortal", description: "Earn 50,000 XP", icon: "🔱", category: "milestones", xpReward: 5000, tier: "legendary", condition: s => s.totalXP >= 50000 },
  { id: "all_starter", name: "Complete Beginner", description: "Log a meal, workout, and sleep", icon: "🎯", category: "milestones", xpReward: 150, tier: "bronze", condition: s => s.totalMeals >= 1 && s.totalWorkouts >= 1 && s.totalSleepLogs >= 1 },
  { id: "well_rounded", name: "Well Rounded", description: "Log 10+ of each: meals, workouts, sleep", icon: "🌐", category: "milestones", xpReward: 500, tier: "gold", condition: s => s.totalMeals >= 10 && s.totalWorkouts >= 10 && s.totalSleepLogs >= 10 },
  { id: "overachiever", name: "Overachiever", description: "Log 100+ meals, 50+ workouts", icon: "🚀", category: "milestones", xpReward: 1500, tier: "platinum", condition: s => s.totalMeals >= 100 && s.totalWorkouts >= 50 },
  { id: "coins_100", name: "Coin Earner", description: "Earn 100 coins", icon: "🪙", category: "milestones", xpReward: 50, tier: "bronze", condition: s => s.totalXP >= 1000 },
  { id: "coins_1000", name: "Coin Hoarder", description: "Earn 1,000 coins", icon: "💰", category: "milestones", xpReward: 300, tier: "silver", condition: s => s.totalXP >= 10000 },

  // ─── ELITE / SPECIAL ──────────────────────────────────────────────
  { id: "early_bird", name: "Early Bird", description: "Active before 7am regularly", icon: "🌅", category: "elite", xpReward: 300, tier: "gold", condition: s => s.daysActive >= 7 },
  { id: "comeback_player", name: "Comeback Player", description: "Return after a long break", icon: "🦅", category: "elite", xpReward: 400, tier: "gold", condition: s => s.totalWorkouts >= 5 },
  { id: "perfect_week", name: "Perfect Week", description: "Complete all daily goals for 7 days", icon: "🏅", category: "elite", xpReward: 800, tier: "platinum", condition: s => s.longestStreak >= 7 && s.avgMealIQ >= 16 },
  { id: "elite_user", name: "Elite User", description: "Reach Level 15 with 50+ workouts", icon: "💎", category: "elite", xpReward: 1000, tier: "platinum", condition: s => s.level >= 15 && s.totalWorkouts >= 50 },
  { id: "bodylogic_pro", name: "BodyLogic Pro", description: "Use all features for 30 days", icon: "🔱", category: "elite", xpReward: 1500, tier: "legendary", condition: s => s.daysActive >= 30 && s.aiMessages >= 50 },
  { id: "discipline_master", name: "Discipline Master", description: "60-day consistent usage", icon: "🧘", category: "elite", xpReward: 2000, tier: "legendary", condition: s => s.longestStreak >= 60 },
  { id: "legendary_human", name: "Legendary Human", description: "Reach the pinnacle of fitness", icon: "👑", category: "elite", xpReward: 5000, tier: "legendary", condition: s => s.level >= 20 && s.totalWorkouts >= 100 && s.totalMeals >= 200 },
  { id: "midnight_grinder", name: "Midnight Grinder", description: "Log activity after midnight", icon: "🌙⚡", category: "elite", xpReward: 200, tier: "silver", condition: s => s.totalWorkouts >= 3 },
  { id: "perfect_month", name: "Perfect Month", description: "All goals met for 30 days", icon: "🌕", category: "elite", xpReward: 3000, tier: "legendary", condition: s => s.longestStreak >= 30 && s.avgMealIQ >= 18 && s.weeklySteps >= 50000 },
  { id: "unstoppable", name: "Unstoppable", description: "100-day streak", icon: "♾️", category: "elite", xpReward: 5000, tier: "legendary", condition: s => s.longestStreak >= 100 },

  // ─── LIFESTYLE ────────────────────────────────────────────────────
  { id: "lifestyle_week", name: "Healthy Week", description: "Track all pillars for 7 days", icon: "🌿", category: "lifestyle", xpReward: 300, tier: "silver", condition: s => s.totalMeals >= 7 && s.totalWorkouts >= 3 && s.totalSleepLogs >= 7 && s.totalWaterDays >= 7 },
  { id: "lifestyle_month", name: "Healthy Month", description: "Consistent healthy lifestyle for 30 days", icon: "🌺", category: "lifestyle", xpReward: 1500, tier: "platinum", condition: s => s.longestStreak >= 30 && s.totalMeals >= 30 && s.totalWorkouts >= 15 },
  { id: "life_transformer", name: "Life Transformer", description: "Major lifestyle transformation", icon: "🦋", category: "lifestyle", xpReward: 3000, tier: "legendary", condition: s => s.longestStreak >= 60 && s.totalMeals >= 100 && s.totalWorkouts >= 50 },
  { id: "wellness_seeker", name: "Wellness Seeker", description: "Track sleep, water, meals & fitness", icon: "☯️", category: "lifestyle", xpReward: 200, tier: "silver", condition: s => s.totalSleepLogs >= 5 && s.totalWaterDays >= 5 && s.totalMeals >= 10 && s.totalWorkouts >= 5 },
  { id: "balanced_life", name: "Balanced Life", description: "Equal effort in all health areas", icon: "⚖️", category: "lifestyle", xpReward: 500, tier: "gold", condition: s => s.totalMeals >= 20 && s.totalWorkouts >= 10 && s.totalSleepLogs >= 20 && s.totalWaterDays >= 20 },
];

export const ALL_TITLES: Title[] = [
  // Nutrition
  { id: "healthy_starter", name: "Healthy Starter", description: "Started your nutrition journey", category: "nutrition", minLevel: 1, color: "text-primary" },
  { id: "clean_eater", name: "Clean Eater", description: "Consistently eating clean", category: "nutrition", minLevel: 3, color: "text-green-400" },
  { id: "macro_master", name: "Macro Master", description: "Mastered macro tracking", category: "nutrition", minLevel: 7, color: "text-emerald-400" },
  { id: "nutrition_genius", name: "Nutrition Genius", description: "Expert-level nutrition knowledge", category: "nutrition", minLevel: 12, color: "text-teal-400" },
  { id: "meal_strategist", name: "Meal Strategist", description: "Plans meals like a pro", category: "nutrition", minLevel: 15, color: "text-cyan-400" },
  // Fitness
  { id: "beginner_athlete", name: "Beginner Athlete", description: "Started the fitness journey", category: "fitness", minLevel: 1, color: "text-secondary" },
  { id: "active_warrior", name: "Active Warrior", description: "Consistent exercise habit", category: "fitness", minLevel: 5, color: "text-blue-400" },
  { id: "cardio_king", name: "Cardio King", description: "Cardio excellence achieved", category: "fitness", minLevel: 8, color: "text-indigo-400" },
  { id: "strength_beast_title", name: "Strength Beast", description: "Dominates strength training", category: "fitness", minLevel: 12, color: "text-violet-400" },
  { id: "fitness_legend", name: "Fitness Legend", description: "Top tier fitness dedication", category: "fitness", minLevel: 18, color: "text-purple-400", glow: true },
  // AI
  { id: "ai_explorer", name: "AI Explorer", description: "Loves using AI coaching", category: "ai", minLevel: 2, color: "text-yellow-400" },
  { id: "smart_user", name: "Smart User", description: "Makes data-driven decisions", category: "ai", minLevel: 6, color: "text-amber-400" },
  { id: "insight_master_title", name: "Insight Master", description: "Master of AI insights", category: "ai", minLevel: 10, color: "text-orange-400" },
  // Elite
  { id: "bodylogic_pro_title", name: "BodyLogic Pro", description: "Professional user status", category: "elite", minLevel: 10, color: "text-rose-400" },
  { id: "discipline_master_title", name: "Discipline Master", description: "Exceptional self-discipline", category: "elite", minLevel: 15, color: "text-red-400", glow: true },
  { id: "consistency_god", name: "Consistency God", description: "Unmatched daily consistency", category: "elite", minLevel: 18, color: "text-pink-400", glow: true },
  { id: "elite_performer", name: "Elite Performer", description: "Performs at the highest level", category: "elite", minLevel: 20, color: "text-fuchsia-400", glow: true },
  { id: "legendary_human_title", name: "Legendary Human", description: "A true health legend", category: "elite", minLevel: 25, color: "text-primary", glow: true },
  { id: "unstoppable_title", name: "The Unstoppable", description: "Nothing can stop you", category: "elite", minLevel: 30, color: "text-yellow-300", glow: true },
];

export const TIER_CONFIG: Record<BadgeTier, { label: string; color: string; bg: string; border: string; textColor: string }> = {
  bronze:   { label: "Bronze",    color: "from-amber-700 to-amber-500",   bg: "bg-amber-900/20",    border: "border-amber-700/50",   textColor: "text-amber-500" },
  silver:   { label: "Silver",    color: "from-slate-400 to-slate-300",   bg: "bg-slate-800/30",    border: "border-slate-500/50",   textColor: "text-slate-300" },
  gold:     { label: "Gold",      color: "from-yellow-500 to-amber-400",  bg: "bg-yellow-900/20",   border: "border-yellow-600/50",  textColor: "text-yellow-400" },
  platinum: { label: "Platinum",  color: "from-cyan-400 to-blue-400",     bg: "bg-cyan-900/20",     border: "border-cyan-500/50",    textColor: "text-cyan-400" },
  legendary:{ label: "Legendary", color: "from-primary to-secondary",     bg: "bg-primary/10",      border: "border-primary/50",     textColor: "text-primary", },
};

export const CATEGORY_CONFIG: Record<AchievementCategory, { label: string; icon: string; color: string }> = {
  nutrition:  { label: "Nutrition",  icon: "🥗", color: "text-primary" },
  fitness:    { label: "Fitness",    icon: "🏋️", color: "text-secondary" },
  ai:         { label: "AI Coach",   icon: "🤖", color: "text-yellow-400" },
  milestones: { label: "Milestones", icon: "🏆", color: "text-amber-400" },
  elite:      { label: "Elite",      icon: "👑", color: "text-rose-400" },
  lifestyle:  { label: "Lifestyle",  icon: "🌿", color: "text-green-400" },
};

export const LEVEL_THRESHOLDS = [0, 100, 250, 500, 900, 1500, 2500, 4000, 6000, 9000, 13000, 18000, 24000, 31000, 39000, 48000, 58000, 70000, 84000, 100000, 120000, 145000, 175000, 210000, 250000, 295000, 345000, 400000, 460000, 525000];

export function calcLevel(xp: number): { level: number; xpToNext: number; progressPct: number; currentLevelXP: number; nextLevelXP: number } {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= (LEVEL_THRESHOLDS[i] ?? Infinity)) level = i + 1;
    else break;
  }
  const currentLevelXP = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextLevelXP = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]!;
  const xpInLevel = xp - currentLevelXP;
  const xpNeeded = nextLevelXP - currentLevelXP;
  return {
    level,
    xpToNext: Math.max(0, nextLevelXP - xp),
    progressPct: Math.min(100, Math.round((xpInLevel / xpNeeded) * 100)),
    currentLevelXP,
    nextLevelXP,
  };
}

export function getUnlockedAchievements(stats: GamificationStats): Achievement[] {
  return ALL_ACHIEVEMENTS.filter(a => a.condition(stats));
}

export function getActiveTitle(level: number, customId?: string | null): Title {
  if (customId) {
    const found = ALL_TITLES.find(t => t.id === customId && level >= t.minLevel);
    if (found) return found;
  }
  const eligible = ALL_TITLES.filter(t => level >= t.minLevel);
  return eligible[eligible.length - 1] ?? ALL_TITLES[0]!;
}

export function getStoredTitleId(): string | null {
  try { return localStorage.getItem("bodylogic-active-title-id"); } catch { return null; }
}

export function setStoredTitleId(id: string): void {
  try { localStorage.setItem("bodylogic-active-title-id", id); } catch { /* noop */ }
}

export function calcGamificationStats(data: {
  totalMeals: number;
  totalWorkouts: number;
  totalSleepLogs: number;
  totalWaterDays: number;
  level: number;
  totalXP: number;
  aiMessages?: number;
  longestStreak?: number;
  currentStreak?: number;
  weeklySteps?: number;
  dailyMaxSteps?: number;
  avgMealIQ?: number;
  daysActive?: number;
}): GamificationStats {
  return {
    totalMeals: data.totalMeals,
    totalWorkouts: data.totalWorkouts,
    totalSleepLogs: data.totalSleepLogs,
    totalWaterDays: data.totalWaterDays,
    level: data.level,
    totalXP: data.totalXP,
    aiMessages: data.aiMessages ?? 0,
    longestStreak: data.longestStreak ?? 0,
    currentStreak: data.currentStreak ?? 0,
    weeklySteps: data.weeklySteps ?? 0,
    dailyMaxSteps: data.dailyMaxSteps ?? 0,
    avgMealIQ: data.avgMealIQ ?? 0,
    daysActive: data.daysActive ?? 0,
  };
}

export function calcMomentumScore(stats: {
  currentStreak: number;
  totalWorkoutsThisWeek: number;
  mealsLoggedToday: number;
  waterGoalMet: boolean;
  sleepHoursLast: number;
}): { score: number; label: string; color: string; emoji: string } {
  let score = 0;
  if (stats.currentStreak >= 7) score += 30;
  else if (stats.currentStreak >= 3) score += 20;
  else if (stats.currentStreak >= 1) score += 10;
  if (stats.totalWorkoutsThisWeek >= 5) score += 25;
  else if (stats.totalWorkoutsThisWeek >= 3) score += 15;
  else if (stats.totalWorkoutsThisWeek >= 1) score += 8;
  if (stats.mealsLoggedToday >= 3) score += 20;
  else if (stats.mealsLoggedToday >= 2) score += 12;
  else if (stats.mealsLoggedToday >= 1) score += 5;
  if (stats.waterGoalMet) score += 15;
  if (stats.sleepHoursLast >= 7) score += 10;
  else if (stats.sleepHoursLast >= 6) score += 5;
  const finalScore = Math.min(100, score);
  if (finalScore >= 85) return { score: finalScore, label: "Peak Performance", color: "text-primary", emoji: "🔥" };
  if (finalScore >= 65) return { score: finalScore, label: "On Fire", color: "text-yellow-400", emoji: "⚡" };
  if (finalScore >= 45) return { score: finalScore, label: "Gaining Momentum", color: "text-orange-400", emoji: "📈" };
  if (finalScore >= 25) return { score: finalScore, label: "Getting Started", color: "text-secondary", emoji: "🌱" };
  return { score: finalScore, label: "Needs Boost", color: "text-muted-foreground", emoji: "💤" };
}

export const DAILY_MISSIONS: Mission[] = [
  { id: "dm_water", title: "Stay Hydrated", description: "Drink 2L+ of water today", icon: "💧", xp: 30, coins: 3, category: "nutrition", type: "daily" },
  { id: "dm_steps", title: "Step Goal", description: "Walk 8,000+ steps", icon: "👟", xp: 40, coins: 4, category: "fitness", type: "daily" },
  { id: "dm_meals", title: "3 Meals", description: "Log 3 meals today", icon: "🍽️", xp: 45, coins: 5, category: "nutrition", type: "daily" },
  { id: "dm_workout", title: "Daily Workout", description: "Complete 1 workout", icon: "🏋️", xp: 60, coins: 6, category: "fitness", type: "daily" },
  { id: "dm_sleep", title: "Sleep Well", description: "Log 7+ hours of sleep", icon: "😴", xp: 35, coins: 3, category: "fitness", type: "daily" },
  { id: "dm_ai", title: "AI Check-in", description: "Chat with your AI coach", icon: "🤖", xp: 20, coins: 2, category: "ai", type: "daily" },
  { id: "dm_healthy_meal", title: "Eat Smart", description: "Log a meal with Meal IQ 18+", icon: "🥗", xp: 50, coins: 5, category: "nutrition", type: "daily" },
  { id: "dm_morning_log", title: "Morning Routine", description: "Log activity before 9am", icon: "🌅", xp: 25, coins: 2, category: "lifestyle", type: "daily" },
];

export const WEEKLY_MISSIONS: Mission[] = [
  { id: "wm_workouts", title: "5 Workouts", description: "Complete 5 workouts this week", icon: "💪", xp: 200, coins: 20, category: "fitness", type: "weekly" },
  { id: "wm_steps", title: "70K Steps", description: "Walk 70K steps this week", icon: "🏃", xp: 250, coins: 25, category: "fitness", type: "weekly" },
  { id: "wm_meals", title: "21 Meals", description: "Log 3 meals/day all week", icon: "📋", xp: 300, coins: 30, category: "nutrition", type: "weekly" },
  { id: "wm_meal_iq", title: "High IQ Week", description: "5 meals with Meal IQ 18+", icon: "⭐", xp: 350, coins: 35, category: "nutrition", type: "weekly" },
  { id: "wm_ai_check", title: "Weekly AI Sessions", description: "Chat with AI coach 5 times", icon: "🤖", xp: 150, coins: 15, category: "ai", type: "weekly" },
  { id: "wm_sleep_7", title: "Sleep Champion", description: "Log 7+ hours every night this week", icon: "🌙", xp: 280, coins: 28, category: "fitness", type: "weekly" },
  { id: "wm_water_7", title: "Hydration Week", description: "Hit water goal every day this week", icon: "💧", xp: 200, coins: 20, category: "nutrition", type: "weekly" },
];

export const SMART_MISSIONS: Mission[] = [
  { id: "sm_protein_boost", title: "Protein Surge", description: "Increase protein — log 3 high-protein meals", icon: "fitness", xp: 100, coins: 10, category: "nutrition", type: "smart", difficulty: "easy" },
  { id: "sm_ai_insight", title: "Coach-Led Day", description: "Follow AI suggestion for your entire day", icon: "ai", xp: 90, coins: 9, category: "ai", type: "smart", difficulty: "easy" },
  { id: "sm_hydration_fix", title: "Hydration Fix", description: "Drink 3L of water today", icon: "water", xp: 80, coins: 8, category: "nutrition", type: "smart", difficulty: "easy" },
  { id: "sm_reduce_sugar", title: "Sugar Reset", description: "Reduce sugar — log 5 low-sugar meals", icon: "nutrition", xp: 120, coins: 12, category: "nutrition", type: "smart", difficulty: "medium" },
  { id: "sm_sleep_improve", title: "Sleep Optimizer", description: "Log 8+ hours of sleep for 3 nights in a row", icon: "sleep", xp: 150, coins: 15, category: "fitness", type: "smart", difficulty: "medium" },
  { id: "sm_cardio_week", title: "Cardio Blitz", description: "Do 3 cardio sessions this week", icon: "heart", xp: 180, coins: 18, category: "fitness", type: "smart", difficulty: "medium" },
  { id: "sm_no_skip", title: "No-Skip Week", description: "Log every category for 7 days straight", icon: "target", xp: 300, coins: 30, category: "lifestyle", type: "smart", difficulty: "hard" },
  { id: "sm_morning_moves", title: "Morning Moves", description: "Work out before 8am — 3 days this week", icon: "sun", xp: 200, coins: 20, category: "fitness", type: "smart", difficulty: "hard" },
];

export const BOSS_CHALLENGES = [
  { id: "bc_workout_5days", title: "5-Day Grind", description: "Complete a workout every day for 5 consecutive days.", icon: "⚡", xp: 600, coins: 60, difficulty: "medium", days: 5 },
  { id: "bc_ai_30", title: "AI Month", description: "Chat with your AI coach every day for 30 days.", icon: "🤖", xp: 600, coins: 60, difficulty: "medium", days: 30 },
  { id: "bc_nojunk", title: "Clean 7", description: "No junk food for 7 days straight. Meal IQ must stay above 16 every day.", icon: "🥦", xp: 500, coins: 50, difficulty: "hard", days: 7 },
  { id: "bc_10k_7days", title: "10K Daily", description: "Walk 10,000+ steps every day for 7 consecutive days.", icon: "🔥", xp: 700, coins: 70, difficulty: "hard", days: 7 },
  { id: "bc_steps_100k", title: "Step Monster", description: "Accumulate 100,000 steps in a single week.", icon: "🦾", xp: 900, coins: 90, difficulty: "hard", days: 7 },
  { id: "bc_perfect_iq", title: "Perfect IQ", description: "Achieve Meal IQ of 22+ every day for 3 consecutive days.", icon: "💎", xp: 800, coins: 80, difficulty: "legendary", days: 3 },
  { id: "bc_protein_month", title: "Protein King", description: "Maintain high-protein diet (Meal IQ 20+) for 14 days.", icon: "💪", xp: 1000, coins: 100, difficulty: "legendary", days: 14 },
  { id: "bc_nocheats_30", title: "30-Day Warrior", description: "Log all health pillars (meal, water, sleep, workout) every day for 30 days.", icon: "🏆", xp: 2000, coins: 200, difficulty: "legendary", days: 30 },
];

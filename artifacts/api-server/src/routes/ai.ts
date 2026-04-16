import { Router, type IRouter } from "express";
import { desc, gte, and, lt, eq } from "drizzle-orm";
import { db, aiMessagesTable, usersTable, profileTable, mealsTable, workoutsTable, sleepTable, waterLogsTable } from "@workspace/db";
import { getUserFromRequest } from "./auth";
import {
  GetAiMessagesResponse,
  SendAiMessageBody,
  SendAiMessageResponse,
  GetAiInsightsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const healthTips = [
  { id: 1, category: "nutrition" as const, title: "Stay Hydrated", description: "Drink at least 8 glasses of water today to support metabolism and energy levels.", priority: "high" as const },
  { id: 2, category: "fitness" as const, title: "Move Every Hour", description: "Take short breaks to walk or stretch — sitting for long periods reduces calorie burn by up to 20%.", priority: "medium" as const },
  { id: 3, category: "sleep" as const, title: "Consistent Sleep Schedule", description: "Going to bed at the same time each night improves sleep quality and hormone balance.", priority: "high" as const },
  { id: 4, category: "nutrition" as const, title: "Protein at Every Meal", description: "Including protein with each meal helps maintain muscle mass and keeps you feeling full longer.", priority: "medium" as const },
  { id: 5, category: "general" as const, title: "Mindful Eating", description: "Slow down and savor your meals — eating mindfully reduces overeating by up to 30%.", priority: "low" as const },
  { id: 6, category: "water" as const, title: "Morning Hydration", description: "Drinking 500ml of water first thing in the morning kickstarts your metabolism and improves focus.", priority: "medium" as const },
];

async function buildUserContext(userId?: number) {
  const today = new Date();
  const dayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const dayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  let userName = "there";
  let goal = "improve_fitness";
  let weight = 70;
  let activityLevel = "moderate";
  let age = 25;
  let calorieGoal = 2000;

  if (userId) {
    const users = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
    if (users[0]) {
      userName = users[0].name.split(" ")[0] ?? "there";
      goal = users[0].goal ?? "improve_fitness";
      weight = users[0].weight ?? 70;
      activityLevel = users[0].activityLevel ?? "moderate";
      age = users[0].age ?? 25;
    }
  }

  const profiles = await db.select().from(profileTable).limit(1);
  if (profiles[0]) {
    calorieGoal = profiles[0].dailyCalorieGoal;
  }

  const todayMeals = await db.select().from(mealsTable).where(and(gte(mealsTable.loggedAt, dayStart), lt(mealsTable.loggedAt, dayEnd)));
  const totalCalories = todayMeals.reduce((s, m) => s + m.calories, 0);
  const totalProtein = todayMeals.reduce((s, m) => s + m.protein, 0);
  const totalFiber = todayMeals.reduce((s, m) => s + m.fiber, 0);

  const weekWorkouts = await db.select().from(workoutsTable).where(gte(workoutsTable.loggedAt, weekAgo));
  const recentSleep = await db.select().from(sleepTable).orderBy(desc(sleepTable.bedtime)).limit(3);
  const avgSleep = recentSleep.length > 0 ? recentSleep.reduce((s, sl) => s + sl.durationHours, 0) / recentSleep.length : 0;

  const todayWater = await db.select().from(waterLogsTable).where(and(gte(waterLogsTable.loggedAt, dayStart), lt(waterLogsTable.loggedAt, dayEnd)));
  const totalWaterMl = todayWater.reduce((s, w) => s + w.amountMl, 0);

  return {
    userName,
    goal: goal.replace(/_/g, " "),
    weight,
    activityLevel: activityLevel.replace(/_/g, " "),
    age,
    calorieGoal,
    todayCalories: totalCalories,
    todayProtein: totalProtein,
    todayFiber: totalFiber,
    mealsCount: todayMeals.length,
    weeklyWorkouts: weekWorkouts.length,
    avgSleepHours: Math.round(avgSleep * 10) / 10,
    waterTodayMl: totalWaterMl,
  };
}

function generatePersonalizedResponse(message: string, ctx: Awaited<ReturnType<typeof buildUserContext>>): string {
  const msg = message.toLowerCase();
  const name = ctx.userName;
  const simpleMode = ctx.age < 18 || ctx.age >= 55;
  const redirect = `${name}, I can help with nutrition, workouts, sleep, hydration, weight progress, and BodyLogic tracking. Ask me about one of those and I’ll keep it focused on your health goals.`;

  const caloriesRemaining = ctx.calorieGoal - ctx.todayCalories;
  const waterGlasses = Math.round(ctx.waterTodayMl / 250);

  if (msg.includes("nutrition") || msg.includes("food") || msg.includes("meal") || msg.includes("eat") || msg.includes("calorie")) {
    if (simpleMode) return `${name}, for food today: log each meal, add protein, drink water, and choose fruit or vegetables when you can. You have ${Math.max(0, caloriesRemaining)} calories left.`;
    if (ctx.mealsCount === 0) return `Hey ${name}! You haven't logged any meals today yet. Start by logging your breakfast — even a quick entry helps me give you personalized nutrition advice. Your calorie goal is ${ctx.calorieGoal} kcal.`;
    if (caloriesRemaining > 800) return `${name}, you've consumed ${ctx.todayCalories} kcal so far with ${caloriesRemaining} kcal remaining toward your ${ctx.calorieGoal} goal. You have room for ${ctx.mealsCount >= 2 ? "a good dinner" : "lunch and dinner"}. With your ${ctx.goal} goal, aim to hit your target with protein-rich, fiber-filled foods.`;
    if (caloriesRemaining < 0) return `${name}, you've exceeded your ${ctx.calorieGoal} kcal goal by ${Math.abs(caloriesRemaining)} kcal today. That's okay — one day won't derail your ${ctx.goal} journey. Tomorrow, try starting with a protein-packed breakfast to control appetite throughout the day.`;
    return `${name}, you're right on track with ${ctx.todayCalories} kcal consumed — ${caloriesRemaining} kcal remaining. Your protein is at ${ctx.todayProtein}g and fiber at ${ctx.todayFiber}g today. ${ctx.todayFiber < 15 ? "Consider adding more vegetables to boost your fiber intake." : "Fiber looks good — keep it up!"}`;
  }

  if (msg.includes("workout") || msg.includes("exercise") || msg.includes("gym") || msg.includes("training") || msg.includes("fitness")) {
    if (simpleMode) return `${name}, keep movement simple today: walk 20 minutes, stretch, or do an easy workout you can finish safely. You have logged ${ctx.weeklyWorkouts} workout${ctx.weeklyWorkouts !== 1 ? "s" : ""} this week.`;
    if (ctx.weeklyWorkouts === 0) return `${name}, you haven't logged any workouts this week. For your ${ctx.goal} goal, I recommend starting with 3 sessions per week. Even a 20-minute walk counts! What type of exercise do you enjoy most?`;
    if (ctx.weeklyWorkouts >= 5) return `${name}, you're crushing it with ${ctx.weeklyWorkouts} workouts this week! That's elite consistency. Make sure you're prioritizing recovery — adequate sleep and protein (you're at ${ctx.todayProtein}g today) are key for muscle repair and progress toward your ${ctx.goal} goal.`;
    return `${name}, you've logged ${ctx.weeklyWorkouts} workout${ctx.weeklyWorkouts > 1 ? "s" : ""} this week — solid effort! For your ${ctx.goal} goal at a ${ctx.activityLevel} activity level, aim for 4-5 sessions per week. Add one more session this week to stay on track.`;
  }

  if (msg.includes("sleep") || msg.includes("rest") || msg.includes("tired") || msg.includes("fatigue")) {
    if (simpleMode) return `${name}, aim for a calm bedtime, less screen time before sleep, and a consistent wake-up time. Your recent average is ${ctx.avgSleepHours || "not logged"} hours.`;
    if (ctx.avgSleepHours === 0) return `${name}, I don't see any sleep logs yet. Tracking your sleep is crucial — it directly impacts your ${ctx.goal} progress, hormone balance, and energy levels. Try logging your sleep tonight!`;
    if (ctx.avgSleepHours < 6.5) return `${name}, your average sleep is ${ctx.avgSleepHours} hours — that's below optimal. Poor sleep increases cortisol, reduces muscle recovery, and makes your ${ctx.goal} goal harder to achieve. Try a 10pm bedtime routine and avoid screens 1 hour before bed.`;
    if (ctx.avgSleepHours >= 7.5) return `${name}, your ${ctx.avgSleepHours}-hour average sleep is excellent! Quality sleep supports your ${ctx.goal} goal by optimizing hormone production, muscle recovery, and metabolism. Keep this up — it's one of your biggest strengths.`;
    return `${name}, your ${ctx.avgSleepHours}-hour average sleep is in a good range. To optimize it further, try to keep a consistent sleep schedule and ensure your room is dark and cool. This will support your ${ctx.goal} progress significantly.`;
  }

  if (msg.includes("water") || msg.includes("hydrat") || msg.includes("drink")) {
    if (simpleMode) return `${name}, drink water with each meal and keep a bottle nearby. You have logged about ${waterGlasses} glass${waterGlasses !== 1 ? "es" : ""} today.`;
    if (waterGlasses === 0) return `${name}, you haven't logged any water today! Hydration is foundational — dehydration reduces performance and slows metabolism. Start with 2 glasses now and aim for 8-10 throughout the day. Your body will thank you!`;
    if (waterGlasses >= 8) return `${name}, fantastic hydration — you've had ${waterGlasses} glasses today! Well-hydrated cells perform better, your joints are lubricated, and your metabolism is firing optimally. This definitely supports your ${ctx.goal} goal.`;
    return `${name}, you've had ${waterGlasses} glass${waterGlasses > 1 ? "es" : ""} of water today — keep going! Aim for ${10 - waterGlasses} more glasses to hit your daily target. Proper hydration boosts energy and supports your ${ctx.goal} journey.`;
  }

  if (msg.includes("weight") || msg.includes("progress") || msg.includes("result")) {
    if (simpleMode) return `${name}, progress comes from small daily wins: log meals, move your body, drink water, and sleep well. Keep it steady.`;
    return `${name}, progress toward ${ctx.goal} is a combination of consistent nutrition, movement, and recovery. At ${ctx.weight}kg with a ${ctx.activityLevel} activity level, your body responds best to sustainable changes. You've had ${ctx.weeklyWorkouts} workout${ctx.weeklyWorkouts !== 1 ? "s" : ""} this week and logged ${ctx.mealsCount} meal${ctx.mealsCount !== 1 ? "s" : ""} today — keep stacking those wins!`;
  }

  if (msg.includes("tip") || msg.includes("advice") || msg.includes("suggest") || msg.includes("help") || msg.includes("how")) {
    const tips = [];
    if (ctx.todayCalories < ctx.calorieGoal * 0.5 && ctx.mealsCount < 2) tips.push("Log your meals consistently — even estimating is better than skipping");
    if (ctx.weeklyWorkouts < 3) tips.push("Add one more workout this week to build your streak");
    if (ctx.avgSleepHours < 7) tips.push("Prioritize sleep — it's your #1 recovery tool");
    if (ctx.waterTodayMl < 1500) tips.push("Drink more water throughout the day");
    if (tips.length === 0) tips.push("Keep up your current routine — consistency is everything", "Consider increasing workout intensity by 10% this week", "Add more colorful vegetables to your meals for micronutrients");
    return `${name}, here are my top tips for you today:\n\n${tips.map((t, i) => `${i + 1}. ${t}`).join("\n")}\n\nFocused on your ${ctx.goal} goal, these small actions compound into big results over time!`;
  }

  const greetings = ["hi", "hello", "hey", "morning", "good morning", "good evening"];
  if (greetings.some(g => msg.startsWith(g))) {
    return redirect;
  }

  const healthKeywords = ["body", "health", "habit", "goal", "coach", "track", "plan", "diet", "muscle", "fat", "energy", "routine", "steps"];
  if (!healthKeywords.some(k => msg.includes(k))) return redirect;

  return simpleMode
    ? `${name}, the best next step is one small health action today: log a meal, drink water, walk, or prepare for better sleep. Which one do you want help with?`
    : `${name}, that's a great question! Based on your ${ctx.goal} goal and your activity this week (${ctx.weeklyWorkouts} workouts, ${ctx.todayCalories} kcal today, ${ctx.avgSleepHours}h avg sleep), here's my take: consistency in tracking and small daily improvements will get you to your goal faster than any single big change. What specific area — nutrition, fitness, or sleep — would you like to dive deeper into?`;
}

router.get("/ai/messages", async (req, res): Promise<void> => {
  const messages = await db
    .select()
    .from(aiMessagesTable)
    .orderBy(aiMessagesTable.createdAt)
    .limit(50);

  res.json(GetAiMessagesResponse.parse(messages));
});

router.post("/ai/messages", async (req, res): Promise<void> => {
  const parsed = SendAiMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await db.insert(aiMessagesTable).values({
    role: "user",
    content: parsed.data.content,
  });

  const authUser = await getUserFromRequest(req);
  const ctx = await buildUserContext(authUser?.id);
  const responseContent = generatePersonalizedResponse(parsed.data.content, ctx);

  const [assistantMessage] = await db.insert(aiMessagesTable).values({
    role: "assistant",
    content: responseContent,
  }).returning();

  res.json(SendAiMessageResponse.parse(assistantMessage));
});

router.get("/ai/insights", async (req, res): Promise<void> => {
  const authUser = await getUserFromRequest(req);
  const ctx = await buildUserContext(authUser?.id);
  const behaviorAnalysis = ctx.age < 18 || ctx.age >= 55
    ? "Your recent pattern is simple: mornings are stronger than evenings. Try one small evening log and one easy weekend walk to keep momentum."
    : "You tend to log meals consistently in the mornings but skip evening logs. Your workout frequency peaks mid-week and drops on weekends. Consider scheduling a Saturday activity to maintain momentum.";
  const insights = {
    tips: healthTips.slice(0, 4),
    mealSuggestion: "Try a quinoa bowl with grilled chicken, roasted vegetables, and avocado for a balanced, nutrient-dense lunch packed with complete proteins.",
    workoutSuggestion: "A 30-minute HIIT session would be ideal today — it maximizes calorie burn while fitting into a busy schedule. Combine with a 10-minute cooldown stretch.",
    motivationalQuote: "The only bad workout is the one that didn't happen. Every step forward counts, no matter how small.",
    behaviorAnalysis,
  };

  res.json(GetAiInsightsResponse.parse(insights));
});

export default router;

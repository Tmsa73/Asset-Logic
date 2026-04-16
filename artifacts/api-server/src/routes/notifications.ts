import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, notificationsTable } from "@workspace/db";
import {
  GetNotificationsResponse,
  MarkNotificationReadParams,
  MarkNotificationReadResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

async function seedNotificationsIfEmpty() {
  const existing = await db.select().from(notificationsTable).limit(1);
  if (existing.length === 0) {
    await db.insert(notificationsTable).values([
      { title: "Time to Hydrate!", message: "You haven't logged water in 2 hours. Stay hydrated!", type: "water", icon: "droplets" },
      { title: "Lunch Log Reminder", message: "Don't forget to log your lunch for accurate nutrition tracking.", type: "meal", icon: "utensils" },
      { title: "Workout Streak!", message: "Amazing! You've worked out 3 days in a row. Keep it up!", type: "achievement", icon: "flame" },
      { title: "Sleep Goal Met", message: "You slept 7.5 hours last night. Great recovery!", type: "tip", icon: "moon" },
      { title: "Level Up!", message: "Congratulations! You've reached Level 3: Explorer. New missions and title progress are available.", type: "achievement", icon: "crown" },
      { title: "Meal IQ Opportunity", message: "Your last meals were low on fiber. Add vegetables or beans to boost today's Meal IQ.", type: "meal", icon: "brain" },
      { title: "Weekend Momentum", message: "Your activity usually dips on weekends. Schedule one 20-minute walk to protect your streak.", type: "workout", icon: "zap" },
      { title: "Protein Check", message: "You're tracking meals well. Aim for protein at your next meal to support recovery.", type: "meal", icon: "utensils" },
      { title: "Recovery Nudge", message: "Sleep and hydration are your easiest XP wins today. Log both to keep progress balanced.", type: "tip", icon: "moon" },
      { title: "Personal Mission Ready", message: "A new personalized challenge is waiting in Rewards based on your recent habits.", type: "achievement", icon: "target" },
    ]);
  }
}

router.get("/notifications", async (req, res): Promise<void> => {
  await seedNotificationsIfEmpty();
  const notifications = await db
    .select()
    .from(notificationsTable)
    .orderBy(desc(notificationsTable.createdAt));

  const mapped = notifications.map(n => ({
    id: n.id,
    title: n.title,
    message: n.message,
    type: n.type,
    read: n.read,
    icon: n.icon,
    createdAt: n.createdAt,
  }));

  res.json(GetNotificationsResponse.parse(mapped));
});

router.post("/notifications/:id/read", async (req, res): Promise<void> => {
  const params = MarkNotificationReadParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid notification ID" });
    return;
  }

  await db
    .update(notificationsTable)
    .set({ read: true })
    .where(eq(notificationsTable.id, params.data.id));

  res.json(MarkNotificationReadResponse.parse({ success: true }));
});

export default router;

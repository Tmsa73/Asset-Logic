import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, sleepTable } from "@workspace/db";
import {
  GetSleepLogsQueryParams,
  GetSleepLogsResponse,
  LogSleepBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/sleep", async (req, res): Promise<void> => {
  const parsed = GetSleepLogsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const limit = parsed.data.limit ?? 7;
  const logs = await db
    .select()
    .from(sleepTable)
    .orderBy(desc(sleepTable.bedtime))
    .limit(limit);

  res.json(GetSleepLogsResponse.parse(logs));
});

router.post("/sleep", async (req, res): Promise<void> => {
  const parsed = LogSleepBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const bedtime = new Date(parsed.data.bedtime);
  const wakeTime = new Date(parsed.data.wakeTime);

  let durationHours = (wakeTime.getTime() - bedtime.getTime()) / (1000 * 60 * 60);

  // Overnight sleep: if bedtime is in the evening and wake is next morning,
  // the same-day subtraction gives a negative result — add 24 to fix.
  if (durationHours <= 0) {
    durationHours += 24;
  }

  // Hard cap: more than 20 hours is physiologically impossible
  if (durationHours > 20) {
    res.status(400).json({
      error: `Sleep duration of ${durationHours.toFixed(1)} hours is not valid. Please check bedtime and wake time.`,
    });
    return;
  }

  // Round to 2 decimal places for clean storage
  durationHours = Math.round(durationHours * 100) / 100;

  const date = bedtime.toISOString().split("T")[0]!;

  const [log] = await db.insert(sleepTable).values({
    bedtime,
    wakeTime,
    durationHours,
    quality: parsed.data.quality,
    date,
  }).returning();

  res.status(201).json(log);
});

export default router;

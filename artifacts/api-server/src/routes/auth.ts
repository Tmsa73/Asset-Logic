import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";
import {
  db, usersTable, mealsTable, workoutsTable, sleepTable, waterLogsTable,
  stepsTable, aiMessagesTable, notificationsTable, xpLogsTable,
  bodyMeasurementsTable, profileTable,
} from "@workspace/db";
import { hashPassword, verifyPassword } from "../lib/crypto";

const router: IRouter = Router();
const COOKIE_NAME = "bodylogic_token";
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

function setAuthCookie(res: any, token: string) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
    secure: false,
    path: "/",
  });
}

export async function getUserFromRequest(req: any): Promise<typeof usersTable.$inferSelect | null> {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return null;
    const users = await db.select().from(usersTable).where(eq(usersTable.sessionToken, token)).limit(1);
    return users[0] ?? null;
  } catch {
    return null;
  }
}

router.post("/auth/register", async (req, res, next): Promise<void> => {
  try {
    const { name, email, password, age, gender, weight, height, goal, activityLevel } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: "Name, email, and password are required" });
      return;
    }
    if (password.length < 6) {
      res.status(400).json({ error: "Password must be at least 6 characters" });
      return;
    }

    const existing = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.email, email.toLowerCase())).limit(1);
    if (existing.length > 0) {
      res.status(409).json({ error: "An account with this email already exists" });
      return;
    }

    const passwordHash = await hashPassword(password);
    const sessionToken = randomBytes(32).toString("hex");

    const [user] = await db.insert(usersTable).values({
      name,
      email: email.toLowerCase(),
      passwordHash,
      sessionToken,
      age: age ? Number(age) : 25,
      gender: gender || "unspecified",
      weight: weight ? Number(weight) : 70,
      height: height ? Number(height) : 170,
      goal: goal || "improve_fitness",
      activityLevel: activityLevel || "moderate",
      dailyCalorieGoal: 2000,
    }).returning();

    if (!user) { res.status(500).json({ error: "Failed to create account" }); return; }

    // Fresh start: wipe all shared activity tables so each new signup begins clean.
    try {
      await Promise.all([
        db.delete(mealsTable),
        db.delete(workoutsTable),
        db.delete(sleepTable),
        db.delete(waterLogsTable),
        db.delete(stepsTable),
        db.delete(aiMessagesTable),
        db.delete(notificationsTable),
        db.delete(xpLogsTable),
        db.delete(bodyMeasurementsTable),
        db.delete(profileTable),
      ]);
    } catch (e) {
      console.warn("[auth/register] fresh-start wipe failed:", e);
    }

    setAuthCookie(res, sessionToken);
    res.status(201).json({ id: user.id, name: user.name, email: user.email, age: user.age, gender: user.gender, weight: user.weight, height: user.height, goal: user.goal, activityLevel: user.activityLevel });
  } catch (err) {
    next(err);
  }
});

router.post("/auth/login", async (req, res, next): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const users = await db.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase())).limit(1);
    if (users.length === 0) { res.status(401).json({ error: "Invalid email or password" }); return; }

    const user = users[0]!;
    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) { res.status(401).json({ error: "Invalid email or password" }); return; }

    const sessionToken = randomBytes(32).toString("hex");
    await db.update(usersTable).set({ sessionToken }).where(eq(usersTable.id, user.id));

    setAuthCookie(res, sessionToken);
    res.json({ id: user.id, name: user.name, email: user.email, age: user.age, gender: user.gender, weight: user.weight, height: user.height, goal: user.goal, activityLevel: user.activityLevel });
  } catch (err) {
    next(err);
  }
});

router.get("/auth/me", async (req, res, next): Promise<void> => {
  try {
    const user = await getUserFromRequest(req);
    if (!user) { res.status(401).json({ error: "Not authenticated" }); return; }
    res.json({ id: user.id, name: user.name, email: user.email, age: user.age, gender: user.gender, weight: user.weight, height: user.height, goal: user.goal, activityLevel: user.activityLevel, createdAt: user.createdAt });
  } catch (err) {
    next(err);
  }
});

router.post("/auth/logout", async (req, res, next): Promise<void> => {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (token) {
      await db.update(usersTable).set({ sessionToken: null }).where(eq(usersTable.sessionToken, token));
    }
    res.clearCookie(COOKIE_NAME, { path: "/" });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;

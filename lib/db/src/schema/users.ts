import { pgTable, text, serial, integer, real, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  sessionToken: text("session_token"),
  age: integer("age").default(25),
  gender: text("gender").default("unspecified"),
  weight: real("weight").default(70),
  height: real("height").default(170),
  goal: text("goal").default("improve_fitness"),
  activityLevel: text("activity_level").default("moderate"),
  dailyCalorieGoal: integer("daily_calorie_goal").default(2000),
  aiPersonality: text("ai_personality").default("motivator"),
  dietType: text("diet_type").default("none"),
  weeklyStepGoal: integer("weekly_step_goal").default(70000),
  weightGoal: real("weight_goal"),
  healthConditions: text("health_conditions").default("none"),
  appTheme: text("app_theme").default("dark"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

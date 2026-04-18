import { pgTable, text, serial, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const bodyMeasurementsTable = pgTable("body_measurements", {
  id: serial("id").primaryKey(),
  weight: real("weight"),
  waist: real("waist"),
  chest: real("chest"),
  hips: real("hips"),
  arm: real("arm"),
  bodyFat: real("body_fat"),
  notes: text("notes"),
  loggedAt: timestamp("logged_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertBodyMeasurementSchema = createInsertSchema(bodyMeasurementsTable).omit({ id: true, loggedAt: true });
export type InsertBodyMeasurement = z.infer<typeof insertBodyMeasurementSchema>;
export type BodyMeasurement = typeof bodyMeasurementsTable.$inferSelect;

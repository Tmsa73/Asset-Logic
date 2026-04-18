import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, bodyMeasurementsTable } from "@workspace/db";
import {
  GetBodyMeasurementsResponse,
  CreateBodyMeasurementBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/measurements", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(bodyMeasurementsTable)
    .orderBy(desc(bodyMeasurementsTable.loggedAt));

  res.json(GetBodyMeasurementsResponse.parse(rows));
});

router.post("/measurements", async (req, res): Promise<void> => {
  const parsed = CreateBodyMeasurementBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [measurement] = await db
    .insert(bodyMeasurementsTable)
    .values({
      weight: parsed.data.weight ?? null,
      waist: parsed.data.waist ?? null,
      chest: parsed.data.chest ?? null,
      hips: parsed.data.hips ?? null,
      arm: parsed.data.arm ?? null,
      bodyFat: parsed.data.bodyFat ?? null,
      notes: parsed.data.notes ?? null,
    })
    .returning();

  res.status(201).json(measurement);
});

export default router;

export type LogicStatus = "ok" | "warning" | "invalid";

export interface LogicCheck {
  status: LogicStatus;
  reason?: string;
}

// ── Sleep ────────────────────────────────────────────────────────────────────
export function checkSleepHours(hours: number | null | undefined): LogicCheck {
  if (hours == null) return { status: "ok" };
  if (!isFinite(hours) || isNaN(hours)) return { status: "invalid", reason: "Sleep data is corrupted — please re-log" };
  if (hours < 0) return { status: "invalid", reason: "Negative sleep hours — bedtime and wake time are likely reversed" };
  if (hours > 20) return { status: "invalid", reason: `${hours.toFixed(1)}h of sleep is not physiologically possible` };
  if (hours < 1) return { status: "warning", reason: "Less than 1 hour logged — did you mean to log more?" };
  if (hours > 14) return { status: "warning", reason: "Over 14h of sleep is unusual — is this correct?" };
  return { status: "ok" };
}

// ── Calories (meal) ─────────────────────────────────────────────────────────
export function checkMealCalories(kcal: number | null | undefined): LogicCheck {
  if (kcal == null) return { status: "ok" };
  if (kcal < 0) return { status: "invalid", reason: "Calories cannot be negative" };
  if (kcal > 5000) return { status: "warning", reason: "Over 5,000 kcal in one meal is extremely unusual" };
  if (kcal === 0) return { status: "warning", reason: "Zero-calorie meal logged — is this correct?" };
  return { status: "ok" };
}

// ── Calories (daily total) ───────────────────────────────────────────────────
export function checkDailyCalories(kcal: number | null | undefined): LogicCheck {
  if (kcal == null) return { status: "ok" };
  if (kcal < 0) return { status: "invalid", reason: "Total daily calories cannot be negative" };
  if (kcal > 15000) return { status: "invalid", reason: "Over 15,000 kcal/day is not physiologically possible" };
  if (kcal > 6000) return { status: "warning", reason: "Over 6,000 kcal today is unusually high" };
  return { status: "ok" };
}

// ── Workout ──────────────────────────────────────────────────────────────────
export function checkWorkoutDuration(minutes: number | null | undefined): LogicCheck {
  if (minutes == null) return { status: "ok" };
  if (minutes <= 0) return { status: "invalid", reason: "Workout duration must be greater than 0" };
  if (minutes > 480) return { status: "warning", reason: "Over 8 hours of workout — is this correct?" };
  return { status: "ok" };
}

export function checkWorkoutCalories(kcal: number | null | undefined, durationMin: number | null | undefined): LogicCheck {
  if (kcal == null) return { status: "ok" };
  if (kcal < 0) return { status: "invalid", reason: "Calories burned cannot be negative" };
  if (durationMin && durationMin > 0) {
    const kcalPerMin = kcal / durationMin;
    if (kcalPerMin > 40) return { status: "warning", reason: `${kcal} kcal in ${durationMin} min is very high (${kcalPerMin.toFixed(0)} kcal/min)` };
  }
  if (kcal > 5000) return { status: "warning", reason: "Over 5,000 kcal burned in one session is extremely unusual" };
  return { status: "ok" };
}

// ── Steps ────────────────────────────────────────────────────────────────────
export function checkSteps(steps: number | null | undefined): LogicCheck {
  if (steps == null) return { status: "ok" };
  if (steps < 0) return { status: "invalid", reason: "Step count cannot be negative" };
  if (steps > 100000) return { status: "invalid", reason: "Over 100,000 steps/day is not possible" };
  if (steps > 60000) return { status: "warning", reason: "Over 60,000 steps is extremely high — is this correct?" };
  return { status: "ok" };
}

// ── Weight / BMI ─────────────────────────────────────────────────────────────
export function checkBMI(bmi: number | null | undefined): LogicCheck {
  if (bmi == null) return { status: "ok" };
  if (bmi <= 0) return { status: "invalid", reason: "BMI cannot be zero or negative" };
  if (bmi < 10 || bmi > 70) return { status: "invalid", reason: `BMI of ${bmi.toFixed(1)} is outside any known human range` };
  return { status: "ok" };
}

// ── Water ────────────────────────────────────────────────────────────────────
export function checkWaterMl(ml: number | null | undefined): LogicCheck {
  if (ml == null) return { status: "ok" };
  if (ml < 0) return { status: "invalid", reason: "Water intake cannot be negative" };
  if (ml > 20000) return { status: "invalid", reason: "Over 20L of water intake is not physically safe" };
  if (ml > 10000) return { status: "warning", reason: "Over 10L water today — is this correct?" };
  return { status: "ok" };
}

// ── Protein / Macros ─────────────────────────────────────────────────────────
export function checkProtein(g: number | null | undefined): LogicCheck {
  if (g == null) return { status: "ok" };
  if (g < 0) return { status: "invalid", reason: "Protein cannot be negative" };
  if (g > 600) return { status: "warning", reason: "Over 600g of protein/day is extremely high" };
  return { status: "ok" };
}

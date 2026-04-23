const API_BASE = `${(import.meta.env.BASE_URL ?? "/").replace(/\/$/, "")}/api`;

function toCsv(rows: any[]): string {
  if (!rows || !rows.length) return "";
  const headers = Array.from(
    rows.reduce<Set<string>>((set, row) => {
      Object.keys(row ?? {}).forEach(k => set.add(k));
      return set;
    }, new Set<string>())
  );
  const escape = (v: any) => {
    if (v == null) return "";
    const s = typeof v === "object" ? JSON.stringify(v) : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [headers.join(",")];
  for (const row of rows) lines.push(headers.map(h => escape(row?.[h])).join(","));
  return lines.join("\n");
}

export async function exportAllDataCsv(toast: (opts: any) => void): Promise<void> {
  try {
    toast({ title: "Preparing export…" });
    const endpoints: Record<string, string> = {
      profile: "/profile",
      meals: "/nutrition/meals?days=365",
      workouts: "/fitness/workouts?days=365",
      sleep: "/sleep?days=365",
      water: "/water?days=365",
      steps: "/steps?days=365",
      measurements: "/measurements",
      progress: "/progress",
    };
    const sections: string[] = [];
    for (const [name, path] of Object.entries(endpoints)) {
      try {
        const res = await fetch(`${API_BASE}${path}`, { credentials: "include" });
        if (!res.ok) continue;
        const data = await res.json();
        const rows = Array.isArray(data) ? data : Array.isArray((data as any)?.items) ? (data as any).items : [data];
        sections.push(`# ${name.toUpperCase()}\n${toCsv(rows)}`);
      } catch {}
    }
    if (!sections.length) {
      toast({ title: "Nothing to export yet", description: "Log some activity first.", variant: "destructive" });
      return;
    }
    const csv = sections.join("\n\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `bodylogic-export-${date}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast({ title: "Export downloaded" });
  } catch (e: any) {
    toast({ title: "Export failed", description: e?.message ?? "Unknown error", variant: "destructive" });
  }
}

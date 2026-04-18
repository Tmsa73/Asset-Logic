import { AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LogicCheck } from "@/lib/logic-validator";

interface Props {
  check: LogicCheck;
  compact?: boolean;
  className?: string;
}

export function LogicBadge({ check, compact = false, className }: Props) {
  if (check.status === "ok") return null;

  const isInvalid = check.status === "invalid";

  if (compact) {
    return (
      <span
        title={check.reason}
        className={cn(
          "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-black border",
          isInvalid
            ? "bg-destructive/15 text-destructive border-destructive/30"
            : "bg-amber-500/15 text-amber-500 border-amber-500/30",
          className
        )}
      >
        {isInvalid ? <XCircle className="w-2.5 h-2.5" /> : <AlertTriangle className="w-2.5 h-2.5" />}
        {isInvalid ? "Invalid" : "Unusual"}
      </span>
    );
  }

  return (
    <div className={cn(
      "flex items-start gap-2 rounded-xl border px-3 py-2 text-xs font-semibold",
      isInvalid
        ? "bg-destructive/10 border-destructive/30 text-destructive"
        : "bg-amber-500/10 border-amber-500/30 text-amber-500",
      className
    )}>
      {isInvalid
        ? <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        : <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />}
      <span className="leading-snug">{check.reason}</span>
    </div>
  );
}

interface ValueProps {
  value: string | number;
  check: LogicCheck;
  className?: string;
  valueClassName?: string;
}

export function ValidatedValue({ value, check, className, valueClassName }: ValueProps) {
  const isInvalid = check.status === "invalid";
  const isWarning = check.status === "warning";

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn(
        valueClassName,
        isInvalid && "text-destructive line-through opacity-60",
        isWarning && "text-amber-400"
      )}>
        {isInvalid ? "—" : value}
      </span>
      {isInvalid && (
        <span className="inline-flex items-center gap-0.5 text-[9px] font-black text-destructive bg-destructive/10 border border-destructive/20 px-1.5 py-0.5 rounded-md">
          <XCircle className="w-2.5 h-2.5" /> Invalid
        </span>
      )}
      {isWarning && (
        <span className="inline-flex items-center gap-0.5 text-[9px] font-black text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded-md">
          <AlertTriangle className="w-2.5 h-2.5" /> Check
        </span>
      )}
    </span>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1 text-[10px] font-bold text-destructive mt-1">
      <XCircle className="w-3 h-3" /> {message}
    </p>
  );
}

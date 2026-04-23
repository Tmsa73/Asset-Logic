import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandTag({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-1 select-none", className)}>
      <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm">
        <Heart className="w-1.5 h-1.5 text-background" fill="currentColor" />
      </div>
      <span className="text-[9px] font-black uppercase tracking-[0.18em] bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        BodyLogic
      </span>
    </div>
  );
}

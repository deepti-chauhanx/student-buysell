import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({ rating, size = 14, showValue = false, reviewCount }: { rating: number; size?: number; showValue?: boolean; reviewCount?: number }) {
  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={cn(
              "transition-colors",
              i <= Math.round(rating) ? "fill-warning text-warning" : "fill-muted text-muted",
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-medium text-foreground">
          {rating.toFixed(1)}
          {reviewCount != null && <span className="text-muted-foreground"> ({reviewCount})</span>}
        </span>
      )}
    </div>
  );
}

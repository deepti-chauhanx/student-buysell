import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function WishlistButton({ id, className, size = 18 }: { id: string; className?: string; size?: number }) {
  const { has, toggle } = useWishlist();
  const active = has(id);
  return (
    <button
      type="button"
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
        toast(active ? "Removed from wishlist" : "Saved to wishlist");
      }}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full bg-card/90 backdrop-blur shadow-sm border border-border transition-all hover:scale-110",
        className,
      )}
    >
      <Heart
        size={size}
        className={cn("transition-colors", active ? "fill-destructive text-destructive" : "text-muted-foreground")}
      />
    </button>
  );
}

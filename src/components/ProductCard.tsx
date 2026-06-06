import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { RatingStars } from "./RatingStars";
import { WishlistButton } from "./WishlistButton";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product }: { product: Product }) {
  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-[var(--shadow-elegant)] hover:-translate-y-0.5"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <WishlistButton id={product.id} className="absolute right-2 top-2" />
        {discount > 0 && (
          <Badge className="absolute left-2 top-2 bg-accent text-accent-foreground hover:bg-accent">
            {discount}% off
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{product.condition}</span>
          <span className="text-[10px] text-muted-foreground">· {product.postedDaysAgo}d ago</span>
        </div>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">{product.title}</h3>
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} showValue />
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-lg font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
          {product.mrp && (
            <span className="text-xs text-muted-foreground line-through">₹{product.mrp.toLocaleString("en-IN")}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

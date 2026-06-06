import { Link } from "@tanstack/react-router";
import type { Category } from "@/data/categories";
import { productsByCategory } from "@/data/products";

export function CategoryTile({ category }: { category: Category }) {
  const count = productsByCategory(category.slug).length;
  return (
    <Link
      to="/category/$slug"
      params={{ slug: category.slug }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-[var(--shadow-card)] hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={category.image} alt={category.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className={`absolute inset-0 bg-gradient-to-tr ${category.accent}`} />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-foreground">{category.name}</h3>
        <p className="text-xs text-muted-foreground">{category.tagline}</p>
        <p className="mt-1 text-[11px] font-medium text-primary">{count} listings →</p>
      </div>
    </Link>
  );
}

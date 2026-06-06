import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  q: fallback(z.string().optional(), undefined),
  category: fallback(z.string().optional(), undefined),
  sort: fallback(z.enum(["newest", "price-asc", "price-desc", "rating"]), "newest").default("newest"),
});

export const Route = createFileRoute("/browse")({
  validateSearch: zodValidator(schema),
  head: () => ({ meta: [{ title: "Browse all listings — CampusCart" }] }),
  component: Browse,
});

function Browse() {
  const { q, category, sort } = Route.useSearch();
  const navigate = Route.useNavigate();

  let list = products.slice();
  if (category) list = list.filter((p) => p.category === category);
  if (q) {
    const t = q.toLowerCase();
    list = list.filter((p) => p.title.toLowerCase().includes(t) || p.description.toLowerCase().includes(t));
  }
  list.sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return a.postedDaysAgo - b.postedDaysAgo;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {q ? `Results for "${q}"` : category ? categories.find(c => c.slug === category)?.name : "All listings"}
          </h1>
          <p className="text-sm text-muted-foreground">{list.length} item{list.length === 1 ? "" : "s"}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort</span>
          <Select value={sort} onValueChange={(v) => navigate({ search: (prev) => ({ ...prev, sort: v as typeof sort }) })}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low → High</SelectItem>
              <SelectItem value="price-desc">Price: High → Low</SelectItem>
              <SelectItem value="rating">Top rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={!category ? "default" : "outline"}
          onClick={() => navigate({ search: (prev) => ({ ...prev, category: undefined }) })}
        >All</Button>
        {categories.map((c) => (
          <Button
            key={c.slug}
            size="sm"
            variant={category === c.slug ? "default" : "outline"}
            onClick={() => navigate({ search: (prev) => ({ ...prev, category: c.slug }) })}
            className={cn(category === c.slug && "shadow-sm")}
          >
            {c.name}
          </Button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No listings match your search.</p>
          <Button variant="link" asChild><Link to="/browse" search={{ sort: "newest" as const }}>Clear filters</Link></Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}

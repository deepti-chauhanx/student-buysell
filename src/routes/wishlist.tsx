import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Your wishlist — CampusCart" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { ids } = useWishlist();
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Your wishlist</h1>
        <p className="mt-1 text-muted-foreground">{items.length} saved item{items.length === 1 ? "" : "s"}</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <Heart className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">No saved items yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">Tap the heart on any listing to save it for later.</p>
          <Button asChild className="mt-4"><Link to="/browse" search={{ sort: "newest" as const }}>Browse listings</Link></Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}

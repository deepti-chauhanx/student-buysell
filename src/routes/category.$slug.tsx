import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCategory } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.category.name} — CampusCart` : "Category" }],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Category not found</h1>
      <Button asChild className="mt-4"><Link to="/">Home</Link></Button>
    </div>
  ),
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const items = productsByCategory(category.slug);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <img src={category.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background" />
        <div className="relative mx-auto max-w-7xl px-4 py-12">
          <p className="text-sm font-medium text-primary">Category</p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight md:text-5xl">{category.name}</h1>
          <p className="mt-2 text-muted-foreground">{category.tagline} · {items.length} listings</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {items.length === 0 ? (
          <p className="text-muted-foreground">No listings yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, ShoppingBag, Calendar, Tag, ShieldCheck } from "lucide-react";
import { getProduct, recommendFor } from "@/data/products";
import { getSeller } from "@/data/sellers";
import { getCategory } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RatingStars } from "@/components/RatingStars";
import { WishlistButton } from "@/components/WishlistButton";
import { ProductCard } from "@/components/ProductCard";
import { ChatDrawer } from "@/components/ChatDrawer";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.product.title} — CampusCart` : "Product" },
      { name: "description", content: loaderData?.product.description ?? "" },
    ],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <Button asChild className="mt-4"><Link to="/browse" search={{ sort: "newest" as const, q: undefined, category: undefined }}>Back to browse</Link></Button>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const seller = getSeller(product.sellerId);
  const category = getCategory(product.category);
  const related = recommendFor(product);
  const [chatOpen, setChatOpen] = useState(false);
  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-4 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> ·{" "}
        {category && <Link to="/category/$slug" params={{ slug: category.slug }} className="hover:text-foreground">{category.name}</Link>}
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-muted">
          <img src={product.image} alt={product.title} className="w-full object-cover" />
          <WishlistButton id={product.id} className="absolute right-3 top-3" size={20} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{category?.name}</Badge>
            <Badge variant="outline">{product.condition}</Badge>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{product.title}</h1>
          <div className="mt-3"><RatingStars rating={product.rating} reviewCount={product.reviewCount} showValue /></div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-4xl font-bold">₹{product.price.toLocaleString("en-IN")}</span>
            {product.mrp && (
              <>
                <span className="text-lg text-muted-foreground line-through">₹{product.mrp.toLocaleString("en-IN")}</span>
                <Badge className="bg-success text-success-foreground hover:bg-success">{discount}% off</Badge>
              </>
            )}
          </div>

          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-3"><Calendar className="h-4 w-4 text-muted-foreground" /> Posted {product.postedDaysAgo}d ago</div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-3"><Tag className="h-4 w-4 text-muted-foreground" /> {product.condition}</div>
            <div className="col-span-2 flex items-center gap-2 rounded-xl border border-border bg-card p-3"><ShieldCheck className="h-4 w-4 text-success" /> Meet on campus — pay in person.</div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" className="flex-1 min-w-[180px]" onClick={() => toast("Sent buy request to seller!")}>
              <ShoppingBag className="mr-2 h-4 w-4" /> Buy now
            </Button>
            <Button size="lg" variant="outline" className="flex-1 min-w-[180px]" onClick={() => setChatOpen(true)}>
              <MessageCircle className="mr-2 h-4 w-4" /> Chat with seller
            </Button>
          </div>

          {seller && (
            <Link to="/seller/$id" params={{ id: seller.id }} className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-accent/30">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">{seller.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold">{seller.name}</div>
                <div className="text-xs text-muted-foreground">{seller.dept} · {seller.hostel} · {seller.year}</div>
                <div className="mt-1"><RatingStars rating={seller.rating} reviewCount={seller.reviewCount} showValue size={12} /></div>
              </div>
              <Button variant="ghost" size="sm">View profile →</Button>
            </Link>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">You might also like</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      <ChatDrawer open={chatOpen} onOpenChange={setChatOpen} seller={seller} productTitle={product.title} />
    </div>
  );
}

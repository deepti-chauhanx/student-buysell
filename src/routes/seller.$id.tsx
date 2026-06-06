import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Calendar, Building2, GraduationCap } from "lucide-react";
import { getSeller } from "@/data/sellers";
import { productsBySeller } from "@/data/products";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/RatingStars";
import { ProductCard } from "@/components/ProductCard";
import { ChatDrawer } from "@/components/ChatDrawer";

export const Route = createFileRoute("/seller/$id")({
  loader: ({ params }) => {
    const seller = getSeller(params.id);
    if (!seller) throw notFound();
    return { seller };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.seller.name} — Seller on CampusCart` : "Seller" }],
  }),
  component: SellerPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Seller not found</h1>
      <Button asChild className="mt-4"><Link to="/">Home</Link></Button>
    </div>
  ),
});

function SellerPage() {
  const { seller } = Route.useLoaderData();
  const listings = productsBySeller(seller.id);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border bg-[image:var(--gradient-card)]">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
            <Avatar className="h-24 w-24 ring-4 ring-primary/20">
              <AvatarFallback className="bg-primary text-2xl font-bold text-primary-foreground">{seller.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{seller.name}</h1>
              <p className="mt-1 text-muted-foreground">{seller.bio}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><GraduationCap className="h-4 w-4" /> {seller.dept}</span>
                <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4" /> {seller.hostel}</span>
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Joined {seller.joined}</span>
              </div>
              <div className="mt-3"><RatingStars rating={seller.rating} reviewCount={seller.reviewCount} showValue /></div>
            </div>
            <Button size="lg" onClick={() => setChatOpen(true)}><MessageCircle className="mr-2 h-4 w-4" /> Message</Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">{listings.length} listing{listings.length === 1 ? "" : "s"}</h2>
        {listings.length === 0 ? (
          <p className="text-muted-foreground">This seller has no active listings.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {listings.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>

      <ChatDrawer open={chatOpen} onOpenChange={setChatOpen} seller={seller} />
    </div>
  );
}

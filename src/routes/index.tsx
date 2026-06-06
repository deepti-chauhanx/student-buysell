import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { CategoryTile } from "@/components/CategoryTile";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusCart — Student Marketplace" },
      { name: "description", content: "Browse, buy and sell used college items on your campus." },
    ],
  }),
  component: Home,
});

function Home() {
  const recommended = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const recent = [...products].sort((a, b) => a.postedDaysAgo - b.postedDaysAgo).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(1_0_0_/_0.15),_transparent_60%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
          <div className="text-primary-foreground">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> 200+ listings across 5 hostels
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Your campus,<br />your marketplace.
            </h1>
            <p className="mt-4 max-w-md text-base text-primary-foreground/85 md:text-lg">
              Books, calcs, cycles, lamps and notes — from seniors who get it. Better prices than Amazon, zero shipping wait.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/browse" search={{ sort: "newest" as const }}>
                  Start browsing <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <Link to="/sell">Sell an item</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-primary-foreground/85">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Verified students only</span>
              <span className="inline-flex items-center gap-2"><Zap className="h-4 w-4" /> Meet on campus, no shipping</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary-foreground/10 blur-2xl" />
            <img src={heroImg} alt="Students sharing books, laptops and cycles" width={1280} height={896} className="relative w-full rounded-3xl border border-primary-foreground/20 shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Shop by category</h2>
            <p className="text-sm text-muted-foreground">Whatever your hostel needs.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories.map((c) => <CategoryTile key={c.slug} category={c} />)}
        </div>
      </section>

      {/* Recommended */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Top rated this week</h2>
            <p className="text-sm text-muted-foreground">Loved by students across campus.</p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/browse" search={{ sort: "rating" as const }}>View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {recommended.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Recent */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Just listed</h2>
            <p className="text-sm text-muted-foreground">Fresh from your seniors.</p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/browse" search={{ sort: "newest" as const }}>View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {recent.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="overflow-hidden rounded-3xl border border-border bg-[image:var(--gradient-card)] p-8 md:p-12">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold tracking-tight md:text-3xl">Moving out? Earn back what you paid.</h3>
              <p className="mt-2 text-muted-foreground">List your stuff in under a minute. Pickup happens at any hostel quad.</p>
            </div>
            <div className="flex md:justify-end">
              <Button size="lg" asChild><Link to="/sell">List your item <ArrowRight className="ml-1.5 h-4 w-4" /></Link></Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

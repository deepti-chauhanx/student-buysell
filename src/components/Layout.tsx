import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { Heart, Moon, Sun, Search, ShoppingBag, Menu, GraduationCap } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/lib/theme";
import { useWishlist } from "@/lib/wishlist";
import { categories } from "@/data/categories";
import { Toaster } from "@/components/ui/sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Layout() {
  const { theme, toggle } = useTheme();
  const { count } = useWishlist();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/browse", search: { q: q || undefined, category: undefined, sort: "newest" as const } });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-card)]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="hidden text-lg font-bold tracking-tight sm:inline">CampusCart</span>
          </Link>

          <form onSubmit={onSearch} className="relative mx-2 flex-1 max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search books, lamps, cycles…"
              className="pl-9"
            />
          </form>

          <nav className="hidden items-center gap-1 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">Categories</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {categories.map((c) => (
                  <DropdownMenuItem key={c.slug} asChild>
                    <Link to="/category/$slug" params={{ slug: c.slug }}>{c.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/browse" search={{ sort: "newest" as const }}>Browse</Link>
            </Button>
          </nav>

          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" aria-label="Wishlist" asChild>
            <Link to="/wishlist" className="relative">
              <Heart className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                  {count}
                </span>
              )}
            </Link>
          </Button>
          <Button size="sm" className="hidden sm:inline-flex" asChild>
            <Link to="/sell"><ShoppingBag className="mr-1.5 h-4 w-4" />Sell</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild><Link to="/browse" search={{ sort: "newest" as const }}>Browse</Link></DropdownMenuItem>
              {categories.map((c) => (
                <DropdownMenuItem key={c.slug} asChild>
                  <Link to="/category/$slug" params={{ slug: c.slug }}>{c.name}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild><Link to="/sell">Sell an item</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main key={pathname} className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground">
                <GraduationCap className="h-4 w-4" />
              </div>
              <span className="font-bold">CampusCart</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">The student marketplace for your campus. Buy, sell, study, repeat.</p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {categories.map((c) => (
                <li key={c.slug}><Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-foreground">{c.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Safety tips</li>
              <li>Seller guidelines</li>
              <li>Help center</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Hostel pickup hubs</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Sarojini · Tagore</li>
              <li>Kalpana · Bose</li>
              <li>Raman · Library Quad</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} CampusCart — Built for students, by students.</div>
      </footer>

      <Toaster />
    </div>
  );
}

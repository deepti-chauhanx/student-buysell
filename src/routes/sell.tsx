import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/data/categories";
import { toast } from "sonner";

export const Route = createFileRoute("/sell")({
  head: () => ({ meta: [{ title: "Sell an item — CampusCart" }] }),
  component: SellPage,
});

function SellPage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Listing submitted!", { description: "Your item is live for fellow students to see." });
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">List an item</h1>
      <p className="mt-1 text-muted-foreground">Takes less than a minute. No fees, ever.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" required placeholder="e.g. H.C. Verma Physics Vol 1" className="mt-1.5" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="price">Price (₹)</Label>
            <Input id="price" type="number" min={1} required placeholder="500" className="mt-1.5" />
          </div>
          <div>
            <Label>Category</Label>
            <Select required>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Pick one" /></SelectTrigger>
              <SelectContent>
                {categories.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Condition</Label>
          <Select defaultValue="Good">
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Like New">Like New</SelectItem>
              <SelectItem value="Good">Good</SelectItem>
              <SelectItem value="Fair">Fair</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" required rows={4} placeholder="Tell buyers about condition, what's included, why you're selling…" className="mt-1.5" />
        </div>

        <div>
          <Label>Photos</Label>
          <div className="mt-1.5 flex aspect-[3/1] cursor-pointer items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 transition-colors hover:bg-muted/60">
            <div className="text-center text-muted-foreground">
              <Upload className="mx-auto h-6 w-6" />
              <p className="mt-1 text-sm">Tap to upload (demo)</p>
            </div>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? "Posting…" : "Post listing"}
        </Button>
      </form>
    </div>
  );
}

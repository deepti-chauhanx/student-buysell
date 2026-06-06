import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Seller } from "@/data/sellers";
import { cn } from "@/lib/utils";

type Msg = { from: "me" | "them"; text: string; t: string };

const replies = [
  "Hey! Yes it's still available.",
  "Sure, price is slightly negotiable. What are you offering?",
  "I can meet near the library tomorrow around 5pm. Works for you?",
  "Condition is exactly as in the photos — no scratches.",
  "Cool! Let's do it. I'll DM the location.",
];

export function ChatDrawer({
  open,
  onOpenChange,
  seller,
  productTitle,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  seller: Seller | undefined;
  productTitle?: string;
}) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (open && seller) {
      setMsgs([
        { from: "them", text: `Hi! Thanks for reaching out about ${productTitle ? `"${productTitle}"` : "my listing"}.`, t: "now" },
      ]);
    }
  }, [open, seller, productTitle]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { from: "me", text: t, t: "now" }]);
    setText("");
    setTimeout(() => {
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMsgs((m) => [...m, { from: "them", text: reply, t: "now" }]);
    }, 700);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">{seller?.initials}</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="text-base">{seller?.name}</SheetTitle>
              <SheetDescription className="text-xs">{seller?.dept} · {seller?.hostel}</SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto space-y-3 bg-muted/30 p-4">
          {msgs.map((m, i) => (
            <div key={i} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[80%] rounded-2xl px-3 py-2 text-sm",
                m.from === "me" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card text-card-foreground rounded-bl-sm border border-border",
              )}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-border p-3">
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex gap-2"
          >
            <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message…" className="flex-1" />
            <Button type="submit" size="icon" aria-label="Send"><Send className="h-4 w-4" /></Button>
          </form>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">Demo chat — messages aren't saved.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

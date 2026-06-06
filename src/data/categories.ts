import books from "@/assets/cat-books.jpg";
import electronics from "@/assets/cat-electronics.jpg";
import hostel from "@/assets/cat-hostel.jpg";
import cycles from "@/assets/cat-cycles.jpg";
import notes from "@/assets/cat-notes.jpg";

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  accent: string;
};

export const categories: Category[] = [
  { slug: "books", name: "Books", tagline: "Textbooks & references", image: books, accent: "from-orange-500/20 to-rose-500/20" },
  { slug: "electronics", name: "Electronics", tagline: "Laptops, calcs & gadgets", image: electronics, accent: "from-blue-500/20 to-cyan-500/20" },
  { slug: "hostel", name: "Hostel Essentials", tagline: "Lamps, bedding, kettles", image: hostel, accent: "from-amber-500/20 to-yellow-500/20" },
  { slug: "cycles", name: "Cycles", tagline: "Get around campus", image: cycles, accent: "from-emerald-500/20 to-teal-500/20" },
  { slug: "notes", name: "Notes", tagline: "Handwritten & printed", image: notes, accent: "from-violet-500/20 to-fuchsia-500/20" },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

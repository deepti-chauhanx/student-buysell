import books from "@/assets/cat-books.jpg";
import electronics from "@/assets/cat-electronics.jpg";
import hostel from "@/assets/cat-hostel.jpg";
import cycles from "@/assets/cat-cycles.jpg";
import notes from "@/assets/cat-notes.jpg";

export type Product = {
  id: string;
  title: string;
  price: number;
  mrp?: number;
  condition: "Like New" | "Good" | "Fair";
  category: "books" | "electronics" | "hostel" | "cycles" | "notes";
  image: string;
  sellerId: string;
  rating: number;
  reviewCount: number;
  description: string;
  postedDaysAgo: number;
  tags?: string[];
};

const img: Record<Product["category"], string> = {
  books, electronics, hostel, cycles, notes,
};

const make = (p: Omit<Product, "image">): Product => ({ ...p, image: img[p.category] });

export const products: Product[] = [
  make({ id: "p1", title: "Introduction to Algorithms — Cormen (3rd Ed)", price: 650, mrp: 1200, condition: "Good", category: "books", sellerId: "s1", rating: 4.8, reviewCount: 12, postedDaysAgo: 2, description: "The CLRS bible. Light highlighting in chapters 1–6. Cover slightly worn but binding is tight.", tags: ["CSE", "DSA"] }),
  make({ id: "p2", title: "Casio fx-991EX Scientific Calculator", price: 750, mrp: 1295, condition: "Like New", category: "electronics", sellerId: "s4", rating: 4.9, reviewCount: 18, postedDaysAgo: 1, description: "Barely used. Original box and cover included. Perfect for engineering exams." }),
  make({ id: "p3", title: "Hero Sprint 26T Hybrid Cycle", price: 4800, mrp: 8500, condition: "Good", category: "cycles", sellerId: "s6", rating: 4.6, reviewCount: 7, postedDaysAgo: 5, description: "Single owner. New brake pads installed last month. Comes with U-lock and helmet." }),
  make({ id: "p4", title: "Thermodynamics Handwritten Notes (Full Semester)", price: 250, condition: "Like New", category: "notes", sellerId: "s3", rating: 5.0, reviewCount: 9, postedDaysAgo: 3, description: "Color-coded notes covering all 5 units. Includes solved PYQs from last 5 years." }),
  make({ id: "p5", title: "Philips LED Study Lamp + 4-socket Extension", price: 600, mrp: 1100, condition: "Good", category: "hostel", sellerId: "s2", rating: 4.7, reviewCount: 11, postedDaysAgo: 7, description: "Combo deal! Eye-friendly LED, 3 brightness modes. Extension board surge-protected." }),
  make({ id: "p6", title: "Concepts of Physics — H.C. Verma (Vol 1 & 2)", price: 480, mrp: 850, condition: "Good", category: "books", sellerId: "s7", rating: 4.9, reviewCount: 22, postedDaysAgo: 4, description: "Classic JEE prep set. Both volumes, no torn pages." }),
  make({ id: "p7", title: "Boat Rockerz 450 Wireless Headphones", price: 1100, mrp: 1999, condition: "Like New", category: "electronics", sellerId: "s4", rating: 4.5, reviewCount: 8, postedDaysAgo: 2, description: "15hr battery, used for 4 months only. Bluetooth 5.0." }),
  make({ id: "p8", title: "Microeconomics — Mankiw Full Notes", price: 200, condition: "Like New", category: "notes", sellerId: "s3", rating: 4.8, reviewCount: 6, postedDaysAgo: 1, description: "End-sem ready notes with diagrams. Got me an A+!" }),
  make({ id: "p9", title: "Bedsheet + Pillow + Comforter Set (Single)", price: 850, mrp: 1800, condition: "Good", category: "hostel", sellerId: "s5", rating: 4.6, reviewCount: 5, postedDaysAgo: 10, description: "Washed and freshly packed. Cotton, warm for winters." }),
  make({ id: "p10", title: "Btwin My Bike 7 Speed", price: 5500, mrp: 9999, condition: "Like New", category: "cycles", sellerId: "s8", rating: 4.9, reviewCount: 4, postedDaysAgo: 6, description: "Decathlon hybrid, less than 6 months old. Reflectors + bottle holder included." }),
  make({ id: "p11", title: "Engineering Mathematics — B.S. Grewal", price: 380, mrp: 695, condition: "Good", category: "books", sellerId: "s2", rating: 4.7, reviewCount: 15, postedDaysAgo: 8, description: "All chapters intact. Some pencil marks in calculus section." }),
  make({ id: "p12", title: "Lenovo Wireless Mouse + Mouse Pad", price: 350, mrp: 750, condition: "Like New", category: "electronics", sellerId: "s1", rating: 4.6, reviewCount: 9, postedDaysAgo: 3, description: "Brand new, opened only once. Receiver included." }),
  make({ id: "p13", title: "Organic Chemistry — Morrison & Boyd", price: 420, mrp: 950, condition: "Good", category: "books", sellerId: "s7", rating: 4.8, reviewCount: 11, postedDaysAgo: 9, description: "All mechanisms intact. Highlighted important reactions." }),
  make({ id: "p14", title: "DSA Notes (C++) — 200 pages, fully solved", price: 300, condition: "Like New", category: "notes", sellerId: "s1", rating: 4.9, reviewCount: 14, postedDaysAgo: 2, description: "Hand-written + neat diagrams. Covers arrays to graphs with code." }),
  make({ id: "p15", title: "Electric Kettle 1L — Pigeon", price: 450, mrp: 899, condition: "Good", category: "hostel", sellerId: "s2", rating: 4.4, reviewCount: 6, postedDaysAgo: 12, description: "Maggi machine. Works perfectly, mild scaling inside." }),
  make({ id: "p16", title: "Logitech K380 Bluetooth Keyboard", price: 1400, mrp: 2495, condition: "Like New", category: "electronics", sellerId: "s8", rating: 4.9, reviewCount: 7, postedDaysAgo: 4, description: "Multi-device, switches between phone/laptop/tablet." }),
  make({ id: "p17", title: "Design of Machine Elements — V.B. Bhandari", price: 500, mrp: 875, condition: "Good", category: "books", sellerId: "s2", rating: 4.6, reviewCount: 8, postedDaysAgo: 6, description: "Mechanical 5th-sem essential. Clean copy." }),
  make({ id: "p18", title: "Atlas Goldline Single-Speed Cycle", price: 2800, mrp: 5500, condition: "Fair", category: "cycles", sellerId: "s6", rating: 4.3, reviewCount: 3, postedDaysAgo: 14, description: "Rides smooth. Some paint chips. New tires fitted." }),
  make({ id: "p19", title: "Microbiology Lab Manual + Notes", price: 220, condition: "Like New", category: "notes", sellerId: "s7", rating: 4.8, reviewCount: 5, postedDaysAgo: 3, description: "Practical records + viva questions answered. Bio 2nd year." }),
  make({ id: "p20", title: "Stainless Steel Water Bottle 1L", price: 250, mrp: 599, condition: "Like New", category: "hostel", sellerId: "s5", rating: 4.7, reviewCount: 4, postedDaysAgo: 5, description: "Vacuum insulated, keeps water cold 24h. Brand: Milton." }),
  make({ id: "p21", title: "Digital Image Processing — Gonzalez", price: 700, mrp: 1395, condition: "Good", category: "books", sellerId: "s1", rating: 4.8, reviewCount: 6, postedDaysAgo: 7, description: "DIP elective core text. Sticky notes still inside." }),
  make({ id: "p22", title: "Drawing Board A2 + T-Square + Set Squares", price: 550, mrp: 1200, condition: "Good", category: "hostel", sellerId: "s5", rating: 4.9, reviewCount: 9, postedDaysAgo: 11, description: "Engineering drawing kit, 1st year complete set." }),
  make({ id: "p23", title: "iPad 9th Gen (64GB, Wi-Fi)", price: 18500, mrp: 30900, condition: "Like New", category: "electronics", sellerId: "s5", rating: 5.0, reviewCount: 3, postedDaysAgo: 4, description: "9 months old, with Apple Pencil 1st gen and folio cover. Battery health 98%." }),
  make({ id: "p24", title: "Operating Systems — Galvin (9th Ed)", price: 520, mrp: 950, condition: "Good", category: "books", sellerId: "s1", rating: 4.7, reviewCount: 10, postedDaysAgo: 8, description: "OS concepts standard. All chapters readable." }),
  make({ id: "p25", title: "Network Theory Notes — Full Syllabus", price: 280, condition: "Good", category: "notes", sellerId: "s4", rating: 4.6, reviewCount: 7, postedDaysAgo: 6, description: "Mesh, nodal, transient — everything with solved problems." }),
  make({ id: "p26", title: "Mini Fridge — Voltas 50L", price: 4200, mrp: 7500, condition: "Good", category: "hostel", sellerId: "s8", rating: 4.5, reviewCount: 4, postedDaysAgo: 15, description: "Works great for hostel rooms. Cold drinks + leftovers." }),
  make({ id: "p27", title: "Avon Mach City Geared Cycle", price: 6200, mrp: 11000, condition: "Like New", category: "cycles", sellerId: "s8", rating: 4.8, reviewCount: 5, postedDaysAgo: 3, description: "21-speed, disc brakes. Almost new." }),
  make({ id: "p28", title: "Probability & Statistics — Sheldon Ross", price: 460, mrp: 825, condition: "Good", category: "books", sellerId: "s3", rating: 4.7, reviewCount: 6, postedDaysAgo: 9, description: "Standard P&S text. No torn pages." }),
  make({ id: "p29", title: "USB-C 65W GaN Charger", price: 950, mrp: 1799, condition: "Like New", category: "electronics", sellerId: "s4", rating: 4.9, reviewCount: 11, postedDaysAgo: 2, description: "Charges laptop + phone fast. Compact, travel-friendly." }),
  make({ id: "p30", title: "Compiler Design Handwritten Notes", price: 240, condition: "Like New", category: "notes", sellerId: "s1", rating: 4.9, reviewCount: 8, postedDaysAgo: 4, description: "Complete CD notes — lexical to code gen. Worth every rupee." }),
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const productsByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const productsBySeller = (id: string) => products.filter((p) => p.sellerId === id);
export const recommendFor = (p: Product, n = 4) =>
  products.filter((x) => x.id !== p.id && x.category === p.category).slice(0, n);

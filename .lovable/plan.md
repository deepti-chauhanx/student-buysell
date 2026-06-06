## CampusCart — Build Plan

A polished, frontend-only student marketplace using TanStack Start, Tailwind v4, and shadcn. All data is realistic mock data held in TypeScript modules + localStorage for wishlist.

### Routes (`src/routes/`)
- `index.tsx` — Landing: hero, category tiles, recommended products, trending, recent listings.
- `browse.tsx` — Grid of all products with search, category filter, sort, price slider.
- `product.$id.tsx` — Product detail: image gallery, price, description, rating, seller card, wishlist, "Chat with seller" button (opens mock chat drawer), related items.
- `category.$slug.tsx` — Filtered grid per category (Books, Electronics, Hostel Essentials, Cycles, Notes).
- `seller.$id.tsx` — Seller profile: avatar, rating, bio, listings, reviews.
- `wishlist.tsx` — Saved items (localStorage).
- `sell.tsx` — "List an item" form (mock; shows toast "Listing submitted").

### Shared layout
Move the root from raw `<Outlet />` to a layout with:
- Sticky top nav: logo, search bar, category dropdown, wishlist icon (badge), dark mode toggle, "Sell" CTA, avatar.
- Footer with campus-y links.
- `ThemeProvider` (class-based dark mode) + persisted preference.

### Components (`src/components/`)
- `ProductCard`, `CategoryTile`, `SellerCard`, `RatingStars`, `PriceTag`, `WishlistButton`, `SearchBar`, `Filters`, `EmptyState`, `Recommendations` (simple "people also viewed" via category match), `ChatDrawer` (Sheet with mock conversation thread + composer that echoes a canned seller reply).

### Mock data (`src/data/`)
- `categories.ts` — 5 categories with icons and counts.
- `sellers.ts` — ~8 sellers with names, hostel/dept, ratings, reviews.
- `products.ts` — ~30 realistic items (e.g., "DSA by Cormen 3rd Ed", "Casio fx-991EX", "Hero Sprint 26T cycle", "Thermodynamics handwritten notes", "Study lamp + extension board"), priced in ₹, with condition, images, sellerId, categoryId, rating, reviewCount.
- `reviews.ts` — sample reviews per seller.

### State
- Wishlist: `useWishlist` hook backed by `localStorage` + custom event for cross-component sync.
- Search/filters: URL search params via TanStack Router `validateSearch` on `browse`.
- Theme: class on `<html>`, toggle in nav, localStorage persistence.

### Design system (`src/styles.css`)
Refresh tokens for a vibrant student-friendly look:
- Primary: warm indigo/violet; accent: lime; muted neutrals; rounded-2xl cards; soft shadows; gradient hero. Both light + dark `oklch` values. Add `--gradient-hero`, `--shadow-card`.
- Type: keep system fonts; bolder display weights for headings.

### Images
Use generated images for: hero illustration, 5 category tiles, and ~12 representative product photos (reused across the 30 listings). Generated under `src/assets/` and imported as ES modules.

### Chat (mock)
`ChatDrawer` opens from product/seller pages. Shows seed messages between "You" and the seller, a composer that appends user message and a canned seller auto-reply after 800ms. No persistence.

### Out of scope
No auth, no backend, no real chat, no payments. "Sell" and "Buy now" are UI-only with toasts.

### Acceptance
- All 5 categories browsable; search + filters work; product detail shows seller + rating + recommendations; wishlist persists across reload; dark mode toggles and persists; responsive from 360px to desktop; chat drawer opens and echoes replies.

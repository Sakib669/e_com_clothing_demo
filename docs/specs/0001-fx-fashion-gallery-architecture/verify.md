# Verify: Foundational Architecture and Bangladesh Market Localization · spec 0001 · updated 2026-10-24
_Steps derived from spec 0001 acceptance criteria. `/check verify` runs these; `/test` locks the durable ones._

## UI / manual
- [ ] Visit `/` → expect responsive luxury storefront with `#FFFFF0` canvas, `#FFFFFF` cards, `#0A0A0A` titles, `#C5A24D` gold dividers, and `#F59E0B` amber buttons → AC-1, AC-2
- [ ] Filter by category (e.g. T-Shirts, Shirts) and search on `/products` → expect catalog updates instantly → AC-3
- [ ] Open product detail at `/products/imperial-supima-cotton-crewneck-tshirt` → expect multi-image gallery, sizes S to XXL, color selectors, and stock status → AC-3
- [ ] Click "Quick Add" or "Add to Bag" → expect cart drawer to open with count badge and pricing calculations in BDT (৳) → AC-4
- [ ] Apply promotional coupon `WELCOME10` → expect 10% discount subtracted from subtotal → AC-4
- [ ] Proceed to `/checkout` → enter recipient name, valid BD mobile `01711234567`, delivery address, and switch between "Inside Dhaka" (৳80) and "Outside Dhaka" (৳150) → expect final payable amount updates immediately → AC-4
- [ ] Select Cash on Delivery, or bKash / Nagad Manual Payment with TrxID → submit order → expect redirect to `/order-confirmation/[id]` with order receipt and WhatsApp verification link → AC-5, AC-6
- [ ] Visit `/track` and search by Order ID or phone number → expect live visual fulfillment progression timeline → AC-7
- [ ] Navigate to `/admin/login` → enter `fx2026admin` (or click Quick Demo Login) → expect redirect to `/admin` dashboard showing sales revenue, order counts, and recent orders → AC-8
- [ ] Open `/admin/products` → click "Add New Product" → upload image (auto compressed to WebP < 200KB) and submit → expect product added to catalog → AC-9
- [ ] Open `/admin/orders` → inspect incoming order, click "Mark Paid" for bKash TrxID, and click "Dispatch via Pathao Courier" or "Steadfast Courier" → expect consignment ID generated and order status moved to Processing → AC-10
- [ ] Click "Export Orders CSV" in `/admin/orders` → expect downloaded CSV spreadsheet with full recipient and consignment columns → AC-11
- [ ] Open `/admin/settings` → click "Export Database JSON" → expect downloaded complete store backup; verify local storage persistence across browser refresh → AC-12

## Commands
- [ ] `./node_modules/.bin/next build` → expect 0 errors and 18 statically compiled routes → AC-1
- [ ] `curl -s -I http://localhost:3000` → expect HTTP 200 OK → AC-1

## Acceptance-criteria coverage
- AC-1 covered by homepage view & next build
- AC-2 covered by color token verification
- AC-3 covered by catalog & detail page checks
- AC-4 covered by cart drawer & checkout zone pricing
- AC-5 covered by COD & bKash/Nagad options
- AC-6 covered by order confirmation screen & WhatsApp link
- AC-7 covered by order tracking status timeline
- AC-8 covered by admin session auth & dashboard view
- AC-9 covered by product CRUD & WebP image compression
- AC-10 covered by order management & Pathao/Steadfast consignment booking
- AC-11 covered by sales summaries, coupon manager & CSV export
- AC-12 covered by Zustand LocalStorage state persistence & JSON backup

# 0001. Foundational Architecture and Bangladesh Market Localization for FX Fashion Gallery

**Date**: 2026-10-24
**Status**: In Progress

## Summary

This specification defines the foundational architecture for the FX Fashion Gallery clothing ecommerce platform. The solution uses Next.js with the App Router, TypeScript, Tailwind CSS, and shadcn UI, powered by a browser local storage repository engine that runs completely standalone without requiring database servers. It establishes an editorial luxury visual system using the client specified warm ivory and gold palette, and integrates Bangladesh specific commerce flows including Cash on Delivery, manual bKash and Nagad payment verification, and Pathao and Steadfast courier consignment management.

## Requirements

**User stories**:
- As a shopper in Bangladesh, I want to browse fashion collections, filter by category and size, view product details with clear pricing and stock, and check out as a guest using Cash on Delivery or bKash without mandatory registration so that I can purchase quickly on my mobile phone.
- As a store administrator, I want to manage products, categories, images, orders, delivery fees, and discount coupons from my Android phone and desktop PC so that I can run daily operations independently.
- As a store administrator, I want to review customer orders, verify bKash or Nagad Transaction IDs, update fulfillment statuses, and book consignments directly into Pathao Courier or Steadfast Courier so that deliveries are processed accurately.

**Acceptance criteria**:
- **AC-1**: The application renders a responsive fashion storefront supporting phone viewports (360px to 430px), tablet screens, laptops, and wide desktop displays without layout breaking.
- **AC-2**: The visual styling strictly applies the specified color palette: background `#FFFFF0`, product card `#FFFFFF`, title `#0A0A0A`, regular price `#262626`, old price strikethrough `#D90429`, primary action button `#F59E0B` with `#0A0A0A` text, and luxury divider `#C5A24D`.
- **AC-3**: The storefront provides product catalog browsing, instant category filtering (T-shirts, Shirts, Pants, Jackets), search, sorting (price, new arrivals), and detailed product view with image gallery, size and color selectors, and stock status.
- **AC-4**: The shopping cart and guest checkout flow allow customers to order without login, validating Bangladeshi phone numbers (11 digits starting with 01), calculating zone delivery charges (Inside Dhaka 80 Taka, Outside Dhaka 150 Taka), and computing final payable totals in Bangladeshi Taka (৳).
- **AC-5**: Checkout supports Cash on Delivery and manual bKash and Nagad payment options, displaying clear merchant instructions and capturing customer sender mobile number and Transaction ID.
- **AC-6**: Upon order placement, the system generates a unique order code, presents an order confirmation screen, offers a pre filled WhatsApp message link (`wa.me/8801...`) for immediate order verification, and persists the order to local storage.
- **AC-7**: Customers can track their orders at `/track` by entering their order number or phone number to view live status (Pending, Confirmed, Processing, Shipped, Delivered, Cancelled).
- **AC-8**: The administration dashboard (`/admin`) is protected by administrator session authentication, provides a mobile friendly drawer and navigation, and enables adding, editing, deleting, and publishing products with multiple images.
- **AC-9**: Product images uploaded in the admin dashboard are compressed client side to WebP format under 200KB and stored as Data URLs in local storage, with support for direct web image URLs.
- **AC-10**: The admin order manager displays incoming orders, permits status transitions, provides bKash TrxID verification tools, and supports one click courier booking generation with consignment IDs for Pathao and Steadfast courier formats.
- **AC-11**: The administration system includes sales summaries (total revenue, order counts, pending vs delivered breakdown), discount coupon management, homepage banner management, and order export in CSV format.
- **AC-12**: State persistence uses Zustand with local storage middleware and a dedicated repository abstraction, preventing hydration mismatches in Next.js App Router and auto seeding initial clothing items on first launch.

## Decision

**Chosen option**: Option 2: Next.js Full Stack with Local Storage Repository Engine, shadcn UI, and Bangladesh Market Localization.

Next.js provides the ideal foundation for FX Fashion Gallery, delivering high performance mobile rendering, modern typography and styling capabilities, and complete operational independence without recurring database fees.

**Implementation skills**: `design-taste-frontend`, `high-end-visual-design`, `minimalist-ui`, `context7-docs`

## Rationale
Reasoning and options: see [rationale.md](rationale.md).

## Proposed stack

| Layer | Choice | Reason |
|---|---|---|
| Runtime and Package Manager | Node.js 20+ with pnpm | Fast, deterministic, disk efficient dependency management adhering to workspace directives |
| Framework | Next.js 15 (App Router, React 19) | Modern full stack framework with fast server rendering, API routes, and optimal mobile performance |
| Language | TypeScript 5 | Strict type safety for product models, order statuses, and courier integration payloads |
| Component Foundation | shadcn UI (Radix UI primitives) | Accessible, unstyled primitives allowing complete customization to match the luxury brand palette |
| Styling and Motion | Tailwind CSS v4 with custom tokens | Utility first CSS implementing the exact hex codes, double bezel card borders, and fluid transitions |
| Typography | Plus Jakarta Sans and Playfair Display | High end editorial typographic contrast suitable for luxury clothing and sharp mobile readability |
| Client State and Persistence | Zustand with persist middleware | Lightweight reactive state store backed by browser LocalStorage with SSR hydration safety |
| Image Processing | Client side Canvas WebP Compressor | Shrinks uploaded clothing images to under 200KB Data URLs to preserve local storage capacity |
| Bangladesh Logistics Adapters | Pathao and Steadfast courier service layer | Normalized courier booking contracts generating valid consignment codes and tracking links |
| Payment Management | COD and Manual MFS verification engine | Native Cash on Delivery and bKash and Nagad TrxID logging with future tokenized gateway readiness |
| Icons | Lucide React | Crisp, precise, lightweight iconography with hairline strokes fitting the luxury brand aesthetic |
| Hosting Target | Vercel or Node.js standalone server | Zero configuration global deployment with automated HTTPS and instant preview branches |

## Architecture design and Bangladesh Market Specifications

### 1. Visual Identity and Design System Tokens
- Canvas Background: `#FFFFF0`
- Product Card: `#FFFFFF`
- Title & Heading: `#0A0A0A`
- Price: `#262626`
- Strikethrough Discount: `#D90429`
- Action Button: `#F59E0B` with `#0A0A0A` text
- Gold Divider: `#C5A24D`

### 2. Double Bezel Card Frame Architecture
- Outer shell: `bg-[#FFFFF0]` with `border border-[#C5A24D]/25` and `rounded-2xl`
- Inner core: `bg-[#FFFFFF]` with `rounded-xl` and `shadow-xs`

### 3. Local Storage Persistence Keys
- `fx_fashion_gallery_store_v1`: Managed by Zustand `persist` with initial products seed.

### 4. Courier Service Contracts
- Pathao Courier: Production endpoint `https://api-hermes.pathao.com`
- Steadfast Courier: API endpoint `https://status.steadfast.com.bd/api/v1`

## Consequences

**Positive**:
- Blazing fast mobile performance for Bangladeshi shoppers.
- Zero server and database hosting fees during development and client handover.
- Full independent operational control for the merchant on Android and PC.

**Negative / tradeoffs**:
- State resides in browser local storage; multi device sync uses built in JSON backup export.

**Neutral**:
- Live courier API integration activates upon entering merchant API keys in Admin Settings.

## Follow-up

- [x] Initialized Next.js project with App Router, TypeScript, and pnpm.
- [x] Configured luxury design tokens (#FFFFF0, #FFFFFF, #0A0A0A, #262626, #D90429, #F59E0B, #C5A24D).
- [x] Implemented Zustand Local Storage Repository layer with seed catalog.
- [x] Constructed responsive storefront, guest checkout, and Bangladesh delivery calculations.
- [x] Built mobile friendly admin dashboard with courier bookings and manual payment verification.

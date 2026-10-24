# e_com_clothing_demo

**FX Fashion Gallery** is a full stack luxury e-commerce web application engineered with Next.js App Router, TypeScript, Tailwind CSS, Zustand, and shadcn styling principles. Built specifically for modern online retail with Bangladesh market localization.

---

## Brand & Visual System

- **Background Canvas**: `#FFFFF0` (Ivory Linen)
- **Product Cards**: `#FFFFFF` (Double-bezel luxury framing)
- **Primary Typography**: `#0A0A0A` (Midnight Black)
- **Price Labels**: `#262626` (Charcoal)
- **Discount & Strikethrough**: `#D90429` (Crimson)
- **Action Buttons**: `#F59E0B` (Amber Gold) with `#0A0A0A` text
- **Luxury Dividers & Accents**: `#C5A24D` (Metallic Gold)

---

## Core Capabilities

- **Catalog & Product Showcases**:
  - Filter by categories: T-Shirts, Oxford Shirts, French Linen Shirts, Smart Chinos, Denim, Outerwear.
  - Interactive multi-angle product gallery with responsive zoom and image fallbacks.
  - Real-time stock status, size selection (S, M, L, XL, XXL), and color pickers.

- **Instant Shopping Bag & Local Storage Persistence**:
  - Slide-out cart drawer with quantity increments, coupon inputs, and real-time total calculation.
  - Persistent browser storage so customer carts and preferences remain intact across sessions.

- **Bangladesh Market Localization**:
  - Direct delivery zone selector: Inside Dhaka (৳80) and Outside Dhaka (৳150).
  - Multiple payment options: Cash on Delivery (COD), bKash Merchant, Nagad Merchant.
  - Courier dispatch integrations prepared for Pathao and Steadfast.
  - Direct WhatsApp order assistance pre-filled with chosen product, size, and color.

- **Dedicated Admin Management Suite** (`/admin`):
  - Product catalog CRUD with client-side WebP image compression (<200KB).
  - Order tracking board with status transitions (Pending, Processing, Shipped, Delivered, Cancelled).
  - Coupon system with minimum spend thresholds and maximum discount caps.
  - Store settings editor for delivery rates, payment phone numbers, and courier credentials.
  - JSON database export and backup restoration.

- **Order Tracking** (`/track`):
  - Public order status lookup via Order ID with step-by-step dispatch timeline.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with LocalStorage Persistence
- **Icons**: Lucide React
- **Package Manager**: pnpm

---

## Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run the Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Start
```bash
pnpm build
pnpm start
```

---

## Admin Access

- **Route**: `/admin`
- **Default Master Key**: `fx2026admin` (or `admin123`)

---

## License
MIT

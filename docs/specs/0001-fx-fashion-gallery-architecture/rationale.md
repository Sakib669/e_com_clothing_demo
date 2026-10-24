# Rationale: 0001. Foundational Architecture and Bangladesh Market Localization

## Context

FX Fashion Gallery is an emerging clothing brand in Bangladesh offering quality fashion items such as T-shirts, shirts, pants, jackets, and seasonal collections. The brand requires an online store that provides an intuitive customer shopping experience and allows the business owner to independently manage daily operations from both an Android phone and a personal computer.

The Bangladesh ecommerce market possesses distinct consumer patterns and operational characteristics that directly shape technical requirements:

1. **Mobile shopping dominance**: More than 85 percent of ecommerce traffic in Bangladesh originates from mobile devices (predominantly Android smartphones on 4G cellular connections). The website must be lightweight, load within two seconds, and provide an interface optimized for touch with large touch targets and thumb friendly navigation.
2. **Cash on Delivery and payment habits**: Over 80 percent of online retail transactions in Bangladesh rely on Cash on Delivery. For digital payments, consumers use Mobile Financial Services (bKash and Nagad) rather than traditional credit cards. Customers expect simple manual Send Money or Merchant Payment instructions where they input their Transaction ID (TrxID) and sender number during checkout, alongside future readiness for automated payment gateway integration.
3. **Delivery logistics and courier networks**: Delivery within Bangladesh is split into two primary operational tiers: Inside Dhaka (typically 60 to 80 Taka, delivered within 24 to 48 hours) and Outside Dhaka (typically 130 to 150 Taka, delivered within 3 to 5 business days). Pathao Courier and Steadfast Courier are the dominant logistics partners. The platform must capture full recipient details (name, Bangladeshi mobile number starting with 01, complete street address, and delivery zone) and provide consignment creation and tracking interfaces.
4. **Frictionless guest checkout**: Mandatory user registration causes severe cart abandonment in the local market. Shoppers demand a quick single page or direct modal checkout without account creation, backed by instant order confirmation and direct WhatsApp contact for order verification.
5. **Operational independence without recurring server costs**: The brand requires a complete solution that can be demonstrated and operated immediately without incurring mandatory cloud database hosting fees during initial recruitment and trial phases. A robust local storage persistence repository provides full functionality on both mobile and PC, with a clean repository abstraction that allows a painless upgrade to a live PostgreSQL or Prisma database whenever the merchant scales.

## Options considered

### Option 1: WordPress with WooCommerce and PHP
A traditional off the shelf ecommerce platform using WordPress, WooCommerce, and community plugins for bKash and Bangladeshi couriers.

**Pros**:
- Pre built admin dashboard and large plugin ecosystem.
- Existing community plugins for Pathao and Steadfast courier integration.

**Cons**:
- Heavy resource footprint requiring PHP hosting, MySQL server, and ongoing maintenance.
- Vulnerable to plugin bloat, security exploits, and slow mobile loading speeds on Bangladeshi 4G networks.
- Rigid template architecture that struggles to achieve modern luxury editorial styling without expensive themes.

### Option 2: Next.js Full Stack with Local Storage Repository Engine and shadcn UI (Chosen)
A modern unified web application built with Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn UI, and Zustand with local storage persistence.

**Pros**:
- Blazing fast performance on mobile devices with sub second client side routing and zero server cold start delays.
- Complete visual control enabling luxury editorial aesthetics with double bezel card borders, gold dividers, and custom typography.
- Zero mandatory database hosting costs, allowing immediate deployment, testing, and operation directly on Vercel, Netlify, or any static or Node.js host.
- Clean repository pattern decouples the UI from persistence, ensuring an effortless future upgrade to PostgreSQL, Prisma, or Supabase when order volume expands.

**Cons**:
- Data stored in browser local storage is initially isolated to the client browser unless synchronized via import, export, or cloud sync.
- Browser local storage has a standard storage limit of approximately 5MB to 10MB, requiring aggressive client side image compression.

### Option 3: Decoupled Single Page Application (Vite React) with Express and MongoDB Backend
A separated architecture with a Vite React client and a dedicated Express.js REST API backed by MongoDB.

**Pros**:
- Traditional two tier separation of concerns.
- Centralized server database from day one.

**Cons**:
- Requires deploying and maintaining two separate codebases and server environments.
- Higher initial hosting and database setup complexity for the business owner.
- Lacks Next.js built in server side rendering and metadata generation for search engine optimization.

## Rationale

Next.js 15 with App Router offers unmatched speed and flexibility for modern fashion retail. In the Bangladesh market where 85 percent of shoppers use smartphones on cellular networks, bloated monolithic platforms like WooCommerce suffer from high bounce rates due to sluggish load times. Next.js delivers instant client transitions, optimized image components, and pristine search engine optimization.

Utilizing a Local Storage Repository layer with Zustand gives FX Fashion Gallery full autonomy. The business owner can open the website on an Android phone or PC, manage inventory, adjust prices, create banners, review orders, and simulate courier dispatches without subscribing to expensive cloud database services. The repository layer isolates data access behind typed interfaces (`ProductRepository`, `OrderRepository`, `SettingsRepository`), which guarantees that transitioning to a PostgreSQL or Supabase backend in the future requires modifying only the repository implementations rather than touching the UI components.

The client specified luxury palette (`#FFFFF0`, `#FFFFFF`, `#0A0A0A`, `#262626`, `#D90429`, `#F59E0B`, `#C5A24D`) paired with Plus Jakarta Sans and Playfair Display elevates FX Fashion Gallery above generic Bangladeshi ecommerce websites, conveying premium craftsmanship and authentic confidence.

## References

**Project sources**:
- Recruitment Specification: `/home/sakib/Downloads/FX_Fashion_Gallery_Web_Developer_Recruitment.pdf`
- Design system skills: `design-taste-frontend`, `high-end-visual-design`, `minimalist-ui`

**Practices and standards**:
- Repository Pattern for decoupled persistence abstraction
- Double Bezel component architecture for luxury hardware card appearance
- Hydration safe client state pattern with Zustand and Next.js App Router
- OWASP guidelines for administrator session storage and authentication guards

**Links**:
- Pathao Courier Merchant API: https://api-hermes.pathao.com
- Steadfast Courier API Documentation: https://status.steadfast.com.bd
- bKash Tokenized Checkout Developer Portal: https://developer.bkash.com
- Next.js Documentation: https://nextjs.org/docs
- shadcn UI Documentation: https://ui.shadcn.com

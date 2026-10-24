export type ProductCategory = "t-shirts" | "shirts" | "pants" | "jackets" | "accessories";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: ProductCategory;
  regularPrice: number;
  salePrice?: number;
  sizes: string[];
  colors: ProductColor[];
  images: string[];
  stockQuantity: number;
  featured: boolean;
  newArrival: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string; // composite key: `${productId}-${size}-${color}`
  productId: string;
  title: string;
  slug: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  regularPrice: number;
}

export type OrderStatus = "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
export type PaymentMethod = "Cash on Delivery" | "bKash Manual" | "Nagad Manual";
export type PaymentStatus = "Unpaid" | "Verification Pending" | "Paid" | "Refunded";
export type DeliveryZone = "Inside Dhaka" | "Outside Dhaka";

export interface CourierBooking {
  provider: "Pathao" | "Steadfast" | "None";
  consignmentId?: string;
  trackingCode?: string;
  bookedAt?: string;
  courierStatus?: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerMobile: string;
  deliveryAddress: string;
  deliveryZone: DeliveryZone;
  deliveryCharge: number;
  orderNotes?: string;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  finalPayable: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  mfsSenderNumber?: string;
  mfsTrxId?: string;
  orderStatus: OrderStatus;
  courier: CourierBooking;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  minOrderAmount: number;
  maxDiscount?: number;
  isActive: boolean;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  badgeText: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  isActive: boolean;
}

export interface StoreSettings {
  storeName: string;
  contactPhone: string;
  contactEmail: string;
  whatsappNumber: string;
  address: string;
  bkashNumber: string;
  bkashType: "Merchant" | "Personal";
  nagadNumber: string;
  nagadType: "Merchant" | "Personal";
  deliveryFeeDhaka: number;
  deliveryFeeOutside: number;
  pathaoApiKey?: string;
  pathaoSecret?: string;
  steadfastApiKey?: string;
  steadfastSecret?: string;
}

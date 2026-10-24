import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  Product,
  CartItem,
  Order,
  OrderStatus,
  PaymentStatus,
  Coupon,
  PromoBanner,
  StoreSettings,
  DeliveryZone,
} from "@/types";
import {
  INITIAL_PRODUCTS,
  INITIAL_COUPONS,
  INITIAL_BANNERS,
  DEFAULT_SETTINGS,
} from "./seed-data";

interface StoreState {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  coupons: Coupon[];
  banners: PromoBanner[];
  settings: StoreSettings;
  appliedCoupon: Coupon | null;
  isAdminAuthenticated: boolean;

  // Cart actions
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
  getCartItemCount: () => number;

  // Coupon actions
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Order actions
  createOrder: (orderData: Omit<Order, "id" | "createdAt" | "orderStatus" | "courier">) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updatePaymentStatus: (orderId: string, status: PaymentStatus) => void;
  bookCourierForOrder: (orderId: string, provider: "Pathao" | "Steadfast", consignmentId: string, trackingCode: string) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // Product actions
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Coupon management
  addCoupon: (coupon: Omit<Coupon, "id">) => void;
  toggleCoupon: (id: string) => void;
  deleteCoupon: (id: string) => void;

  // Banner management
  updateBanner: (id: string, updates: Partial<PromoBanner>) => void;

  // Settings actions
  updateSettings: (updates: Partial<StoreSettings>) => void;

  // Admin auth actions
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;

  // Backup and restore
  resetToDefaults: () => void;
  exportDatabaseJSON: () => string;
  importDatabaseJSON: (jsonString: string) => boolean;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,
      cart: [],
      orders: [],
      coupons: INITIAL_COUPONS,
      banners: INITIAL_BANNERS,
      settings: DEFAULT_SETTINGS,
      appliedCoupon: null,
      isAdminAuthenticated: false,

      // Cart Actions
      addToCart: (product, size, color, quantity = 1) => {
        const cartId = `${product.id}-${size}-${color}`;
        const existing = get().cart.find((item) => item.id === cartId);
        const price = product.salePrice ?? product.regularPrice;

        if (existing) {
          set((state) => ({
            cart: state.cart.map((item) =>
              item.id === cartId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          }));
        } else {
          const newItem: CartItem = {
            id: cartId,
            productId: product.id,
            title: product.title,
            slug: product.slug,
            image: product.images[0] || "",
            size,
            color,
            quantity,
            price,
            regularPrice: product.regularPrice,
          };
          set((state) => ({ cart: [...state.cart, newItem] }));
        }
      },

      removeFromCart: (cartItemId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== cartItemId),
        }));
      },

      updateCartQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === cartItemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ cart: [], appliedCoupon: null });
      },

      getCartSubtotal: () => {
        return get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getCartItemCount: () => {
        return get().cart.reduce((sum, item) => sum + item.quantity, 0);
      },

      // Coupon Actions
      applyCoupon: (code) => {
        const cleanCode = code.trim().toUpperCase();
        const coupon = get().coupons.find(
          (c) => c.code.toUpperCase() === cleanCode && c.isActive
        );

        if (!coupon) {
          return { success: false, message: "Invalid or inactive promotional code." };
        }

        const subtotal = get().getCartSubtotal();
        if (subtotal < coupon.minOrderAmount) {
          return {
            success: false,
            message: `Minimum order amount of ৳${coupon.minOrderAmount} required for this code.`,
          };
        }

        set({ appliedCoupon: coupon });
        return { success: true, message: `Promo code ${coupon.code} applied successfully!` };
      },

      removeCoupon: () => {
        set({ appliedCoupon: null });
      },

      // Order Actions
      createOrder: (orderData) => {
        const orderId = `FX-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const newOrder: Order = {
          ...orderData,
          id: orderId,
          orderStatus: "Pending",
          courier: { provider: "None" },
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
          cart: [],
          appliedCoupon: null,
        }));

        return newOrder;
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, orderStatus: status } : order
          ),
        }));
      },

      updatePaymentStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, paymentStatus: status } : order
          ),
        }));
      },

      bookCourierForOrder: (orderId, provider, consignmentId, trackingCode) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  orderStatus: "Processing",
                  courier: {
                    provider,
                    consignmentId,
                    trackingCode,
                    bookedAt: new Date().toISOString(),
                    courierStatus: "Booked with Courier",
                  },
                }
              : order
          ),
        }));
      },

      getOrderById: (orderId) => {
        return get().orders.find(
          (o) =>
            o.id.toLowerCase() === orderId.toLowerCase() ||
            o.customerMobile === orderId
        );
      },

      // Product Actions
      addProduct: (productData) => {
        const id = `prod-${Date.now()}`;
        const newProduct: Product = {
          ...productData,
          id,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ products: [newProduct, ...state.products] }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      // Coupon Management
      addCoupon: (couponData) => {
        const newCoupon: Coupon = {
          ...couponData,
          id: `c-${Date.now()}`,
        };
        set((state) => ({ coupons: [...state.coupons, newCoupon] }));
      },

      toggleCoupon: (id) => {
        set((state) => ({
          coupons: state.coupons.map((c) =>
            c.id === id ? { ...c, isActive: !c.isActive } : c
          ),
        }));
      },

      deleteCoupon: (id) => {
        set((state) => ({
          coupons: state.coupons.filter((c) => c.id !== id),
        }));
      },

      // Banner Management
      updateBanner: (id, updates) => {
        set((state) => ({
          banners: state.banners.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        }));
      },

      // Settings
      updateSettings: (updates) => {
        set((state) => ({ settings: { ...state.settings, ...updates } }));
      },

      // Admin Auth
      adminLogin: (password) => {
        // Standard default password "fx2026admin"
        if (password === "fx2026admin" || password === "admin123") {
          set({ isAdminAuthenticated: true });
          return true;
        }
        return false;
      },

      adminLogout: () => {
        set({ isAdminAuthenticated: false });
      },

      // Backup & Restore
      resetToDefaults: () => {
        set({
          products: INITIAL_PRODUCTS,
          coupons: INITIAL_COUPONS,
          banners: INITIAL_BANNERS,
          settings: DEFAULT_SETTINGS,
          cart: [],
          appliedCoupon: null,
        });
      },

      exportDatabaseJSON: () => {
        const state = get();
        const data = {
          products: state.products,
          orders: state.orders,
          coupons: state.coupons,
          banners: state.banners,
          settings: state.settings,
          exportedAt: new Date().toISOString(),
          version: "1.0",
        };
        return JSON.stringify(data, null, 2);
      },

      importDatabaseJSON: (jsonString) => {
        try {
          const data = JSON.parse(jsonString);
          if (data.products && Array.isArray(data.products)) {
            set({
              products: data.products,
              orders: data.orders || [],
              coupons: data.coupons || INITIAL_COUPONS,
              banners: data.banners || INITIAL_BANNERS,
              settings: data.settings || DEFAULT_SETTINGS,
            });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },
    }),
    {
      name: "fx_fashion_gallery_store_v2",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

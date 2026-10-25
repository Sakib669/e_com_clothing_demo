"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SafeImage from "@/components/SafeImage";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { formatBDT } from "@/lib/utils";
import { DeliveryZone, PaymentMethod } from "@/types";
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  CheckCircle,
  Copy,
  Check,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useStore((state) => state.cart);
  const settings = useStore((state) => state.settings);
  const appliedCoupon = useStore((state) => state.appliedCoupon);
  const createOrder = useStore((state) => state.createOrder);

  // Form Fields
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>("Inside Dhaka");
  const [orderNotes, setOrderNotes] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Cash on Delivery");
  const [mfsSenderNumber, setMfsSenderNumber] = useState("");
  const [mfsTrxId, setMfsTrxId] = useState("");

  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
      discount = appliedCoupon.maxDiscount;
    }
  }

  const deliveryCharge =
    deliveryZone === "Inside Dhaka"
      ? settings.deliveryFeeDhaka
      : settings.deliveryFeeOutside;

  const finalPayable = Math.max(0, subtotal - discount + deliveryCharge);

  const handleCopyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validations
    if (!customerName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    const cleanMobile = customerMobile.trim().replace(/[^0-9]/g, "");
    if (!/^01[3-9]\d{8}$/.test(cleanMobile)) {
      setErrorMessage("Please enter a valid 11-digit Bangladeshi mobile number (e.g. 01711234567).");
      return;
    }

    if (!deliveryAddress.trim() || deliveryAddress.trim().length < 8) {
      setErrorMessage("Please provide a complete delivery street address.");
      return;
    }

    if (paymentMethod !== "Cash on Delivery") {
      if (!mfsSenderNumber.trim()) {
        setErrorMessage(`Please enter your ${paymentMethod} sender mobile number.`);
        return;
      }
      if (!mfsTrxId.trim() || mfsTrxId.trim().length < 6) {
        setErrorMessage("Please enter a valid Transaction ID (TrxID) provided by your MFS app.");
        return;
      }
    }

    if (cart.length === 0) {
      setErrorMessage("Your shopping bag is empty.");
      return;
    }

    setIsSubmitting(true);

    const orderItems = cart.map((item) => ({
      productId: item.productId,
      title: item.title,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      unitPrice: item.price,
      totalPrice: item.price * item.quantity,
      image: item.image,
    }));

    const paymentStatus =
      paymentMethod === "Cash on Delivery" ? "Unpaid" : "Verification Pending";

    const newOrder = createOrder({
      customerName: customerName.trim(),
      customerMobile: cleanMobile,
      deliveryAddress: deliveryAddress.trim(),
      deliveryZone,
      deliveryCharge,
      orderNotes: orderNotes.trim() || undefined,
      items: orderItems,
      subtotal,
      discountAmount: discount,
      finalPayable,
      paymentMethod,
      paymentStatus,
      mfsSenderNumber: mfsSenderNumber.trim() || undefined,
      mfsTrxId: mfsTrxId.trim() || undefined,
    });

    router.push(`/order-confirmation/${newOrder.id}`);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#C5A24D]/30 flex items-center justify-center mx-auto shadow-sm">
          <ShoppingBag className="w-8 h-8 text-[#C5A24D]" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-[#0A0A0A]">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          Please add items to your bag before proceeding to the checkout counter.
        </p>
        <Link
          href="/products"
          className="inline-block px-7 py-3 rounded-full bg-[#F59E0B] text-[#0A0A0A] font-bold text-xs uppercase tracking-wide hover:bg-[#D97706] transition-colors"
        >
          Browse Fashion Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Checkout Title */}
      <div className="border-b border-[#C5A24D]/25 pb-4">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A24D]">
          Frictionless Ordering
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] mt-1">
          Guest Checkout
        </h1>
        <p className="text-xs text-gray-500">
          No registration required. Fill in your details below to place your order.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Columns: Delivery & Payment Details */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-8"
        >
          {/* Section 1: Customer Information */}
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#C5A24D]/25 shadow-xs space-y-4">
            <h2 className="font-serif text-base font-bold text-[#0A0A0A] flex items-center gap-2 border-b border-gray-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-[#0A0A0A] text-[#FFFFF0] text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>Delivery Details</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#0A0A0A] mb-1">
                  Full Recipient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-[#FFFFF0] text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#C5A24D]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#0A0A0A] mb-1">
                  Mobile Number (For Delivery Confirmation) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 font-bold text-gray-500">+88</span>
                  <input
                    type="tel"
                    required
                    value={customerMobile}
                    onChange={(e) => setCustomerMobile(e.target.value)}
                    placeholder="01711234567"
                    className="w-full pl-12 pr-3.5 py-2.5 rounded-lg border border-gray-300 bg-[#FFFFF0] text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#C5A24D]"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Our delivery courier will call this number before arrival.
                </p>
              </div>

              {/* Delivery Zone Selector */}
              <div>
                <label className="block font-semibold text-[#0A0A0A] mb-2">
                  Delivery Destination Zone <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      deliveryZone === "Inside Dhaka"
                        ? "border-[#0A0A0A] bg-[#FFFFF0] ring-1 ring-[#0A0A0A]"
                        : "border-gray-200 hover:border-[#C5A24D]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryZone"
                      checked={deliveryZone === "Inside Dhaka"}
                      onChange={() => setDeliveryZone("Inside Dhaka")}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="font-bold text-[#0A0A0A]">Inside Dhaka City</div>
                      <div className="text-[11px] text-gray-500">
                        Delivery in 24-48 hours (৳{settings.deliveryFeeDhaka})
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      deliveryZone === "Outside Dhaka"
                        ? "border-[#0A0A0A] bg-[#FFFFF0] ring-1 ring-[#0A0A0A]"
                        : "border-gray-200 hover:border-[#C5A24D]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryZone"
                      checked={deliveryZone === "Outside Dhaka"}
                      onChange={() => setDeliveryZone("Outside Dhaka")}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="font-bold text-[#0A0A0A]">Outside Dhaka (Nationwide)</div>
                      <div className="text-[11px] text-gray-500">
                        Delivery in 3-5 days (৳{settings.deliveryFeeOutside})
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#0A0A0A] mb-1">
                  Full Street Address & Landmark <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="House number, Road/Block number, Area name, District"
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0] text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#C5A24D]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#0A0A0A] mb-1">
                  Special Order Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Call before delivery, Leave with security"
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0] text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#C5A24D]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#C5A24D]/25 shadow-xs space-y-4">
            <h2 className="font-serif text-base font-bold text-[#0A0A0A] flex items-center gap-2 border-b border-gray-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-[#0A0A0A] text-[#FFFFF0] text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>Payment Method</span>
            </h2>

            <div className="space-y-3 text-xs">
              {/* Option A: Cash on Delivery */}
              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "Cash on Delivery"
                    ? "border-[#0A0A0A] bg-[#FFFFF0] ring-1 ring-[#0A0A0A]"
                    : "border-gray-200 hover:border-[#C5A24D]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={() => setPaymentMethod("Cash on Delivery")}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-bold text-[#0A0A0A] flex items-center justify-between">
                    <span>Cash on Delivery (COD)</span>
                    <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded">
                      MOST POPULAR
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Pay in cash directly to Pathao or Steadfast courier when your parcel arrives.
                  </p>
                </div>
              </label>

              {/* Option B: bKash Manual */}
              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "bKash Manual"
                    ? "border-[#0A0A0A] bg-[#FFFFF0] ring-1 ring-[#0A0A0A]"
                    : "border-gray-200 hover:border-[#C5A24D]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "bKash Manual"}
                  onChange={() => setPaymentMethod("bKash Manual")}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-bold text-[#0A0A0A] flex items-center justify-between">
                    <span className="text-pink-600 font-extrabold">bKash Manual Payment</span>
                    <span className="text-[10px] bg-pink-100 text-pink-700 font-bold px-2 py-0.5 rounded">
                      Send Money / Payment
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Send amount to our bKash number and enter TrxID below for fast verification.
                  </p>
                </div>
              </label>

              {/* Option C: Nagad Manual */}
              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "Nagad Manual"
                    ? "border-[#0A0A0A] bg-[#FFFFF0] ring-1 ring-[#0A0A0A]"
                    : "border-gray-200 hover:border-[#C5A24D]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "Nagad Manual"}
                  onChange={() => setPaymentMethod("Nagad Manual")}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-bold text-[#0A0A0A] flex items-center justify-between">
                    <span className="text-orange-600 font-extrabold">Nagad Manual Payment</span>
                    <span className="text-[10px] bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded">
                      Send Money / Payment
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Send amount to our Nagad number and input your TrxID below.
                  </p>
                </div>
              </label>

              {/* bKash / Nagad Instructions Box if chosen */}
              {paymentMethod !== "Cash on Delivery" && (
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">
                      {paymentMethod === "bKash Manual" ? "bKash" : "Nagad"} {settings.bkashType} Number:
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyNumber(
                          paymentMethod === "bKash Manual"
                            ? settings.bkashNumber
                            : settings.nagadNumber
                        )
                      }
                      className="px-2.5 py-1 rounded bg-amber-200/80 hover:bg-amber-300 text-amber-900 font-bold text-[10px] flex items-center gap-1"
                    >
                      {copiedNumber ? <Check className="w-3 h-3 text-green-700" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedNumber ? "Copied" : "Copy Number"}</span>
                    </button>
                  </div>
                  <div className="font-mono text-sm font-bold text-gray-900 bg-white p-2 rounded border border-amber-200 text-center tracking-wider">
                    {paymentMethod === "bKash Manual" ? settings.bkashNumber : settings.nagadNumber}
                  </div>
                  <ol className="list-decimal pl-4 space-y-1 text-[11px] text-gray-700">
                    <li>Open your bKash or Nagad app and select {settings.bkashType === "Merchant" ? "Make Payment" : "Send Money"}.</li>
                    <li>Enter amount: <strong>{formatBDT(finalPayable)}</strong>.</li>
                    <li>Reference: write your mobile number.</li>
                    <li>Enter your sender number and Transaction ID (TrxID) below:</li>
                  </ol>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-800 mb-1">
                        Your Sender Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={mfsSenderNumber}
                        onChange={(e) => setMfsSenderNumber(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full px-3 py-1.5 rounded border border-gray-300 bg-white text-xs focus:ring-1 focus:ring-[#C5A24D]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-800 mb-1">
                        Transaction ID (TrxID)
                      </label>
                      <input
                        type="text"
                        value={mfsTrxId}
                        onChange={(e) => setMfsTrxId(e.target.value.toUpperCase())}
                        placeholder="e.g. 9J283KS92"
                        className="w-full px-3 py-1.5 rounded border border-gray-300 bg-white text-xs uppercase font-mono focus:ring-1 focus:ring-[#C5A24D]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Order Summary & Placement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#C5A24D]/25 shadow-xs space-y-6 sticky top-24">
            <h2 className="font-serif text-base font-bold text-[#0A0A0A] border-b border-gray-100 pb-3">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
            </h2>

            {/* Items Summary list */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs items-center">
                  <div className="relative w-12 h-14 bg-gray-100 rounded-md overflow-hidden shrink-0">
                    <SafeImage
                      src={item.image || "/images/placeholders/apparel-placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#0A0A0A] truncate">{item.title}</h4>
                    <div className="text-[11px] text-gray-500">
                      {item.size} • {item.color} • Qty {item.quantity}
                    </div>
                    <div className="font-bold text-[#262626] mt-0.5">
                      {formatBDT(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">{formatBDT(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Promo Code Discount ({appliedCoupon?.code})</span>
                  <span>-{formatBDT(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge ({deliveryZone})</span>
                <span className="font-semibold text-gray-900">{formatBDT(deliveryCharge)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#0A0A0A] border-t border-gray-200 pt-3">
                <span>Final Payable</span>
                <span className="text-[#0A0A0A]">{formatBDT(finalPayable)}</span>
              </div>
            </div>

            {/* Error Feedback */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-full bg-[#F59E0B] text-[#0A0A0A] text-sm font-bold uppercase tracking-wider hover:bg-[#D97706] shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isSubmitting ? "Processing..." : "Confirm & Place Order"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A24D]" />
              <span>Safe & Secure Bangladesh Delivery Guaranteed</span>
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  );
}

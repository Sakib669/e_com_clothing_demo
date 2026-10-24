"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { formatBDT } from "@/lib/utils";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  CheckCircle,
} from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateCartQuantity = useStore((state) => state.updateCartQuantity);
  const appliedCoupon = useStore((state) => state.appliedCoupon);
  const applyCoupon = useStore((state) => state.applyCoupon);
  const removeCoupon = useStore((state) => state.removeCoupon);

  const [couponInput, setCouponInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
      discount = appliedCoupon.maxDiscount;
    }
  }

  const finalEstimated = Math.max(0, subtotal - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback({ success: res.success, message: res.message });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A0A0A]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFFF0] border-l border-[#C5A24D]/30 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#C5A24D]/25 bg-[#FFFFFF] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#F59E0B]" />
              <h2 className="font-serif text-lg font-bold text-[#0A0A0A]">
                Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#C5A24D]/30 flex items-center justify-center mb-4 shadow-sm">
                  <ShoppingBag className="w-8 h-8 text-[#C5A24D]" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#0A0A0A] mb-1">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-gray-500 max-w-xs mb-6">
                  Explore our luxury collection of T-shirts, shirts, pants, and outerwear.
                </p>
                <Link
                  href="/products"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#F59E0B] text-[#0A0A0A] font-semibold text-xs shadow-sm hover:bg-[#D97706] transition-colors"
                >
                  Start Exploring
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-[#FFFFFF] rounded-xl border border-[#C5A24D]/20 shadow-xs flex gap-3 items-center"
                >
                  <div className="relative w-16 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#0A0A0A] truncate">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500">
                      <span>Size: <strong className="text-gray-800">{item.size}</strong></span>
                      <span>•</span>
                      <span>Color: <strong className="text-gray-800">{item.color}</strong></span>
                    </div>
                    <div className="mt-1 text-xs font-bold text-[#262626]">
                      {formatBDT(item.price)}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-200 rounded-md bg-[#FFFFF0]">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 text-gray-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 text-gray-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-[#D90429] p-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Coupon & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-[#FFFFFF] border-t border-[#C5A24D]/25 space-y-4">
              {/* Promo Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 border border-green-200 text-xs text-green-800">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Code <strong>{appliedCoupon.code}</strong> applied (-{appliedCoupon.discountPercent}%)</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-red-600 font-bold hover:underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Coupon (e.g. WELCOME10)"
                        className="w-full pl-8 pr-2 py-1.5 text-xs bg-[#FFFFF0] border border-gray-300 rounded-lg uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#C5A24D]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-[#0A0A0A] text-[#FFFFF0] text-xs font-semibold hover:bg-[#262626]"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponFeedback.message && (
                  <p className={`text-[11px] mt-1 ${couponFeedback.success ? "text-green-600" : "text-red-500"}`}>
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">{formatBDT(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Coupon Discount</span>
                    <span>-{formatBDT(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[11px] text-gray-500">
                  <span>Delivery Charge</span>
                  <span>Calculated at checkout (৳80 / ৳150)</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0A0A0A] pt-2 border-t border-gray-200">
                  <span>Estimated Total</span>
                  <span>{formatBDT(finalEstimated)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={onClose}
                className="w-full py-3 px-4 rounded-full bg-[#F59E0B] text-[#0A0A0A] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#D97706] shadow-sm transition-all"
              >
                <span>Proceed to Guest Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SafeImage from "@/components/SafeImage";
import { notFound } from "next/navigation";
import { useStore } from "@/lib/store";
import { formatBDT } from "@/lib/utils";
import {
  CheckCircle,
  Truck,
  MessageCircle,
  Printer,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const getOrderById = useStore((state) => state.getOrderById);
  const settings = useStore((state) => state.settings);

  const order = getOrderById(resolvedParams.id);

  if (!order) {
    notFound();
  }

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, "") || "8801711000000";
  const whatsappText = encodeURIComponent(
    `Hello FX Fashion Gallery! I just placed order #${order.id} for ৳${order.finalPayable}. Please confirm my delivery.`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappText}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 print:p-0">
      {/* Success Badge & Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center space-y-3 bg-[#FFFFFF] p-8 rounded-2xl border border-[#C5A24D]/30 shadow-sm print:border-none print:shadow-none"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 border border-green-300 text-green-600 flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A24D]">
          Order Confirmed
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#0A0A0A]">
          Thank You, {order.customerName}!
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
          Your order has been recorded with FX Fashion Gallery. We are preparing your apparel for dispatch.
        </p>

        <div className="inline-block mt-2 px-4 py-1.5 rounded-full bg-[#FFFFF0] border border-[#C5A24D]/40 text-xs font-mono font-bold text-[#0A0A0A]">
          Order ID: #{order.id}
        </div>
      </motion.div>

      {/* Main Order Details Receipt */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#FFFFFF] rounded-2xl border border-[#C5A24D]/25 shadow-xs overflow-hidden"
      >
        {/* Receipt Header */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
          <div>
            <div className="text-xs text-gray-500">Order Placed On</div>
            <div className="font-semibold text-xs text-[#0A0A0A]">
              {new Date(order.createdAt).toLocaleString("en-BD", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Fulfillment Status:</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              {order.orderStatus}
            </span>
          </div>
        </div>

        {/* Order Items List */}
        <div className="p-6 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#C5A24D] mb-3">
            Ordered Items
          </h2>
          <div className="divide-y divide-gray-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-14 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <SafeImage
                      src={item.image || "/images/placeholders/apparel-placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A0A0A]">{item.title}</h3>
                    <div className="text-[11px] text-gray-500">
                      Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                    </div>
                  </div>
                </div>
                <div className="font-bold text-[#262626]">
                  {formatBDT(item.totalPrice)}
                </div>
              </div>
            ))}
          </div>

          {/* Price Calculation breakdown */}
          <div className="pt-4 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">{formatBDT(order.subtotal)}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Promotional Discount</span>
                <span>-{formatBDT(order.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Charge ({order.deliveryZone})</span>
              <span className="font-medium text-gray-900">{formatBDT(order.deliveryCharge)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-[#0A0A0A] pt-3 border-t border-gray-200">
              <span>Final Payable</span>
              <span>{formatBDT(order.finalPayable)}</span>
            </div>
          </div>
        </div>

        {/* Delivery & Payment Information Cards */}
        <div className="p-6 border-t border-gray-100 bg-[#FFFFF0] grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <h3 className="font-bold uppercase tracking-wider text-[#0A0A0A] mb-2 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#C5A24D]" />
              <span>Delivery Information</span>
            </h3>
            <p className="text-gray-700"><strong>Recipient:</strong> {order.customerName}</p>
            <p className="text-gray-700"><strong>Contact:</strong> +88{order.customerMobile}</p>
            <p className="text-gray-700"><strong>Address:</strong> {order.deliveryAddress}</p>
            <p className="text-gray-700"><strong>Zone:</strong> {order.deliveryZone}</p>
            {order.orderNotes && (
              <p className="text-gray-500 italic mt-1">Note: {order.orderNotes}</p>
            )}
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-wider text-[#0A0A0A] mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A24D]" />
              <span>Payment Details</span>
            </h3>
            <p className="text-gray-700"><strong>Method:</strong> {order.paymentMethod}</p>
            <p className="text-gray-700">
              <strong>Status:</strong>{" "}
              <span className="font-semibold text-amber-700">{order.paymentStatus}</span>
            </p>
            {order.mfsTrxId && (
              <p className="text-gray-700 font-mono">
                <strong>TrxID:</strong> {order.mfsTrxId}
              </p>
            )}
            {order.mfsSenderNumber && (
              <p className="text-gray-700">
                <strong>Sender Mobile:</strong> {order.mfsSenderNumber}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-full bg-[#FFFFFF] border border-gray-300 text-gray-700 text-xs font-semibold hover:border-[#0A0A0A] transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1EBE5D] transition-colors flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Confirm on WhatsApp</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/track"
            className="px-5 py-2.5 rounded-full bg-[#0A0A0A] text-[#FFFFF0] text-xs font-semibold hover:bg-[#262626] transition-colors flex items-center gap-1.5"
          >
            <Truck className="w-4 h-4 text-[#F59E0B]" />
            <span>Track Parcel</span>
          </Link>

          <Link
            href="/products"
            className="px-6 py-2.5 rounded-full bg-[#F59E0B] text-[#0A0A0A] text-xs font-bold hover:bg-[#D97706] transition-colors flex items-center gap-1.5"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

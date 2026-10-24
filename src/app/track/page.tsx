"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { formatBDT } from "@/lib/utils";
import { Order, OrderStatus } from "@/types";
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  Check,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export default function TrackOrderPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const getOrderById = useStore((state) => state.getOrderById);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    const found = getOrderById(searchInput.trim());
    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const statusSteps: OrderStatus[] = [
    "Pending",
    "Confirmed",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  const getStepIndex = (status: OrderStatus) => {
    if (status === "Cancelled") return -1;
    return statusSteps.indexOf(status);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      {/* Page Title */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A24D]">
          Live Logistics Status
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0A0A0A]">
          Track Your Delivery
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
          Enter your FX Order ID (e.g. FX-2026-1042) or 11-digit mobile number to view real-time delivery status.
        </p>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2 pt-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Order ID (FX-...) or 017XXXXXXXX"
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FFFFFF] border border-[#C5A24D]/35 rounded-full text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A24D]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-[#0A0A0A] text-[#FFFFF0] text-xs font-bold hover:bg-[#262626] transition-colors shrink-0"
          >
            Track Parcel
          </button>
        </form>
      </div>

      {/* Search Result */}
      {hasSearched && (
        <div>
          {!searchedOrder ? (
            <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#C5A24D]/25 text-center space-y-3 shadow-xs">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
              <h2 className="font-serif text-base font-bold text-[#0A0A0A]">
                No Order Found for &ldquo;{searchInput}&rdquo;
              </h2>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Please verify the Order ID or phone number. If you just placed your order, it may take a few moments to synchronize.
              </p>
            </div>
          ) : (
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#C5A24D]/25 shadow-xs overflow-hidden space-y-6 p-6 sm:p-8">
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <div>
                  <span className="text-[11px] font-mono text-gray-500 block">
                    Order Ref: #{searchedOrder.id}
                  </span>
                  <h2 className="font-serif text-xl font-bold text-[#0A0A0A]">
                    Recipient: {searchedOrder.customerName}
                  </h2>
                  <p className="text-xs text-gray-500">
                    Destination: {searchedOrder.deliveryAddress} ({searchedOrder.deliveryZone})
                  </p>
                </div>

                <div className="sm:text-right">
                  <div className="text-xs text-gray-500">Total Payable:</div>
                  <div className="text-lg font-bold text-[#262626]">
                    {formatBDT(searchedOrder.finalPayable)}
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-gray-100 font-medium text-gray-700">
                    {searchedOrder.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Visual Status Progression Timeline */}
              {searchedOrder.orderStatus === "Cancelled" ? (
                <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs text-center border border-red-200">
                  This order has been cancelled. Please contact our support team for assistance.
                </div>
              ) : (
                <div className="py-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#C5A24D] mb-6">
                    Fulfillment Progress
                  </h3>

                  <div className="relative">
                    {/* Connecting Bar */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0 hidden sm:block" />

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                      {statusSteps.map((step, idx) => {
                        const currentIdx = getStepIndex(searchedOrder.orderStatus);
                        const isDone = idx <= currentIdx;
                        const isCurrent = idx === currentIdx;

                        return (
                          <div
                            key={step}
                            className="flex sm:flex-col items-center gap-3 sm:gap-2 text-left sm:text-center"
                          >
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors shrink-0 ${
                                isCurrent
                                  ? "bg-[#F59E0B] text-[#0A0A0A] ring-4 ring-[#F59E0B]/20"
                                  : isDone
                                  ? "bg-[#0A0A0A] text-[#FFFFF0]"
                                  : "bg-gray-100 text-gray-400 border border-gray-200"
                              }`}
                            >
                              {isDone ? <Check className="w-4 h-4" /> : idx + 1}
                            </div>
                            <div>
                              <div
                                className={`text-xs font-bold ${
                                  isCurrent
                                    ? "text-[#F59E0B]"
                                    : isDone
                                    ? "text-[#0A0A0A]"
                                    : "text-gray-400"
                                }`}
                              >
                                {step}
                              </div>
                              <div className="text-[10px] text-gray-400 hidden sm:block">
                                {idx === 0
                                  ? "Order Received"
                                  : idx === 1
                                  ? "Verified"
                                  : idx === 2
                                  ? "Packaging"
                                  : idx === 3
                                  ? "With Courier"
                                  : "Delivered"}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Courier Tracking Section if booked */}
              {searchedOrder.courier && searchedOrder.courier.provider !== "None" && (
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-gray-900 block">
                      Dispatched via {searchedOrder.courier.provider} Courier
                    </span>
                    <span className="text-gray-600 font-mono text-[11px]">
                      Consignment ID: {searchedOrder.courier.consignmentId}
                    </span>
                  </div>
                  {searchedOrder.courier.trackingCode && (
                    <a
                      href={
                        searchedOrder.courier.provider === "Pathao"
                          ? `https://courier.pathao.com/tracking?consignment_id=${searchedOrder.courier.consignmentId}`
                          : `https://steadfast.com.bd/t/${searchedOrder.courier.trackingCode}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-full bg-[#0A0A0A] text-[#FFFFF0] text-[11px] font-bold flex items-center gap-1.5 hover:bg-[#262626] transition-colors"
                    >
                      <span>Live Courier Tracking</span>
                      <ExternalLink className="w-3 h-3 text-[#F59E0B]" />
                    </a>
                  )}
                </div>
              )}

              {/* Order Items Summary */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-xs font-bold text-[#0A0A0A] mb-3">
                  Items in this Parcel:
                </h4>
                <div className="space-y-2">
                  {searchedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center font-bold text-[10px]">
                          {item.quantity}x
                        </span>
                        <span>
                          {item.title} ({item.size}, {item.color})
                        </span>
                      </div>
                      <span className="font-bold text-gray-800">
                        {formatBDT(item.totalPrice)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useStore } from "@/lib/store";
import { Order, OrderStatus, PaymentStatus } from "@/types";
import { formatBDT } from "@/lib/utils";
import {
  bookCourierShipment,
  exportOrdersToCSV,
} from "@/lib/courier";
import {
  ShoppingBag,
  Search,
  Filter,
  Download,
  Truck,
  CheckCircle,
  Eye,
  Check,
  X,
  AlertCircle,
  ExternalLink,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function AdminOrdersPage() {
  const orders = useStore((state) => state.orders);
  const settings = useStore((state) => state.settings);
  const updateOrderStatus = useStore((state) => state.updateOrderStatus);
  const updatePaymentStatus = useStore((state) => state.updatePaymentStatus);
  const bookCourierForOrder = useStore((state) => state.bookCourierForOrder);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>("all");

  // Selected Order for Inspection Modal
  const [inspectingOrder, setInspectingOrder] = useState<Order | null>(null);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchStatus =
      selectedStatus === "all" || order.orderStatus === selectedStatus;
    const matchPayment =
      selectedPaymentStatus === "all" ||
      order.paymentStatus === selectedPaymentStatus;
    const matchQ =
      !searchQuery.trim() ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerMobile.includes(searchQuery) ||
      (order.mfsTrxId && order.mfsTrxId.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchStatus && matchPayment && matchQ;
  });

  const handleExportCSV = () => {
    const csvContent = exportOrdersToCSV(orders);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `fx_fashion_orders_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBookCourier = async (
    order: Order,
    provider: "Pathao" | "Steadfast"
  ) => {
    const result = await bookCourierShipment(order, provider, settings);
    if (result.success) {
      bookCourierForOrder(
        order.id,
        provider,
        result.consignmentId,
        result.trackingCode
      );
      setBookingSuccessMsg(
        `Dispatched with ${provider}! Consignment ID: ${result.consignmentId}`
      );
      setTimeout(() => setBookingSuccessMsg(""), 4000);
      if (inspectingOrder?.id === order.id) {
        setInspectingOrder((prev) =>
          prev
            ? {
                ...prev,
                orderStatus: "Processing",
                courier: {
                  provider,
                  consignmentId: result.consignmentId,
                  trackingCode: result.trackingCode,
                },
              }
            : null
        );
      }
    }
  };

  const statusColors: Record<OrderStatus, string> = {
    Pending: "bg-amber-100 text-amber-800 border-amber-300",
    Confirmed: "bg-blue-100 text-blue-800 border-blue-300",
    Processing: "bg-purple-100 text-purple-800 border-purple-300",
    Shipped: "bg-indigo-100 text-indigo-800 border-indigo-300",
    Delivered: "bg-green-100 text-green-800 border-green-300",
    Cancelled: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0A0A0A]">
            Customer Orders & Fulfillment
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Verify bKash TrxIDs, book Pathao and Steadfast consignments, and update statuses
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="px-4 py-2.5 rounded-full bg-[#FFFFFF] border border-[#C5A24D]/40 text-[#0A0A0A] text-xs font-bold hover:bg-[#F59E0B] transition-all flex items-center gap-1.5 shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Export Orders CSV</span>
        </button>
      </div>

      {bookingSuccessMsg && (
        <div className="p-3 bg-green-50 border border-green-300 rounded-xl text-xs text-green-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
          <span>{bookingSuccessMsg}</span>
        </div>
      )}

      {/* Filter and Search Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#FFFFFF] p-4 rounded-xl border border-gray-200">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order ID, name, phone, TrxID..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FFFFF0] border border-gray-300 rounded-lg text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#C5A24D]"
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="text-xs bg-[#FFFFF0] border border-gray-300 rounded-lg px-3 py-2 text-[#0A0A0A]"
        >
          <option value="all">All Fulfillment Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select
          value={selectedPaymentStatus}
          onChange={(e) => setSelectedPaymentStatus(e.target.value)}
          className="text-xs bg-[#FFFFF0] border border-gray-300 rounded-lg px-3 py-2 text-[#0A0A0A]"
        >
          <option value="all">All Payment Statuses</option>
          <option value="Unpaid">Unpaid (COD)</option>
          <option value="Verification Pending">Verification Pending (MFS)</option>
          <option value="Paid">Paid</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-500">
            No matching orders found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#FFFFF0] border-b border-gray-200 text-gray-600 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Order ID & Date</th>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Payable</th>
                  <th className="p-4">Payment Info</th>
                  <th className="p-4">Courier Dispatch</th>
                  <th className="p-4">Order Status</th>
                  <th className="p-4 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/60">
                    <td className="p-4">
                      <div className="font-mono font-bold text-[#0A0A0A]">
                        #{order.id}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="p-4 max-w-xs">
                      <div className="font-semibold text-gray-900 truncate">
                        {order.customerName}
                      </div>
                      <div className="text-[11px] text-gray-600 font-mono">
                        +88{order.customerMobile}
                      </div>
                      <div className="text-[10px] text-gray-400 truncate">
                        {order.deliveryZone}: {order.deliveryAddress}
                      </div>
                    </td>

                    <td className="p-4 font-bold text-[#262626]">
                      {formatBDT(order.finalPayable)}
                      <span className="block text-[10px] text-gray-400 font-normal">
                        ({order.items.reduce((s, i) => s + i.quantity, 0)} items)
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="font-medium text-[11px] text-gray-800">
                        {order.paymentMethod}
                      </div>
                      {order.mfsTrxId && (
                        <div className="font-mono text-[10px] text-pink-700 font-bold bg-pink-50 px-1.5 py-0.5 rounded inline-block mt-0.5">
                          Trx: {order.mfsTrxId}
                        </div>
                      )}
                      <div className="mt-1 flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            order.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                        {order.paymentStatus !== "Paid" && (
                          <button
                            type="button"
                            onClick={() => updatePaymentStatus(order.id, "Paid")}
                            className="text-[10px] text-blue-600 font-bold hover:underline"
                          >
                            Mark Paid
                          </button>
                        )}
                      </div>
                    </td>

                    <td className="p-4 space-y-1">
                      {order.courier && order.courier.provider !== "None" ? (
                        <div>
                          <span className="font-bold text-purple-700 text-[11px] block">
                            {order.courier.provider}
                          </span>
                          <span className="font-mono text-[10px] text-gray-500 block truncate">
                            {order.courier.consignmentId}
                          </span>
                        </div>
                      ) : (
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => handleBookCourier(order, "Pathao")}
                            className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 text-[10px] font-bold rounded"
                          >
                            Pathao
                          </button>
                          <button
                            type="button"
                            onClick={() => handleBookCourier(order, "Steadfast")}
                            className="px-2 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 text-[10px] font-bold rounded"
                          >
                            Steadfast
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value as OrderStatus)
                        }
                        className={`text-xs px-2.5 py-1 rounded-full border font-bold focus:outline-none ${
                          statusColors[order.orderStatus]
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={() => setInspectingOrder(order)}
                        className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                        title="Inspect full order"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Inspection Modal */}
      {inspectingOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] w-full max-w-2xl rounded-2xl border border-[#C5A24D]/35 shadow-2xl p-6 sm:p-8 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[11px] font-mono text-gray-400">
                  Full Order Details
                </span>
                <h2 className="font-serif text-lg font-bold text-[#0A0A0A]">
                  Order #{inspectingOrder.id}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setInspectingOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Customer Box */}
              <div className="p-4 bg-[#FFFFF0] rounded-xl border border-[#C5A24D]/25 space-y-1.5">
                <div className="font-bold text-gray-900 text-sm">
                  {inspectingOrder.customerName}
                </div>
                <div className="text-gray-600">
                  <strong>Phone:</strong> +88{inspectingOrder.customerMobile}
                </div>
                <div className="text-gray-600">
                  <strong>Delivery Address:</strong> {inspectingOrder.deliveryAddress} ({inspectingOrder.deliveryZone})
                </div>
                {inspectingOrder.orderNotes && (
                  <div className="text-amber-800 italic">
                    <strong>Note:</strong> {inspectingOrder.orderNotes}
                  </div>
                )}
              </div>

              {/* Items List */}
              <div>
                <h4 className="font-bold text-gray-800 uppercase tracking-wider text-[11px] mb-2">
                  Items Breakdown
                </h4>
                <div className="border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden">
                  {inspectingOrder.items.map((item, i) => (
                    <div key={i} className="p-3 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">{item.title}</div>
                        <div className="text-[11px] text-gray-500">
                          Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="font-bold text-gray-900">
                        {formatBDT(item.totalPrice)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Status & Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-bold text-gray-700">Payment Method:</div>
                  <div className="text-gray-900">{inspectingOrder.paymentMethod}</div>
                  {inspectingOrder.mfsTrxId && (
                    <div className="mt-1 font-mono text-[11px] bg-pink-100 text-pink-800 px-2 py-0.5 rounded inline-block">
                      TrxID: {inspectingOrder.mfsTrxId}
                    </div>
                  )}
                  {inspectingOrder.mfsSenderNumber && (
                    <div className="text-gray-600 text-[11px]">
                      Sender: {inspectingOrder.mfsSenderNumber}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-gray-700">Payment Status:</div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">
                      {inspectingOrder.paymentStatus}
                    </span>
                    {inspectingOrder.paymentStatus !== "Paid" && (
                      <button
                        type="button"
                        onClick={() => {
                          updatePaymentStatus(inspectingOrder.id, "Paid");
                          setInspectingOrder((prev) =>
                            prev ? { ...prev, paymentStatus: "Paid" } : null
                          );
                        }}
                        className="px-2 py-1 bg-green-600 text-white rounded text-[10px] font-bold"
                      >
                        Verify & Mark Paid
                      </button>
                    )}
                  </div>
                  <div className="text-base font-extrabold text-[#0A0A0A] pt-1">
                    Payable: {formatBDT(inspectingOrder.finalPayable)}
                  </div>
                </div>
              </div>

              {/* Courier Actions */}
              <div className="p-4 border border-[#C5A24D]/30 rounded-xl bg-amber-50/50 space-y-2">
                <div className="font-bold text-gray-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#F59E0B]" />
                    <span>Courier Consignment</span>
                  </span>
                  {inspectingOrder.courier?.provider !== "None" && (
                    <span className="text-[11px] font-mono text-purple-700 font-bold">
                      {inspectingOrder.courier.provider} ({inspectingOrder.courier.consignmentId})
                    </span>
                  )}
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleBookCourier(inspectingOrder, "Pathao")}
                    className="flex-1 py-2 rounded-lg bg-red-600 text-white font-bold text-xs hover:bg-red-700"
                  >
                    Dispatch via Pathao Courier
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBookCourier(inspectingOrder, "Steadfast")}
                    className="flex-1 py-2 rounded-lg bg-purple-700 text-white font-bold text-xs hover:bg-purple-800"
                  >
                    Dispatch via Steadfast Courier
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setInspectingOrder(null)}
                className="px-5 py-2 rounded-full bg-gray-200 text-gray-800 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

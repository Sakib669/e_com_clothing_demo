"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { formatBDT } from "@/lib/utils";
import { OrderStatus } from "@/types";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
  Truck,
  ExternalLink,
} from "lucide-react";

export default function AdminDashboardPage() {
  const orders = useStore((state) => state.orders);
  const products = useStore((state) => state.products);
  const updateOrderStatus = useStore((state) => state.updateOrderStatus);

  // Statistics
  const totalRevenue = orders
    .filter((o) => o.orderStatus !== "Cancelled")
    .reduce((sum, o) => sum + o.finalPayable, 0);

  const pendingOrders = orders.filter((o) => o.orderStatus === "Pending");
  const processingOrders = orders.filter((o) => o.orderStatus === "Processing" || o.orderStatus === "Confirmed");
  const deliveredOrders = orders.filter((o) => o.orderStatus === "Delivered");

  const lowStockProducts = products.filter((p) => p.stockQuantity < 10);

  const statusColors: Record<OrderStatus, string> = {
    Pending: "bg-amber-100 text-amber-800 border-amber-300",
    Confirmed: "bg-blue-100 text-blue-800 border-blue-300",
    Processing: "bg-purple-100 text-purple-800 border-purple-300",
    Shipped: "bg-indigo-100 text-indigo-800 border-indigo-300",
    Delivered: "bg-green-100 text-green-800 border-green-300",
    Cancelled: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0A0A0A]">
            Operations Overview
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real time store metrics and customer order processing
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/products"
            className="px-4 py-2 rounded-lg bg-[#0A0A0A] text-[#FFFFF0] text-xs font-semibold hover:bg-[#262626] flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Add New Style</span>
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2 rounded-lg bg-[#F59E0B] text-[#0A0A0A] text-xs font-bold hover:bg-[#D97706] flex items-center gap-1.5 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Manage Orders</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#C5A24D]/25 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
            <span>Total Sales Revenue</span>
            <TrendingUp className="w-4 h-4 text-[#C5A24D]" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A]">
            {formatBDT(totalRevenue)}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">From {orders.length} total orders</p>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#C5A24D]/25 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
            <span>Pending Action</span>
            <Clock className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#F59E0B]">
            {pendingOrders.length}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">Awaiting verification</p>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#C5A24D]/25 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
            <span>Active Products</span>
            <Package className="w-4 h-4 text-[#C5A24D]" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A]">
            {products.length}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">In store catalog</p>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#C5A24D]/25 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
            <span>Delivered Orders</span>
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-green-700">
            {deliveredOrders.length}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">Fulfilled successfully</p>
        </div>
      </div>

      {/* Low Stock Warning Banner if applicable */}
      {lowStockProducts.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Inventory Warning:</strong> {lowStockProducts.length} style(s) have low stock (&lt; 10 units remaining).
            </span>
          </div>
          <Link
            href="/admin/products"
            className="font-bold underline hover:text-amber-950 shrink-0"
          >
            Manage Stock
          </Link>
        </div>
      )}

      {/* Recent Orders Section */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#C5A24D]/25 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-base font-bold text-[#0A0A0A]">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-gray-500">
              Latest incoming purchases and status adjustments
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-[#0A0A0A] hover:text-[#9E7F30] flex items-center gap-1"
          >
            <span>View All ({orders.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500">
            No orders placed yet. Place a test order from the storefront!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#FFFFF0] border-b border-gray-200 text-gray-600 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Mobile</th>
                  <th className="p-4">Payable</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Courier</th>
                  <th className="p-4">Fulfillment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.slice(0, 6).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/60">
                    <td className="p-4 font-mono font-bold text-[#0A0A0A]">
                      #{order.id}
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                      {order.customerName}
                    </td>
                    <td className="p-4 text-gray-600 font-mono">
                      +88{order.customerMobile}
                    </td>
                    <td className="p-4 font-bold text-[#262626]">
                      {formatBDT(order.finalPayable)}
                    </td>
                    <td className="p-4">
                      <span className="text-[11px] block">{order.paymentMethod}</span>
                      <span className={`text-[10px] font-bold ${
                        order.paymentStatus === "Paid" ? "text-green-600" : "text-amber-600"
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4 text-[11px]">
                      {order.courier?.provider !== "None" ? (
                        <span className="font-mono text-purple-700 font-medium">
                          {order.courier.provider} ({order.courier.consignmentId?.slice(0, 10)})
                        </span>
                      ) : (
                        <span className="text-gray-400">Not Dispatched</span>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useStore } from "@/lib/store";
import { Tag, Plus, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { formatBDT } from "@/lib/utils";

export default function AdminCouponsPage() {
  const coupons = useStore((state) => state.coupons);
  const addCoupon = useStore((state) => state.addCoupon);
  const toggleCoupon = useStore((state) => state.toggleCoupon);
  const deleteCoupon = useStore((state) => state.deleteCoupon);

  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(10);
  const [minOrderAmount, setMinOrderAmount] = useState(1500);
  const [maxDiscount, setMaxDiscount] = useState<number | undefined>(500);

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    addCoupon({
      code: code.trim().toUpperCase(),
      discountPercent: Number(discountPercent),
      minOrderAmount: Number(minOrderAmount),
      maxDiscount: maxDiscount ? Number(maxDiscount) : undefined,
      isActive: true,
    });

    setCode("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0A0A0A]">
          Promotional Coupons
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Manage promotional discount codes applied by customers at checkout
        </p>
      </div>

      {/* Create New Coupon Form */}
      <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#C5A24D] flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          <span>Create New Coupon Code</span>
        </h2>

        <form onSubmit={handleAddCoupon} className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-bold text-gray-800 mb-1">Coupon Code *</label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. FLASH20"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0] uppercase font-mono font-bold focus:ring-1 focus:ring-[#C5A24D]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1">Discount (%) *</label>
            <input
              type="number"
              required
              min={1}
              max={100}
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1">Min Order (BDT ৳) *</label>
            <input
              type="number"
              required
              value={minOrderAmount}
              onChange={(e) => setMinOrderAmount(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
            />
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="block font-bold text-gray-800 mb-1">Max Cap (৳)</label>
              <input
                type="number"
                value={maxDiscount ?? ""}
                onChange={(e) =>
                  setMaxDiscount(e.target.value ? Number(e.target.value) : undefined)
                }
                placeholder="Optional"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#0A0A0A] text-[#FFFFF0] font-bold text-xs hover:bg-[#262626] transition-colors shrink-0"
            >
              Add Code
            </button>
          </div>
        </form>
      </div>

      {/* Coupons Table */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-[#FFFFF0] border-b border-gray-200 text-gray-600 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Coupon Code</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Minimum Spend</th>
                <th className="p-4">Maximum Discount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/60">
                  <td className="p-4 font-mono font-bold text-[#0A0A0A] text-sm">
                    {c.code}
                  </td>
                  <td className="p-4 font-bold text-green-700">
                    {c.discountPercent}% Off
                  </td>
                  <td className="p-4 text-gray-700">
                    {formatBDT(c.minOrderAmount)}
                  </td>
                  <td className="p-4 text-gray-700">
                    {c.maxDiscount ? formatBDT(c.maxDiscount) : "No Limit"}
                  </td>
                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() => toggleCoupon(c.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        c.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {c.isActive ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-gray-400" />
                          <span>Inactive</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => deleteCoupon(c.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 rounded hover:bg-red-50"
                      title="Delete code"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

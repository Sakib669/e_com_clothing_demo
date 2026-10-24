"use client";

import React, { useState } from "react";
import { useStore } from "@/lib/store";
import {
  Settings,
  Save,
  Download,
  Upload,
  RotateCcw,
  CheckCircle,
  Truck,
  CreditCard,
  Building,
  AlertTriangle,
} from "lucide-react";

export default function AdminSettingsPage() {
  const settings = useStore((state) => state.settings);
  const updateSettings = useStore((state) => state.updateSettings);
  const exportDatabaseJSON = useStore((state) => state.exportDatabaseJSON);
  const importDatabaseJSON = useStore((state) => state.importDatabaseJSON);
  const resetToDefaults = useStore((state) => state.resetToDefaults);

  const [form, setForm] = useState(settings);
  const [successMessage, setSuccessMessage] = useState("");
  const [importJsonText, setImportJsonText] = useState("");
  const [showImportBox, setShowImportBox] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSuccessMessage("Store settings saved successfully!");
    setTimeout(() => setSuccessMessage(""), 3500);
  };

  const handleExportDatabase = () => {
    const jsonStr = exportDatabaseJSON();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fx_fashion_database_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const ok = importDatabaseJSON(importJsonText);
    if (ok) {
      setSuccessMessage("Database successfully restored from JSON backup!");
      setShowImportBox(false);
      setImportJsonText("");
    } else {
      alert("Invalid JSON data format.");
    }
  };

  const handleReset = () => {
    if (
      confirm(
        "Reset all products, banners, and coupons back to demo defaults? This will restore initial seed data."
      )
    ) {
      resetToDefaults();
      setSuccessMessage("Store successfully restored to demo seed defaults!");
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0A0A0A]">
          Store Settings & Integrations
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Configure business details, Bangladesh delivery rates, MFS numbers, and data backups
        </p>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-300 text-xs text-green-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Business Contact Info */}
        <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#C5A24D] flex items-center gap-2">
            <Building className="w-4 h-4" />
            <span>Store Profile & Customer Contact</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-800 mb-1">Store Name</label>
              <input
                type="text"
                value={form.storeName}
                onChange={(e) => setForm({ ...form, storeName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-800 mb-1">Official Helpline Phone</label>
              <input
                type="text"
                value={form.contactPhone}
                onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-800 mb-1">WhatsApp Support Number</label>
              <input
                type="text"
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                placeholder="+8801711000000"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-800 mb-1">Support Email</label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1">Physical Store / Workshop Address</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
            />
          </div>
        </div>

        {/* Bangladesh Delivery Charges */}
        <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#C5A24D] flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>Delivery Fees (Bangladeshi Taka ৳)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-800 mb-1">Inside Dhaka City (৳)</label>
              <input
                type="number"
                value={form.deliveryFeeDhaka}
                onChange={(e) => setForm({ ...form, deliveryFeeDhaka: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-800 mb-1">Outside Dhaka City (৳)</label>
              <input
                type="number"
                value={form.deliveryFeeOutside}
                onChange={(e) => setForm({ ...form, deliveryFeeOutside: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
              />
            </div>
          </div>
        </div>

        {/* MFS Payment Details (bKash & Nagad) */}
        <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#C5A24D] flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span>bKash & Nagad Payment Numbers</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-800 mb-1">bKash Account Number</label>
              <input
                type="text"
                value={form.bkashNumber}
                onChange={(e) => setForm({ ...form, bkashNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0] font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-800 mb-1">bKash Account Type</label>
              <select
                value={form.bkashType}
                onChange={(e) => setForm({ ...form, bkashType: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
              >
                <option value="Merchant">Merchant (Make Payment)</option>
                <option value="Personal">Personal (Send Money)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-800 mb-1">Nagad Account Number</label>
              <input
                type="text"
                value={form.nagadNumber}
                onChange={(e) => setForm({ ...form, nagadNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0] font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-800 mb-1">Nagad Account Type</label>
              <select
                value={form.nagadType}
                onChange={(e) => setForm({ ...form, nagadType: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
              >
                <option value="Merchant">Merchant (Make Payment)</option>
                <option value="Personal">Personal (Send Money)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Courier API Credentials */}
        <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#C5A24D] flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>Pathao & Steadfast Live API Keys (Optional)</span>
          </h2>
          <p className="text-[11px] text-gray-500">
            If left blank, the dashboard will use instant simulated consignment booking. Adding live credentials connects directly to courier systems.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-800 mb-1">Pathao Client ID / Key</label>
              <input
                type="password"
                value={form.pathaoApiKey || ""}
                onChange={(e) => setForm({ ...form, pathaoApiKey: e.target.value })}
                placeholder="Optional"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-800 mb-1">Steadfast API Key</label>
              <input
                type="password"
                value={form.steadfastApiKey || ""}
                onChange={(e) => setForm({ ...form, steadfastApiKey: e.target.value })}
                placeholder="Optional"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
              />
            </div>
          </div>
        </div>

        {/* Save Form CTA */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-7 py-3 rounded-full bg-[#F59E0B] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider hover:bg-[#D97706] shadow-sm flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Settings</span>
          </button>
        </div>
      </form>

      {/* Database Backup, Export and Restore Section */}
      <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A] flex items-center gap-2 border-b border-gray-100 pb-3">
          <Download className="w-4 h-4 text-[#C5A24D]" />
          <span>Local Storage Database Backup & Device Sync</span>
        </h2>
        <p className="text-xs text-gray-600">
          Export your complete store data (products, orders, coupons, settings) as a portable JSON file to back up your store or migrate between your Android smartphone and desktop PC.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={handleExportDatabase}
            className="px-5 py-2.5 rounded-full bg-[#0A0A0A] text-[#FFFFF0] text-xs font-bold hover:bg-[#262626] flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Export Database JSON</span>
          </button>

          <button
            type="button"
            onClick={() => setShowImportBox(!showImportBox)}
            className="px-5 py-2.5 rounded-full bg-[#FFFFFF] border border-gray-300 text-gray-700 text-xs font-semibold hover:border-black flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Restore from JSON</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-bold hover:bg-red-100 flex items-center gap-1.5 ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5 text-red-600" />
            <span>Reset to Seed Defaults</span>
          </button>
        </div>

        {/* Restore Paste Box */}
        {showImportBox && (
          <div className="pt-4 space-y-2 border-t border-gray-100">
            <label className="block text-xs font-bold text-gray-800">
              Paste JSON Backup Content:
            </label>
            <textarea
              rows={4}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Paste exported JSON text here..."
              className="w-full p-3 font-mono text-[11px] bg-gray-50 border border-gray-300 rounded-xl"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowImportBox(false)}
                className="px-4 py-1.5 text-xs text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportSubmit}
                className="px-5 py-1.5 bg-[#0A0A0A] text-white text-xs font-bold rounded-lg hover:bg-[#262626]"
              >
                Confirm Restore
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

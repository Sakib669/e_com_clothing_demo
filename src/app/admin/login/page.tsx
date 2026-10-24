"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { ShieldCheck, Lock, ArrowRight, AlertCircle, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const adminLogin = useStore((state) => state.adminLogin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (adminLogin(password)) {
      router.push("/admin");
    } else {
      setError("Incorrect administrator credentials. Use preset 'fx2026admin'.");
    }
  };

  const handleQuickFill = () => {
    setPassword("fx2026admin");
    adminLogin("fx2026admin");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#FFFFF0] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#FFFFFF] rounded-2xl border border-[#C5A24D]/35 p-8 shadow-xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-[#0A0A0A] text-[#F59E0B] flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-2xl font-extrabold text-[#0A0A0A]">
            FX Fashion Admin
          </h1>
          <p className="text-xs text-gray-500">
            Secure management console for Android & Desktop PC
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-1">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g. fx2026admin)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-[#FFFFF0] text-xs focus:outline-none focus:ring-2 focus:ring-[#C5A24D]"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#0A0A0A] text-[#FFFFF0] font-bold text-xs uppercase tracking-wider hover:bg-[#262626] transition-colors flex items-center justify-center gap-2"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
          </button>
        </form>

        {/* Recruiter One-Click Fast Access Helper */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-amber-950">
            <KeyRound className="w-4 h-4 text-[#F59E0B]" />
            <span>Recruiter / Demo Credentials</span>
          </div>
          <p className="text-[11px] text-gray-600">
            Default preset password: <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border">fx2026admin</code>
          </p>
          <button
            type="button"
            onClick={handleQuickFill}
            className="w-full py-2 px-3 rounded-lg bg-[#F59E0B] text-[#0A0A0A] font-bold text-xs hover:bg-[#D97706] transition-colors"
          >
            One-Click Fast Demo Login
          </button>
        </div>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-gray-500 hover:text-[#0A0A0A]">
            ← Return to FX Fashion Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}

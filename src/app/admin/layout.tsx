"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const isAdminAuthenticated = useStore((state) => state.isAdminAuthenticated);
  const adminLogout = useStore((state) => state.adminLogout);
  const orders = useStore((state) => state.orders);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pendingOrdersCount = orders.filter((o) => o.orderStatus === "Pending").length;

  // If on /admin/login, don't wrap with navigation
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Auth Guard
  if (mounted && !isAdminAuthenticated) {
    router.push("/admin/login");
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFFF0] text-xs text-gray-500">
        Redirecting to administrator login...
      </div>
    );
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    {
      label: "Orders",
      href: "/admin/orders",
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
    },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Coupons", href: "/admin/coupons", icon: Tag },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    adminLogout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pb-16 md:pb-0">
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0A0A0A] text-[#FFFFF0] border-r border-[#C5A24D]/30 shrink-0">
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold text-[#FFFFF0] tracking-wider">
              FX ADMIN
            </span>
            <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#F59E0B] text-[#0A0A0A]">
              PORTAL
            </span>
          </div>
          <p className="text-[10px] text-[#C5A24D] uppercase tracking-wider mt-0.5">
            Store Operations Hub
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-[#F59E0B] text-[#0A0A0A] shadow"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#D90429] text-white text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2 text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#C5A24D]" />
              <span>Live Storefront</span>
            </span>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">View</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <header className="md:hidden bg-[#0A0A0A] text-[#FFFFF0] px-4 py-3 flex items-center justify-between border-b border-[#C5A24D]/30 sticky top-0 z-30">
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-base font-bold text-[#FFFFF0]">FX ADMIN</span>
            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#F59E0B] text-[#0A0A0A]">
              OPERATIONS
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/"
              target="_blank"
              className="text-[#F59E0B] hover:underline flex items-center gap-1"
            >
              <span>Store</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-400 font-semibold text-[11px]"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Child Pages Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Fixed Navigation Bar (Optimized for Android and iOS) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-[#0A0A0A] text-gray-300 border-t border-[#C5A24D]/30 flex justify-around items-center h-16 z-40 px-2 shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full relative transition-colors ${
                isActive ? "text-[#F59E0B] font-bold" : "text-gray-400"
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#D90429] text-white text-[9px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

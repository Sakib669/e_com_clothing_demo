"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Truck,
  ShieldCheck,
  Phone,
  Sparkles,
} from "lucide-react";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cart = useStore((state) => state.cart);
  const settings = useStore((state) => state.settings);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted
    ? cart.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Collection", href: "/products" },
    { label: "T-Shirts", href: "/products?category=t-shirts" },
    { label: "Shirts", href: "/products?category=shirts" },
    { label: "Pants", href: "/products?category=pants" },
    { label: "Jackets", href: "/products?category=jackets" },
  ];

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-[#0A0A0A] text-[#FFFFF0] text-xs py-2 px-4 border-b border-[#C5A24D]/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="tracking-wide">
              Welcome to FX Fashion Gallery: Premium Clothing in Bangladesh
            </span>
            <span className="hidden md:inline text-[#C5A24D]">|</span>
            <span className="hidden md:inline text-gray-300">
              Cash on Delivery Available Nationwide
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-gray-300">
            <Link
              href="/track"
              className="flex items-center gap-1 hover:text-[#F59E0B] transition-colors"
            >
              <Truck className="w-3 h-3 text-[#C5A24D]" />
              <span>Track Order</span>
            </Link>
            <span>•</span>
            <Link
              href="/admin"
              className="flex items-center gap-1 hover:text-[#F59E0B] transition-colors"
            >
              <ShieldCheck className="w-3 h-3 text-[#C5A24D]" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-[#FFFFF0]/95 backdrop-blur-md border-b border-[#C5A24D]/25 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-[#0A0A0A] hover:bg-[#C5A24D]/15 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#0A0A0A]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#0A0A0A]" />
                )}
              </button>
            </div>

            {/* Brand Logo & Slogan */}
            <div className="flex-1 lg:flex-initial flex items-center justify-center lg:justify-start">
              <Link href="/" className="group flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-wider text-[#0A0A0A] group-hover:text-[#9E7F30] transition-colors">
                    FX FASHION
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#0A0A0A] text-[#F59E0B]">
                    GALLERY
                  </span>
                </div>
                <span className="text-[10px] tracking-[0.25em] text-[#C5A24D] font-semibold uppercase">
                  Style. Quality. Confidence.
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                      isActive
                        ? "text-[#0A0A0A] font-bold"
                        : "text-[#262626] hover:text-[#9E7F30]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C5A24D] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Search and Cart Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Search Bar */}
              <div className="hidden sm:flex items-center relative">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      window.location.href = `/products?search=${encodeURIComponent(
                        searchQuery.trim()
                      )}`;
                    }
                  }}
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search styles..."
                    className="w-40 md:w-56 pl-8 pr-3 py-1.5 text-xs bg-[#FFFFFF] border border-[#C5A24D]/35 rounded-full text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A24D] transition-all"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                </form>
              </div>

              {/* Shopping Cart Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-[#FFFFFF] border border-[#C5A24D]/30 text-[#0A0A0A] hover:bg-[#F59E0B] hover:border-[#F59E0B] transition-all shadow-sm"
                aria-label="View shopping bag"
              >
                <ShoppingBag className="w-5 h-5 text-[#0A0A0A]" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D90429] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#C5A24D]/25 bg-[#FFFFF0] px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  setIsMobileMenuOpen(false);
                  window.location.href = `/products?search=${encodeURIComponent(
                    searchQuery.trim()
                  )}`;
                }
              }}
              className="relative mb-3"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shirts, t-shirts, jackets..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-[#FFFFFF] border border-[#C5A24D]/40 rounded-full text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A24D]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </form>

            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#0A0A0A] hover:bg-[#C5A24D]/15 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-[#C5A24D]/20 flex flex-col gap-2 text-xs text-gray-600">
              <Link
                href="/track"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 py-1 text-[#0A0A0A]"
              >
                <Truck className="w-4 h-4 text-[#C5A24D]" />
                <span>Track Your Order</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 py-1 text-[#0A0A0A]"
              >
                <ShieldCheck className="w-4 h-4 text-[#C5A24D]" />
                <span>Store Admin Dashboard</span>
              </Link>
              <div className="flex items-center gap-2 pt-2 text-[#262626]">
                <Phone className="w-4 h-4 text-[#F59E0B]" />
                <span>Helpline: {settings.contactPhone}</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Slide Over Cart Drawer Component */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

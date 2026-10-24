"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Shield, Clock } from "lucide-react";
import { useStore } from "@/lib/store";

export default function HeroBanner() {
  const banners = useStore((state) => state.banners);
  const activeBanner = banners.find((b) => b.isActive) || banners[0];

  return (
    <section className="relative bg-[#0A0A0A] text-[#FFFFF0] overflow-hidden border-b border-[#C5A24D]/30">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src={activeBanner?.imageUrl || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600"}
          alt="FX Fashion Gallery Luxury Apparel"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFF0]/10 border border-[#C5A24D]/50 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#C5A24D] uppercase">
              {activeBanner?.badgeText || "NEW COLLECTION 2026"}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FFFFF0] leading-tight">
            Elevate Your Everyday <span className="text-[#C5A24D] italic">Presence</span>.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
            {activeBanner?.subtitle ||
              "Bespoke craftsmanship and breathable cotton tailored for the contemporary Bangladeshi gentleman. Discover refined T-shirts, formal Oxford shirts, chinos, and outerwear."}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/products"
              className="px-7 py-3.5 rounded-full bg-[#F59E0B] text-[#0A0A0A] font-bold text-sm tracking-wide shadow-lg hover:bg-[#D97706] hover:scale-105 transition-all flex items-center gap-2 group"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 text-[#0A0A0A] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/products?category=t-shirts"
              className="px-6 py-3.5 rounded-full bg-[#FFFFF0]/10 text-[#FFFFF0] border border-[#C5A24D]/40 text-sm font-semibold hover:bg-[#FFFFF0]/20 transition-colors"
            >
              View Supima Tees
            </Link>
          </div>

          {/* Service Highlights */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#C5A24D]" />
              <span>Cash on Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C5A24D]" />
              <span>24-48h Dhaka Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A24D]" />
              <span>bKash & Nagad Accepted</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

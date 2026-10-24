"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { useStore } from "@/lib/store";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Tag,
} from "lucide-react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const products = useStore((state) => state.products);
  const coupons = useStore((state) => state.coupons);

  useEffect(() => {
    setMounted(true);
  }, []);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);
  const welcomeCoupon = coupons.find((c) => c.code === "WELCOME10") || coupons[0];

  const categories = [
    {
      name: "T-Shirts",
      slug: "t-shirts",
      desc: "Supima & Heavyweight Tees",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600",
    },
    {
      name: "Shirts",
      slug: "shirts",
      desc: "Oxford & French Linen",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600",
    },
    {
      name: "Pants",
      slug: "pants",
      desc: "Tailored Chinos & Denim",
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600",
    },
    {
      name: "Jackets",
      slug: "jackets",
      desc: "Bombers & Overcoats",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Category Showcases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A24D]/15 text-[#9E7F30] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Collections</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#0A0A0A]">
            Discover by Wardrobe Category
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A24D] mx-auto rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-100 border border-[#C5A24D]/25 shadow-sm hover:shadow-xl transition-all"
            >
              <SafeImage
                src={cat.image}
                alt={cat.name}
                fill
                fallbackSrc="/images/placeholders/apparel-placeholder.svg"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/30 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
                <span className="text-[10px] uppercase font-bold text-[#F59E0B] tracking-widest">
                  Explore
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FFFFF0] group-hover:text-[#F59E0B] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-gray-300 font-light hidden sm:block">
                  {cat.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#C5A24D]/25">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A24D]">
              Selected Signature Styles
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] mt-1">
              Featured Products
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A0A0A] hover:text-[#9E7F30] group transition-colors"
          >
            <span>View All Styles</span>
            <ArrowRight className="w-4 h-4 text-[#C5A24D] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(mounted ? featuredProducts : products.slice(0, 4)).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Luxury Brand Story / Editorial Spotlight */}
      <section className="bg-[#0A0A0A] text-[#FFFFF0] py-16 sm:py-24 border-y border-[#C5A24D]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#F59E0B]">
                THE FX PHILOSOPHY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold leading-snug">
                Precision Tailoring Meets Everyday Confidence.
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed font-light">
                At FX Fashion Gallery, we believe that refined dressing should feel natural and empowering. We design apparel built with the finest natural fibers, breathable French linens, and extra long staple Supima cottons specifically suited to the climate and culture of Bangladesh.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10 text-xs">
                <div className="space-y-1">
                  <div className="text-2xl font-serif font-extrabold text-[#F59E0B]">100%</div>
                  <div className="text-gray-300 font-medium">Original Fabrics</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-serif font-extrabold text-[#F59E0B]">24-48h</div>
                  <div className="text-gray-300 font-medium">Dhaka Express Delivery</div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFFFF0] text-[#0A0A0A] text-xs font-bold hover:bg-[#F59E0B] transition-colors"
                >
                  <span>Learn Our Heritage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#C5A24D]/30 shadow-2xl">
              <SafeImage
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200"
                alt="FX Fashion Gallery Craftsmanship"
                fill
                fallbackSrc="/images/products/hero-collection.svg"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. New Season Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#C5A24D]/25">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A24D]">
              Fresh from the Workshop
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] mt-1">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A0A0A] hover:text-[#9E7F30] group transition-colors"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#C5A24D] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(mounted ? newArrivals : products.slice(0, 4)).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Promotional Banner Strip */}
      {welcomeCoupon && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-gradient-to-r from-[#0A0A0A] via-[#1E293B] to-[#0A0A0A] text-[#FFFFF0] p-8 sm:p-12 border border-[#C5A24D]/40 shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] text-xs font-bold">
                <Tag className="w-3.5 h-3.5" />
                <span>SPECIAL INAUGURAL OFFER</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Get {welcomeCoupon.discountPercent}% Off Your Order
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-lg">
                Use code <span className="font-mono font-bold text-[#F59E0B] bg-white/10 px-2 py-0.5 rounded">{welcomeCoupon.code}</span> at checkout on orders over ৳{welcomeCoupon.minOrderAmount}.
              </p>
            </div>

            <Link
              href="/products"
              className="px-7 py-3 rounded-full bg-[#F59E0B] text-[#0A0A0A] font-bold text-xs tracking-wider uppercase hover:bg-[#D97706] transition-all shadow-md shrink-0"
            >
              Claim Promo Code
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

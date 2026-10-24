import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck, Heart, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A24D]">
          Our Heritage & Craft
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0A0A0A]">
          About FX Fashion Gallery
        </h1>
        <div className="w-16 h-0.5 bg-[#C5A24D] mx-auto rounded-full mt-2" />
        <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed pt-2">
          Founded in Dhaka, Bangladesh, FX Fashion Gallery was created to redefine contemporary clothing by blending timeless tailoring with breathable luxury fabrics.
        </p>
      </div>

      {/* Brand Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#C5A24D]/30 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#0A0A0A] text-[#F59E0B] flex items-center justify-center mx-auto shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#0A0A0A]">Style</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Minimalist, understated elegance designed to transition effortlessly from boardroom presentations to weekend leisure.
          </p>
        </div>

        <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#C5A24D]/30 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#0A0A0A] text-[#F59E0B] flex items-center justify-center mx-auto shadow-sm">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#0A0A0A]">Quality</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Extra long staple Supima cotton, pure French linen, and reinforced stitching engineered to withstand years of wear.
          </p>
        </div>

        <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#C5A24D]/30 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#0A0A0A] text-[#F59E0B] flex items-center justify-center mx-auto shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#0A0A0A]">Confidence</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Garments cut with precise flattering silhouettes that give you authentic composure every single time you dress.
          </p>
        </div>
      </div>

      {/* Story Narrative */}
      <div className="bg-[#FFFFFF] p-8 sm:p-12 rounded-2xl border border-gray-200 shadow-xs space-y-6 text-xs text-gray-700 leading-relaxed">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0A0A0A]">
          The Story Behind the Brand
        </h2>
        <p>
          In a market overwhelmed by synthetic blends and disposable fast fashion, FX Fashion Gallery stands apart. We set out to create pieces that feel wonderful against the skin while holding their shape wash after wash. Every collar, cuff, seam, and button is scrutinized before a design enters our collection.
        </p>
        <p>
          We take immense pride in serving discerning customers across Dhaka and every district of Bangladesh. With dependable nationwide delivery and Cash on Delivery support, we make high quality fashion accessible to everyone.
        </p>
        <div className="pt-4 flex justify-center">
          <Link
            href="/products"
            className="px-8 py-3 rounded-full bg-[#F59E0B] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider hover:bg-[#D97706] transition-all flex items-center gap-2 shadow"
          >
            <span>Explore the Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

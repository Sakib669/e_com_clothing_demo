"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { useStore } from "@/lib/store";
import { formatBDT } from "@/lib/utils";
import { ShoppingBag, Check, Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Default");
  const [addedAnimation, setAddedAnimation] = useState(false);

  const price = product.salePrice ?? product.regularPrice;
  const hasDiscount = product.salePrice && product.salePrice < product.regularPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice - product.salePrice!) / product.regularPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="double-bezel-card group relative flex flex-col h-full">
      <div className="double-bezel-inner flex flex-col h-full">
        {/* Product Image & Badges */}
        <Link href={`/products/${product.slug}`} className="relative block aspect-[3/4] bg-[#F5F5F0] overflow-hidden">
          <Image
            src={product.images[0] || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800"}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {hasDiscount && (
              <span className="bg-[#D90429] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                -{discountPercent}%
              </span>
            )}
            {product.newArrival && (
              <span className="bg-[#0A0A0A] text-[#F59E0B] text-[10px] font-bold px-2 py-0.5 rounded shadow border border-[#C5A24D]/40">
                NEW
              </span>
            )}
          </div>

          {/* Quick View Overlay on hover */}
          <div className="absolute inset-0 bg-[#0A0A0A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <span className="bg-[#FFFFFF]/90 text-[#0A0A0A] text-xs font-semibold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5 backdrop-blur-sm">
              <Eye className="w-3.5 h-3.5 text-[#C5A24D]" />
              <span>View Style</span>
            </span>
          </div>
        </Link>

        {/* Product Information */}
        <div className="p-4 flex flex-col flex-grow justify-between bg-[#FFFFFF]">
          <div>
            {/* Category tag */}
            <span className="text-[10px] uppercase tracking-wider text-[#C5A24D] font-bold block mb-1">
              {product.category.replace("-", " ")}
            </span>

            {/* Product Title */}
            <Link href={`/products/${product.slug}`} className="block">
              <h3 className="text-sm font-semibold text-[#0A0A0A] line-clamp-1 group-hover:text-[#9E7F30] transition-colors">
                {product.title}
              </h3>
            </Link>

            {/* Price section */}
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-base font-bold text-[#262626]">
                {formatBDT(price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-[#D90429] line-through font-medium">
                  {formatBDT(product.regularPrice)}
                </span>
              )}
            </div>

            {/* Size selector pills */}
            <div className="mt-3 flex items-center gap-1.5">
              <span className="text-[10px] text-gray-500 font-medium">Size:</span>
              <div className="flex flex-wrap gap-1">
                {product.sizes.slice(0, 4).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedSize(size);
                    }}
                    className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                      selectedSize === size
                        ? "bg-[#0A0A0A] text-[#FFFFF0] border-[#0A0A0A]"
                        : "bg-[#FFFFFF] text-gray-700 border-gray-200 hover:border-[#C5A24D]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Add Button */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`w-full py-2 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                addedAnimation
                  ? "bg-green-600 text-white"
                  : "bg-[#F59E0B] text-[#0A0A0A] hover:bg-[#D97706]"
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#0A0A0A]" />
                  <span>Quick Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

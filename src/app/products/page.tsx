"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import { ProductCategory } from "@/types";
import { Search, Filter, ArrowUpDown, X } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">("featured");

  const products = useStore((state) => state.products);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get("search");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const categories: { label: string; value: string }[] = [
    { label: "All Items", value: "all" },
    { label: "T-Shirts", value: "t-shirts" },
    { label: "Shirts", value: "shirts" },
    { label: "Pants", value: "pants" },
    { label: "Jackets", value: "jackets" },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by Category
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === "price-asc") {
      list.sort((a, b) => (a.salePrice ?? a.regularPrice) - (b.salePrice ?? b.regularPrice));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => (b.salePrice ?? b.regularPrice) - (a.salePrice ?? a.regularPrice));
    } else if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      // Featured
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#C5A24D]/25 pb-6">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A24D]">
          The Complete Wardrobe
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0A0A0A] mt-1">
          {selectedCategory === "all"
            ? "All Fashion Collections"
            : `${selectedCategory.toUpperCase().replace("-", " ")} COLLECTION`}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-xl">
          Explore handcrafted clothing made with premium cotton and French linen. Enjoy fast Cash on Delivery across Bangladesh.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FFFFFF] p-4 rounded-2xl border border-[#C5A24D]/25 shadow-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat.value
                  ? "bg-[#0A0A0A] text-[#FFFFF0] shadow-sm"
                  : "bg-[#FFFFF0] text-gray-700 hover:bg-[#C5A24D]/15 border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3">
          {/* Search box */}
          <div className="relative flex-1 md:w-56">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter products..."
              className="w-full pl-8 pr-8 py-1.5 text-xs bg-[#FFFFF0] border border-gray-300 rounded-full text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#C5A24D]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-[#FFFFF0] border border-gray-300 rounded-full px-3 py-1.5 text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#C5A24D]"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Result Count and Active Filters */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          Showing <strong>{filteredProducts.length}</strong> styles
        </span>
        {(selectedCategory !== "all" || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-[#D90429] font-medium hover:underline text-[11px]"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center py-20 bg-[#FFFFFF] rounded-2xl border border-[#C5A24D]/20 shadow-xs"
        >
          <p className="font-serif text-lg font-bold text-[#0A0A0A] mb-2">
            No matching clothing found
          </p>
          <p className="text-xs text-gray-500 mb-6">
            Try adjusting your search terms or selecting another category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="px-6 py-2.5 rounded-full bg-[#F59E0B] text-[#0A0A0A] font-semibold text-xs shadow-sm hover:bg-[#D97706] transition-colors"
          >
            Show All Products
          </button>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading collection...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

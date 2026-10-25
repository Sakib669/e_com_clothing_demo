"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SafeImage from "@/components/SafeImage";
import { notFound, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { formatBDT } from "@/lib/utils";
import {
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ArrowRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);
  const settings = useStore((state) => state.settings);

  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(product.images[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || "Default"
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const price = product.salePrice ?? product.regularPrice;
  const hasDiscount = product.salePrice && product.salePrice < product.regularPrice;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.regularPrice - product.salePrice!) / product.regularPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    router.push("/checkout");
  };

  const whatsappMessage = encodeURIComponent(
    `Hello FX Fashion Gallery! I am interested in ordering: "${product.title}" (Size: ${selectedSize}, Color: ${selectedColor}). Is this available?`
  );
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, "") || "8801711000000";
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMessage}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#0A0A0A]">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#0A0A0A]">
          Catalog
        </Link>
        <span>/</span>
        <Link
          href={`/products?category=${product.category}`}
          className="capitalize hover:text-[#0A0A0A]"
        >
          {product.category.replace("-", " ")}
        </Link>
        <span>/</span>
        <span className="text-[#0A0A0A] font-semibold truncate max-w-xs">
          {product.title}
        </span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Left Column: Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {/* Main Large Image */}
          <div className="relative aspect-[3/4] bg-[#F5F5F0] rounded-2xl overflow-hidden border border-[#C5A24D]/30 shadow-md">
            <SafeImage
              src={selectedImage || product.images[0] || "/images/placeholders/apparel-placeholder.svg"}
              alt={product.title}
              fill
              priority
              className="object-cover object-center"
            />
            {hasDiscount && (
              <span className="absolute top-4 left-4 bg-[#D90429] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === img
                      ? "border-[#C5A24D] ring-2 ring-[#C5A24D]/30 scale-102"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <SafeImage
                    src={img}
                    alt={`${product.title} - view ${idx + 1}`}
                    fill
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right Column: Product Details & Purchase Actions */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Category & Title */}
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C5A24D]">
              {product.category.replace("-", " ")}
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#0A0A0A] mt-1.5">
              {product.title}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              SKU: {product.slug.toUpperCase().slice(0, 10)}
            </p>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-3 p-4 bg-[#FFFFFF] rounded-xl border border-[#C5A24D]/25 shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#262626]">
              {formatBDT(price)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-base text-[#D90429] line-through font-medium">
                  {formatBDT(product.regularPrice)}
                </span>
                <span className="text-xs bg-[#D90429]/10 text-[#D90429] font-bold px-2 py-0.5 rounded">
                  Save {formatBDT(product.regularPrice - product.salePrice!)}
                </span>
              </>
            )}
          </div>

          {/* Stock Availability */}
          <div className="flex items-center gap-2 text-xs">
            {product.stockQuantity > 0 ? (
              <span className="flex items-center gap-1.5 text-green-700 font-semibold bg-green-50 px-3 py-1 rounded-full border border-green-200">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                In Stock ({product.stockQuantity} pieces available)
              </span>
            ) : (
              <span className="text-red-600 font-semibold bg-red-50 px-3 py-1 rounded-full border border-red-200">
                Currently Out of Stock
              </span>
            )}
          </div>

          {/* Color Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wide">
              Color: <span className="font-normal text-gray-700">{selectedColor}</span>
            </label>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-all ${
                    selectedColor === color.name
                      ? "border-[#0A0A0A] bg-[#FFFFFF] shadow-sm ring-1 ring-[#0A0A0A]"
                      : "border-gray-300 bg-[#FFFFFF] hover:border-[#C5A24D]"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-[#0A0A0A] uppercase tracking-wide">
                Select Size: <span className="font-normal text-gray-700">{selectedSize}</span>
              </label>
              <span className="text-gray-400 text-[11px]">Standard Bangladeshi Fit</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-10 rounded-lg text-xs font-bold transition-all flex items-center justify-center border ${
                    selectedSize === size
                      ? "bg-[#0A0A0A] text-[#FFFFF0] border-[#0A0A0A] shadow"
                      : "bg-[#FFFFFF] text-[#262626] border-gray-300 hover:border-[#C5A24D]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wide">
              Quantity:
            </span>
            <div className="flex items-center border border-gray-300 rounded-lg bg-[#FFFFFF]">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
              >
                -
              </button>
              <span className="px-4 py-1 text-xs font-bold text-[#0A0A0A]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="space-y-3 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-3.5 px-6 rounded-full text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-all ${
                  isAdded
                    ? "bg-green-600 text-white"
                    : "bg-[#0A0A0A] text-[#FFFFF0] hover:bg-[#262626]"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#F59E0B]" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-full bg-[#F59E0B] text-[#0A0A0A] text-xs font-bold tracking-wider uppercase hover:bg-[#D97706] shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>Instant Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Direct WhatsApp Order Link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-full border border-[#25D366] text-[#1EBE5D] hover:bg-[#25D366]/10 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Inquire / Order this Style on WhatsApp</span>
            </a>
          </div>

          {/* Delivery & Assurance Details */}
          <div className="border-t border-[#C5A24D]/25 pt-6 space-y-3 text-xs text-gray-600">
            <div className="flex items-start gap-3">
              <Truck className="w-4 h-4 text-[#C5A24D] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-gray-800">Nationwide Delivery: </span>
                Inside Dhaka: ৳80 (24-48 hrs). Outside Dhaka: ৳150 (3-5 days via Pathao / Steadfast).
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#C5A24D] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-gray-800">Cash on Delivery: </span>
                Pay in cash when your parcel arrives, or pay via bKash / Nagad Send Money.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw className="w-4 h-4 text-[#C5A24D] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-gray-800">Size Exchange: </span>
                7-day easy exchange if the size does not fit you perfectly.
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="border-t border-[#C5A24D]/25 pt-6 space-y-3">
            <h3 className="font-serif text-base font-bold text-[#0A0A0A]">
              Product Overview & Fabric Notes
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

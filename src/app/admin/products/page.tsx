"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { Product, ProductCategory } from "@/types";
import { formatBDT } from "@/lib/utils";
import { compressImageToWebP } from "@/lib/image-compressor";
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Upload,
  Check,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function AdminProductsPage() {
  const products = useStore((state) => state.products);
  const addProduct = useStore((state) => state.addProduct);
  const updateProduct = useStore((state) => state.updateProduct);
  const deleteProduct = useStore((state) => state.deleteProduct);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ProductCategory>("t-shirts");
  const [regularPrice, setRegularPrice] = useState(1500);
  const [salePrice, setSalePrice] = useState<number | undefined>(undefined);
  const [stockQuantity, setStockQuantity] = useState(50);
  const [sizesInput, setSizesInput] = useState("M, L, XL, XXL");
  const [images, setImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [featured, setFeatured] = useState(false);
  const [newArrival, setNewArrival] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const openAddModal = () => {
    setEditingProduct(null);
    setTitle("");
    setSlug("");
    setDescription("");
    setCategory("t-shirts");
    setRegularPrice(1650);
    setSalePrice(undefined);
    setStockQuantity(40);
    setSizesInput("M, L, XL, XXL");
    setImages([]);
    setImageUrlInput("");
    setFeatured(false);
    setNewArrival(true);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setTitle(p.title);
    setSlug(p.slug);
    setDescription(p.description);
    setCategory(p.category);
    setRegularPrice(p.regularPrice);
    setSalePrice(p.salePrice);
    setStockQuantity(p.stockQuantity);
    setSizesInput(p.sizes.join(", "));
    setImages(p.images);
    setImageUrlInput("");
    setFeatured(p.featured);
    setNewArrival(p.newArrival);
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const file = files[0];
      const webpDataUrl = await compressImageToWebP(file, 1200, 0.8);
      setImages((prev) => [...prev, webpDataUrl]);
    } catch (err) {
      alert("Error compressing image file.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setImages((prev) => [...prev, imageUrlInput.trim()]);
      setImageUrlInput("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const autoSlug =
      slug.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const parsedSizes = sizesInput
      .split(",")
      .map((s) => s.trim().toUpperCase())
      .filter(Boolean);

    const fallbackImages =
      images.length > 0
        ? images
        : ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800"];

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        title: title.trim(),
        slug: autoSlug,
        description: description.trim(),
        category,
        regularPrice: Number(regularPrice),
        salePrice: salePrice ? Number(salePrice) : undefined,
        stockQuantity: Number(stockQuantity),
        sizes: parsedSizes,
        images: fallbackImages,
        featured,
        newArrival,
      });
    } else {
      addProduct({
        title: title.trim(),
        slug: autoSlug,
        description: description.trim(),
        category,
        regularPrice: Number(regularPrice),
        salePrice: salePrice ? Number(salePrice) : undefined,
        stockQuantity: Number(stockQuantity),
        sizes: parsedSizes,
        colors: [
          { name: "Standard", hex: "#0A0A0A" },
          { name: "Ivory", hex: "#FFFFF0" },
        ],
        images: fallbackImages,
        featured,
        newArrival,
      });
    }

    setIsModalOpen(false);
  };

  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchQ =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0A0A0A]">
            Product Catalog Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Add clothing items, upload images, manage prices, sizes, and stock
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-full bg-[#0A0A0A] text-[#FFFFF0] text-xs font-bold hover:bg-[#262626] flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#F59E0B]" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-[#FFFFFF] p-4 rounded-xl border border-gray-200">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search styles by title or slug..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FFFFF0] border border-gray-300 rounded-lg text-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#C5A24D]"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="text-xs bg-[#FFFFF0] border border-gray-300 rounded-lg px-3 py-2 text-[#0A0A0A] focus:outline-none"
        >
          <option value="all">All Categories</option>
          <option value="t-shirts">T-Shirts</option>
          <option value="shirts">Shirts</option>
          <option value="pants">Pants</option>
          <option value="jackets">Jackets</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-[#FFFFF0] border-b border-gray-200 text-gray-600 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Title & Slug</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Sizes</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((p) => {
                const price = p.salePrice ?? p.regularPrice;
                return (
                  <tr key={p.id} className="hover:bg-gray-50/60">
                    <td className="p-4">
                      <div className="relative w-12 h-14 bg-gray-100 rounded-md overflow-hidden shrink-0 border border-gray-200">
                        <Image
                          src={p.images[0] || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800"}
                          alt={p.title}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                    </td>
                    <td className="p-4 max-w-xs">
                      <div className="font-bold text-[#0A0A0A] truncate">{p.title}</div>
                      <div className="text-[11px] text-gray-400 font-mono">{p.slug}</div>
                      <div className="flex gap-1 mt-1">
                        {p.featured && (
                          <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">
                            Featured
                          </span>
                        )}
                        {p.newArrival && (
                          <span className="text-[9px] bg-black text-white font-bold px-1.5 py-0.2 rounded">
                            New
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 capitalize font-medium text-gray-800">
                      {p.category.replace("-", " ")}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-[#262626]">{formatBDT(price)}</div>
                      {p.salePrice && (
                        <div className="text-[10px] text-red-500 line-through">
                          {formatBDT(p.regularPrice)}
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-[11px] text-gray-600">
                      {p.sizes.join(", ")}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.stockQuantity < 10
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {p.stockQuantity} in stock
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
                        title="Edit product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete "${p.title}"?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-600"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] w-full max-w-2xl rounded-2xl border border-[#C5A24D]/35 shadow-2xl p-6 sm:p-8 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="font-serif text-lg font-bold text-[#0A0A0A]">
                {editingProduct ? "Edit Fashion Item" : "Add New Clothing Item"}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-800 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Royal Supima Cotton Shirt"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0] focus:ring-1 focus:ring-[#C5A24D]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-800 mb-1">
                    Slug (URL Key)
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="Leave blank for auto generated"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0] font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-800 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
                  >
                    <option value="t-shirts">T-Shirts</option>
                    <option value="shirts">Shirts</option>
                    <option value="pants">Pants</option>
                    <option value="jackets">Jackets</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-800 mb-1">
                    Regular Price (BDT ৳) *
                  </label>
                  <input
                    type="number"
                    required
                    value={regularPrice}
                    onChange={(e) => setRegularPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-800 mb-1">
                    Sale Price (BDT ৳, Optional)
                  </label>
                  <input
                    type="number"
                    value={salePrice ?? ""}
                    onChange={(e) =>
                      setSalePrice(e.target.value ? Number(e.target.value) : undefined)
                    }
                    placeholder="Discounted price"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-800 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-800 mb-1">
                    Available Sizes (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={sizesInput}
                    onChange={(e) => setSizesInput(e.target.value)}
                    placeholder="S, M, L, XL, XXL"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Fabric composition, cut, wash instructions..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-[#FFFFF0]"
                />
              </div>

              {/* Image Upload & WebP Compressor */}
              <div className="space-y-2 border-t border-gray-100 pt-3">
                <label className="block font-bold text-gray-800">
                  Product Images (Client compressed to WebP &lt; 200KB)
                </label>

                {/* Upload Button */}
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="cursor-pointer px-4 py-2 rounded-lg bg-[#0A0A0A] text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-[#262626]">
                    <Upload className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>{isUploading ? "Compressing WebP..." : "Upload from Device / Phone"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>

                  <span className="text-gray-400">or</span>

                  <div className="flex gap-1 flex-1 min-w-[200px]">
                    <input
                      type="url"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      placeholder="Paste image web link (https://...)"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 bg-[#FFFFF0] text-[11px]"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-800 font-semibold"
                    >
                      Add Link
                    </button>
                  </div>
                </div>

                {/* Images Preview */}
                {images.length > 0 && (
                  <div className="flex gap-2 flex-wrap pt-2">
                    {images.map((img, i) => (
                      <div
                        key={i}
                        className="relative w-16 h-20 rounded-md overflow-hidden border border-gray-300 group"
                      >
                        <Image
                          src={img}
                          alt="Product upload"
                          fill
                          className="object-cover object-center"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="absolute top-1 right-1 p-0.5 bg-red-600 text-white rounded-full opacity-80 hover:opacity-100"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded text-[#F59E0B]"
                  />
                  <span className="font-semibold text-gray-800">Featured on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newArrival}
                    onChange={(e) => setNewArrival(e.target.checked)}
                    className="rounded text-[#F59E0B]"
                  />
                  <span className="font-semibold text-gray-800">Mark as New Arrival</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 font-bold hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#F59E0B] text-[#0A0A0A] font-bold hover:bg-[#D97706]"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

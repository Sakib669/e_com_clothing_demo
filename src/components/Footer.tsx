import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-[#FFFFF0] border-t-2 border-[#C5A24D]">
      {/* Bangladesh Trust Badges Banner */}
      <div className="border-b border-white/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#FFFFF0]/10 flex items-center justify-center border border-[#C5A24D]/40">
              <Truck className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FFFFF0]">Nationwide Delivery</h4>
              <p className="text-xs text-gray-400">Pathao & Steadfast Network</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#FFFFF0]/10 flex items-center justify-center border border-[#C5A24D]/40">
              <CreditCard className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FFFFF0]">Cash on Delivery</h4>
              <p className="text-xs text-gray-400">bKash & Nagad Accepted</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#FFFFF0]/10 flex items-center justify-center border border-[#C5A24D]/40">
              <RotateCcw className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FFFFF0]">7-Day Easy Return</h4>
              <p className="text-xs text-gray-400">Hassle free replacement</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#FFFFF0]/10 flex items-center justify-center border border-[#C5A24D]/40">
              <ShieldCheck className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FFFFF0]">100% Original</h4>
              <p className="text-xs text-gray-400">Direct from FX workshop</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-wider text-[#FFFFF0]">
                FX FASHION
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#F59E0B] text-[#0A0A0A]">
                GALLERY
              </span>
            </div>
            <p className="text-xs tracking-widest text-[#C5A24D] uppercase font-medium">
              Style. Quality. Confidence.
            </p>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Crafting premium menswear and contemporary fashion for Bangladesh. We combine timeless British tailoring with breathable fabrics designed for lasting distinction.
            </p>
            <div className="pt-2 text-xs text-gray-300 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A24D] shrink-0" />
                <span>House 24, Road 11, Banani, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>+880 1711-000000 (9 AM - 10 PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A24D] shrink-0" />
                <span>orders@fxfashiongallery.com</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A24D] mb-4">
              Fashion Categories
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/products?category=t-shirts" className="hover:text-[#F59E0B] transition-colors">
                  Supima T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/products?category=shirts" className="hover:text-[#F59E0B] transition-colors">
                  Oxford & Linen Shirts
                </Link>
              </li>
              <li>
                <Link href="/products?category=pants" className="hover:text-[#F59E0B] transition-colors">
                  Chinos & Selvedge Denim
                </Link>
              </li>
              <li>
                <Link href="/products?category=jackets" className="hover:text-[#F59E0B] transition-colors">
                  Bombers & Outerwear
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#F59E0B] transition-colors">
                  New Season Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A24D] mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/track" className="hover:text-[#F59E0B] transition-colors">
                  Track Your Parcel
                </Link>
              </li>
              <li>
                <Link href="/return-refund" className="hover:text-[#F59E0B] transition-colors">
                  Return & Exchange Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F59E0B] transition-colors">
                  Contact Us & WhatsApp
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F59E0B] transition-colors">
                  About FX Fashion Gallery
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#F59E0B] transition-colors">
                  Merchant Admin Area
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Payment Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A24D] mb-4">
              Legal & Delivery
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/privacy-policy" className="hover:text-[#F59E0B] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#F59E0B] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li className="pt-2 text-gray-400">
                <span className="block text-[11px] text-gray-300 font-medium">Delivery Charges:</span>
                <span className="block text-[11px]">Inside Dhaka: ৳80</span>
                <span className="block text-[11px]">Outside Dhaka: ৳150</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub Footer */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} FX Fashion Gallery. All rights reserved.</p>
          <div className="flex items-center gap-3 text-gray-400">
            <span className="text-[11px] uppercase tracking-wider text-[#C5A24D]">Payment Partners:</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-pink-400 font-bold">bKash</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-orange-400 font-bold">Nagad</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-green-400 font-bold">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

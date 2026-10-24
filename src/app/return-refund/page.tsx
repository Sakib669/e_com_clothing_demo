import React from "react";
import Link from "next/link";
import { RotateCcw, ShieldCheck, CheckCircle2, MessageCircle } from "lucide-react";

export default function ReturnRefundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      <div className="border-b border-[#C5A24D]/30 pb-4">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A24D]">
          Customer Assurance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0A0A0A] mt-1">
          Return, Exchange & Refund Policy
        </h1>
        <p className="text-xs text-gray-500 mt-1">7-Day Easy Exchange Across Bangladesh</p>
      </div>

      <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6 text-xs text-gray-700 leading-relaxed">
        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-amber-900 flex items-start gap-3">
          <RotateCcw className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-sm">7-Day Size Exchange Guarantee</h3>
            <p className="text-xs text-gray-600 mt-0.5">
              If an item doesn&apos;t fit quite right, we will gladly exchange it for the correct size within 7 days of delivery.
            </p>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0A0A0A]">
            1. Eligibility for Return and Exchange
          </h2>
          <p>
            To be eligible for an exchange, items must be unworn, unwashed, and in the original condition with all FX Fashion Gallery brand tags and packaging intact.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0A0A0A]">
            2. How to Request an Exchange
          </h2>
          <ol className="list-decimal pl-4 space-y-1">
            <li>Contact our support team on WhatsApp at +880 1711-000000 within 7 days of receiving the package.</li>
            <li>Provide your Order ID and photo of the item tags.</li>
            <li>Our delivery courier partner will pick up the parcel and deliver your replacement.</li>
          </ol>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0A0A0A]">
            3. Refunds
          </h2>
          <p>
            In the rare event that a replacement item is out of stock or if you received a defective item, a full refund will be processed directly to your bKash, Nagad, or bank account within 3 business days of return inspection.
          </p>
        </section>

        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-gray-500">
            Have questions about your order?
          </span>
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-full bg-[#0A0A0A] text-[#FFFFF0] font-bold text-xs hover:bg-[#262626] transition-colors"
          >
            Contact Customer Desk
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function TermsConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      <div className="border-b border-[#C5A24D]/30 pb-4">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A24D]">
          Operational Terms
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0A0A0A] mt-1">
          Terms & Conditions
        </h1>
        <p className="text-xs text-gray-500 mt-1">Effective October 2026</p>
      </div>

      <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6 text-xs text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0A0A0A]">
            1. Orders and Pricing
          </h2>
          <p>
            All clothing prices listed on FX Fashion Gallery are stated in Bangladeshi Taka (BDT ৳). We reserve the right to revise promotional discounts, sale prices, and stock counts at any time. Placing an order constitutes an offer to purchase, subject to phone or WhatsApp verification.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0A0A0A]">
            2. Cash on Delivery and Delivery Obligations
          </h2>
          <p>
            For Cash on Delivery orders, customers are expected to receive their parcel and pay the final payable amount to the designated courier personnel upon delivery. If an order cannot be delivered due to repeated unresponsiveness or an incorrect phone number, delivery fees may be charged on future orders.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0A0A0A]">
            3. Delivery Timeframes
          </h2>
          <p>
            Standard deliveries inside Dhaka city take approximately 24 to 48 business hours. Deliveries outside Dhaka take approximately 3 to 5 business days, subject to courier transit conditions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0A0A0A]">
            4. Intellectual Property
          </h2>
          <p>
            All product photographs, logos, slogans (&ldquo;Style. Quality. Confidence.&rdquo;), and descriptions on this platform are the exclusive intellectual property of FX Fashion Gallery.
          </p>
        </section>
      </div>
    </div>
  );
}

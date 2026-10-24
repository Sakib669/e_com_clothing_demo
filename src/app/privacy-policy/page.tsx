import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      <div className="border-b border-[#C5A24D]/30 pb-4">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A24D]">
          Legal & Privacy
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0A0A0A] mt-1">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-500 mt-1">Last Updated: October 2026</p>
      </div>

      <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6 text-xs text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0A0A0A]">
            1. Information We Collect
          </h2>
          <p>
            When you purchase clothing items or place orders on FX Fashion Gallery, we collect the necessary recipient details to fulfill your delivery: your full name, Bangladeshi contact phone number, delivery address, and order notes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0A0A0A]">
            2. How We Use Your Data
          </h2>
          <p>
            Your information is used exclusively to dispatch orders, contact you for delivery confirmation, coordinate with our logistics courier partners (Pathao Courier and Steadfast Courier), and verify manual bKash or Nagad payments. We never sell, rent, or share your contact numbers with third party marketing advertisers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0A0A0A]">
            3. Local Storage and Cookies
          </h2>
          <p>
            Our website uses browser local storage to save your active shopping bag items and store preferences so you can complete your order smoothly without mandatory account registration.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0A0A0A]">
            4. Security and Contact
          </h2>
          <p>
            We take appropriate safeguards to ensure your customer records remain confidential. For any inquiries regarding your privacy or to request data removal, please contact info@fxfashiongallery.com.
          </p>
        </section>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Clock, CheckCircle } from "lucide-react";
import { useStore } from "@/lib/store";

export default function ContactPage() {
  const settings = useStore((state) => state.settings);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName("");
    setPhone("");
    setMessage("");
  };

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, "") || "8801711000000";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A24D]">
          We Are Here To Assist
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0A0A0A]">
          Contact FX Fashion Gallery
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
          Have questions regarding an order, size guidance, or delivery? Reach our dedicated customer desk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-4"
        >
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#C5A24D]/30 shadow-xs space-y-4 text-xs">
            <h2 className="font-serif text-base font-bold text-[#0A0A0A] border-b border-gray-100 pb-3">
              Official Contact Points
            </h2>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-gray-900 block">Customer Helpline</span>
                <span className="text-gray-600">{settings.contactPhone}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-gray-900 block">WhatsApp Support</span>
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline font-bold"
                >
                  Chat with us on WhatsApp →
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#C5A24D] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-gray-900 block">Email Inquiries</span>
                <span className="text-gray-600">{settings.contactEmail}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C5A24D] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-gray-900 block">Showroom & Workshop</span>
                <span className="text-gray-600">{settings.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-gray-100">
              <Clock className="w-4 h-4 text-[#C5A24D] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-gray-900 block">Operating Hours</span>
                <span className="text-gray-600">Saturday - Thursday: 9:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Message Form */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6"
        >
          <h2 className="font-serif text-lg font-bold text-[#0A0A0A]">
            Send Us a Message
          </h2>

          {submitted ? (
            <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center space-y-2 text-xs text-green-900">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
              <h3 className="font-bold text-sm">Thank You for Reaching Out!</h3>
              <p>We have received your message and our team will get back to you shortly via phone or WhatsApp.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-800 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Asif Mahmud"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-[#FFFFF0] focus:ring-1 focus:ring-[#C5A24D]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-[#FFFFF0] focus:ring-1 focus:ring-[#C5A24D]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-1">How can we help? *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about sizes, fabrics, delivery times, or custom requests..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-[#FFFFF0] focus:ring-1 focus:ring-[#C5A24D]"
                />
              </div>

              <button
                type="submit"
                className="px-7 py-3 rounded-full bg-[#0A0A0A] text-[#FFFFF0] font-bold text-xs uppercase tracking-wider hover:bg-[#262626] transition-colors"
              >
                Send Inquiry
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}

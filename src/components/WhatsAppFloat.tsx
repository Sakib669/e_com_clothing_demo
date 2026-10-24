"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { useStore } from "@/lib/store";

export default function WhatsAppFloat() {
  const settings = useStore((state) => state.settings);
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, "");

  const message = encodeURIComponent(
    "Hello FX Fashion Gallery! I am interested in your clothing collection and would like more details."
  );

  const whatsappUrl = `https://wa.me/${cleanPhone || "8801711000000"}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#1EBE5D] hover:scale-105 transition-all duration-300 group"
      aria-label="Chat with FX Fashion Gallery on WhatsApp"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span className="text-xs font-bold tracking-wide hidden sm:inline">
        WhatsApp Order Support
      </span>
      <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping absolute -top-0.5 -right-0.5 sm:hidden" />
    </a>
  );
}

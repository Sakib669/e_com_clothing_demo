import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "FX Fashion Gallery | Style. Quality. Confidence.",
  description:
    "Premium clothing store in Bangladesh. Explore luxury T-shirts, formal Oxford shirts, chinos, and outerwear with Cash on Delivery and fast nationwide delivery.",
  keywords: [
    "clothing brand Bangladesh",
    "menswear Dhaka",
    "Supima t-shirt",
    "cotton shirts",
    "FX Fashion Gallery",
  ],
  openGraph: {
    title: "FX Fashion Gallery | Style. Quality. Confidence.",
    description: "Premium clothing store in Bangladesh. Cash on Delivery nationwide.",
    url: "https://fxfashiongallery.com",
    siteName: "FX Fashion Gallery",
    locale: "en_BD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FFFFF0] text-[#0A0A0A] antialiased selection:bg-[#F59E0B] selection:text-[#0A0A0A]">
        <Navbar />
        <main className="flex-grow">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}

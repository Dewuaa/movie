import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdScript from "../components/AdScript";
import "./globals.css";
import AdBlockDetector from "../components/AdBlockDetector";

export const metadata: Metadata = {
  title: "CineVerse | Premium Movie Experience",
  description: "Discover and stream amazing movies online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-950 text-white min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
        <Navbar />
        <main className="min-h-screen pt-16 md:pt-20">{children}</main>
        <Footer />
        
        {/* Ad Script Component */}
        <AdScript />
        <AdBlockDetector />
      </body>
    </html>
  );
}

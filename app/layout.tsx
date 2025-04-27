import type { Metadata } from "next";
import Link from "next/link";
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
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen">
        <nav className="bg-gradient-to-r from-indigo-900 to-purple-900 shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                CINEVERSE
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4v16M17 4v16M3 8h18M3 16h18"
                />
              </svg>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-200 hover:text-cyan-400 transition"
              >
                Discover
              </Link>
              <Link
                href="#"
                className="text-gray-200 hover:text-cyan-400 transition"
              >
                Categories
              </Link>
              <Link
                href="#"
                className="text-gray-200 hover:text-cyan-400 transition"
              >
                New Releases
              </Link>
              <Link
                href="#"
                className="text-gray-200 hover:text-cyan-400 transition"
              >
                Watchlist
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Find movies..."
                  className="px-4 py-1.5 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:border-cyan-500 text-sm w-32 md:w-48"
                />
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-gray-900 py-12 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"></div>
            <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-800"></div>
          </div>
        </footer>

        {/* Ad Script Component */}
        <AdScript />
        <AdBlockDetector />
      </body>
    </html>
  );
}

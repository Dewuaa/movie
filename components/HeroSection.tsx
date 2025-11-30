"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";

interface HeroSectionProps {
  featuredItem: {
    id: string;
    title: string;
    description: string;
    poster: string;
    type: "movie" | "series";
  };
}

export default function HeroSection({ featuredItem }: HeroSectionProps) {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image with Zoom Effect */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <Image
          src={featuredItem.poster}
          alt={featuredItem.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </motion.div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                FEATURED
              </span>
              {featuredItem.type === "series" && (
                <span className="bg-purple-600/20 text-purple-400 border border-purple-500/30 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                  SERIES
                </span>
              )}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400 leading-tight"
            >
              {featuredItem.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl mb-8 text-gray-300 line-clamp-3 leading-relaxed"
            >
              {featuredItem.description}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href={
                  featuredItem.type === "movie"
                    ? `/movies/${featuredItem.id}`
                    : `/series/${featuredItem.id}`
                }
                className="group relative px-8 py-4 bg-white text-black rounded-xl font-bold flex items-center overflow-hidden transition-transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                <Play className="w-5 h-5 mr-2 fill-current" />
                <span>Play Now</span>
              </Link>
              
              <Link
                href={
                  featuredItem.type === "movie"
                    ? `/movies/${featuredItem.id}`
                    : `/series/${featuredItem.id}`
                }
                className="px-8 py-4 bg-gray-600/40 hover:bg-gray-600/60 backdrop-blur-md border border-white/10 rounded-xl font-bold flex items-center text-white transition-all hover:scale-105"
              >
                <Info className="w-5 h-5 mr-2" />
                <span>More Info</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface ContentCardProps {
  item: {
    id: string;
    title: string;
    poster: string;
    type: "movie" | "series";
    year?: string;
  };
}

export default function ContentCard({ item }: ContentCardProps) {
  const { id, title, poster, type } = item;
  const imageSrc = poster || "/placeholder.jpg";

  return (
    <Link href={type === "movie" ? `/movies/${id}` : `/series/${id}`}>
      <motion.div 
        className="relative group rounded-xl overflow-hidden aspect-[2/3] cursor-pointer bg-gray-800"
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
            <Play className="w-6 h-6 text-white fill-white" />
          </div>
        </div>

        {/* Content Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-bold text-lg truncate drop-shadow-md">
            {title}
          </h3>
          <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mt-1">
            {type === "movie" ? "Movie" : "Series"}
          </p>
        </div>
        
        {/* Border Glow Effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-xl transition-colors duration-300 pointer-events-none" />
      </motion.div>
    </Link>
  );
}

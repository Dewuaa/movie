"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ContentCard({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={
          item.type === "movie" ? `/movies/${item.id}` : `/series/${item.id}`
        }
      >
        <div
          className={`
          rounded-lg overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900
          transition-all duration-300 h-full
          ${isHovered ? "transform scale-105 card-glow" : "scale-100"}
        `}
        >
          <div className="relative aspect-[2/3] w-full overflow-hidden">
            <Image
              src={
                imgError ? "/placeholders/poster-placeholder.jpg" : item.poster
              }
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-all duration-500 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
              onError={() => setImgError(true)}
            />

            {item.type === "series" && (
              <div className="absolute top-2 right-2 bg-purple-600 text-xs px-1.5 py-0.5 rounded z-10">
                SERIES
              </div>
            )}

            {isHovered && (
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent flex items-end">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-1.5 py-0.5 bg-cyan-600 rounded-sm font-medium">
                      HD
                    </span>
                    <span className="text-xs text-cyan-400">
                      {item.year || "2023"}
                    </span>
                    {item.type === "series" && (
                      <span className="text-xs text-cyan-400">
                        {item.seasons?.length || "1"} Season
                        {item.seasons?.length !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-300 line-clamp-2 mb-3">
                    {item.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="p-3">
            <h3 className="font-medium text-sm text-center group-hover:text-cyan-400 transition-colors">
              {item.title}
            </h3>

            {isHovered && (
              <div className="mt-3 transform transition-all duration-200 translate-y-0 opacity-100">
                <button className="w-full py-1.5 rounded bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-medium flex items-center justify-center hover:from-cyan-600 hover:to-blue-700 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item.type === "movie" ? "Watch Now" : "Play Series"}
                </button>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

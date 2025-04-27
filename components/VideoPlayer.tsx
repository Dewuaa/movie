"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "plyr-react/plyr.css";

// Import Plyr dynamically to avoid SSR issues
const Plyr = dynamic(() => import("plyr-react").then((mod) => mod.default), {
  ssr: false,
});

export default function VideoPlayer({
  embedUrl,
  title,
}: {
  embedUrl: string;
  title: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const plyrRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  // Mark when component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset states when URL changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [embedUrl]);

  // Setup event listeners after component is mounted
  useEffect(() => {
    if (!isClient) return;

    // Give the player time to initialize
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isClient]);

  // Custom Plyr options for Netflix-like appearance
  const plyrOptions = {
    controls: [
      "play-large",
      "play",
      "progress",
      "current-time",
      "duration",
      "mute",
      "volume",
      "captions",
      "settings",
      "fullscreen",
    ],
    settings: ["captions", "quality", "speed"],
    speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
    resetOnEnd: false,
    displayDuration: true,
    keyboard: { focused: true, global: true },
    tooltips: { controls: true, seek: true },
    ratio: "16:9",
    // Add event listeners via options
    listeners: {
      error: () => {
        setIsLoading(false);
        setHasError(true);
      },
    },
  };

  const plyrSource = {
    type: "video",
    title: title,
    sources: [
      {
        src: embedUrl,
        type: embedUrl.includes(".mp4")
          ? "video/mp4"
          : embedUrl.includes(".mkv")
          ? "video/x-matroska"
          : embedUrl.includes("youtube")
          ? "video/youtube"
          : "video/mp4",
      },
    ],
  };

  return (
    <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg card-glow">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-cyan-400">Loading your content...</p>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-600 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-400 text-lg mb-2">Oops! Playback Error</p>
          <p className="text-gray-500 mb-4">
            We&apos;re having trouble playing this video
          </p>
          <button
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded text-white"
            onClick={() => {
              setIsLoading(true);
              setHasError(false);
            }}
          >
            Try Again
          </button>
        </div>
      )}

      {isClient && (
        <div
          style={{ display: isLoading || hasError ? "none" : "block" }}
          className="plyr-container"
        >
          <Plyr ref={plyrRef} source={plyrSource} options={plyrOptions} />
        </div>
      )}

      {/* Custom Netflix-like styling */}
      <style jsx global>{`
        .plyr--full-ui input[type="range"] {
          color: #e50914 !important; /* Netflix red */
        }
        .plyr__control--overlaid {
          background: rgba(229, 9, 20, 0.8) !important;
        }
        .plyr--video .plyr__control.plyr__tab-focus,
        .plyr--video .plyr__control:hover,
        .plyr--video .plyr__control[aria-expanded="true"] {
          background: #e50914 !important;
        }
        .plyr__control.plyr__tab-focus {
          box-shadow: 0 0 0 5px rgba(229, 9, 20, 0.5) !important;
        }
        .plyr__menu__container
          .plyr__control[role="menuitemradio"][aria-checked="true"]::before {
          background: #e50914 !important;
        }
        .plyr-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .plyr {
          height: 100%;
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
}

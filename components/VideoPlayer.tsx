"use client";

import { useState, useEffect } from "react";

export default function VideoPlayer({
  embedUrl,
  title,
}: {
  embedUrl: string;
  title: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset states when URL changes
    setIsLoading(true);
    setHasError(false);
  }, [embedUrl]);

  return (
    <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg card-glow">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-cyan-400">Loading your content...</p>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
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
              const iframe = document.getElementById(
                "video-iframe"
              ) as HTMLIFrameElement;
              if (iframe) {
                iframe.src = iframe.src;
              }
            }}
          >
            Try Again
          </button>
        </div>
      )}

      <iframe
        id="video-iframe"
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        style={{ display: isLoading || hasError ? "none" : "block" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title={title}
      />
    </div>
  );
}

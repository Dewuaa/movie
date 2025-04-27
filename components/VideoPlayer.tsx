"use client";

import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";

export default function VideoPlayer({
  embedUrl,
  title,
}: {
  embedUrl: string;
  title: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7); // Default volume to 70%
  const [isMuted, setIsMuted] = useState(false);
  const [showSoundWarning, setShowSoundWarning] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  // Check if it's an MKV file
  const isMkvFile = embedUrl.toLowerCase().includes(".mkv");

  useEffect(() => {
    // Reset states when URL changes
    setIsLoading(true);
    setHasError(false);
    setIsPlaying(false);

    // Show sound warning for MKV files
    if (isMkvFile) {
      setShowSoundWarning(true);
      // Hide the warning after 6 seconds
      const timer = setTimeout(() => {
        setShowSoundWarning(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [embedUrl, isMkvFile]);

  // Audio check function for MKV files
  const checkAudio = () => {
    if (isMkvFile && playerRef.current) {
      // For MKV files, we might need to unmute and increase volume
      setIsMuted(false);
      setVolume(1.0); // Max volume for MKV files

      // Force a reload of the player for MKV files to properly initialize audio
      if (playerRef.current.getInternalPlayer()) {
        const player = playerRef.current.getInternalPlayer();
        if (player && typeof player.load === "function") {
          player.load();
        }
      }
    }
  };

  // Sound toggle component
  const SoundToggle = () => (
    <div className="absolute bottom-16 left-4 z-20 bg-black/70 rounded-lg p-2 flex items-center space-x-3 transition-opacity duration-300">
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="text-white hover:text-cyan-400 transition"
      >
        {isMuted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              clipRule="evenodd"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        )}
      </button>
      <div className="w-24">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => {
            const newVolume = parseFloat(e.target.value);
            setVolume(newVolume);
            if (newVolume > 0 && isMuted) {
              setIsMuted(false);
            }
          }}
          className="accent-cyan-400 w-full"
        />
      </div>
    </div>
  );

  return (
    <div
      className="aspect-video relative rounded-lg overflow-hidden shadow-lg card-glow"
      onContextMenu={(e) => e.preventDefault()}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-cyan-400">Loading your content...</p>
            {isMkvFile && (
              <p className="text-amber-400 text-sm mt-2">
                MKV file detected - initializing audio...
              </p>
            )}
          </div>
        </div>
      )}

      {showSoundWarning && isMkvFile && !isLoading && !hasError && (
        <div className="absolute top-4 right-4 bg-black/80 text-white p-3 rounded-lg z-30 max-w-xs animate-fade-in">
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-amber-400 mr-2 mt-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="font-medium mb-1">Sound Issue Detected</p>
              <p className="text-sm text-gray-300">
                If you don&apos;t hear audio, try adjusting the volume or click
                the sound button below. MKV files may have audio issues in some
                browsers.
              </p>
            </div>
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
            {isMkvFile &&
              " (MKV files may not be fully supported in all browsers)"}
          </p>
          <div className="flex gap-3">
            <button
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded text-white"
              onClick={() => {
                setIsLoading(true);
                setHasError(false);
                // If it's MKV, try playing with sound fix
                if (isMkvFile) {
                  setTimeout(() => checkAudio(), 1000);
                }
              }}
            >
              Try Again
            </button>
            {isMkvFile && (
              <a
                href={embedUrl}
                download
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
              >
                Download Video
              </a>
            )}
          </div>
        </div>
      )}

      {/* Custom sound toggle for MKV files */}
      {isMkvFile && !hasError && !isLoading && <SoundToggle />}

      <div
        style={{ display: isLoading || hasError ? "none" : "block" }}
        className="h-full w-full"
        onContextMenu={(e) => e.preventDefault()}
      >
        <ReactPlayer
          ref={playerRef}
          url={embedUrl}
          width="100%"
          height="100%"
          playing={isPlaying}
          controls={true}
          light={false}
          pip={!isMkvFile} // Disable PiP for MKV as it can cause issues
          volume={volume}
          muted={isMuted}
          onReady={() => {
            setIsLoading(false);
            setIsPlaying(true);
            // For MKV files, try to ensure audio works
            if (isMkvFile) {
              checkAudio();
            }
          }}
          onError={(e) => {
            console.error("Player error:", e);
            setIsLoading(false);
            setHasError(true);
          }}
          onPlay={() => {
            setIsPlaying(true);
            // Re-check audio when play is pressed
            if (isMkvFile) {
              checkAudio();
            }
          }}
          onPause={() => setIsPlaying(false)}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
                title: title,
                onContextMenu: (e: Event) => e.preventDefault(),
                // Explicitly set audio for MKV files
                ...(isMkvFile && {
                  muted: false,
                  autoplay: true,
                  volume: 1,
                }),
              },
              forceVideo: false, // Don't force video mode to allow audio
              forceAudio: false,
            },
            youtube: {
              playerVars: {
                showinfo: 1,
                controls: 1,
              },
            },
          }}
          style={{ position: "absolute", top: 0, left: 0 }}
          className="rounded-lg"
        />
      </div>

      {/* Copyright notice overlay */}
      <div className="absolute top-3 right-3 bg-black/60 text-xs text-white px-2 py-1 rounded z-20 pointer-events-none opacity-60">
        © CineVerse • Protected Content
      </div>

      {/* Add styles for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out forwards;
        }
        input[type="range"] {
          -webkit-appearance: none;
          height: 5px;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.4);
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #22d3ee;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

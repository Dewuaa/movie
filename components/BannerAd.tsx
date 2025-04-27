"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function BannerAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLocalEnvironment, setIsLocalEnvironment] = useState(true);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const { ref: lazyRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Check if we're on a local/development environment
    const hostname = window.location.hostname;
    const isLocal =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.startsWith("192.168.");
    setIsLocalEnvironment(isLocal);

    // If we're in development, show mock ad and don't load real ad script
    if (isLocal) {
      setIsLoaded(true);
      return;
    }

    // For production environment, load the actual ad script
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src =
      "//pl26494947.profitableratecpm.com/ab0ca6ac13852ca5c16eef923341efa0/invoke.js";

    script.onload = () => {
      console.log("Banner ad script loaded successfully");
      setIsLoaded(true);
    };

    script.onerror = () => {
      console.error("Banner ad script failed to load");
      setIsError(true);
    };

    document.head.appendChild(script);

    // Clean up function - FIXED syntax error by removing the JSX
    return () => {
      if (!isLocal) {
        try {
          document.head.removeChild(script);
        } catch (e) {
          console.error("Error removing banner ad script", e);
        }
      }
    };
  }, []);

  // If in development, show a mock ad
  if (isLocalEnvironment) {
    return (
      <div className="my-6 mx-auto text-center">
        <div
          className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 max-w-screen-lg mx-auto"
          style={{ height: "250px" }}
        >
          <div className="flex flex-col h-full justify-center items-center">
            <div className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded mb-3">
              DEVELOPMENT MODE
            </div>
            <p className="text-gray-300 mb-3">Mock Banner Advertisement</p>
            <div className="flex justify-center space-x-6 mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg flex items-center justify-center">
                <span className="text-cyan-400 text-3xl">Ad</span>
              </div>
              <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg flex items-center justify-center">
                <span className="text-cyan-400 text-3xl">Ad</span>
              </div>
              <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg flex items-center justify-center">
                <span className="text-cyan-400 text-3xl">Ad</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              This is a placeholder for the actual banner ad that will appear in
              production.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show the actual ad container for production
  // Use the lazy loading wrapper
  return (
    <div className="my-6 mx-auto text-center" ref={lazyRef}>
      {inView && (
        <>
          {isError && (
            <div className="bg-gray-800 rounded-lg p-4 max-w-screen-lg mx-auto">
              <p className="text-gray-400 text-sm">Advertisement</p>
            </div>
          )}
          <div
            ref={containerRef}
            id="container-ab0ca6ac13852ca5c16eef923341efa0"
            className={`flex items-center justify-center`}
            style={{ minHeight: isMobile ? "100px" : "250px" }}
          >
            {!isLoaded && !isError && (
              <div className="text-xs text-gray-500">
                Loading advertisement...
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

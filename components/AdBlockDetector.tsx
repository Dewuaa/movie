"use client";

import { useState, useEffect } from "react";

export default function AdBlockDetector() {
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // First check if the user has dismissed this message recently
    const dismissedAt = localStorage.getItem("adBlockMessageDismissed");
    if (dismissedAt) {
      const now = Date.now();
      // Show message again after 3 days (259200000 ms)
      if (now - parseInt(dismissedAt) < 259200000) {
        return;
      }
    }

    // Function to check for ad blockers
    const checkAdBlocker = () => {
      // Create a bait element that ad blockers might hide
      const bait = document.createElement("div");
      bait.className = "ads ad adsbox doubleclick ad-placement carbon-ads";
      bait.innerHTML = "&nbsp;";
      bait.style.height = "1px";
      bait.style.position = "absolute";
      bait.style.left = "-999px";
      bait.style.top = "-999px";
      document.body.appendChild(bait);

      // Check after a small delay
      setTimeout(() => {
        const isAdBlockActive =
          bait.offsetHeight === 0 ||
          bait.clientHeight === 0 ||
          getComputedStyle(bait).display === "none";

        setAdBlockDetected(isAdBlockActive);

        // Clean up
        if (bait.parentNode) {
          document.body.removeChild(bait);
        }
      }, 100);
    };

    // Check for ad blockers
    checkAdBlocker();

    // Recheck if the page visibility changes (user returns from another tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkAdBlocker();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const dismissMessage = () => {
    setDismissed(true);
    localStorage.setItem("adBlockMessageDismissed", Date.now().toString());
  };

  if (!adBlockDetected || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-3 px-4 flex justify-between items-center z-50 shadow-lg">
      <div>
        <p className="text-sm md:text-base">
          <span className="font-bold">
            We notice you&apos;re using an ad blocker.
          </span>{" "}
          CineVerse is supported by ads. Please consider disabling your ad
          blocker to help us continue providing free content.
        </p>
      </div>
      <button
        onClick={dismissMessage}
        className="ml-4 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm whitespace-nowrap flex-shrink-0"
      >
        I Understand
      </button>
    </div>
  );
}

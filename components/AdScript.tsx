"use client";

import { useEffect, useState } from "react";

export default function AdScript() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Function to create and inject the pop-under ad script
    const injectAdScript = () => {
      // Create and inject the main script
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "//pl26494323.profitableratecpm.com/3d/30/6d/3d306d69d757b9579ff1d88221dc169e.js";
      script.async = true;

      // Set up listeners for debugging
      script.onload = () => {
        console.log("Ad script loaded successfully");
        setIsLoaded(true);
      };

      script.onerror = (error) => {
        console.error("Ad script failed to load:", error);
        setIsLoaded(false);
      };

      document.body.appendChild(script);
      return script;
    };

    // Setting up click handlers for testing pop-unders
    const setupClickHandlers = () => {
      // Only add handlers after DOM is fully loaded
      const handleClick = (event) => {
        // We want to avoid triggering on UI elements like buttons
        if (
          event.target.tagName === "BUTTON" ||
          event.target.tagName === "A" ||
          event.target.closest("button") ||
          event.target.closest("a")
        ) {
          return;
        }

        // Check if pop-under was shown recently to avoid spamming
        const lastShown = sessionStorage.getItem("popunderLastShown");
        const now = Date.now();

        // Only show once every 10 minutes (600000 ms)
        if (!lastShown || now - parseInt(lastShown) > 600000) {
          // Store timestamp of this showing
          sessionStorage.setItem("popunderLastShown", now.toString());

          // Trigger pop-under (if any external pop-under function was defined by ad script)
          if (window.pu) {
            window.pu();
          } else if (window.popunder) {
            window.popunder();
          }
        }
      };

      // Attach click handler to document body after a delay
      setTimeout(() => {
        document.body.addEventListener("click", handleClick);
      }, 3000); // Wait 3 seconds before enabling

      return () => document.body.removeEventListener("click", handleClick);
    };

    // Inject the script
    const script = injectAdScript();

    // Set up the click handlers
    const cleanupClick = setupClickHandlers();

    // Clean up
    return () => {
      try {
        document.body.removeChild(script);
        cleanupClick();
      } catch (e) {
        console.error("Error removing ad script:", e);
      }
    };
  }, []);

  return (
    <>
      {/* Show status indicator during development only */}
      {process.env.NODE_ENV === "development" && (
        <div
          style={{
            position: "fixed",
            bottom: "5px",
            left: "5px",
            background: isLoaded ? "rgba(0,128,0,0.6)" : "rgba(255,0,0,0.6)",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "10px",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          Ads: {isLoaded ? "Active" : "Inactive"}
        </div>
      )}
    </>
  );
}

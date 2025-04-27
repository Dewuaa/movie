"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PlayButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  // Function to trigger pop-under and navigation
  const handleClick = () => {
    setClicked(true);

    // First try to trigger ad network's pop-under
    const hasTriggered = triggerPopUnder();

    // If we successfully opened a pop-under, add a small delay before navigation
    if (hasTriggered) {
      setTimeout(() => {
        router.push(href);
      }, 100);
    } else {
      // If no pop-under, navigate immediately
      router.push(href);
    }
  };

  // Function to trigger pop-under from ad network or fall back to our custom one
  const triggerPopUnder = (): boolean => {
    try {
      // First check if ad script provided a pop-under function
      if (window.pu) {
        window.pu();
        return true;
      } else if (window.popunder) {
        window.popunder();
        return true;
      }
      // If no ad script function is available, try opening our own pop-under
      else {
        // Only show once per session
        if (sessionStorage.getItem("popShown")) {
          return false;
        }

        // Create a pop-under with a simple page
        const popWindow = window.open(
          "about:blank",
          "_blank",
          "width=1000,height=600"
        );

        if (!popWindow) {
          // Pop-up was blocked
          return false;
        }

        // Mark as shown in this session
        sessionStorage.setItem("popShown", "true");

        // Create content for the pop-under
        popWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>CineVerse Recommendations</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #0f172a; color: white; }
                .header { background: linear-gradient(to right, #0891b2, #1e40af); padding: 1rem; text-align: center; }
                .content { padding: 2rem; max-width: 800px; margin: 0 auto; }
                .movie-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-top: 2rem; }
                .movie-card { background: #1e293b; border-radius: 0.5rem; overflow: hidden; transition: transform 0.2s; }
                .movie-card:hover { transform: scale(1.05); }
                .movie-poster { width: 100%; aspect-ratio: 2/3; object-fit: cover; }
                .movie-title { padding: 0.5rem; font-size: 0.9rem; text-align: center; }
                h1 { margin: 0; }
                .btn { display: inline-block; background: #0891b2; color: white; padding: 0.5rem 1rem; border-radius: 0.25rem; text-decoration: none; margin-top: 1rem; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>CineVerse Recommendations</h1>
              </div>
              <div class="content">
                <h2>Based on your interests, you might like these titles:</h2>
                <div class="movie-grid">
                  <div class="movie-card">
                    <img class="movie-poster" src="/posters/Black%20Panther.jpeg" alt="Movie poster">
                    <div class="movie-title">Black Panther</div>
                  </div>
                  <div class="movie-card">
                    <img class="movie-poster" src="/posters/John%20Wick.jpeg" alt="Movie poster">
                    <div class="movie-title">John Wick: Chapter 3</div>
                  </div>
                  <div class="movie-card">
                    <img class="movie-poster" src="/posters/Havoc.jpeg" alt="Movie poster">
                    <div class="movie-title">Havoc</div>
                  </div>
                  <div class="movie-card">
                    <img class="movie-poster" src="/posters/Wakanda.jpeg" alt="Movie poster">
                    <div class="movie-title">Wakanda Forever</div>
                  </div>
                </div>
                <a href="/" class="btn">Browse All Movies</a>
              </div>
              <script>
                // Attempt to load the real ad script here as well
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = '//pl26494323.profitableratecpm.com/3d/30/6d/3d306d69d757b9579ff1d88221dc169e.js';
                script.async = true;
                document.body.appendChild(script);
              </script>
            </body>
          </html>
        `);

        // Focus back on original window
        popWindow.blur();
        window.focus();

        return true;
      }
    } catch (e) {
      console.error("Error triggering pop-under:", e);
      return false;
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 md:px-8 md:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-medium flex items-center transition"
    >
      {children}
    </button>
  );
}

// Custom hook to detect screen size
"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query) {
  // Initialize with null to prevent hydration mismatch
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      // Create MediaQueryList object
      const media = window.matchMedia(query);

      // Set initial value
      setMatches(media.matches);

      // Define callback
      const listener = (event) => {
        setMatches(event.matches);
      };

      // Listen for changes
      if (media.addEventListener) {
        media.addEventListener("change", listener);
      } else {
        // Fallback for older browsers
        media.addListener(listener);
      }

      // Cleanup
      return () => {
        if (media.removeEventListener) {
          media.removeEventListener("change", listener);
        } else {
          // Fallback for older browsers
          media.removeListener(listener);
        }
      };
    }
  }, [query]);

  return matches;
}

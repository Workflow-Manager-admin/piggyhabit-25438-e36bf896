import React, { useEffect, useState, useRef } from "react";

/**
 * MotivationBanner - Displays a motivational message/banner with rotation ability.
 * Supports both timer-based and externally triggered change (via key prop).
 */

// PUBLIC_INTERFACE
function MotivationBanner({ messages, triggerKey }) {
  /**
   * Props:
   * - messages: array of motivational quotes (required)
   * - triggerKey: any value that when changed will force a new message (e.g. for "after save/withdraw" effect)
   */
  const [currentIdx, setCurrentIdx] = useState(() =>
    Math.floor(Math.random() * messages.length)
  );
  const intervalRef = useRef(null);

  // Change banner on timer every 15 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % messages.length);
    }, 15000); // 15s
    return () => clearInterval(intervalRef.current);
  }, [messages.length]);

  // Change message if triggerKey changes (from outside, e.g. after user action)
  useEffect(() => {
    if (typeof triggerKey !== "undefined") {
      // Pick new random index different from previous to avoid instant repeats
      setCurrentIdx((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * messages.length);
        } while (messages.length > 1 && next === prev);
        return next;
      });
    }
    // eslint-disable-next-line
  }, [triggerKey]);

  return (
    <div
      className="motivation-banner"
      aria-label="Motivational Message"
      style={{
        background:
          "linear-gradient(90deg, var(--kavia-orange), #FFF9C4)",
        color: "#1A1A1A",
        borderRadius: 8,
        padding: "12px 20px",
        margin: "16px 0",
        fontWeight: 500,
        fontSize: "1.15rem",
        textAlign: "center",
        minHeight: 40,
      }}
    >
      {/* Accessible: role=banner & aria-live for updates */}
      <span role="banner" aria-live="polite">
        {messages[currentIdx]}
      </span>
    </div>
  );
}

export default MotivationBanner;

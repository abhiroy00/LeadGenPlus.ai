// components/userJourney/ActionCard.jsx
// A single clickable option card shown on the right panel of each step.
//
// Props:
//   action      — { icon, label, desc }
//   color       — active accent color for the current step
//   lightColor  — light tint background on hover
//   borderColor — border color on hover
// components/userJourney/ActionCard.jsx

import React, { useState } from "react";

export default function ActionCard({ action, color }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        background: "#ffffff",
        border: `1px solid ${hovered ? color : "#d1d5db"}`,
        borderRadius: 10,
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: hovered
          ? "0 6px 18px rgba(0,0,0,0.06)"
          : "0 2px 6px rgba(0,0,0,0.03)",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        {action.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#1a1a2e",
          }}
        >
          {action.label}
        </div>

        <div
          style={{
            fontSize: 12,
            color: "#4b5563",
            marginTop: 4,
          }}
        >
          {action.desc}
        </div>
      </div>

      {/* Arrow */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke={hovered ? color : "#9ca3af"}
        strokeWidth="2.5"
        style={{
          transition: "stroke 0.2s",
          flexShrink: 0,
        }}
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  );
}
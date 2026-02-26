// components/userJourney/StepContent.jsx
// The main content card for each step.
// Left: step description + tip. Right: action cards + Back/Next navigation.
//
// Props:
//   step           — current step object from journeyData
//   isFirst        — bool
//   isLast         — bool
//   completedSteps — Set<number>
//   currentStep    — number
//   onBack         — fn()
//   onNext         — fn()
//   onStepClick    — fn(id): dot indicator click

// components/userJourney/StepContent.jsx

// components/userJourney/StepContent.jsx

// components/userJourney/StepContent.jsx

import React from "react";
import ActionCard from "./ActionCard";
import { STEPS } from "./journeyData";

export default function StepContent({
  step,
  isFirst,
  isLast,
  completedSteps,
  currentStep,
  onBack,
  onNext,
  onStepClick,
}) {
  return (
    <div
      key={step.id}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        margin: "0 22px 22px",
        background: "#ffffff",
        borderRadius: 12,
        border: "1px solid #d0d0c8",
        overflow: "hidden",
        boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
      }}
    >
      {/* LEFT PANEL */}
      <div
        style={{
          padding: "36px",
          background: "#ffffff", // was beige → now white
          borderRight: "1px solid #d0d0c8",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 12px",
              background: "#f5f5f0",
              border: "1px solid #d0d0c8",
              borderRadius: 100,
              marginBottom: 20,
              fontSize: 11,
              fontWeight: 600,
              color: "#444",
            }}
          >
            {step.emoji}
            <span>
              Step {step.id} of {STEPS.length}
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#1a1a2e",
              marginBottom: 8,
            }}
          >
            {step.title}
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: step.color,
              marginBottom: 16,
            }}
          >
            {step.subtitle}
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: 14,
              color: "#333333", // darker for contrast
              lineHeight: 1.7,
            }}
          >
            {step.description}
          </p>
        </div>

        {/* Tip */}
        <div
          style={{
            marginTop: 28,
            padding: "14px 16px",
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            fontSize: 13,
            color: "#333",
            lineHeight: 1.6,
          }}
        >
          <span
            style={{
              fontWeight: 700,
              color: step.color,
            }}
          >
            💡 Tip:
          </span>{" "}
          {step.tip}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        style={{
          padding: "36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              color: "#444", // darker
              marginBottom: 14,
            }}
          >
            Available Options
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {step.actions.map((action) => (
              <ActionCard
                key={action.label}
                action={action}
                color={step.color}
              />
            ))}
          </div>
        </div>

        {/* NAVIGATION */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 30,
            paddingTop: 18,
            borderTop: "1px solid #e5e7eb",
          }}
        >
          {/* Back */}
          <button
            onClick={onBack}
            disabled={isFirst}
            style={{
              padding: "9px 16px",
              borderRadius: 8,
              border: "1px solid #d1d5db",
              background: "#ffffff",
              color: isFirst ? "#bbb" : "#1a1a2e",
              fontSize: 13,
              fontWeight: 600,
              cursor: isFirst ? "not-allowed" : "pointer",
            }}
          >
            ← Back
          </button>

          {/* Dots */}
          <div style={{ display: "flex", gap: 8 }}>
            {STEPS.map((s) => (
              <div
                key={s.id}
                onClick={() => onStepClick(s.id)}
                style={{
                  width: s.id === currentStep ? 20 : 7,
                  height: 7,
                  borderRadius: 4,
                  background:
                    s.id === currentStep
                      ? step.color
                      : completedSteps.has(s.id)
                      ? "#cbd5e1"
                      : "#e5e7eb",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={onNext}
            style={{
              padding: "9px 20px",
              borderRadius: 8,
              background: step.color,
              border: "none",
              color: "#ffffff",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
            }}
          >
            {isLast ? "🚀 Get Started" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { STEPS } from "./journeyData";

function Connector({ isCompleted, color }) {
  return (
    <div
      style={{
        flex: 1,
        height: 2,
        margin: "0 12px",
        background: "#eef2f7",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: isCompleted ? "100%" : "0%",
          background: color,
          opacity: 0.6,
          borderRadius: 2,
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}

function Dot({ step, isCurrent, isCompleted, onClick }) {
  const isActive = isCurrent || isCompleted;

  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        minWidth: 88,
      }}
    >
      {/* Circle */}
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: isCurrent
            ? `${step.color}15`
            : "#ffffff",
          border: `2px solid ${
            isActive ? step.color : "#e5e7eb"
          }`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 15,
          color: isActive ? step.color : "#94a3b8",
          transition: "all 0.25s ease",
        }}
      >
        {isCompleted ? "✓" : step.emoji}
      </div>

      {/* Labels */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: isCurrent ? "#1e293b" : "#64748b",
          }}
        >
          Step {step.id}
        </div>

        <div
          style={{
            fontSize: 10.5,
            color: "#94a3b8",
            marginTop: 2,
            fontWeight: isCurrent ? 600 : 400,
          }}
        >
          {step.title}
        </div>
      </div>
    </div>
  );
}

export default function StepTracker({
  currentStep,
  completedSteps,
  onStepClick,
}) {
  return (
    <div style={{ padding: "12px 18px" }}>
      <div
        style={{
          background: "#ffffff",
          borderRadius: 16,
          padding: "18px 28px",
          boxShadow: "0 4px 14px rgba(15, 23, 42, 0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {STEPS.map((step, i) => (
            <div
              key={step.id}
              style={{
                display: "flex",
                alignItems: "center",
                flex: i < STEPS.length - 1 ? 1 : "none",
              }}
            >
              <Dot
                step={step}
                isCurrent={step.id === currentStep}
                isCompleted={completedSteps.has(step.id)}
                onClick={() => onStepClick(step.id)}
              />

              {i < STEPS.length - 1 && (
                <Connector
                  isCompleted={completedSteps.has(step.id)}
                  color={step.color}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
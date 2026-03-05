// pages/auth/OnboardingPage.jsx
// Owns step state and assembles all userJourney components.
//
// Props:
//   onClose — fn(): called when user closes or completes the tour

import React, { useState } from "react";
import StepTracker from "../../components/userJourney/StepTracker";
import StepContent from "../../components/userJourney/StepContent";
import { STEPS } from "../../components/userJourney/journeyData";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const step = STEPS.find((s) => s.id === currentStep);
  const isFirst = currentStep === 1;
  const isLast = currentStep === STEPS.length;

  const handleNext = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    if (!isLast) setCurrentStep((v) => v + 1);
  };

  const handleBack = () => {
    if (!isFirst) setCurrentStep((v) => v - 1);
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
        Getting Started
      </h1>

      <StepTracker
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={setCurrentStep}
      />

      <div style={{ marginTop: 20 }}>
        <StepContent
          step={step}
          isFirst={isFirst}
          isLast={isLast}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onBack={handleBack}
          onNext={handleNext}
          onStepClick={setCurrentStep}
        />
      </div>
    </div>
  );
}

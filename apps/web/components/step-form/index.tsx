'use client';
import React, { useState } from 'react';
import StepIndicator from './step-Indicator';

const StepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderButtons = () => {
    return (
      <div
        className={`flex mt-4 ${
          currentStep > 1 ? 'justify-between' : 'justify-end'
        }`}
      >
        {currentStep > 1 && (
          <button
            onClick={previousStep}
            className="select-none bg-secondary hover:bg-secondary-foreground hover:text-white text-gray-800 px-4 py-2 rounded-lg transition duration-300 ease-in-out shadow-md"
          >
            Previous
          </button>
        )}
        {currentStep < totalSteps && (
          <button
            onClick={nextStep}
            className="select-none bg-primary hover:bg-primary-foreground hover:text-black text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out shadow-md"
          >
            Next
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-card shadow-xl rounded-lg animate-accordion-up">
      <StepIndicator totalSteps={totalSteps} currentStep={currentStep} />
      {/* Render current step form here */}
      <div className="form-content mt-4">
        <p className="text-gray-800">Content for Step {currentStep}</p>
        {/* Implement your form content based on currentStep */}
      </div>
      {renderButtons()}
    </div>
  );
};

export default StepForm;

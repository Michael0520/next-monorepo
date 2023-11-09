'use client';
import React, { useRef, useState } from 'react';
import StepIndicator from '../../components/step-form/step-Indicator';
import Step1Form from '../../components/step-form/step01-form';

const StepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;
  const currentFormRef = useRef<{ triggerValidation: () => Promise<boolean> }>(
    null
  );

  const nextStep = async () => {
    if (currentStep < totalSteps) {
      const isValid = await currentFormRef.current?.triggerValidation();
      if (isValid) {
        setCurrentStep(currentStep + 1);
      }
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

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Form ref={currentFormRef} />;
      default:
        return <p>步驟 {currentStep}</p>;
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto bg-card shadow-xl rounded-lg animate-accordion-up">
      <StepIndicator totalSteps={totalSteps} currentStep={currentStep} />
      <div className="form-content mt-4">{renderCurrentStep()}</div>
      {renderButtons()}
    </div>
  );
};

export default StepForm;

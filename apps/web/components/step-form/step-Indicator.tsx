import React from 'react';

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  totalSteps,
  currentStep,
}) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {[...Array(totalSteps).keys()].map((step, index) => (
        <React.Fragment key={step}>
          {/* Circle */}
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold shadow-md transition duration-300 ease-in-out ${
              currentStep > step
                ? 'bg-primary text-white'
                : 'bg-muted text-gray-800'
            }`}
          >
            {step + 1}
          </div>

          {/* Line between circles */}
          {index < totalSteps - 1 && (
            <div
              className={`flex-1 h-1 mx-2 transition-all duration-300 ease-in-out ${
                currentStep > step + 1 ? 'bg-primary' : 'bg-muted'
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;

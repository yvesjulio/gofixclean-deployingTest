import { useState } from "react";
import PersonalDetails from "../verifications/PersonalDetails";
import Verification from "../verifications/Verification";
import PersonalInfo from "../verifications/PersonalInfo";
import Documents from "../verifications/Documents";
import Review from "../verifications/Review";


type Step = 'personal' | 'documents' | 'review';

function ProviderVerifications() {
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [completedSteps, setCompletedSteps] = useState<Set<Step>>(new Set());

  const handleStepClick = (step: Step) => {
    if (completedSteps.has(step) || step === currentStep) {
      setCurrentStep(step);
    }
  };

  const handleNext = (nextStep: Step) => {
    setCompletedSteps(prev => new Set(prev).add(currentStep));
    setCurrentStep(nextStep);
  };

  const handleBack = (prevStep: Step) => {
    setCurrentStep(prevStep);
  };

  return (
    <div>
      <Verification/>
      
      <PersonalDetails 
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={handleStepClick}
      />
      
      <div className="bg-[#EAEFEE] pt-20 pb-8">
        {currentStep === 'personal' && (
          <PersonalInfo onNext={() => handleNext('documents')} />
        )}
        
        {currentStep === 'documents' && (
          <Documents 
            onNext={() => handleNext('review')} 
            onBack={() => handleBack('personal')} 
          />
        )}
        
        {currentStep === 'review' && (
          <Review onBack={() => handleBack('documents')} />
        )}
      </div>
    </div>
  );
}

export default ProviderVerifications;
import { useState } from "react";
import PersonalDetails from "../components/verifications/PersonalDetails";
import Verification from "../components/verifications/Verification";
import PersonalInfo from "../components/verifications/PersonalInfo";
import Documents from "../components/verifications/Documents";
import Review from "../components/verifications/Review";
import Footer from "../components/landingpages/Footer";

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

     
      <a
        href="https://wa.me/250791692126"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 50,
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          animation: "forwardBackward 1.5s ease-in-out infinite",
        }}
      >
        <img src="/images/whatsapp.png" alt="WhatsApp" className="h-10 w-10" />
      </a>

      <style>
        {`
          @keyframes forwardBackward {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
          }
        `}
      </style>

    
      <Footer />
    </div>
  );
}

export default ProviderVerifications;



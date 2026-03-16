import { GrStatusGood } from "react-icons/gr";

interface PersonalDetailsProps {
  currentStep: 'personal' | 'documents' | 'review';
  completedSteps: Set<'personal' | 'documents' | 'review'>;
  onStepClick: (step: 'personal' | 'documents' | 'review') => void;
}

function PersonalDetails({ currentStep, completedSteps, onStepClick }: PersonalDetailsProps) {
  const getStepStyle = (step: 'personal' | 'documents' | 'review') => {
    if (completedSteps.has(step)) {
      return 'bg-brandText text-white'; 
    }
    if (currentStep === step) {
      return 'bg-brandText text-white'; 
    }
    return 'bg-[#DFE7E5] text-brandText'; 
  };

  const getStepContent = (step: 'personal' | 'documents' | 'review', stepNumber: string) => {
    if (completedSteps.has(step)) {
      return <GrStatusGood className="text-2xl" />; 
    }
    return stepNumber; 
  };

  return (
    <div>
      <section className="bg-white text-gray-700 px-6 md:px-9 max-w-3xl mx-auto pb-8 pt-8">
        <div className="flex items-center justify-between gap-4 w-full">
          <div 
            className="flex items-center gap-3 shrink-0 cursor-pointer"
            onClick={() => onStepClick('personal')}
          >
            <div className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold ${getStepStyle('personal')}`}>
              {getStepContent('personal', '01')}
            </div>
            <p className={`whitespace-nowrap ${
              currentStep === 'personal' || completedSteps.has('personal') 
                ? 'text-brandText font-medium' 
                : 'text-gray-500'
            }`}>
              Personal Info
            </p>
          </div>
          
          <div className="flex-1 h-px bg-gray-300 min-w-5"></div>
          

          <div 
            className="flex items-center gap-3 shrink-0 cursor-pointer"
            onClick={() => onStepClick('documents')}
          >
            <div className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold ${getStepStyle('documents')}`}>
              {getStepContent('documents', '02')}
            </div>
            <p className={`whitespace-nowrap ${
              currentStep === 'documents' || completedSteps.has('documents')
                ? 'text-brandText font-medium' 
                : 'text-gray-500'
            }`}>
              Documents
            </p>
          </div>

          <div className="flex-1 h-px bg-gray-300 min-w-5"></div>
          
          <div 
            className="flex items-center gap-3 shrink-0 cursor-pointer"
            onClick={() => onStepClick('review')}
          >
            <div className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold ${getStepStyle('review')}`}>
              {getStepContent('review', '03')}
            </div>
            <p className={`whitespace-nowrap ${
              currentStep === 'review' || completedSteps.has('review')
                ? 'text-brandText font-medium' 
                : 'text-gray-500'
            }`}>
              Review
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PersonalDetails;
import { GrStatusGood } from "react-icons/gr";

interface PersonalDetailsProps {
  currentStep: 'personal' | 'review';
  completedSteps: Set<'personal' | 'review'>;
  onStepClick: (step: 'personal' | 'review') => void;
}

function PersonalDetails({ currentStep, completedSteps, onStepClick }: PersonalDetailsProps) {
  const getStepStyle = (step: 'personal' | 'review') => {
    if (completedSteps.has(step)) {
      return 'bg-brandText text-white';
    }
    if (currentStep === step) {
      return 'bg-brandText text-white';
    }
    return 'bg-[#DFE7E5] text-brandText';
  };

  const getStepContent = (step: 'personal' | 'review', stepNumber: string) => {
    if (completedSteps.has(step)) {
      return <GrStatusGood className="text-sm md:text-2xl" />;
    }
    return stepNumber;
  };

  return (
    <div>
      <section className="bg-white text-gray-700 px-2 sm:px-4 md:px-9 max-w-3xl mx-auto py-2 md:py-8">
        <div className="flex md:hidden items-center justify-between gap-1 overflow-x-auto pb-2">
          <div
            className="flex items-center gap-1 shrink-0 cursor-pointer"
            onClick={() => onStepClick('personal')}
          >
            <div className={`w-6 h-6 flex items-center justify-center rounded-full font-semibold text-xs ${getStepStyle('personal')}`}>
              {getStepContent('personal', '01')}
            </div>
            <p className={`text-xs whitespace-nowrap ${
              currentStep === 'personal' || completedSteps.has('personal')
                ? 'text-brandText font-medium'
                : 'text-gray-500'
            }`}>
              {"Personal"}
            </p>
          </div>

          <div className="w-2 h-px bg-gray-300"></div>

          <div
            className="flex items-center gap-1 shrink-0 cursor-pointer"
            onClick={() => onStepClick('review')}
          >
            <div className={`w-6 h-6 flex items-center justify-center rounded-full font-semibold text-xs ${getStepStyle('review')}`}>
              {getStepContent('review', '02')}
            </div>
            <p className={`text-xs whitespace-nowrap ${
              currentStep === 'review' || completedSteps.has('review')
                ? 'text-brandText font-medium'
                : 'text-gray-500'
            }`}>
              {"Review"}
            </p>
          </div>
        </div>


        <div className="hidden md:flex items-center justify-between gap-4 w-full">
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
              {"Personal Info"}
            </p>
          </div>

          <div className="flex-1 h-px bg-gray-300 min-w-5"></div>

          <div
            className="flex items-center gap-3 shrink-0 cursor-pointer"
            onClick={() => onStepClick('review')}
          >
            <div className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold ${getStepStyle('review')}`}>
              {getStepContent('review', '02')}
            </div>
            <p className={`whitespace-nowrap ${
              currentStep === 'review' || completedSteps.has('review')
                ? 'text-brandText font-medium'
                : 'text-gray-500'
            }`}>
              {"Review"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PersonalDetails;
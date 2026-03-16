interface DocumentsProps {
  onNext: () => void;
  onBack: () => void;
}

function Documents({ onNext, onBack }: DocumentsProps) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brandText">Documents</h2>
        <p className="text-gray-500 text-sm mt-1">Upload your verification documents</p>
      </div>
      
      <div className="space-y-6">
       
        
        <div className="flex justify-between pt-4">
        
         <button 
  onClick={onBack}
  className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg font-medium border border-gray-300 hover:bg-brandOrange hover:text-white transition-all duration-300 text-sm"
>
  Back
</button>
          <button 
            onClick={onNext}
            className="bg-brandText text-white py-2 px-6 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 hover:scale-[1.02] text-sm"
          >
            Continue to review
          </button>
        </div>
      </div>
    </div>
  );
}

export default Documents;
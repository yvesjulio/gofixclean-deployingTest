import { useState, useEffect } from 'react';
import { BiErrorCircle } from "react-icons/bi";
import { GrStatusGood } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

interface ApplicationSubmittedProps {
  onBackToProvider: () => void;
  onGoToHome: () => void;
}

function ApplicationSubmitted({ onBackToProvider, onGoToHome }: ApplicationSubmittedProps) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-8">
      <div className="text-center">
        <div className="mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <GrStatusGood className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">Application Submitted!</h2>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed px-2 sm:px-0">
            Thank you for submitting your verification documents. Our team will review your application and get back to you within 2-3 business days.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onBackToProvider}
            className="bg-gray-200 text-gray-700 py-2 px-4 sm:px-6 rounded-lg font-medium border border-gray-300 hover:bg-brandOrange hover:text-white transition-all duration-300 text-xs sm:text-sm w-full sm:w-auto"
          >
            Back to Provider Page
          </button>
          <button
            onClick={onGoToHome}
            className="bg-brandText text-white py-2 px-6 sm:px-8 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 text-xs sm:text-sm w-full sm:w-auto"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

interface ReviewProps {
  onBack: () => void;
}

interface ReviewData {
  personalInfo: {
    fullLegalName: string;
    phoneNumber: string;
    residentialAddress: string;
    nin: string;
    serviceType: string;
    otherService: string;
    aboutYou: string;
  };
  documents: {
    governmentId?: { name: string; uploaded: boolean };
    selfieId?: { name: string; uploaded: boolean };
    certifications?: { name: string; uploaded: boolean; count: number };
    workSamples?: { name: string; uploaded: boolean; count: number };
  };
}

function Review({ onBack }: ReviewProps) {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);

  useEffect(() => {
    
    const personalInfoData = localStorage.getItem('personalInfoFormData');
    const documentsData = sessionStorage.getItem('uploadedDocuments');

    const parsedPersonalInfo = personalInfoData ? JSON.parse(personalInfoData) : null;
    const parsedDocuments = documentsData ? JSON.parse(documentsData) : {};

    
    const certificationFiles = parsedDocuments['certifications'] ? 1 : 0;
    const workSampleFiles = parsedDocuments['work-samples'] ? 1 : 0;

    setReviewData({
      personalInfo: parsedPersonalInfo || {
        fullLegalName: "Not provided",
        phoneNumber: "Not provided",
        residentialAddress: "Not provided",
        nin: "Not provided",
        serviceType: "Not provided",
        otherService: "",
        aboutYou: "Not provided"
      },
      documents: {
        governmentId: {
          name: parsedDocuments['government-id']?.name || 'Not uploaded',
          uploaded: !!parsedDocuments['government-id']
        },
        selfieId: {
          name: parsedDocuments['selfie-id']?.name || 'Not uploaded',
          uploaded: !!parsedDocuments['selfie-id']
        },
        certifications: {
          name: parsedDocuments['certifications']?.name || 'Not uploaded',
          uploaded: !!parsedDocuments['certifications'],
          count: certificationFiles
        },
        workSamples: {
          name: parsedDocuments['work-samples']?.name || 'Not uploaded',
          uploaded: !!parsedDocuments['work-samples'],
          count: workSampleFiles
        }
      }
    });
  }, []);

  const handleSubmit = () => {
    console.log('Submit button clicked');
    setIsSubmitted(true);
   
    localStorage.removeItem('personalInfoFormData');
    sessionStorage.removeItem('uploadedDocuments');
  };

  const handleBackToProvider = () => {
    console.log('Back to Provider Page clicked');
    navigate('/become-provider'); 
  };

  const handleGoToHome = () => {
    console.log('Go to Home clicked');
    navigate('/'); 
  };

  const getServiceTypeDisplay = () => {
    if (!reviewData) return 'Not provided';
    const { serviceType, otherService } = reviewData.personalInfo;
    if (serviceType === 'other' && otherService) {
      return otherService;
    }
    return serviceType || 'Not provided';
  };

  
  const getDocumentIcon = (docType: string, isUploaded: boolean) => {
   
    const requiredDocs = ['governmentId', 'selfieId'];
    
    if (requiredDocs.includes(docType)) {
    
      return isUploaded ? 
        <GrStatusGood className="text-green-500 text-lg shrink-0" /> : 
        <BiErrorCircle className="text-red-500 text-lg shrink-0" />;
    } else {
     
      return <BiErrorCircle className="text-green-500 text-lg shrink-0" />;
    }
  };

  if (isSubmitted) {
    console.log('Showing ApplicationSubmitted');
    return <ApplicationSubmitted 
      onBackToProvider={handleBackToProvider} 
      onGoToHome={handleGoToHome} 
    />;
  }

  if (!reviewData) {
    return <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-8 text-center">Loading...</div>;
  }

  const { personalInfo, documents } = reviewData;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Review Your Application</h2>
      </div>

      <div className="space-y-6 sm:space-y-8">
      
        <div className="bg-gray-100 rounded-lg p-4 sm:p-6">
          <h3 className="text-gray-800 mb-3 sm:mb-4 font-semibold">Personal Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <div className="flex w-full sm:w-64">
                <span className="w-12 sm:w-12 text-gray-500">Name:</span>
                <span className="text-gray-900">{personalInfo.fullLegalName}</span>
              </div>
              <div className="flex w-full sm:w-64">
                <span className="w-13 sm:w-14 text-gray-500">Phone:</span>
                <span className="text-gray-900">{personalInfo.phoneNumber}</span>
              </div>
            </div>
            <div className="flex">
              <span className="w-16 sm:w-16 text-gray-500">Address:</span>
              <span className="text-gray-900">{personalInfo.residentialAddress}</span>
            </div>
            <div className="flex">
              <span className="w-9 sm:w-9 text-gray-500">NIN:</span>
              <span className="text-gray-900">{personalInfo.nin}</span>
            </div>
            <div className="flex">
              <span className="w-14 sm:w-16 text-gray-500">Service:</span>
              <span className="text-gray-900 capitalize">{getServiceTypeDisplay()}</span>
            </div>
          </div>
        </div>

       
        <div className="bg-gray-100 rounded-lg p-4 sm:p-6">
          <h3 className="text-gray-800 mb-3 sm:mb-4 font-semibold">Documents</h3>
          <div className="space-y-3 text-sm">
         
           <div className="flex items-start gap-2">
  {getDocumentIcon('governmentId', documents.governmentId?.uploaded || false)}
  <div className="flex-1 flex flex-wrap items-start sm:items-center gap-x-2 gap-y-1">
    <span className="text-gray-500 whitespace-nowrap">Government ID:</span>
    <span className="text-gray-900">
      {documents.governmentId?.uploaded ? 'Uploaded' : 'Not uploaded'}
    </span>
  </div>
</div>

          
            <div className="flex items-start sm:items-center gap-2 flex-wrap sm:flex-nowrap">
              {getDocumentIcon('selfieId', documents.selfieId?.uploaded || false)}
              <span className="w-24 sm:w-23 text-gray-500">Selfie with ID:</span>
              <span className="text-gray-900">
                {documents.selfieId?.uploaded ? 'Uploaded' : 'Not uploaded'}
              </span>
            </div>

         
            <div className="flex items-start sm:items-center gap-2 flex-wrap sm:flex-nowrap">
              {getDocumentIcon('certifications', documents.certifications?.uploaded || false)}
              <span className="w-24 sm:w-23 text-gray-500">Certifications:</span>
              <span className="text-gray-900">{documents.certifications?.count || 0} file(s)</span>
            </div>
             <div className="flex items-start sm:items-center gap-2 flex-wrap sm:flex-nowrap">
              {getDocumentIcon('workSamples', documents.workSamples?.uploaded || false)}
              <span className="w-24 sm:w-25 text-gray-500">Work Samples:</span>
              <span className="text-gray-900">{documents.workSamples?.count || 0} file(s)</span>
            </div>
          </div>
        </div>

     
        <div className="bg-gray-100 rounded-lg p-4 sm:p-6">
          <h3 className="text-gray-800 mb-3 sm:mb-4 font-semibold">About You</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {personalInfo.aboutYou}
          </p>
        </div>

        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="text-amber-600 text-xl shrink-0"><BiErrorCircle/> </span>
            <div>
              <h3 className="mb-2 font-semibold">Verification Process</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Your documents will be reviewed within 2-3 business days. We'll notify you via email and SMS once your verification is complete.
              </p>
            </div>
          </div>
        </div>

        
        <div className="flex justify-between pt-4">
          <button
            onClick={onBack}
            className="bg-gray-200 text-gray-700 hover:bg-brandOrange py-2 px-6 rounded-lg font-medium border border-gray-300 hover:text-white transition-all duration-300 text-sm"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="bg-brandText text-white py-2 px-6 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 hover:scale-[1.02] text-sm"
          >
            Submit for Verification
          </button>
        </div>
      </div>
    </div>
  );
}

export default Review;
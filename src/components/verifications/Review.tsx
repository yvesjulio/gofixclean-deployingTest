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
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
            Application Submitted!
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed px-2 sm:px-0">
            Thank you for submitting your application. Our team will review your information and get back to you within 3-5 business days.
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
  formData?: {
    fullLegalName: string;
    phoneNumber: string;
    residentialAddress: string;
    serviceType: string;
    otherService: string;
    serviceTags: string[];
    aboutYou: string;
  };
}

interface ReviewData {
  personalInfo: {
    fullLegalName: string;
    phoneNumber: string;
    residentialAddress: string;
    serviceType: string;
    otherService: string;
    serviceTags: string[];
    aboutYou: string;
  };
}

function Review({ onBack, formData }: ReviewProps) {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);

  useEffect(() => {
    if (formData) {
      setReviewData({
        personalInfo: {
          fullLegalName: formData.fullLegalName || "Not provided",
          phoneNumber: formData.phoneNumber || "Not provided",
          residentialAddress: formData.residentialAddress || "Not provided",
          serviceType: formData.serviceType || "Not provided",
          otherService: formData.otherService || "",
          serviceTags: formData.serviceTags || [],
          aboutYou: formData.aboutYou || "Not provided",
        },
      });
    } else {
      const personalInfoData = localStorage.getItem('personalInfoFormData');
      const parsedPersonalInfo = personalInfoData ? JSON.parse(personalInfoData) : null;

      setReviewData({
        personalInfo: {
          fullLegalName: parsedPersonalInfo?.fullLegalName || "Not provided",
          phoneNumber: parsedPersonalInfo?.phoneNumber || "Not provided",
          residentialAddress: parsedPersonalInfo?.residentialAddress || "Not provided",
          serviceType: parsedPersonalInfo?.serviceType || "Not provided",
          otherService: parsedPersonalInfo?.otherService || "",
          serviceTags: parsedPersonalInfo?.serviceTags || [],
          aboutYou: parsedPersonalInfo?.aboutYou || "Not provided",
        },
      });
    }
  }, [formData]);

  const handleSubmit = async () => {
    // Rate limiting: prevent spam submissions
    const lastSubmit = localStorage.getItem("lastSubmit");
    if (lastSubmit && Date.now() - parseInt(lastSubmit) < 30000) {
      alert("Please wait 30 seconds before submitting another request.");
      return;
    }

    try {
      setIsSubmitting(true);
      const submitData = formData || reviewData?.personalInfo;

      if (!submitData) {
        alert("No data available. Please complete your application form.");
        setIsSubmitting(false);
        return;
      }

      if (!submitData.fullLegalName || !submitData.phoneNumber || !submitData.residentialAddress) {
        alert("Please complete all required fields before submitting.");
        setIsSubmitting(false);
        return;
      }

      const payload = {
        type: "provider",
        fullLegalName: submitData.fullLegalName,
        phoneNumber: submitData.phoneNumber,
        residentialAddress: submitData.residentialAddress,
        serviceType: submitData.serviceType,
        otherService: submitData.otherService || "",
        serviceTags: Array.isArray(submitData.serviceTags) ? submitData.serviceTags.join(", ") : "",
        aboutYou: submitData.aboutYou,
      };

      const response = await fetch("https://submit-form.com/boL1oVWXQ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${responseText}`);
      }

      setIsSubmitted(true);
      localStorage.removeItem('personalInfoFormData');

      // Update rate limiting timestamp
      localStorage.setItem("lastSubmit", Date.now().toString());
    } catch (error: any) {
      alert(error?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToProvider = () => {
    navigate('/become-provider');
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  const getServiceTypeDisplay = () => {
    if (!reviewData) return "Not provided";
    const { serviceType, otherService } = reviewData.personalInfo;
    if (serviceType === 'other' && otherService) {
      return otherService;
    }
    return serviceType || "Not provided";
  };

  if (isSubmitted) {
    return (
      <ApplicationSubmitted
        onBackToProvider={handleBackToProvider}
        onGoToHome={handleGoToHome}
      />
    );
  }

  if (!reviewData) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-8 text-center">
        Loading...
      </div>
    );
  }

  const { personalInfo } = reviewData;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Review Your Information</h2>
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
              <span className="w-14 sm:w-16 text-gray-500">Service:</span>
              <span className="text-gray-900 capitalize">{getServiceTypeDisplay()}</span>
            </div>
            {personalInfo.serviceTags && personalInfo.serviceTags.length > 0 && (
              <div className="flex">
                <span className="w-14 sm:w-16 text-gray-500">Tags:</span>
                <span className="text-gray-900">{personalInfo.serviceTags.join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 sm:p-6">
          <h3 className="text-gray-800 mb-3 sm:mb-4 font-semibold">About You</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{personalInfo.aboutYou}</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="text-amber-600 text-xl shrink-0"><BiErrorCircle /></span>
            <div>
              <h3 className="mb-2 font-semibold">Verification Process</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Our team will verify your details before you can receive job requests.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            onClick={onBack}
            disabled={isSubmitting}
            className="bg-gray-200 text-gray-700 hover:bg-brandOrange py-2 px-6 rounded-lg font-medium border border-gray-300 hover:text-white transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-brandText text-white py-2 px-6 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 hover:scale-[1.02] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Review;

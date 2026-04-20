import { useState, useEffect } from "react";

interface FormData {
  fullLegalName: string;
  phoneNumber: string;
  residentialAddress: string;
  serviceType: string;
  otherService: string;
  serviceTags: string[];
  aboutYou: string;
}

interface PersonalInfoProps {
  onNext: (formData: FormData) => void;
  onBack?: () => void;
}

interface FormErrors {
  fullLegalName?: string;
  phoneNumber?: string;
  residentialAddress?: string;
  serviceType?: string;
  otherService?: string;
  serviceTags?: string;
  aboutYou?: string;
}

const serviceTagsOptions: Record<string, string[]> = {
  plumber: ["Leak Repair", "Installation", "Emergency Service", "Pipe Replacement"],
  electrician: ["Wiring", "Lighting Installation", "Repair", "Safety Inspection"],
  cleaner: ["Deep Cleaning", "Office Cleaning", "Carpet Cleaning", "Window Cleaning"],
  painter: ["Interior Painting", "Exterior Painting", "Wallpaper Removal", "Texture Painting"],
  gardener: ["Lawn Mowing", "Planting", "Tree Trimming", "Irrigation"],
  handyman: ["Furniture Assembly", "Repairs", "Maintenance", "Drywall Repair"],
};

function PersonalInfo({ onNext, onBack }: PersonalInfoProps) {
  const [showOtherService, setShowOtherService] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem("personalInfoFormData");
    return savedData
      ? JSON.parse(savedData)
      : {
          fullLegalName: "",
          phoneNumber: "",
          residentialAddress: "",
          serviceType: "",
          otherService: "",
          serviceTags: [],
          aboutYou: "",
        };
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    localStorage.setItem("personalInfoFormData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    if (formData.serviceType) {
      setSelectedService(formData.serviceType);
      setShowOtherService(formData.serviceType === "other");
    }
  }, []);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedService(value);
    setShowOtherService(value === "other");
    setFormData({
      ...formData,
      serviceType: value,
      otherService: value === "other" ? formData.otherService : "",
      serviceTags: [],
    });
    if (errors.serviceType) {
      setErrors({ ...errors, serviceType: undefined });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = formData.serviceTags;
    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
    setFormData({ ...formData, serviceTags: updatedTags });
    if (errors.serviceTags) {
      setErrors({ ...errors, serviceTags: undefined });
    }
  };

  const handleCustomTagsChange = (value: string) => {
    const tags = value.split(",").map((t) => t.trim()).filter((t) => t);
    setFormData({ ...formData, serviceTags: tags });
    if (errors.serviceTags) {
      setErrors({ ...errors, serviceTags: undefined });
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouched({ ...touched, [fieldName]: true });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullLegalName.trim()) {
      newErrors.fullLegalName = "Full legal name is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[0-9\s]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (!formData.residentialAddress.trim()) {
      newErrors.residentialAddress = "Residential address is required";
    }

    if (!formData.serviceType) {
      newErrors.serviceType = "Please select a service type";
    } else if (formData.serviceType === "other" && !formData.otherService.trim()) {
      newErrors.otherService = "Please specify your service";
    }

    if (formData.serviceType && formData.serviceType !== "other") {
      if (!formData.serviceTags.length) {
        newErrors.serviceTags = "Please select at least one service tag";
      }
    } else if (formData.serviceType === "other") {
      if (!formData.serviceTags.length) {
        newErrors.serviceTags = "Please provide service tags for your custom service";
      }
    }

    if (!formData.aboutYou.trim()) {
      newErrors.aboutYou = "Tell us about yourself";
    } else if (formData.aboutYou.length < 20) {
      newErrors.aboutYou = "About you must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    const allFields = [
      'fullLegalName',
      'phoneNumber',
      'residentialAddress',
      'serviceType',
      'serviceTags',
      'aboutYou',
    ];
    const touchedFields = allFields.reduce(
      (acc, field) => ({ ...acc, [field]: true }),
      {}
    ) as Record<string, boolean>;
    if (showOtherService) {
      touchedFields.otherService = true;
    }
    setTouched(touchedFields);

    if (validateForm()) {
      onNext(formData);
    } else {
      const firstErrorField = document.querySelector('.border-red-500');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  const currentTags = selectedService && selectedService !== 'other' ? serviceTagsOptions[selectedService] || [] : [];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold">Personal Information</h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Tell us about your skills and background so we can match you with the right jobs.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 space-y-1 sm:space-y-2">
            <label className="text-xs sm:text-sm font-medium text-gray-700 block">
              Full legal name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullLegalName"
              value={formData.fullLegalName}
              onChange={handleInputChange}
              onBlur={() => handleBlur('fullLegalName')}
              placeholder="Enter your full legal name"
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#E6EFED] border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent transition text-xs sm:text-sm text-[#696969] ${
                touched.fullLegalName && errors.fullLegalName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched.fullLegalName && errors.fullLegalName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullLegalName}</p>
            )}
          </div>

          <div className="flex-1 space-y-1 sm:space-y-2">
            <label className="text-xs sm:text-sm font-medium text-gray-700 block">
              Phone number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              onBlur={() => handleBlur('phoneNumber')}
              placeholder="+250 7XX XXX XXX"
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#E6EFED] border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent transition text-xs sm:text-sm text-[#696969] ${
                touched.phoneNumber && errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-gray-700 block">
            Residential address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="residentialAddress"
            value={formData.residentialAddress}
            onChange={handleInputChange}
            onBlur={() => handleBlur('residentialAddress')}
            placeholder="Street, house number"
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#E6EFED] border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent transition text-xs sm:text-sm text-[#696969] ${
              touched.residentialAddress && errors.residentialAddress ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {touched.residentialAddress && errors.residentialAddress && (
            <p className="text-red-500 text-xs mt-1">{errors.residentialAddress}</p>
          )}
        </div>

        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-gray-700 block">
            Service type <span className="text-red-500">*</span>
          </label>
          <select
            name="serviceType"
            value={selectedService}
            onChange={handleServiceChange}
            onBlur={() => handleBlur('serviceType')}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#E6EFED] border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent transition text-xs sm:text-sm text-[#696969] ${
              touched.serviceType && errors.serviceType ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select a service type</option>
            <option value="plumber">Plumber</option>
            <option value="electrician">Electrician</option>
            <option value="cleaner">Cleaner</option>
            <option value="painter">Painter</option>
            <option value="gardener">Gardener</option>
            <option value="handyman">Handyman</option>
            <option value="other">Other</option>
          </select>
          {touched.serviceType && errors.serviceType && (
            <p className="text-red-500 text-xs mt-1">{errors.serviceType}</p>
          )}

          {showOtherService && (
            <div className="mt-2 sm:mt-3">
              <input
                type="text"
                name="otherService"
                value={formData.otherService}
                onChange={handleInputChange}
                onBlur={() => handleBlur('otherService')}
                placeholder="Describe your service"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#E6EFED] border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent transition text-xs sm:text-sm text-[#696969] ${
                  touched.otherService && errors.otherService ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {touched.otherService && errors.otherService && (
                <p className="text-red-500 text-xs mt-1">{errors.otherService}</p>
              )}
            </div>
          )}
        </div>

        {selectedService && selectedService !== "other" && currentTags.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-gray-700 block">
              Service Tags <span className="text-red-500">*</span>
            </label>
            <p className="text-gray-500 text-xs">Select the services you offer</p>
            <div className="flex flex-wrap gap-3">
              {currentTags.map((tag) => (
                <label key={tag} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.serviceTags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                    className="rounded border-gray-300 text-brandText focus:ring-brandText"
                  />
                  <span className="text-sm text-gray-700">{tag}</span>
                </label>
              ))}
            </div>
            {touched.serviceTags && errors.serviceTags && (
              <p className="text-red-500 text-xs mt-1">{errors.serviceTags}</p>
            )}
          </div>
        )}

        {selectedService === "other" && (
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-gray-700 block">
              Service Tags <span className="text-red-500">*</span>
            </label>
            <p className="text-gray-500 text-xs">Enter your service tags separated by commas (e.g., Leak Repair, Installation)</p>
            <input
              type="text"
              value={formData.serviceTags.join(", ")}
              onChange={(e) => handleCustomTagsChange(e.target.value)}
              onBlur={() => handleBlur('serviceTags')}
              placeholder="e.g., Leak Repair, Installation"
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#E6EFED] border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent transition text-xs sm:text-sm text-[#696969] ${
                touched.serviceTags && errors.serviceTags ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched.serviceTags && errors.serviceTags && (
              <p className="text-red-500 text-xs mt-1">{errors.serviceTags}</p>
            )}
          </div>
        )}

        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-gray-700 block">
            About You <span className="text-red-500">*</span>
          </label>
          <textarea
            name="aboutYou"
            rows={4}
            value={formData.aboutYou}
            onChange={handleInputChange}
            onBlur={() => handleBlur('aboutYou')}
            placeholder="Tell us about your skills, experience..."
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#E6EFED] border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent transition resize-none text-xs sm:text-sm text-[#696969] ${
              touched.aboutYou && errors.aboutYou ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {touched.aboutYou && errors.aboutYou && (
            <p className="text-red-500 text-xs mt-1">{errors.aboutYou}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4">
          {onBack && (
            <button
              onClick={handleBack}
              className="bg-transparent text-gray-700 py-2 px-6 rounded-lg font-medium border border-gray-300 hover:border-brandOrange hover:text-brandOrange transition-all duration-300 text-sm order-2 sm:order-1 w-full sm:w-auto"
            >
              Back
            </button>
          )}
          <button
            onClick={handleContinue}
            className="bg-brandText text-white py-2 px-6 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 hover:scale-[1.02] text-sm order-1 sm:order-2 w-full sm:w-auto sm:ml-auto"
          >
            Continue to review
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;

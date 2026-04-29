import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiMapPin, FiClock, FiUpload, FiX, FiCheckCircle, FiAlertTriangle, FiShield, FiPhone, FiUser } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import Footer from "../landingpages/Footer";
import { supabase } from "@/lib/supabase";
import { fetchSkillsForProvider } from "@/lib/provider-marketplace";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Provider {
  id: string;
  full_name: string;
  service_type: string;
  base_location: string;
  min_cost?: number;
  skills?: string[];
  rating?: string;
  completed_jobs?: string;
  job_done?: number;
  provider_bio?: string;
  bio?: string;
}

interface UploadedMedia {
  id: string;
  name: string;
  type: "image" | "video";
  preview: string;
  file: File;
}

const formatCurrency = (amount: number | string | undefined): string => {
  if (!amount) return "0 RWF";
  const num = typeof amount === "string" ? parseInt(amount, 10) : amount;
  if (isNaN(num)) return "0 RWF";
  return `${num.toLocaleString("en-US").replace(/,/g, ",")} RWF`;
};

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const provider = location.state?.provider as Provider | undefined;

  useEffect(() => {
    // Removed redirect to /providers
  }, [provider, navigate]);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [urgency, setUrgency] = useState<"normal" | "urgent">("normal");
  const [selectedChecklist, setSelectedChecklist] = useState<string[]>([]);
  const [uploadedMedia, setUploadedMedia] = useState<UploadedMedia[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [otherInput, setOtherInput] = useState<string>("");
  const [showOtherInput, setShowOtherInput] = useState<boolean>(false);
  const [providerSkills, setProviderSkills] = useState<string[]>([]);

  const mediaInputRef = useRef<HTMLInputElement>(null);

  const nameRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);
  const landmarkRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const taskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProviderSkills = async () => {
      if (provider?.id) {
        // Use skills from provider object if available, otherwise fetch from database
        if (provider.skills && provider.skills.length > 0) {
          setProviderSkills(provider.skills);
        } else {
          const skills = await fetchSkillsForProvider(provider.id);
          setProviderSkills(skills);
        }
      }
    };
    loadProviderSkills();
  }, [provider?.id, provider?.skills]);

  const scrollToNext = (nextRef: React.RefObject<HTMLDivElement | null>) => {
    if (window.innerWidth <= 768 && nextRef.current) { // mobile/tablet
      nextRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const validatePhoneNumber = (phone: string): boolean => {
    // Allow only numbers and common phone formatting characters
    const phoneRegex = /^[\d\s\-+()]*$/;
    return phoneRegex.test(phone);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    if (e.target.value.trim()) {
      scrollToNext(phoneRef);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validatePhoneNumber(value)) {
      setPhoneNumber(value);
      if (value.trim()) {
        scrollToNext(addressRef);
      }
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    if (e.target.value.trim()) {
      scrollToNext(dateRef);
    }
  };

  const handleLandmarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLandmark(e.target.value);
    if (e.target.value.trim()) {
      scrollToNext(timeRef);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    if (e.target.value) {
      scrollToNext(taskRef);
    }
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    // No next field after time
  };

  const handleTaskDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 300) setTaskDescription(e.target.value);
    // No scroll after task
  };

  const timeSlots: TimeSlot[] = [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: true },
    { time: '12:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: true },
    { time: '17:00', available: true },
  ];

  const checklist = providerSkills;

  const handleUrgencyChange = (value: "normal" | "urgent") => {
    setUrgency(value);
    if (value === "urgent") {
      setSelectedDate(new Date().toISOString().split("T")[0]);
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const remainingSlots = Math.max(0, 3 - uploadedMedia.length);
    
    if (uploadedMedia.length < 3 && remainingSlots > 0) {
      Array.from(files).slice(0, remainingSlots).forEach(file => {
        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");
        if (!isVideo && !isImage) {
          alert("Only images and videos are allowed");
          return;
        }
        if (file.size > 10 * 1024 * 1024) {
          alert("Each file must be under 10MB");
          return;
        }
        setUploadedMedia(prev => [
          ...prev,
          {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            type: isVideo ? "video" : "image",
            preview: URL.createObjectURL(file),
            file,
          },
        ]);
      });
    } else {
      alert("You can only upload up to 3 files.");
    }
  };

  const removeMedia = (id: string) => {
    setUploadedMedia(prev => prev.filter(m => m.id !== id));
  };

  const toggleChecklist = (item: string) => {
    if (item === "Other") {
      if (!selectedChecklist.includes("Other")) {
        setSelectedChecklist(prev => [...prev, item]);
        setShowOtherInput(true);
      } else {
        setSelectedChecklist(prev => prev.filter(i => i !== item));
        setShowOtherInput(false);
        setOtherInput("");
      }
    } else {
      setSelectedChecklist(prev =>
        prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
      );
    }
  };

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherInput(e.target.value);
  };

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith("image/")) {
        resolve(file);
        return;
      }
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = Math.min(1, 1200 / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => resolve(blob ? new File([blob], file.name, { type: "image/jpeg" }) : file),
          "image/jpeg",
          0.7
        );
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadSingle = (file: File, index: number, progressMap: number[], retries = 2): Promise<string> => {
    return new Promise((resolve, reject) => {
      compressImage(file).then(compressed => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append("file", compressed);
        formData.append("upload_preset", "GoFixandClean");
        xhr.open("POST", "https://api.cloudinary.com/v1_1/dufxdw0zr/upload");
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            progressMap[index] = e.loaded / e.total;
            setUploadProgress(Math.round(progressMap.reduce((a, b) => a + b, 0) / progressMap.length * 100));
          }
        };
        xhr.onload = () => {
          const res = JSON.parse(xhr.responseText);
          if (res.secure_url) {
            resolve(res.secure_url);
          } else {
            reject("No URL returned");
          }
        };
        xhr.onerror = () => {
          if (retries > 0) {
            uploadSingle(file, index, progressMap, retries - 1).then(resolve).catch(reject);
          } else {
            reject("Upload failed after retries");
          }
        };
        xhr.send(formData);
      }).catch(reject);
    });
  };

  const uploadAllMedia = async (): Promise<string[]> => {
    if (uploadedMedia.length === 0) return [];
    
    const progressMap: number[] = new Array(uploadedMedia.length).fill(0);
    setUploadProgress(0);
    setUploading(true);
    
    try {
      const uploadPromises = uploadedMedia.map((media, index) => 
        uploadSingle(media.file, index, progressMap)
      );
      const urls = await Promise.all(uploadPromises);
      setUploadProgress(100);
      setUploading(false);
      return urls;
    } catch (error) {
      console.error("Error uploading media:", error);
      setUploading(false);
      throw error;
    }
  };

  const handleBooking = async () => {
    if (!fullName.trim()) {
      alert("Please enter your full name");
      return;
    }
    if (!phoneNumber.trim()) {
      alert("Please enter your phone number");
      return;
    }
    // Validate phone contains only numbers and common phone characters
    if (!validatePhoneNumber(phoneNumber)) {
      alert("Please enter a valid phone number (numbers only)");
      return;
    }
    if (!address.trim()) {
      alert("Please enter your address");
      return;
    }
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }
    if (!taskDescription.trim()) {
      alert("Please describe your task");
      return;
    }
    if (selectedChecklist.includes("Other") && !otherInput.trim()) {
      alert("Please specify what 'Other' service you need");
      return;
    }

    if (!provider) {
      alert("Provider information is missing");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("📤 Submitting booking...");

      // Upload media to Cloudinary first
      let mediaUrls: string[] = [];
      if (uploadedMedia.length > 0) {
        console.log("Uploading media...");
        mediaUrls = await uploadAllMedia();
        console.log("Media uploaded:", mediaUrls);
      }

      const bookingPayload: Record<string, any> = {
        customer_name: fullName,
        phone: phoneNumber,
        address: address,
        landmark: landmark,
        service_type: provider.service_type,
        task_description: taskDescription,
        urgency: urgency,
        scheduled_date: selectedDate,
        scheduled_time: selectedTime,
      };

      if (mediaUrls.length > 0) {
        bookingPayload.media_urls = mediaUrls;
      }

      const { error } = await supabase
        .from('bookings')
        .insert(bookingPayload);

      if (error) {
        console.error('Error inserting booking:', error);
        alert('Failed to submit booking. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setBookingSuccess(true);
      setIsSubmitting(false);

    } catch (error) {
      console.error("❌ Error submitting booking:", error);
      alert("Error submitting booking. Please check your internet connection.");
      setIsSubmitting(false);
    }
  };

  if (!provider) return null;

  if (bookingSuccess) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 p-10 px-6 md:px-16 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle className="h-8 w-8" style={{color: '#025e4c'}} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Request Sent!</h3>
            <p className="text-gray-600 text-sm mb-4">
              Your booking request has been sent to <strong>{provider.full_name}</strong>. They will review and respond shortly.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-medium text-gray-900">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time</span>
                <span className="font-medium text-gray-900">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Urgency</span>
                <span className={`font-medium ${urgency === "urgent" ? "text-orange-600" : "text-gray-900"}`}>
                  {urgency === "urgent" ? "Urgent (Same Day)" : "Normal"}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              You'll receive a notification once {provider.full_name} confirms your booking.
            </p>
            <button
              onClick={() => navigate('/services')}
              className="w-full bg-brandText hover:bg-brandText/90 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Book Another Service
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
         
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-8">
              <div className="mb-6">
                <div className="font-bold text-3xl text-brandText">
                  {provider.min_cost ? formatCurrency(provider.min_cost) : "Contact"}
                </div>
                {provider.min_cost && (
                  <div className="text-xs text-gray-400 uppercase tracking-wide">FROM</div>
                )}
              </div>
            
              <div className="mb-6">
                <p className="text-xs font-semibold text-brandText uppercase tracking-wider mb-3">1. Your Info</p>
                <div className="space-y-3">
                  <div ref={nameRef}>
                    <label className="block text-sm  text-brandTealMedium mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brandTealMedium" />
                      <input
                        value={fullName}
                        onChange={handleFullNameChange}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText text-sm"
                      />
                    </div>
                  </div>
                  <div ref={phoneRef}>
                    <label className="block text-sm  text-brandTealMedium mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brandTealMedium" />
                      <input
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="+250 7XX XXX XXX"
                        type="tel"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

             
              <div className="mb-6">
                <p className="text-xs font-semibold text-brandText uppercase tracking-wider mb-3">2. Location</p>
                <div className="space-y-3">
                  <div ref={addressRef}>
                    <label className="block text-sm font-medium text-brandTealMedium mb-1">
                      Exact Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brandTealMedium" />
                      <input
                        value={address}
                        onChange={handleAddressChange}
                        placeholder="Street, house number"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText text-sm"
                      />
                    </div>
                  </div>
                  <div ref={landmarkRef}>
                    <label className="block text-sm font-medium text-brandTealMedium mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      value={landmark}
                      onChange={handleLandmarkChange}
                      placeholder="Near school, church, etc."
                      className="w-full px-4 py-2.5 border border-gray-200 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText text-sm"
                    />
                  </div>
                </div>
              </div>

            
              <div className="mb-6">
                <p className="text-xs font-semibold text-brandText uppercase tracking-wider mb-3">3. Date & Time</p>
                <div className="space-y-3">
                  <div ref={dateRef}>
                    <label className="block text-sm font-medium text-brandTealMedium mb-1">
                      Select Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-brandText"
                    />
                  </div>
                  <div ref={timeRef}>
                    <label className="block text-sm font-medium text-brandTealMedium mb-1">
                      Select Time <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map(slot => (
                        <button
                          type="button"
                          key={slot.time}
                          onClick={() => handleTimeChange(slot.time)}
                          className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                            selectedTime === slot.time
                              ? "bg-brandText text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

             
              <div className="mb-6">
                <p className="text-xs font-semibold text-brandText uppercase tracking-wider mb-3">4. Service Details</p>

                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-brandTealMedium mb-2">
                    What do you need help with?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {checklist.map(item => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => toggleChecklist(item)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                          selectedChecklist.includes(item)
                            ? "bg-brandText text-white border-brandText"
                            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {showOtherInput && (
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-brandTealMedium mb-1">
                      Please specify your other requirement <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={otherInput}
                      onChange={handleOtherInputChange}
                      placeholder="Enter your specific requirement..."
                      className="w-full px-4 py-2.5 border border-gray-200 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText text-sm"
                    />
                  </div>
                )}

                <div className="mb-3" ref={taskRef}>
                  <label className="block text-sm font-medium text-brandTealMedium mb-1">
                    Describe Your Task <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={taskDescription}
                    onChange={handleTaskDescriptionChange}
                    placeholder="Describe what you need help with..."
                    rows={3}
                    maxLength={300}
                    className="w-full px-4 py-2.5 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText resize-none text-sm"
                  />
                  <p className="text-xs text-gray-400 text-right mt-1">
                    {taskDescription.length}/300 characters
                  </p>
                </div>
              
              
                <div className="mb-3">
                  <label className="block text-sm font-medium text-brandTealMedium mb-2">Urgency</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleUrgencyChange("normal")}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        urgency === "normal"
                          ? "bg-brandText text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Normal
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUrgencyChange("urgent")}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                        urgency === "urgent"
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <FiAlertTriangle className="h-3 w-3" />
                      Urgent (Same Day)
                    </button>
                  </div>
                </div>

                {/* Media Upload */}
                <div>
                  <label className="block text-sm font-medium text-brandTealMedium mb-1">
                    Add Photos/Videos
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded ml-2">
                      Recommended
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Upload up to 3 images or videos to help describe your task (optional but recommended)
                  </p>
                  {uploading && (
                    <div className="mt-2 mb-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-brandText h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Uploading ({uploadProgress}%)</p>
                    </div>
                  )}
                  {uploadedMedia.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {uploadedMedia.map(media => (
                        <div key={media.id} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                          {media.type === "image" ? (
                            <img src={media.preview} alt="Upload" className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <FiUpload className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeMedia(media.id)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                          >
                            <FiX className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="text-sm text-gray-600 mb-2">
                    {uploadedMedia.length}/3 files uploaded
                  </div>
                  <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <FiUpload className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Upload media</span>
                    <input
                      type="file"
                      ref={mediaInputRef}
                      className="hidden"
                      accept="image/*,video/*"
                      multiple
                      onChange={handleMediaUpload}
                    />
                  </label>
                </div>
              </div>

         
              <button
                type="button"
                className="w-full bg-brandText hover:bg-brandText/90 text-white font-semibold py-3 rounded-lg transition-colors mb-4 disabled:bg-gray-400"
                onClick={handleBooking}
                disabled={isSubmitting || uploading}
              >
                {isSubmitting ? "Sending Request..." : (uploading ? "Uploading files..." : "Request Service")}
              </button>

           
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FiShield className="h-3.5 w-3.5 text-green-500" />
                  <span>No payment upfront</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FiCheckCircle className="h-3.5 w-3.5" style={{color: '#025e4c'}} />
                  <span>Verified professionals</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FiClock className="h-3.5 w-3.5 text-green-500" />
                  <span>Fast response (within 1 hour)</span>
                </div>
              </div>

             
              <p className="text-xs text-gray-500 text-center mt-3 border-t border-gray-200 pt-3">
                ⚠ Cancellation after worker dispatch may incur a fee.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg bg-[#dfe7e5] flex items-center justify-center text-2xl font-bold text-brandText flex-shrink-0">
                  {provider.full_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-brandTealMedium">{provider.full_name}</h2>
                    <FiCheckCircle className="h-5 w-5" style={{color: '#025e4c'}} />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{provider.service_type}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-brandYellow" />
                      <span className="text-gray-700">{provider.rating || "4.5"}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <FiMapPin className="w-4 h-4" />
                      <span>{provider.base_location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <FiClock className="w-4 h-4" />
                      <span>Responds within 1 hour</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-brandTealMedium mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">
                {provider.provider_bio || "Professional service provider with verified credentials."}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-brandTealMedium mb-4">Skills & Services</h2>
              <div className="flex flex-wrap gap-2">
                {providerSkills.length > 0 ? (
                  providerSkills.map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-gray-100 text-brandText rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="px-4 py-2 bg-gray-100 text-brandText rounded-lg text-sm font-medium">
                    {provider.service_type}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Booking;

import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiMapPin, FiClock, FiStar, FiUpload, FiX, FiCheckCircle, FiAlertTriangle, FiShield, FiPhone, FiUser } from 'react-icons/fi';
import { MdOutlineVerified } from "react-icons/md";
import Footer from "../landingpages/Footer";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Provider {
  name: string;
  category: string;
  job: string;
  description: string;
  rating: string;
  location: string;
  price: string;
  image: string;
  completedjob: string;
  services: string[];
}

interface UploadedMedia {
  id: string;
  name: string;
  type: "image" | "video";
  preview: string;
  file: File;
}

const SERVICE_CHECKLISTS: Record<string, string[]> = {
  Electrical: ["No power", "Wiring issue", "Installation", "Lighting repair", "Other"],
  Plumbing: ["Leaking pipe", "Blocked drain", "Installation", "Water heater issue", "Other"],
  Cleaning: ["Deep cleaning", "Regular cleaning", "Move-in/out cleaning", "Office cleaning", "Other"],
  Painting: ["Interior painting", "Exterior painting", "Wallpaper", "Touch-up", "Other"],
  Cooking: ["Private event", "Meal prep", "Cooking class", "Catering", "Other"],
  Mechanics: ["Engine issue", "Brake problem", "Oil change", "Diagnostics", "Other"],
  Handyman: ["Furniture assembly", "Minor repair", "Installation", "Maintenance", "Other"],
  Moving: ["Packing", "Loading & transport", "Full move", "Single item", "Other"],
};

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const provider = location.state?.provider as Provider | undefined;

  useEffect(() => {
    if (!provider) {
      navigate('/providers');
    }
  }, [provider, navigate]);


  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [estimatedDuration, setEstimatedDuration] = useState("");
  const [urgency, setUrgency] = useState<"normal" | "urgent">("normal");
  const [selectedChecklist, setSelectedChecklist] = useState<string[]>([]);
  const [uploadedMedia, setUploadedMedia] = useState<UploadedMedia[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [otherInput, setOtherInput] = useState<string>("");
  const [showOtherInput, setShowOtherInput] = useState<boolean>(false);

  const mediaInputRef = useRef<HTMLInputElement>(null);

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

  const durationOptions = ["1 hour", "2–3 hours", "Half day (4 hrs)", "Full day (8 hrs)"];

  const checklist = SERVICE_CHECKLISTS[provider?.category || "Handyman"] || SERVICE_CHECKLISTS["Handyman"];

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
    return new Promise(async (resolve, reject) => {
      try {
        const compressed = await compressImage(file);
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
          res.secure_url ? resolve(res.secure_url) : reject("No URL returned");
        };
        xhr.onerror = () => retries > 0
          ? resolve(uploadSingle(file, index, progressMap, retries - 1))
          : reject("Upload failed after retries");
        xhr.send(formData);
      } catch (err) {
        reject(err);
      }
    });
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
    if (!estimatedDuration) {
      alert("Please select estimated duration");
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
      // 1. Upload to Cloudinary if files exist
      let mediaUrls: string[] = [];
      if (uploadedMedia.length > 0) {
        setUploading(true);
        setUploadStatus("Uploading files...");
        const progressMap = new Array(uploadedMedia.length).fill(0);
        mediaUrls = await Promise.all(
          uploadedMedia.map((m, i) => uploadSingle(m.file, i, progressMap))
        );
        setUploadStatus("Upload complete ✅");
        setUploading(false);
      }

      console.log("📤 Submitting booking via hidden form...");
      console.log("Data:", {
        fullName,
        phoneNumber,
        address,
        selectedDate,
        selectedTime,
        taskDescription,
        providerName: provider.name,
        checklist: selectedChecklist,
        mediaUrls,
      });

      // Create hidden iframe for submission target to avoid redirecting the main page
      let iframe = document.getElementById('hiddenFrame') as HTMLIFrameElement;
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'hiddenFrame';
        iframe.name = 'hiddenFrame';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }

      const hiddenForm = document.createElement('form');
      hiddenForm.method = 'POST';
      hiddenForm.action = 'https://submit-form.com/F0CHFKPyt';
      hiddenForm.style.display = 'none';
      hiddenForm.target = 'hiddenFrame';

      const fields = [
        { name: 'fullName', value: fullName },
        { name: 'phoneNumber', value: phoneNumber },
        { name: 'address', value: address },
        { name: 'landmark', value: landmark },
        { name: 'selectedDate', value: selectedDate },
        { name: 'selectedTime', value: selectedTime },
        { name: 'taskDescription', value: taskDescription },
        { name: 'estimatedDuration', value: estimatedDuration },
        { name: 'urgency', value: urgency },
        { name: 'checklist', value: JSON.stringify(selectedChecklist) },
        { name: 'otherInput', value: otherInput },
        { name: 'mediaUrls', value: JSON.stringify(mediaUrls) },
        { name: 'providerName', value: provider.name },
        { name: 'providerCategory', value: provider.category },
        { name: 'mediaCount', value: uploadedMedia.length.toString() },
      ];

      fields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = field.name;
        input.value = field.value;
        hiddenForm.appendChild(input);
      });

      document.body.appendChild(hiddenForm);
      hiddenForm.submit();

      setTimeout(() => {
        setBookingSuccess(true);
        setIsSubmitting(false);
      }, 500);

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
              <FiCheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Request Sent!</h3>
            <p className="text-gray-600 text-sm mb-4">
              Your booking request has been sent to <strong>{provider.name}</strong>. They will review and respond shortly.
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
                <span className="text-gray-600">Duration</span>
                <span className="font-medium text-gray-900">{estimatedDuration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Urgency</span>
                <span className={`font-medium ${urgency === "urgent" ? "text-orange-600" : "text-gray-900"}`}>
                  {urgency === "urgent" ? "Urgent (Same Day)" : "Normal"}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              You'll receive a notification once {provider.name} confirms your booking.
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
            
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-3xl font-bold text-brandTealMedium">{provider.price}</p>
                  <p className="text-sm text-gray-500">FROM</p>
                </div>
              </div>

             
              <div className="mb-6">
                <p className="text-xs font-semibold text-brandText uppercase tracking-wider mb-3">1. Your Info</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm  text-brandTealMedium mb-1">
                      Full Name <span className="text-red-500m">*</span>
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brandTealMedium" />
                      <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm  text-brandTealMedium mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brandTealMedium" />
                      <input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
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
                  <div>
                    <label className="block text-sm font-medium text-brandTealMedium mb-1">
                      Exact Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brandTealMedium" />
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street, house number"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brandTealMedium mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="Near school, church, etc."
                      className="w-full px-4 py-2.5 border border-gray-200 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText text-sm"
                    />
                  </div>
                </div>
              </div>

            
              <div className="mb-6">
                <p className="text-xs font-semibold text-brandText uppercase tracking-wider mb-3">3. Date & Time</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-brandTealMedium mb-1">
                      Select Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-brandText"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brandTealMedium mb-1">
                      Select Time <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map(slot => (
                        <button
                          type="button"
                          key={slot.time}
                          onClick={() => setSelectedTime(slot.time)}
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

                <div className="mb-3">
                  <label className="block text-sm font-medium text-brandTealMedium mb-1">
                    Describe Your Task <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={taskDescription}
                    onChange={(e) => {
                      if (e.target.value.length <= 300) setTaskDescription(e.target.value);
                    }}
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
                  <label className="block text-sm font-medium text-brandTealMedium mb-2">
                    Estimated Duration <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {durationOptions.map(opt => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setEstimatedDuration(opt)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${
                          estimatedDuration === opt
                            ? "bg-brandText text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <FiClock className="h-3 w-3" />
                        {opt}
                      </button>
                    ))}
                  </div>
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
                      <p className="text-xs text-gray-500 mt-1">{uploadStatus} ({uploadProgress}%)</p>
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
                  <FiCheckCircle className="h-3.5 w-3.5 text-green-500" />
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
              <div className="flex items-start gap-4">
                {provider.image ? (
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-brandText flex items-center justify-center text-2xl font-bold text-white">
                    {provider.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-brandTealMedium">{provider.name}</h1>
                    <MdOutlineVerified className="w-5 h-5 text-brandText" />
                  </div>
                  <p className="text-gray-500 text-sm mb-3">{provider.category}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-gray-900">{provider.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiMapPin className="w-4 h-4" />
                      <span>{provider.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      <span>Responds within 1 hour</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-brandTealMedium mb-4">About</h2>
              <p className="text-gray-500 leading-relaxed text-sm">{provider.description}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-brandTealMedium mb-4">Skills & Services</h2>
              <div className="flex flex-wrap gap-2">
                {provider.services.map((service, idx) => (
                  <span key={idx} className="px-4 py-2 bg-gray-100 text-brandText rounded-lg text-sm font-medium">
                    {service}
                  </span>
                ))}
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

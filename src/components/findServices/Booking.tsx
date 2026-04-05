import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiMapPin, FiClock, FiStar, FiBriefcase, FiCalendar, FiUpload, FiThumbsUp, FiX, FiCheckCircle, FiAlertTriangle, FiShield, FiPhone, FiUser } from 'react-icons/fi';
import { LuMessageCircle } from "react-icons/lu";
import { MdOutlineVerified } from "react-icons/md";
import { TiStarOutline } from "react-icons/ti";
import Footer from "../landingpages/Footer";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  providerResponse?: string;
  helpful: number;
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

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: 'Adaeze Okonkwo',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 5,
      date: '1/15/2024',
      comment: 'Excellent service! The work was done professionally and on time. I highly recommend this provider for any plumbing needs. Very friendly and explained everything clearly.',
      providerResponse: 'Thank you so much for your kind words! It was a pleasure working with you.',
      helpful: 12
    },
    {
      id: 2,
      name: 'Emeka Nwosu',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      rating: 4,
      date: '1/10/2024',
      comment: 'Good job overall. Arrived a bit late but the quality of work was great. Would use again.',
      helpful: 5
    },
    {
      id: 3,
      name: 'Chiamaka Eze',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      rating: 4,
      date: '1/5/2024',
      comment: 'Very professional and friendly. Will definitely hire again.',
      helpful: 8
    }
  ]);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');

  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => r.rating === stars).length;
    const percentage = totalReviews ? (count / totalReviews) * 100 : 0;
    return { stars, count, percentage };
  });

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
        setUploadedMedia(prev => [
          ...prev,
          {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            type: isVideo ? "video" : "image",
            preview: URL.createObjectURL(file),
          },
        ]);
      });
    } else {
      alert(`Please upload at least 3 photos or videos. You have uploaded ${uploadedMedia.length} file(s).`);
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

  const handleBooking = () => {
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
    if (uploadedMedia.length < 3) {
      alert(`Please upload at least 3 photos or videos. You have uploaded ${uploadedMedia.length} file(s).`);
      return;
    }
    if (selectedChecklist.includes("Other") && !otherInput.trim()) {
      alert("Please specify what 'Other' service you need");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccess(true);
    }, 1500);
  };

  const renderStars = (rating: number, size: string = 'w-4 h-4') => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`${size} ${
              star <= rating
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleSubmitReview = () => {
    if (!newComment.trim()) {
      alert('Please write a review comment.');
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      name: 'You',
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      rating: newRating,
      date: new Date().toLocaleDateString('en-US'),
      comment: newComment.trim(),
      helpful: 0,
    };

    setReviews([newReview, ...reviews]);
    setNewRating(5);
    setNewComment('');
    setShowReviewForm(false);
  };

  const handleCancelReview = () => {
    setNewRating(5);
    setNewComment('');
    setShowReviewForm(false);
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
              onClick={() => setBookingSuccess(false)}
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
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Describe what you need help with..."
                    rows={3}
                    className="w-full px-4 py-2.5 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText resize-none text-sm"
                  />
                </div>

              
                <div className="mb-3">
                  <label className="block text-sm font-medium text-brandTealMedium mb-2">
                    Estimated Duration <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {durationOptions.map(opt => (
                      <button
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
                    Add Photos/Videos <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Please upload at least 3 images or videos to help describe the task
                  </p>
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
                className="w-full bg-brandText hover:bg-brandText/90 text-white font-semibold py-3 rounded-lg transition-colors mb-4"
                onClick={handleBooking}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending Request..." : "Request Service"}
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
                <img src={provider.image} alt={provider.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-brandTealMedium">{provider.name}</h1>
                    <MdOutlineVerified className="w-5 h-5 text-brandText" />
                  </div>
                  <p className="text-gray-500 text-sm mb-3">{provider.category}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-gray-900">{averageRating.toFixed(1)}</span>
                      <span>({totalReviews} reviews)</span>
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

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-brandTealMedium mb-4">Experience</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  <FiBriefcase className="w-8 h-8 text-brandText mx-auto mb-2" />
                  <p className="text-2xl font-bold text-brandTealMedium">342</p>
                  <p className="text-xs text-brandGreenLight">Jobs completed</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <TiStarOutline className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-brandTealMedium">4.9</p>
                  <p className="text-xs text-brandGreenLight">Avg.Rating</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <LuMessageCircle className="w-8 h-8 text-brandTealMedium mx-auto mb-2" />
                  <p className="text-2xl font-bold text-brandTealMedium">127</p>
                  <p className="text-sm text-brandGreenLight">Reviews</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <FiCalendar className="w-8 h-8 text-brandTealMedium mx-auto mb-2" />
                  <p className="text-2xl font-bold text-brandTealMedium">2020</p>
                  <p className="text-xs text-brandGreenLight">Member Since</p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-brandTealMedium">Reviews & Ratings</h2>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-3 py-2 bg-brandText hover:bg-brandText/90 text-white text-xs rounded-lg transition-colors"
                >
                  Write a Review
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
                <div>
                  <div className="text-5xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
                  {renderStars(Math.round(averageRating))}
                  <p className="text-sm text-gray-600 mt-2">{totalReviews} reviews</p>
                </div>
                <div className="space-y-2">
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center gap-3">
                      <span className="text-sm text-gray-400 w-8">{item.stars}★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500 w-8 text-right">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {showReviewForm && (
                <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm text-brandTealMedium">Your Review for {provider.name}</h3>
                    <button onClick={handleCancelReview} className="text-gray-500 hover:text-gray-700">
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-brandGreenLight mb-2">Select Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="focus:outline-none"
                        >
                          <FiStar
                            className={`w-6 h-6 ${
                              star <= newRating
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <textarea
                      rows={4}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write your review here..."
                      className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText resize-none text-brandTealMedium text-xs"
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={handleSubmitReview}
                      className="px-4 py-2 bg-brandText text-white text-sm rounded-lg hover:bg-brandText/90 transition-colors"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0">
                    <div className="flex items-start gap-4">
                      <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-brandTealMedium">{review.name}</h4>
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed mb-3">{review.comment}</p>
                        {review.providerResponse && (
                          <div className="bg-gray-100 rounded-lg p-4 mb-3">
                            <p className="text-xs font-semibold text-brandText mb-1">Provider Response</p>
                            <p className="text-xs text-gray-500">{review.providerResponse}</p>
                          </div>
                        )}
                        <button className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 transition-colors">
                          <FiThumbsUp className="w-4 h-4" />
                          <span className="text-gray-500">Helpful ({review.helpful})</span>
                        </button>
                      </div>
                    </div>
                  </div>
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
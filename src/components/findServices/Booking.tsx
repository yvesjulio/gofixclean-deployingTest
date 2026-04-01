import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiMapPin, FiClock, FiStar, FiBriefcase,FiCalendar, FiUpload, FiThumbsUp, FiX } from 'react-icons/fi';
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

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const provider = location.state?.provider as Provider | undefined;

  useEffect(() => {
    if (!provider) {
      navigate('/providers');
    }
  }, [provider, navigate]);

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [bookingErrors, setBookingErrors] = useState<{ date?: string; time?: string }>({});

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

 
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageSubject, setMessageSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);


  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => r.rating === stars).length;
    const percentage = totalReviews ? (count / totalReviews) * 100 : 0;
    return { stars, count, percentage };
  });

  const handleBookNow = () => {
    const errors: { date?: string; time?: string } = {};
    if (!selectedDate) errors.date = 'Please select a date';
    if (!selectedTime) errors.time = 'Please select a time';
    if (Object.keys(errors).length > 0) {
      setBookingErrors(errors);
      return;
    }
    setBookingErrors({});
    console.log('Booking:', { selectedDate, selectedTime, taskDescription, uploadedFile, provider });
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

  
  const handleAttachFile = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setAttachedFile(e.target.files[0]);
  };
  const handleSendMessage = () => {
    if (!messageBody.trim()) {
      alert('Please write a message.');
      return;
    }
    console.log('Sending message:', {
      to: provider?.name,
      subject: messageSubject,
      message: messageBody,
      file: attachedFile?.name
    });
    setMessageSubject('');
    setMessageBody('');
    setAttachedFile(null);
    setShowMessageModal(false);
  };
  const closeModal = () => {
    setShowMessageModal(false);
    setMessageSubject('');
    setMessageBody('');
    setAttachedFile(null);
  };

  
  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
   
    if (mediaInputRef.current) {
      mediaInputRef.current.value = '';
    }
  };

  const removeMedia = () => {
    setUploadedFile(null);
    if (mediaInputRef.current) {
      mediaInputRef.current.value = '';
    }
  };

  if (!provider) return null;

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-10 px-6 md:px-16">
        <div className="max-w-325 w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl  p-6 border border-gray-200 sticky top-8">
              <div className="mb-6">
                <p className="text-3xl font-bold text-brandTealMedium">{provider.price}</p>
                <p className="text-gray-500 text-sm">per hour</p>
              </div>

            
              <div className="mb-6">
                <label className="block text-sm text-brandTealMedium mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText bg-gray-100 text-brandTealMedium ${
                    bookingErrors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {bookingErrors.date && <p className="text-red-500 text-xs mt-1">{bookingErrors.date}</p>}
              </div>

             
              <div className="mb-6">
                <label className="block text-sm text-brandTealMedium mb-2">Select Time</label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedTime === slot.time
                          ? 'bg-brandText text-white'
                          : slot.available
                          ? 'bg-gray-100 text-brandTealMedium hover:bg-gray-200'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
                {bookingErrors.time && <p className="text-red-500 text-xs mt-1">{bookingErrors.time}</p>}
              </div>

          
              <div className="mb-6">
                <label className="block text-sm text-brandTealMedium mb-2">Describe Your Task</label>
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="Describe what you need help with..."
                  rows={4}
                  className="w-full h-18 px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText resize-none text-gray-700 text-sm"
                />
              </div>

            
              <div className="mb-6">
                <label className="block text-sm text-brandTealMedium mb-2">Add Photo/Video (Optional)</label>
                <p className="text-xs text-gray-500 mb-3">Upload an image or video to help describe the task</p>

      {!uploadedFile ? (
    <div>
      <input
        type="file"
        ref={mediaInputRef}
        accept="image/*,video/*"
        onChange={handleMediaChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => mediaInputRef.current?.click()}
        className="w-full px-4 py-3 hover:bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-300 transition-colors flex items-center justify-center gap-2 "
      >
        <FiUpload className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-medium text-gray-500">Upload media</span>
      </button>
    </div>
                ) : (
                  <div className="mt-2">
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <span className="text-sm text-gray-700 truncate">{uploadedFile.name}</span>
                      <button
                        type="button"
                        onClick={removeMedia}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-4">
                <button
    onClick={handleBookNow}
    className="w-full bg-brandText text-sm hover:bg-brandText/90 text-white font-semibold py-3 rounded-lg transition-colors"
  >
    Book Now
  </button>
               <button
    onClick={() => setShowMessageModal(true)}
    className="w-full hover:bg-brandOrange hover:text-white border text-sm border-gray-300 bg-gray-100 text-brandTealMedium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
  >
    <LuMessageCircle className="w-4 h-4" />
    <span>Message</span>
  </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                You won't be charged yet. Payment is collected after the service is completed.
              </p>
            </div>
          </div>

        
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl  p-6 border border-gray-200">
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

            <div className="bg-white rounded-2xl  p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-brandTealMedium mb-4">Skills & Services</h2>
              <div className="flex flex-wrap gap-2">
                {provider.services.map((service, idx) => (
                  <span key={idx} className="px-4 py-2 bg-gray-100 text-brandText rounded-lg text-sm font-medium">
                    {service}
                  </span>
                ))}
              </div>
            </div>

           
            <div className="bg-white rounded-2xl  p-6 border border-gray-200">
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

          
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-brandTealMedium">Reviews & Ratings</h2>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-3 py-2 bg-brandText hover:bg-brandText/90 text-white text-xs  rounded-lg transition-colors"
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
                            <h4 className=" text-brandTealMedium">{review.name}</h4>
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
                          <FiThumbsUp className="w-4 h-4 "/>
                          <span className='text-gray-500'>Helpful ({review.helpful})</span>
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

     
      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-gray-200 rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start ">
                <h2 className="text-xl font-bold text-brandTealMedium">Message {provider.name}</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <p className="text-brandGreenLight text-xs mb-6">
                Send a message to discuss your project or ask questions
              </p>

              <div className="flex items-center gap-3 mb-6">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-brandTealMedium">{provider.name}</p>
                  <p className="text-xs text-brandGreenLight">Usually responds within 1 hour</p>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-brandTealMedium mb-1">
                  Subject (Optional)
                </label>
                <input
                  type="text"
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                  placeholder="What is this about?"
                  className="w-full px-4 py-2 border text-xs border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText text-brandTealMedium"
                />
              </div>

              <div className="mb-4">
  <label className="block text-sm font-medium text-brandTealMedium mb-1">
    Message
  </label>
  <textarea
    rows={4}
    value={messageBody}
    onChange={(e) => setMessageBody(e.target.value)}
    placeholder="Describe what you need help with..."
    className="w-full px-4 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandText resize-none text-brandTealMedium"
  />
</div>

              <div className="mb-6">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  onClick={handleAttachFile}
                  className="flex items-center gap-2 text-sm text-brandTealMedium hover:text-gray-900 transition-colors"
                >
                  <FiUpload className="w-4 h-4" />
                  Attach file
                </button>
                {attachedFile && (
                  <p className="text-xs text-gray-500 mt-1">Attached: {attachedFile.name}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-brandText hover:bg-brandText/90 text-white rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Booking;
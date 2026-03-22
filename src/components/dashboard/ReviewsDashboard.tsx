import  { useState } from 'react';
import { FiStar, FiMessageSquare } from 'react-icons/fi';

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  service: string;
  date: string;
  comment: string;
  status: 'replied' | 'pending';
  reply?: {
    text: string;
    date: string;
  };
}


function ReviewsDashboard() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'replied'>('all');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const reviews: Review[] = [
    {
      id: 1,
      name: "Adaeze Okonkwo",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5,
      service: "Pipe Repair",
      date: "1/15/2024",
      comment: "Excellent service! The work was done professionally and on time. I highly recommend this provider for any plumbing needs. Very friendly and explained everything clearly.",
      status: 'replied',
      reply: {
        text: "Thank you so much for your kind words! It was a pleasure working with you.",
        date: "1/16/2024"
      }
    },
    {
      id: 2,
      name: "Emeka Nwosu",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 4,
      service: "Bathroom Installation",
      date: "1/10/2024",
      comment: "Good job overall. Arrived a bit late but the quality of work was great. Would use again.",
      status: 'pending'
    },
    {
      id: 3,
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 5,
      service: "Drain Cleaning",
      date: "1/8/2024",
      comment: "Very professional and efficient. Solved the problem quickly and cleaned up perfectly after the job.",
      status: 'pending'
    },
    {
      id: 4,
      name: "Michael Brown",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      rating: 3,
      service: "Water Heater Repair",
      date: "1/5/2024",
      comment: "The repair was done okay, but communication could have been better. The technician arrived late without notice.",
      status: 'pending'
    }
  ];


  const totalReviews = reviews.length;
  const repliedCount = reviews.filter(r => r.status === 'replied').length;
  const pendingCount = reviews.filter(r => r.status === 'pending').length;
  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;


  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length
  }));

  const filteredReviews = reviews.filter(review => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return review.status === 'pending';
    if (activeTab === 'replied') return review.status === 'replied';
    return true;
  });

  
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <FiStar
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? 'fill-yellow-500 text-yellow-500'
            : 'fill-gray-200 text-gray-200'
        }`}
      />
    ));
  };

  const handleReply = (reviewId: number) => {
    setReplyingTo(reviewId);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyText('');
  };

  const handleSendReply = () => {
    console.log('Sending reply:', replyText);
    setReplyingTo(null);
    setReplyText('');
  };

  return (
    <div className="space-y-6 ">
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
  
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col items-center justify-center">
    <div className="text-4xl font-bold text-brandText mb-1">
      {averageRating.toFixed(1)}
    </div>
    <div className="flex gap-1  mb-2 ">
      {renderStars(Math.round(averageRating))}
    </div>
    <div className="text-sm text-brandText">Average Rating</div>
  </div>

  
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col items-center justify-center">
    <div className="text-4xl font-bold text-brandText mb-1">{totalReviews}</div>
    <div className="text-sm text-brandText">Total Reviews</div>
  </div>

  
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col items-center justify-center">
    <div className="text-4xl font-bold text-brandText mb-1">{repliedCount}</div>
    <div className="text-sm text-brandText">Replied</div>
  </div>

  
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col items-center justify-center">
    <div className="text-4xl font-bold text-brandText mb-1">{pendingCount}</div>
    <div className="text-sm text-brandText">Pending Reply</div>
  </div>
</div>
     
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Rating Distribution</h3>
        <div className="space-y-3">
          {ratingDistribution.map(({ rating, count }) => {
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={rating} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm font-medium text-gray-700">{rating}</span>
                  <FiStar className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                </div>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600 w-8 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'all'
              ? 'bg-brandText text-white'
              : 'bg-gray-200  text-gray-700  hover:bg-brandOrange hover:text-white border border-gray-300'
          }`}
        >
          All ({totalReviews})
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'pending'
              ? 'bg-brandText text-white'
              : 'bg-gray-200  text-gray-700 hover:bg-brandOrange hover:text-white border border-gray-300'
          }`}
        >
          Pending Reply ({pendingCount})
        </button>
        <button
          onClick={() => setActiveTab('replied')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'replied'
              ? 'bg-brandText text-white'
              : 'bg-gray-200  text-gray-700  hover:bg-brandOrange hover:text-white border border-gray-300'
          }`}
        >
          Replied ({repliedCount})
        </button>
      </div>

     
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex gap-4">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{review.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex gap-0.5">
                        {renderStars(review.rating)}
                      </div>
                      <span className="px-3 py-1 bg-gray-200 text-brandText text-sm rounded-xl">
                        {review.service}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>

                <p className="text-gray-500 leading-relaxed mb-4">{review.comment}</p>

               
                {review.status === 'replied' && review.reply && (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm  text-brandText">Your Response</span>
                      <span className="text-xs text-brandText">{review.reply.date}</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{review.reply.text}</p>
                  </div>
                )}

              
                {review.status === 'pending' && replyingTo !== review.id && (
                  <button
                    onClick={() => handleReply(review.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded-lg hover:bg-brandOrange hover:text-white transition-colors text-sm font-medium"
                  >
                    <FiMessageSquare className="w-4 h-4" />
                    Reply to Review
                  </button>
                )}

               
                {replyingTo === review.id && (
                  <div className="space-y-3">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your response..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      rows={4}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={handleCancelReply}
                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSendReply}
                        className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors text-sm font-medium"
                      >
                        Send Response
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

     
      {filteredReviews.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
          <p className="text-gray-500 text-lg">No reviews found in this category.</p>
        </div>
      )}
    </div>
  );
}

export default ReviewsDashboard;
import React, { useState } from 'react';
import { FiMapPin, FiCalendar, FiPhone, FiNavigation, FiUser, FiChevronDown, FiCheck, FiX } from 'react-icons/fi';

interface JobsDashboardProps {
  userName?: string;
  onNavigate?: (path: string) => void;
}

const JobsDashboard: React.FC<JobsDashboardProps> = () => {
  const jobRequests = [
    {
      id: 1,
      name: "Marie Claire",
      job: "Pipe Repair",
      location: "Kimihurura, Kigali (2.5 km)",
      date: "2024-01-20 at 10:00 AM",
      amount: "85,000 RWF",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      name: "Patrick Niyonzima",
      job: "Bathroom Installation",
      location: "Nyarutarama, Kigali (4.2 km)",
      date: "2024-01-21 at 2:00 PM",
      amount: "250,000 RWF",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 3,
      name: "Grace Uwimana",
      job: "Drain Cleaning",
      location: "Remera, Kigali (1.8 km)",
      date: "2024-01-22 at 9:00 AM",
      amount: "35,000 RWF",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ];

  const [activeJobs, setActiveJobs] = useState([
    {
      id: 1,
      name: "Emmanuel Habimana",
      job: "Water Heater Installation",
      location: "Kacyiru, Kigali",
      date: "2024-01-18 at 11:00 AM",
      amount: "120,000 RWF",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      status: "In Progress"
    },
    {
      id: 2,
      name: "Diane Mukamana",
      job: "Pipe Leak Fix",
      location: "Gisozi, Kigali",
      date: "2024-01-19 at 9:00 AM",
      amount: "45,000 RWF",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      status: "Confirmed"
    }
  ]);

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleAccept = (jobId: number) => console.log(`Accept job ${jobId}`);
  const handleDecline = (jobId: number) => console.log(`Decline job ${jobId}`);
  const handleCall = (jobId: number) => console.log(`Call customer for job ${jobId}`);
  const handleNavigate = (location: string) => console.log(`Navigate to ${location}`);

  const updateJobStatus = (jobId: number, newStatus: string) => {
    setActiveJobs(prev =>
      prev.map(job =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
    setOpenDropdown(null);
    console.log(`Job ${jobId} status updated to ${newStatus}`);
  };

  const statusOptions = ["Confirmed", "On The Way", "In Progress", "Completed"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-orange-500 text-white";
      case "Confirmed":
        return "bg-blue-500 text-white";
      case "On The Way":
        return "bg-yellow-500 text-white";
      case "Completed":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Confirmed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "On The Way":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Completed":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
       
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 sm:p-5 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Job Requests</h3>
              <span className="px-2 py-1 text-xs font-medium text-brandText bg-gray-200 rounded-full">
                3 pending
              </span>
            </div>
          </div>
          <div className="p-3 sm:p-4 space-y-3">
            {jobRequests.map((job) => (
              <div
                key={job.id}
                className="border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-3">
                  <div className="shrink-0">
                    {job.avatar ? (
                      <img
                        src={job.avatar}
                        alt={job.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                        <FiUser className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{job.name}</h4>
                      <span className="text-brandText text-xs sm:text-sm font-semibold">{job.amount}</span>
                    </div>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1 truncate">{job.job}</p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FiMapPin className="w-3 h-3 shrink-0" /> 
                        <span className="truncate">{job.location}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <FiCalendar className="w-3 h-3 shrink-0" /> 
                        <span className="truncate">{job.date}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleAccept(job.id)}
                    className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-brandText text-white rounded-lg hover:bg-brandText/90 transition-colors text-xs sm:text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <FiCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(job.id)}
                    className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-brandOrange hover:text-white transition-colors text-xs sm:text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <FiX className="w-3 h-3 sm:w-4 sm:h-4" />
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

       
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 sm:p-5 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Active Jobs</h3>
              <span className="px-2 py-1 text-xs text-gray-700 font-bold rounded-xl border border-gray-200">
                {activeJobs.length} Jobs
              </span>
            </div>
          </div>
          <div className="p-3 sm:p-4 space-y-3">
            {activeJobs.map((job) => (
              <div
                key={job.id}
                className="border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow"
              >
               
                <div className="flex gap-3">
                  <div className="shrink-0">
                    {job.avatar ? (
                      <img
                        src={job.avatar}
                        alt={job.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                        <FiUser className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{job.name}</h4>
                        <p className="text-gray-500 text-xs sm:text-sm mt-0.5 sm:mt-1 truncate">{job.job}</p>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full border ${getStatusBadgeColor(job.status)} whitespace-nowrap self-start sm:self-auto`}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                </div>

              
                <div className="mt-3 space-y-1 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                    <span className="truncate">{job.date}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-1 border-t border-gray-100">
                    <span className="text-gray-600 text-xs sm:text-sm">Amount:</span>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">{job.amount}</span>
                  </div>
                </div>

               
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleCall(job.id)}
                    className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-brandOrange hover:text-white transition-colors text-xs sm:text-sm font-medium flex items-center justify-center gap-1 sm:gap-2"
                  >
                    <FiPhone className="w-3 h-3 sm:w-4 sm:h-4" /> Call
                  </button>
                  <button
                    onClick={() => handleNavigate(job.location)}
                    className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-brandOrange hover:text-white transition-colors text-xs sm:text-sm font-medium flex items-center justify-center gap-1 sm:gap-2"
                  >
                    <FiNavigation className="w-3 h-3 sm:w-4 sm:h-4" /> Navigate
                  </button>
                </div>

             
                <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                    Update Status:
                  </label>
                  <div className="relative flex-1">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === job.id ? null : job.id)}
                      className="w-full bg-gray-100 border border-gray-200 text-gray-700 text-xs sm:text-sm rounded-lg px-3 py-2 pr-8 text-left focus:outline-none focus:ring-2 focus:ring-brandText focus:border-transparent flex items-center justify-between"
                    >
                      <span>{job.status}</span>
                      <FiChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform ${openDropdown === job.id ? 'rotate-180' : ''}`} />
                    </button>

                    {openDropdown === job.id && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 space-y-1">
                        {statusOptions.map((status) => (
                          <button
                            key={status}
                            onClick={() => updateJobStatus(job.id, status)}
                            className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-left transition-colors flex items-center justify-between rounded-lg ${
                              job.status === status
                                ? getStatusColor(status)
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <span>{status}</span>
                            {job.status === status && (
                              <FiCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsDashboard;
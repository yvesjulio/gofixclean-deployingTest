import { FiTrendingUp, FiBriefcase, FiStar, FiClock, FiUser, FiMessageSquare, FiCalendar, FiCheckCircle, FiTarget, FiUsers } from 'react-icons/fi';
import { FiDollarSign } from "react-icons/fi";
import { ImNotification } from "react-icons/im";
import { GrStatusGood } from "react-icons/gr";

interface OverviewDashboardProps {
  userName?: string;
  userJobs?: number;
  onNavigate?: (path: string) => void;
}

function OverviewDashboard({ 
  userName = "User", 
  userJobs = 3,
  onNavigate = (path) => console.log(`Navigate to: ${path}`)
}: OverviewDashboardProps) {
  const metrics = [
    { 
      label: "Total Earnings", 
      value: "1,480,000", 
      currency: "RWF",
      change: "+12.5%", 
      changeText: "vs last month",
      trend: "up",
      icon: <FiDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-brandText" />,
      iconBg: "bg-green-50"
    },
    { 
      label: "Active Jobs", 
      value: "8", 
      currency: null,
      change: "+3", 
      changeText: "vs last month",
      trend: "up",
      icon: <FiBriefcase className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />,
      iconBg: "bg-orange-50"
    },
    { 
      label: "Avg. Rating", 
      value: "4.8", 
      currency: null,
      change: "+0.2", 
      changeText: "vs last month",
      trend: "up",
      icon: <FiStar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />,
      iconBg: "bg-yellow-50"
    },
    { 
      label: "Response Time", 
      value: "15 mins", 
      change: "-5 min", 
      changeText: "vs last month",
      trend: "down",
      icon: <FiClock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />,
      iconBg: "bg-blue-50"
    }
  ];

  const recentJobs = [
    {
      id: 1,
      customer: "Marie Claire",
      status: "In Progress",
      job: "Kitchen Pipe Repair",
      amount: "45,000 RWF",
      time: "2 hours ago",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      color: "bg-pink-100"
    },
    {
      id: 2,
      customer: "Emmanuel K.",
      status: "Pending",
      job: "Bathroom Installation",
      amount: "120,000 RWF",
      time: "4 hours ago",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      color: "bg-blue-100"
    },
    {
      id: 3,
      customer: "Alice Uwimana",
      status: "Completed",
      job: "Water Heater Fix",
      amount: "35,000 RWF",
      time: "1 day ago",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      color: "bg-green-100"
    }
  ];

  const actionItems = [
    {
      id: 1,
      title: "You have 2 reviews pending response",
      icon: <FiMessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />,
      urgent: true,
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      hoverBg: "hover:bg-red-100"
    },
    {
      id: 2,
      title: "Update your availability for next week",
      icon: <FiCalendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />,
      urgent: false,
      bgColor: "bg-gray-50",
      iconBg: "bg-gray-100",
      hoverBg: "hover:bg-gray-100"
    },
    {
      id: 3,
      title: "Complete your profile verification",
      icon: <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />,
      urgent: true,
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      hoverBg: "hover:bg-red-100"
    }
  ];

  const monthlyGoals = [
    { label: "Jobs Completed", current: 45, target: 50, unit: "" },
    { label: "Earnings Target", current: "1.48M", target: "2M", unit: "" },
    { label: "Response Rate", current: "92", target: null, unit: "%", rating: 3 }
  ];

  const clientInsights = [
    { label: "Repeat Clients", value: "68%" },
    { label: "New Clients This Month", value: "12" },
    { label: "Client Referrals", value: "8" }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-orange-100 text-orange-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const splitChangeText = (change: string, changeText: string, trend: string) => {
    return (
      <div className="flex items-center gap-1 flex-wrap">
        <FiTrendingUp className={`w-3 h-3 ${trend === 'up' ? 'text-brandOrange' : 'text-red-600'}`} />
        <span className={change.includes('+') ? 'text-brandOrange text-xs sm:text-sm' : 'text-red-600 text-xs sm:text-sm'}>
          {change}
        </span>
        <span className="text-gray-500 text-xs sm:text-sm"> {changeText}</span>
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
     
      <div className="bg-linear-to-br from-gray-200 via-blue-50 to-white rounded-xl border border-gray-300 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
          Welcome back, Jean Baptiste!
        </h2>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
          <p className="text-sm text-gray-600">
            You have {userJobs} new job requests and 2 pending reviews to respond to.
          </p>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <button 
              onClick={() => onNavigate('/provider/jobs')}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 border border-gray-200 bg-gray-100 text-gray-700 rounded-lg hover:bg-brandOrange hover:text-white transition-colors font-medium text-sm"
            >
              View Jobs
            </button>
            <button 
              onClick={() => onNavigate('/provider/reviews')}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 bg-brandText text-white rounded-lg hover:bg-brandText/90 transition-colors font-medium text-sm shadow-sm"
            >
              View Reviews
            </button>
          </div>
        </div>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow border border-gray-200 p-4 sm:p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-xs sm:text-sm font-medium">{metric.label}</span>
              <div className={`p-1.5 sm:p-2 rounded-lg ${metric.iconBg}`}>
                {metric.icon}
              </div>
            </div>
            <div className='flex gap-1 sm:gap-2 items-baseline'>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                {metric.value}
              </div>
              {metric.currency && (
                <div className="text-sm sm:text-base font-medium text-gray-600">
                  {metric.currency}
                </div>
              )}
            </div>
            <div className="text-xs font-medium mt-3 sm:mt-4">
              {splitChangeText(metric.change, metric.changeText, metric.trend)}
            </div>
          </div>
        ))}
      </div>

      
      <div className="flex flex-col lg:flex-row gap-6">
       
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200">
  <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200">
    <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Recent Jobs</h3>
    <button 
      onClick={() => onNavigate('/provider/jobs')}
      className="text-brandText text-xs sm:text-sm hover:bg-brandOrange px-2 sm:px-3 py-1 rounded-xl hover:text-white transition-colors font-medium"
    >
      View All →
    </button>
  </div>
  <div className="p-3 sm:p-4 space-y-3">
    {recentJobs.map((job) => (
      <div 
        key={job.id} 
        className="p-2 sm:p-3 hover:bg-gray-100 transition-colors border border-gray-200 rounded-xl"
      >
        
        <div className="hidden sm:flex gap-3">
          <div className="shrink-0">
            {job.avatar ? (
              <img 
                src={job.avatar} 
                alt={job.customer}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${job.color} flex items-center justify-center`}>
                <FiUser className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{job.customer}</h4>
                <span className={`px-2 py-0.5 ${getStatusColor(job.status)} text-xs rounded-full font-medium whitespace-nowrap`}>
                  {job.status}
                </span>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-sm sm:text-base font-semibold text-gray-900">{job.amount}</div>
                <div className="text-brandText text-xs">{job.time}</div>
              </div>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm mt-1 truncate">{job.job}</p>
          </div>
        </div>

       
        <div className="sm:hidden flex gap-3">
          <div className="shrink-0">
            {job.avatar ? (
              <img 
                src={job.avatar} 
                alt={job.customer}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className={`w-10 h-10 rounded-full ${job.color} flex items-center justify-center`}>
                <FiUser className="w-5 h-5 text-gray-600" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm truncate">{job.customer}</h4>
                <p className="text-gray-500 text-xs mt-1 truncate">{job.job}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`px-2 py-0.5 ${getStatusColor(job.status)} text-xs rounded-full font-medium whitespace-nowrap`}>
                  {job.status}
                </span>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{job.amount}</div>
                  <div className="text-brandText text-xs">{job.time}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
        
        <div className="flex-1 bg-white rounded-xl border border-gray-200">
          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4">
              <ImNotification className="w-4 h-4 sm:w-5 sm:h-5 text-brandText" />
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Action Required</h3>
            </div>
            <div className="space-y-3">
              {actionItems.map((item) => (
                <div 
                  key={item.id}
                  className={`${item.bgColor} ${item.hoverBg} rounded-xl border ${item.urgent ? 'border-red-200' : 'border-gray-200'} py-3 sm:py-4 px-3 sm:px-4 transition-all duration-200 cursor-pointer hover:shadow-md`}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className={`shrink-0 ${item.iconBg} rounded-full p-1.5 sm:p-2`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs sm:text-sm truncate ${item.urgent ? 'text-red-700' : 'text-gray-700'}`}>
                        {item.title}
                      </p>
                      {item.urgent && (
                        <span className="inline-block mt-1.5 sm:mt-2 px-2 py-0.5 bg-red-500 text-white text-[10px] sm:text-xs rounded-full font-medium">
                          Urgent
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

     
 
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
    <div className="flex items-center gap-2 mb-4">
      <GrStatusGood className="w-4 h-4 sm:w-5 sm:h-5 text-brandOrange" />
      <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Monthly Goals</h3>
    </div>

    <div className="space-y-4">
      {monthlyGoals.map((goal, index) => (
        <div key={index}>
          <div className="flex items-center justify-between mb-2 gap-2">
            <span className="text-gray-600 text-xs sm:text-sm font-medium flex-1">{goal.label}</span>
            <span className="text-brandTealMedium text-xs sm:text-sm  text-right">
              {goal.current}{goal.unit} {goal.target && `/ ${goal.target}${goal.unit}`}
            </span>
          </div>
          {goal.target && (
            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
              <div 
                className="bg-brandText rounded-full h-1.5 sm:h-2 transition-all duration-300"
                style={{ width: `${(Number(goal.current) / Number(goal.target)) * 100}%` }}
              ></div>
            </div>
          )}
          {goal.rating && !goal.target && (
            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
              <div 
                className="bg-brandText rounded-full h-1.5 sm:h-2 transition-all duration-300"
                style={{ width: `${goal.current}%` }}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div> 
  </div>

 
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
    <div className="flex items-center gap-2 mb-4">
      <FiUsers className="w-4 h-4 sm:w-5 sm:h-5 text-brandText" />
      <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Client Insights</h3>
    </div>
    <div className="space-y-3">
      {clientInsights.map((insight, index) => (
        <div 
          key={index} 
          className="bg-gray-100 rounded-xl text-sm p-3 sm:p-4 text-brandText hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium">{insight.label}</span>
            <span className="text-base sm:text-sm font-semibold">{insight.value}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


    </div>
  );
}

export default OverviewDashboard;
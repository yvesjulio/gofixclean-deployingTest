import React, { useState } from 'react';
import { FiDollarSign, FiBriefcase, FiStar, FiClock, FiTrendingUp, FiTrendingDown, FiUsers, FiBarChart2 } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  iconBg: string;
}

function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState<'earnings' | 'jobs' | 'services' | 'ratings'>('earnings');


  const stats: StatCard[] = [
    {
      title: 'Total Earnings',
      value: '1,480,000 RWF',
      change: 12.5,
      icon: <FiDollarSign className="w-5 h-5" />,
      iconBg: 'bg-gray-100 text-brandText'
    },
    {
      title: 'Completed Jobs',
      value: '45',
      change: 8.2,
      icon: <FiBriefcase className="w-5 h-5" />,
      iconBg: 'bg-gray-100 text-brandText'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: -0.2,
      icon: <FiStar className="w-5 h-5" />,
      iconBg: 'bg-gray-100 text-brandText'
    },
    {
      title: 'Response Time',
      value: '15 min',
      change: -5,
      icon: <FiClock className="w-5 h-5" />,
      iconBg: 'bg-gray-100 text-brandText'
    }
  ];


  const earningsData = [
    { month: 'Jan', earnings: 180000 },
    { month: 'Feb', earnings: 220000 },
    { month: 'Mar', earnings: 195000 },
    { month: 'Apr', earnings: 240000 },
    { month: 'May', earnings: 280000 },
    { month: 'Jun', earnings: 300000 }
  ];

 
  const weeklyJobData = [
    { week: 'Week 1', completed: 8, pending: 2 },
    { week: 'Week 2', completed: 12, pending: 3 },
    { week: 'Week 3', completed: 10, pending: 1 },
    { week: 'Week 4', completed: 15, pending: 4 }
  ];

 
  const serviceData = [
    { name: 'Pipe Repair', value: 45, color: '#025E4C' },
    { name: 'Bathroom Install', value: 25, color: '#FF6B35' },
    { name: 'Drain Cleaning', value: 20, color: '#D1D5DB' },
    { name: 'Water Heater', value: 10, color: '#E5E7EB' }
  ];

 
  const ratingsData = [
    { stars: '5 stars', count: 85, percentage: 67 },
    { stars: '4 stars', count: 32, percentage: 25 },
    { stars: '3 stars', count: 8, percentage: 6 },
    { stars: '2 stars', count: 2, percentage: 2 },
    { stars: '1 star', count: 0, percentage: 0 }
  ];

  const totalReviews = 127;
  const averageRating = 4.8;


  const clientInsights = [
    { label: 'Repeat Clients', value: '86%' },
    { label: 'New Clients This Month', value: '12' },
    { label: 'Client Referrals', value: '8' }
  ];


  const jobInsights = [
    { label: 'Acceptance Rate', value: '92%' },
    { label: 'Completion Rate', value: '98%' },
    { label: 'Avg. Job Duration', value: '2.5 hours' }
  ];

  const formatCurrency = (value: number): string => {
    return `${(value / 1000).toFixed(0)}k RWF`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-900">{payload[0].payload.month}</p>
          <p className="text-sm text-brandText font-semibold">
            Earnings: {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

 
  const JobsTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-900 mb-1">{payload[0].payload.week}</p>
          <p className="text-sm text-brandText font-semibold">
            Completed: {payload[0].value}
          </p>
          <p className="text-sm text-gray-400 font-semibold">
            Pending: {payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  
  const renderChart = () => {
    switch (activeTab) {
      case 'earnings':
        return (
          <div className="bg-white rounded-xl p-6 border border-gray-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Earnings</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="2 2" stroke="#A9A9A9" />
                <XAxis 
                  dataKey="month" 
                  stroke="#4b5563"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#4b5563"
                  style={{ fontSize: '12px' }}
                  tickFormatter={formatCurrency}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#025E4C" 
                  strokeWidth={2}
                  dot={{ fill: '#025E4C', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      case 'jobs':
        return (
          <div className="bg-white rounded-xl p-6 border border-gray-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Job Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyJobData}>
                <CartesianGrid strokeDasharray="2 2" stroke="#A9A9A9" />
                <XAxis 
                  dataKey="week" 
                  stroke="#4b5563"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#4b5563"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip content={<JobsTooltip />} />
                <Bar dataKey="completed" fill="#025E4C" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#D1D5DB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'services':
        return (
          <div className="bg-white rounded-xl p-6 border border-gray-300">
            <h3 className="text-lg font-semibold text-black mb-6">Service Breakdown</h3>
            <div className="flex items-center justify-between">
              <div className="w-1/2">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={serviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {serviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

         
              <div className="w-1/2 space-y-3">
                {serviceData.map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: service.color }}
                      />
                      <span className="text-sm text-gray-700">{service.name}</span>
                    </div>
                    <span className="text-sm px-3 font-bold  bg-gray-200 rounded-2xl  text-brandText">{service.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'ratings':
        return (
          <div className="bg-white rounded-xl p-6 border border-gray-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Ratings Distribution</h3>
            <div className="space-y-3 mb-6">
              {ratingsData.map((rating, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 w-16">{rating.stars}</span>
                  <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full transition-all duration-300"
                      style={{ width: `${rating.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm  text-gray-900 w-8 text-right">
                    {rating.count}
                  </span>
                </div>
              ))}
            </div>

          
            <div className="bg-orange-50 border border-amber-100 rounded-lg p-4 flex items-center gap-3">
              <FiStar className="w-8 h-8 text-orange-500 fill-orange-500" />
              <div>
                <p className="text-3xl font-bold text-gray-800">{averageRating}</p>
                <p className="text-sm text-gray-600">Average from {totalReviews} reviews</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-600">{stat.title}</p>
              <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                {stat.icon}
              </div>
            </div>
            
            <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
            <div className="flex items-center gap-1">
              {stat.change >= 0 ? (
                <>
                  <FiTrendingUp className="w-4 h-4 text-brandOrange" />
                  <span className="text-sm text-brandOrange font-medium">
                    +{stat.change}%
                  </span>
                </>
              ) : (
                <>
                  <FiTrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-600 font-medium">
                    {stat.change}%
                  </span>
                </>
              )}
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          </div>
        ))}
      </div>


      <div className="flex gap-2 bg-gray-300 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('earnings')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'earnings'
              ? 'bg-gray-200 text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Earnings
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'jobs'
              ? 'bg-gray-200 text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Jobs
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'services'
              ? 'bg-gray-200 text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Services
        </button>
        <button
          onClick={() => setActiveTab('ratings')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'ratings'
              ? 'bg-gray-200 text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Ratings
        </button>
      </div>

    
      {renderChart()}

     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <FiUsers className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg font-semibold text-brandText">Client Insights</h3>
          </div>
          <div className="space-y-3">
            {clientInsights.map((insight, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow"
              >
                <span className="text-gray-600 text-sm font-medium">{insight.label}</span>
                <span className="text-lg  text-gray-900">{insight.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
         
            <FiBarChart2 className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg font-semibold text-brandText">Job Insights</h3>
          </div>
          <div className="space-y-3">
            {jobInsights.map((insight, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow"
              >
                <span className="text-gray-600 text-sm font-medium">{insight.label}</span>
                <span className="text-lg  text-gray-900">{insight.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
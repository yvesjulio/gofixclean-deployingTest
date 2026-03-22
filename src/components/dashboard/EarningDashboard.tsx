
import { FiDollarSign, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import { RiArrowRightUpLine } from "react-icons/ri";

interface EarningsData {
  thisMonth: number;
  percentageChange: number;
  today: number;
  thisWeek: number;
  totalEarnings: number;
  jobsCompleted: number;
}

function EarningsDashboard() {
 
  const earningsData: EarningsData = {
    thisMonth: 1250000,
    percentageChange: 12.5,
    today: 65000,
    thisWeek: 345000,
    totalEarnings: 4850000,
    jobsCompleted: 28
  };

 
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-US');
  };

  return (
    <div className="max-w-xl ">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-6">
          <FiDollarSign className="w-6 h-6 text-gray-700" />
          <h2 className="text-xl font-bold text-gray-900">Earnings Summary</h2>
        </div>

<div className="bg-linear-to-br from-blue-50 via-yellow-50 to-green-50 rounded-xl p-6 mb-6 text-center border border-gray-200">
  <p className="text-sm text-gray-600 mb-2">This Month</p>
  <h3 className="text-4xl font-bold text-gray-900 mb-2">
    {formatCurrency(earningsData.thisMonth)} RWF
  </h3>
  <div className="flex items-center justify-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full w-fit mx-auto">
    <span className="text-sm"><RiArrowRightUpLine /></span>
    <span className="text-sm font-medium">
      {earningsData.percentageChange}% vs last month
    </span>
  </div>
</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <FiCalendar className="w-4 h-4" />
              <span className="text-sm">Today</span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(earningsData.today)} RWF
            </p>
          </div>

         
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <FiTrendingUp className="w-4 h-4" />
              <span className="text-sm">This Week</span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(earningsData.thisWeek)} RWF
            </p>
          </div>
        </div>

       
        <div className="bg-white rounded-xl p-2 pl-4  border border-gray-200 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Total Earnings</span>
            <span className="text- font-bold text-gray-800">
              {formatCurrency(earningsData.totalEarnings)} RWF
            </span>
          </div>
        </div>

       
        <div className="bg-white rounded-xl pl-4 p-2 border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Jobs Completed (This Month)</span>
            <span className=" font-bold text-gray-800">
              {earningsData.jobsCompleted}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EarningsDashboard;
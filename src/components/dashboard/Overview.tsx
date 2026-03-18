import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

const Overview: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
     
      <div className="border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
         
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brandText rounded-lg flex items-center justify-center text-white font-bold text-sm">
              GF
            </div>
            <h1 className="text-xl font-bold text-brandText">
              GoFix<span className="text-brandOrange">&</span>Clean
            </h1>
          </div>

         
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Jean Baptiste</p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span className="text-yellow-500">⭐ 4.8</span>
                <span>•</span>
                <span>Plumbing</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-brandText to-brandOrange rounded-full flex items-center justify-center text-white font-bold">
              JB
            </div>
          </div>
        </div>

       
        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="text-gray-400">Dashboard</span>
          <FiChevronRight className="text-gray-300 text-xs" />
          <span className="text-brandText font-medium">Overview</span>
        </div>
      </div>

      
      <div className="p-8">
       
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Dashboard Overview</h2>
          <p className="text-gray-500 text-sm">
            Welcome back, Jean Baptiste!<br />
            You have 3 new job requests and 2 pending reviews to respond to.
          </p>
        </div>

      
        <div className="flex gap-3 mb-8">
          <button className="bg-brandText text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
            View Jobs
          </button>
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors">
            View Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
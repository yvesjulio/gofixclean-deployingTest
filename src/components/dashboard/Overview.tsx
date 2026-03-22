import React from 'react';
import { CgViewSplit } from "react-icons/cg";


interface OverviewProps {
  userName?: string;
  userAvatar?: string;
  userRating?: number;
  userType?: string;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  children?: React.ReactNode;
}

const Overview: React.FC<OverviewProps> = ({ 
  userName,
  userAvatar,
  onToggleSidebar,
  isSidebarOpen = true,
  children
}) => {
  return (
    <div className="min-h-screen">
      <div className="border-b border-gray-300  bg-white backdrop-blur-sm sticky top-0 z-10">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={onToggleSidebar}
                className="hidden lg:flex w-10 h-10 rounded-xl items-center justify-center text-brandText hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Toggle sidebar"
              >
                <CgViewSplit className="w-6 h-6" />
              </button>
              <div className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-brandText">
                <CgViewSplit className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-semibold text-brandText tracking-tight">
                Overview
              </h1>
            </div>

            <div className="relative">
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                {userAvatar ? (
                  <img 
                    src={userAvatar} 
                    alt={userName || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-brandText to-brandOrange flex items-center justify-center text-white font-semibold text-sm">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
  
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Overview;
import React from 'react';
import { CgViewSplit } from "react-icons/cg";
import { IoMenuOutline } from "react-icons/io5";

interface OverviewProps {
  userName?: string;
  userAvatar?: string;
  userRating?: number;
  userType?: string;
  onToggleSidebar?: () => void;
  onMobileMenuClick?: () => void;
  isSidebarOpen?: boolean;
  activeSection?: string; 
  children?: React.ReactNode;
}

const Overview: React.FC<OverviewProps> = ({ 
  userName,
  userAvatar,
  onToggleSidebar,
  onMobileMenuClick,
  activeSection = 'Overview', 
  children
}) => {
 
  const getPageTitle = () => {
    switch (activeSection.toLowerCase()) {
      case 'overview':
        return 'Overview';
      case 'jobs':
        return 'Jobs';
      case 'reviews':
        return 'Reviews';
      case 'earnings':
        return 'Earnings';
      case 'analytics':
        return 'Analytics';
      case 'notifications':
        return 'Notifications';
      case 'availability':
        return 'Availability';
      case 'settings':
        return 'Settings';
      default:
        return 'Overview';
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
    
      <div className="border-b border-gray-300 bg-white backdrop-blur-sm sticky top-0 z-10">
        <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3">

         
          <div className="flex items-center justify-between">

          
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              
              
              <button 
                onClick={onToggleSidebar}
                className="hidden lg:flex w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl items-center justify-center text-brandText hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
                aria-label="Toggle sidebar"
              >
                <CgViewSplit className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6" />
              </button>
              
             
              <button 
                onClick={onMobileMenuClick}
                className="lg:hidden flex w-8 h-8 sm:w-9 sm:h-9 rounded-xl items-center justify-center text-brandText hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
                aria-label="Open menu"
              >
                <IoMenuOutline className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </button>
              
             
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-brandText tracking-tight truncate max-w-35 sm:max-w-xs">
                {getPageTitle()}
              </h1>
            </div>

           
            <div className="shrink-0 ml-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden">
                {userAvatar ? (
                  <img 
                    src={userAvatar} 
                    alt={userName || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-brandText to-brandOrange flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      
     
      <div className="p-3 sm:p-4 md:p-5 lg:p-6">
        {children}
      </div>
    </div>
  );
};

export default Overview;
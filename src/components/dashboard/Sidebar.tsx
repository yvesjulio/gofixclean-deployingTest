import React, { useState } from 'react';
import { FaStar } from "react-icons/fa6";
import { GrStatusGood } from "react-icons/gr";
import { 
  FiHome, 
  FiBriefcase, 
  FiStar, 
  FiDollarSign, 
  FiTrendingUp, 
  FiBell, 
  FiClock, 
  FiSettings, 
  FiLogOut, 
  FiMenu,
  FiX
} from 'react-icons/fi';

interface SidebarProps {
  userName?: string;
  userRating?: number;
  userJobs?: number;
  userType?: string;
  userAvatar?: string;
  onLogout?: () => void;
  onNavigate?: (path: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  path: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  userName = "Jean Baptiste",
  userRating = 4.8,
  userJobs = 3,
  userType = "Plumbing",
  userAvatar = "https://images.unsplash.com/photo-1696505523865-84c7c9372901?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  onLogout = () => console.log('Logout clicked'),
  onNavigate = (path) => console.log(`Navigate to: ${path}`)
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('overview');

  const navItems: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: <FiHome />, path: '/provider/dashboard' },
    { id: 'jobs', label: 'Jobs', icon: <FiBriefcase />, badge: userJobs, path: '/provider/jobs' },
    { id: 'reviews', label: 'Reviews', icon: <FiStar />, path: '/provider/reviews' },
    { id: 'earnings', label: 'Earnings', icon: <FiDollarSign />, path: '/provider/earnings' },
    { id: 'analytics', label: 'Analytics', icon: <FiTrendingUp />, path: '/provider/analytics' },
    { id: 'notifications', label: 'Notifications', icon: <FiBell />, badge: 5, path: '/provider/notifications' },
    { id: 'availability', label: 'Availability', icon: <FiClock />, path: '/provider/availability' },
    { id: 'settings', label: 'Settings', icon: <FiSettings />, path: '/provider/settings' },
  ];

  const handleNavClick = (item: NavItem) => {
    setActiveItem(item.id);
    onNavigate(item.path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
     
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white text-brandText rounded-lg border border-gray-200"
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

     
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white/80 backdrop-blur-md z-50
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          w-72
          border-r border-gray-200
        `}
      >
        <div className="flex flex-col h-full">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-extrabold text-brandText">
                GoFix<span className="text-brandOrange">&</span>Clean
              </h1>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <FiX size={20} className="text-gray-500" />
              </button>
            </div>
          </div>

         
          <div className="px-6 py-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-gray-300">
                  <img 
                    src={userAvatar} 
                    alt={userName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-brandOrange rounded-full p-0.5">
                  <GrStatusGood className="text-white text-xs" />
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-brandText text-sm truncate">{userName}</h3>
                <div className="flex items-center gap-1 text-xs">
                  <span className="flex items-center text-gray-500 shrink-0">
                    <FaStar className="text-brandOrange" />
                    <span className="ml-0.5">{userRating}</span>
                  </span>
                  <span className="text-gray-500 shrink-0">•</span>
                  <span className="text-gray-500 truncate">{userType}</span>
                </div>
              </div>
            </div>
          </div>

         
          <div className="px-6 pt-4 pb-1">
            <span className="text-xs text-gray-600 tracking-wider">Dashboard</span>
          </div>
          
         
          <div className="flex-1 px-3">
            <nav className="py-2">
              <ul className="space-y-0.5">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`
                        w-full flex items-center justify-between px-4 py-2
                        transition-all duration-200 group rounded-lg
                        ${activeItem === item.id 
                          ? 'bg-gray-100 text-brandText' 
                          : 'hover:bg-gray-100'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`
                          text-lg
                          ${activeItem === item.id ? 'text-brandText' : 'text-brandText group-hover:text-brandText'}
                        `}>
                          {item.icon}
                        </span>
                        <span className="text-sm font-medium text-brandText">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>


          <div className="border-t border-gray-200 w-full"></div>
          

          <div className="py-2 px-3">
            <button
              onClick={() => {
                onNavigate('/');
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-all duration-200 group rounded-lg"
            >
              <FiHome className="text-lg text-gray-500" />
              <span className="text-sm font-medium text-gray-500">Back to Site</span>
            </button>
            <button
              onClick={() => {
                onLogout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-all duration-200 group rounded-lg lg:hover:bg-red-50"
            >
              <FiLogOut className="text-lg text-gray-500" />
              <span className="text-sm font-medium text-gray-500">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
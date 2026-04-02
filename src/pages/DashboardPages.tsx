import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Overview from '../components/dashboard/Overview';
import OverviewDashboard from '../components/dashboard/OverviewDashboard';
import JobsDashboard from '../components/dashboard/JobsDashboard';
import ReviewsDashboard from '../components/dashboard/ReviewsDashboard';
import EarningsDashboard from '../components/dashboard/EarningDashboard';
import AnalyticsDashboard from '../components/dashboard/AnalyticsDashboard';
import NotificationsDashboard from '../components/dashboard/NotificationsDashboard';
import AvailabilityDashboard from '../components/dashboard/AvailabilityDashboard';
import SettingsDashboard from '../components/dashboard/SettingsDashboard';

function DashboardPages() {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('overview');
  const [activeSection, setActiveSection] = useState('Overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [userData] = useState({
    userName: "Jean Baptiste",
    userRating: 4.8,
    userJobs: 3,
    userType: "Plumbing",
    userAvatar: "https://images.unsplash.com/photo-1696505523865-84c7c9372901?q=80&w=387&auto=format&fit=crop"
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(true);
  };

  const handleNavigate = (path: string) => {
    console.log('Navigate to:', path);
    
    if (path === '/') {
      navigate('/');
      return;
    }
    
  
    if (path === '/provider/jobs') {
      setCurrentPage('jobs');
      setActiveSection('Jobs');
      setIsMobileMenuOpen(false);
      return;
    }
    
    
    if (path === '/provider/reviews') {
      setCurrentPage('reviews');
      setActiveSection('Reviews');
      setIsMobileMenuOpen(false);
      return;
    }
    
   
    if (path === '/provider/earnings') {
      setCurrentPage('earnings');
      setActiveSection('Earnings');
      setIsMobileMenuOpen(false);
      return;
    }
    
   
    if (path === '/provider/analytics') {
      setCurrentPage('analytics');
      setActiveSection('Analytics');
      setIsMobileMenuOpen(false);
      return;
    }
    
    
    if (path === '/provider/notifications') {
      setCurrentPage('notifications');
      setActiveSection('Notifications');
      setIsMobileMenuOpen(false);
      return;
    }
    
    
    if (path === '/provider/availability') {
      setCurrentPage('availability');
      setActiveSection('Availability');
      setIsMobileMenuOpen(false);
      return;
    }
   
    if (path === '/provider/settings') {
      setCurrentPage('settings');
      setActiveSection('Settings');
      setIsMobileMenuOpen(false);
      return;
    }
    
  
    if (path.includes('dashboard') || path.includes('overview')) {
      setCurrentPage('overview');
      setActiveSection('Overview');
    }

    setIsMobileMenuOpen(false);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.clear();
    navigate('/signin');
    setIsMobileMenuOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return (
          <OverviewDashboard 
            userName={userData.userName} 
            userJobs={userData.userJobs} 
            onNavigate={handleNavigate} 
          />
        );
      case 'jobs':
        return (
          <JobsDashboard 
            userName={userData.userName} 
            onNavigate={handleNavigate} 
          />
        );
      case 'reviews':
        return (
          <ReviewsDashboard 
            userName={userData.userName} 
            onNavigate={handleNavigate} 
          />
        );
      case 'earnings':
        return (
          <EarningsDashboard 
            userName={userData.userName} 
            onNavigate={handleNavigate} 
          />
        );
      case 'analytics':
        return (
          <AnalyticsDashboard 
            userName={userData.userName} 
            onNavigate={handleNavigate} 
          />
        );
      case 'notifications':
        return (
          <NotificationsDashboard 
            userName={userData.userName} 
            onNavigate={handleNavigate} 
          />
        );
      case 'availability':
        return (
          <AvailabilityDashboard 
            userName={userData.userName} 
            onNavigate={handleNavigate} 
          />
        );
      case 'settings':
        return (
          <SettingsDashboard 
            userName={userData.userName} 
            onNavigate={handleNavigate} 
          />
        );
      default:
        return (
          <OverviewDashboard 
            userName={userData.userName} 
            userJobs={userData.userJobs} 
            onNavigate={handleNavigate} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-200 via-gray-200 to-white flex">
      
      <Sidebar
        userName={userData.userName}
        userRating={userData.userRating}
        userJobs={userData.userJobs}
        userType={userData.userType}
        userAvatar={userData.userAvatar}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        onSectionChange={handleSectionChange}
        activeSection={activeSection}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
        <Overview
          userName={userData.userName}
          userAvatar={userData.userAvatar}
          userRating={userData.userRating}
          userType={userData.userType}
          onToggleSidebar={toggleSidebar}
          onMobileMenuClick={handleMobileMenuClick}
          isSidebarOpen={isSidebarOpen}
          activeSection={activeSection}
        >
          {renderPage()}
        </Overview>
      </main>
    </div>
  );
}

export default DashboardPages;
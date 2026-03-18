import Sidebar from '../components/dashboard/Sidebar';


function DashboardPages() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        userName="Jean Baptiste"
        userRating={4.8}
        userJobs={3}
        userType="Plumbing"
        onLogout={() => console.log('Logout')}
        onNavigate={(path) => console.log('Navigate to:', path)}
      />
      
      <main className="flex-1 lg:ml-72">
        
      </main>
    </div>
  );
}

export default DashboardPages;
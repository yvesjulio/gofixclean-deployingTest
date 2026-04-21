import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/landingpages/Navbar";
import Landingpage from "./pages/LandingPage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import BecomeProviderPage from "./pages/BecomeProviderPage";
import WhatsAppButton from "./components/WhatsAppButton";
import Booking from "./components/findServices/Booking";
import ServiceDetails from "./components/landingpages/ServiceDetails";
import PrivacyPolicyPage from "./components/policies/PrivacyPolicyPage";
import TermsOfServicePage from "./components/policies/TermsOfServicePage";
import ProviderRegistration from "./pages/ProviderRegistration";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";
import { AdminLayout } from "./components/admin/AdminLayout";
import Bookings from "./pages/admin/Bookings";
import Providers from "./pages/admin/Providers";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import { TooltipProvider } from "./components/ui/tooltip";



function AppWrapper() {
  const showNavbarAndFooter = true;

  return (
    <>
      {showNavbarAndFooter && <Navbar />}

      <div className={showNavbarAndFooter ? "pt-16" : ""}>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} /> 
          <Route path="/become-provider" element={<BecomeProviderPage />} />  
          <Route path="/booking" element={<Booking />} />
          <Route path="/service-details/:category" element={<ServiceDetails />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/provider/verification" element={<ProviderRegistration />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout title="Dashboard"><AdminDashboard /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute><AdminLayout title="Bookings"><Bookings /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/providers" element={<ProtectedRoute><AdminLayout title="Providers"><Providers /></AdminLayout></ProtectedRoute>} />
        </Routes>
      </div>
      
  
      
      <WhatsAppButton />
    </>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Router>
        <AppWrapper />
      </Router>
    </TooltipProvider>
  );
}

export default App;
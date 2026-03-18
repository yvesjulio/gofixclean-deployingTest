import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/landingpages/Navbar";
import Landingpage from "./pages/LandingPage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import BecomeProviderPage from "./pages/BecomeProviderPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ResetPassword from "./components/ResetPassword";
import WhatsAppButton from "./components/WhatsAppButton";
import ProviderVerification from "./pages/ProviderVerifications";
import Footer from "./components/landingpages/Footer";

function AppWrapper() {
  const location = useLocation();
  const authPaths = ["/signin", "/signup", "/resetpassword"];
  const showNavbarAndFooter = !authPaths.includes(location.pathname);

  return (
    <>
      {showNavbarAndFooter && <Navbar />}

      <div className={showNavbarAndFooter ? "pt-16" : ""}>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} /> 
          <Route path="/become-provider" element={<BecomeProviderPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/provider-verifications" element={<ProviderVerification />} />
        </Routes>
      </div>
      {showNavbarAndFooter && <Footer />}
      
      <WhatsAppButton />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
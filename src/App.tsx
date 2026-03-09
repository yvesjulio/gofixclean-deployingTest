import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/landingpages/Navbar";
import Landingpage from "./pages/LandingPage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import BecomeProviderPage from "./pages/BecomeProviderPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} /> 
          <Route path="/become-provider" element={<BecomeProviderPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landingpage from "./pages/LandingPage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;

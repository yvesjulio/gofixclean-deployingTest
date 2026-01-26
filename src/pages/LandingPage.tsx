import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Process from "../components/Process";
import Choose from "../components/Choose";
import Rated from "../components/Rated";
import Testimonials from "../components/Testimonials";
import Questions from "../components/Questions";
import Professionals from "../components/Professionals";
import Footer from "../components/Footer";

function Landingpage() {
  return (
    <div>
        <Navbar />
        <Hero />
        <Categories />
        <Process />
        <Choose />
       <Rated />
       <Testimonials />
       <Questions />
       <Professionals />
       <Footer />
    </div>
  )
}

export default Landingpage;

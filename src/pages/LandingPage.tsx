import React from "react"; 
import Layout from "../components/landingpages/Layout";
import Hero from "../components/landingpages/Hero";
import Process from "../components/landingpages/Process";
import Choose from "../components/landingpages/Choose";
import Testimonials from "../components/landingpages/Testimonials";
import Questions from "../components/landingpages/Questions";
import Professionals from "../components/landingpages/Professionals";
import { fetchProvidersWithSkills } from "@/lib/provider-marketplace";

const Landingpage: React.FC = () => {
  React.useEffect(() => {
    const preloadProviders = async () => {
      try {
        const providers = await fetchProvidersWithSkills();
        console.log("Providers and skills preloaded:", providers.length);
      } catch (error) {
        console.error("Error preloading providers:", error);
      }
    };
    preloadProviders();
  }, []);

  return (
    <Layout>
      <Hero />
      <Process />
      <Choose />
      <Testimonials />
      <Questions />
      <Professionals />
    </Layout>
  );
};

export default Landingpage;
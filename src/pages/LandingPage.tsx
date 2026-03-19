import React from "react"; 
import Layout from "../components/landingpages/Layout";
import Hero from "../components/landingpages/Hero";
import Categories from "../components/landingpages/Categories";
import Process from "../components/landingpages/Process";
import Choose from "../components/landingpages/Choose";
import Rated from "../components/landingpages/Rated";
import Testimonials from "../components/landingpages/Testimonials";
import Questions from "../components/landingpages/Questions";
import Professionals from "../components/landingpages/Professionals";

const Landingpage: React.FC = () => {


  return (
    <Layout>
      <Hero />
      <Categories />
      <Process />
      <Choose />
      <Rated />
      <Testimonials />
      <Questions />
      <Professionals />
    </Layout>
  );
};

export default Landingpage;
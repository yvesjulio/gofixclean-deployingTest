import React from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Process from "../components/Process";
import Choose from "../components/Choose";
import Rated from "../components/Rated";
import Testimonials from "../components/Testimonials";
import Questions from "../components/Questions";
import Professionals from "../components/Professionals";

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

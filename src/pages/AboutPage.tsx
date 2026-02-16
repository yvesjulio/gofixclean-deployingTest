import React from "react";
import Layout from "../components/Layout";
import AboutUs from "../components/about/AboutUs";
import Feedback from "../components/about/Feedback";
import OurStory from "../components/about/OurStory";
import MissionVision from "../components/about/MissionVision";
import OurValues from "../components/about/OurValues";
import OurTeam from "../components/about/OurTeam";
import Ready from "../components/about/Ready";

const AboutPage: React.FC = () => {
  return (
    <Layout>
     <AboutUs/>
     <Feedback/>
     <OurStory/>
     <MissionVision/>
     <OurValues/>
     <OurTeam/>
     <Ready/>
    </Layout>

  );
};

export default AboutPage;

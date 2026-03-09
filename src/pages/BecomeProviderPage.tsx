import React from "react";
import Layout from "../components/landingpages/Layout";
import Income from "../components/provider/Income";
import JoinUs from "../components/provider/JoinUs";
import Work from "../components/provider/Work";
import Requirements from "../components/provider/Requirements";
import Ready from "../components/provider/Ready";


const BecomeProviderPage: React.FC = () => {
  return (
    <Layout>
     <Income/>
     <JoinUs/>
     <Work/>
     <Requirements/>
     <Ready/>
    </Layout>

  );
};

export default BecomeProviderPage;

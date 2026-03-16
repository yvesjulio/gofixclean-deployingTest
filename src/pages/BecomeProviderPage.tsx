import React from "react";
import Layout from "../components/landingpages/Layout";
import Income from "../components/provider/Income";
import JoinUs from "../components/provider/JoinUs";
import Work from "../components/provider/Work";
import Requirements from "../components/provider/Requirements";
import ReadyEarn from "../components/provider/ReadyEarn";



const BecomeProviderPage: React.FC = () => {
  return (
    <Layout>
     <Income/>
     <JoinUs/>
     <Work/>
     <Requirements/>
     <ReadyEarn/>
    </Layout>

  );
};

export default BecomeProviderPage;

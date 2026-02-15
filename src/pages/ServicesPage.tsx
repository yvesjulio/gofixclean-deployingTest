import React from "react";
import Layout from "../components/Layout";
import Provider from "../components/findServices/Provider";
import ProviderFound from "../components/findServices/ProviderFound";

const ServicesPage: React.FC = () => {
  return (
    <Layout>
      <Provider />
      <ProviderFound />
    </Layout>
  );
};

export default ServicesPage;

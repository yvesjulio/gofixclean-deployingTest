import { useState } from "react";
import Layout from "../components/landingpages/Layout";
import Provider from "../components/findServices/Provider";
import ProviderFound from "../components/findServices/ProviderFound";

const ServicesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Layout>
      <Provider searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
      <ProviderFound searchTerm={searchTerm} />
    </Layout>
  );
};

export default ServicesPage;

import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useData } from "../../Context/DataProviders";

const AdminLayout = ({ children }: any) => {
  const { TradeMarkData } = useData();
  return (
    <HelmetProvider>
      <Helmet>
        <title>{TradeMarkData.websiteName}</title>
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/demo2512.appspot.com/o/StaticLogo.png?alt=media&token=0bf30d66-568d-40e8-8e92-77dbb1cea185"
        />
      </Helmet>
      {children}
    </HelmetProvider>
  );
};

export default AdminLayout;

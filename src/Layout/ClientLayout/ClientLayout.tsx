import React, { useEffect } from "react";

import { useData } from "../../Context/DataProviders";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Header from "./Section/Header";
import Hotline from "./Section/Hotline";
import OnTop from "./Section/OnTop";
import Copyright from "./Section/Copyright";
import Footer from "./Section/Footer";
import { useLocation } from "react-router-dom";
import Loading from "../../Components/Item/Loading";

const ClientLayout = ({ children }: any) => {
  const { TradeMarkData } = useData();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  return (
    <HelmetProvider>
      <Helmet>
        <title>{TradeMarkData.websiteName}</title>
        <link rel="icon" href={TradeMarkData.websiteIco} />
        <link rel="manifest" href={TradeMarkData.websiteIco} />
      </Helmet>
      <Loading />
      <Header />
      {location.pathname === "/" ? (
        <>
          <div className=" ">{children}</div>
        </>
      ) : (
        <>
          <div className="d:w-[1250px] p:w-auto p:mx-2 d:mx-auto my-16 ">
            {children}
          </div>
        </>
      )}

      <Footer />
      <div className="relative z-50">
        <OnTop />
        <Hotline />
      </div>
      <Copyright />
    </HelmetProvider>
  );
};

export default ClientLayout;

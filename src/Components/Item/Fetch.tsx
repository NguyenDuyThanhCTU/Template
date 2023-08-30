import React, { useEffect } from "react";
import { useStateProvider } from "../../Context/StateProvider";
import { useData } from "../../Context/DataProviders";
import {
  getAllDocuments,
  getDocumentsInOrder,
} from "../../Config/Services/Firebase/FireStoreDB";

const Fetch: React.FC = () => {
  const {
    // Website
    setSocialMedia,
    setSlides,
    setContactData,
    setTradeMarkData,
    setAccounts,

    // Service
    setProductType,
    setProducts,
    setOrders,
    setBranches,
    setVideos,
    setPosts,

    // custom
  } = useData();

  const { isRefetch, setIsRefetch } = useStateProvider();

  useEffect(() => {
    setIsRefetch(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isRefetch !== "") {
      setIsRefetch("");
    }

    getAllDocuments("website").then((data: any) => {
      data?.forEach((items: any) => {
        if (items.id === "Contact") {
          setContactData(items);
        } else if (items.id === "Trademark") {
          setTradeMarkData(items);
        } else if (items.id === "SocialMedia") {
          setSocialMedia(items.Data);
        }
      });
    });

    getAllDocuments("accounts").then((data: any) => {
      setAccounts(data[0]);
    });

    getAllDocuments("slide").then((data: any) => {
      setSlides(data?.reverse());
    });

    getDocumentsInOrder("posts", "createdAt").then((data: any) => {
      setPosts(data?.reverse());
    });

    getDocumentsInOrder("productTypes", "createdAt").then((data: any) => {
      setProductType(data);
    });

    getDocumentsInOrder("products", "createdAt").then((data: any) => {
      setProducts(data?.reverse());
    });

    getDocumentsInOrder("orders", "createdAt").then((data: any) => {
      setOrders(data?.reverse());
    });

    getDocumentsInOrder("branches", "createdAt").then((data: any) => {
      setBranches(data?.reverse());
    });

    getDocumentsInOrder("videos", "createdAt").then((data: any) => {
      setVideos(data?.reverse());
    });
  }, [
    isRefetch,
    setIsRefetch,
    setAccounts,
    setBranches,
    setContactData,
    setOrders,
    setPosts,
    setProductType,
    setProducts,
    setSlides,
    setSocialMedia,
    setTradeMarkData,
    setVideos,
  ]);

  return <></>;
};

export default Fetch;

import React, { createContext, useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export type DataContextType = {
  ContactData: any;
  setContactData: (contact: any) => void;
  TradeMarkData: any;
  setTradeMarkData: (trademark: any) => void;
  Slides: any;
  setSlides: (slides: any) => void;
  SocialMedia: any;
  setSocialMedia: (social: any) => void;
  Videos: any;
  setVideos: (video: any) => void;
  Posts: any;
  setPosts: (post: any) => void;
  Accounts: any;
  setAccounts: (account: any) => void;
  UpdateId: any;
  setUpdateId: (update: any) => void;
  Products: any;
  setProducts: (product: any) => void;
  productTypes: any;
  setProductType: (productType: any) => void;
  Branches: any;
  setBranches: (branch: any) => void;
  Orders: any;
  setOrders: (account: any) => void;
  CartItems: any;
  setCartItems: (cart: any) => void;
  HeaderAdmin: any;
  setHeaderAdmin: (headeradmin: any) => void;
};

export const DataContext = createContext<DataContextType>({
  ContactData: "",
  setContactData: () => {},
  TradeMarkData: "",
  setTradeMarkData: () => {},
  Slides: [],
  setSlides: () => {},
  SocialMedia: [],
  setSocialMedia: () => {},
  Videos: [],
  setVideos: () => {},
  Posts: [],
  setPosts: () => {},
  Accounts: "",
  setAccounts: () => {},
  UpdateId: "",
  setUpdateId: () => {},
  Products: [],
  setProducts: () => {},
  productTypes: [],
  setProductType: () => {},
  Branches: [],
  setBranches: () => {},
  Orders: [],
  setOrders: () => {},
  CartItems: [],
  setCartItems: () => {},
  HeaderAdmin: "",
  setHeaderAdmin: () => {},
});

export const DataProviders: React.FC<Props> = ({ children }) => {
  //Website
  const [HeaderAdmin, setHeaderAdmin] = useState("");
  const [ContactData, setContactData] = useState("");
  const [TradeMarkData, setTradeMarkData] = useState("");
  const [Slides, setSlides] = useState([]);
  const [SocialMedia, setSocialMedia] = useState("");
  const [Videos, setVideos] = useState([]);
  const [Posts, setPosts] = useState([]);
  const [Accounts, setAccounts] = useState("");

  //Cart
  const [UpdateId, setUpdateId] = useState("");
  const [CartItems, setCartItems] = useState([]);

  //Services
  const [Products, setProducts] = useState([]);
  const [productTypes, setProductType] = useState([]);
  const [Branches, setBranches] = useState([]);
  const [Orders, setOrders] = useState([]);

  //custom

  return (
    <DataContext.Provider
      value={{
        HeaderAdmin,
        setHeaderAdmin,
        CartItems,
        setCartItems,
        Orders,
        setOrders,
        Branches,
        setBranches,
        UpdateId,
        setUpdateId,
        Products,
        setProducts,
        productTypes,
        setProductType,
        Accounts,
        setAccounts,
        Posts,
        setPosts,
        Videos,
        setVideos,
        SocialMedia,
        setSocialMedia,
        Slides,
        setSlides,
        TradeMarkData,
        setTradeMarkData,
        ContactData,
        setContactData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

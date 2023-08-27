import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthProviders";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";

import Sidebar from "./Sidebar/Sidebar";

import Content from "../Admin/Content/Content";
import AdminDropDown from "./Item/AdminDropDown";

const Admin = () => {
  const { verify } = useAuth();

  const [Hidden, setHidden] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!verify) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="grid grid-flow-col font-LexendDeca relative ">
      <AdminDropDown />

      <div className="flex w-full">
        <div
          className={`overflow-hidden ${
            Hidden ? "flex-[0]" : "flex-[40%]"
          } duration-500  d:hidden p:block `}
        >
          <Sidebar />
        </div>
        <div
          className={`overflow-hidden flex-[20%]
          d:block p:hidden`}
        >
          <Sidebar />
        </div>
        <div className="flex-[80%]  bg-[#292929] ">
          <div className="d:relative p:fixed w-full z-20">
            <Header setHidden={setHidden} Hidden={Hidden} />
          </div>
          <div className="d:mt-0 p:mt-16">
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

import React from "react";

import { useStateProvider } from "../../../Context/StateProvider";
import {
  IconMapping,
  ProductSidebarAdmin,
  WebsiteSidebarAdmin,
} from "../../../Utils/item";
// import { notification } from "antd";
const Sidebar: React.FC = () => {
  const { isSelected, setSelected } = useStateProvider();
  // const HandleBlock = () => {
  //   notification["warning"]({
  //     message: "Thao tác không thành công",
  //     description: `
  //     Website của bạn không hỗ trợ chức năng này !`,
  //   });
  // };

  const HandleSelect = (idx: number) => {
    setSelected(idx);
  };
  return (
    <div className="bg-black  h-full text-white border-r border-gray-800 overflow-y-auto w-full pr-2">
      <div className="w-full flex items-center justify-center border-b border-gray-800 py-3">
        <img
          src="https://image-sn.s3.amazonaws.com/Russo+Tech.png"
          alt="logo"
          className="w-24 h-[100] inline-block circle-animation"
        />
        <p className="inline-block ml-3 text-[25px] d:block p:hidden">
          Th Dashboard
        </p>
      </div>
      <div className="flex flex-col p:ml-2 d:ml-14 gap-16  relative py-10">
        <div className="flex flex-col p:items-center d:items-start gap-4">
          <h3 className="text-[25px] text-center">Website</h3>
          <div className="flex flex-col items-start gap-10">
            {WebsiteSidebarAdmin.map((items, idx) => {
              let Icon = IconMapping[items.icon];

              return (
                <div
                  key={idx}
                  className={`flex gap-3 items-center cursor-pointer hover:scale-125 duration-300 ${
                    isSelected === idx ? "text-blue-400" : "border-white"
                  }`}
                  onClick={() => HandleSelect(idx)}
                >
                  {Icon && (
                    <Icon
                      className={`border-2 rounded-full text-[30px] p-[3px] ${
                        isSelected === idx ? "border-blue-400" : "border-white"
                      }`}
                    />
                  )}
                  <p className="p:hidden d:block"> {items.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col p:items-center d:items-start gap-5">
          <h3 className="text-[28px]">Service</h3>
          <div className="flex flex-col items-start gap-10">
            {ProductSidebarAdmin.map((items, idx) => {
              let Icon = IconMapping[items.icon];

              return (
                <div
                  key={idx}
                  className={`flex gap-3 items-center cursor-pointer hover:scale-125 duration-300 ${
                    isSelected === idx + 5 ? "text-blue-400" : "border-white"
                  }`}
                  onClick={() => HandleSelect(idx + 5)}
                >
                  {Icon && (
                    <Icon
                      className={`border-2 rounded-full text-[30px] p-[3px] ${
                        isSelected === idx + 5
                          ? "border-blue-400"
                          : "border-white"
                      }`}
                    />
                  )}
                  <p className="p:hidden d:block"> {items.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={`h-12 w-1 bg-blue-400 overflow-hidden rounded-t-full rounded-b-full absolute right-0 top-[43px]
        duration-300 transition transform 
        ${
          isSelected === 0
            ? "translate-y-[40px]"
            : isSelected === 1
            ? "translate-y-[113px]"
            : isSelected === 2
            ? "translate-y-[182px]"
            : isSelected === 3
            ? "translate-y-[252px]"
            : isSelected === 4
            ? "translate-y-[322px]"
            : isSelected === 5
            ? "translate-y-[479px]"
            : isSelected === 6
            ? "translate-y-[549px]"
            : isSelected === 7
            ? "translate-y-[619px]"
            : isSelected === 8
            ? "translate-y-[689px]"
            : null
        }`}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;

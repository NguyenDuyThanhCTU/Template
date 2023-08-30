import React, { useState } from "react";

import Card from "./Card/Card";
import { useData } from "../../../../Context/DataProviders";
import { updateArrayFieldAtIndex } from "../../../../Config/Services/Firebase/FireStoreDB";
import { notification } from "antd";
import { IconMapping, SocialMediaDashboard } from "../../../../Utils/item";
import { useStateProvider } from "../../../../Context/StateProvider";

const SocialMedia: React.FC = () => {
  const { setIsRefetch } = useStateProvider();
  const [isSelected, setSelected] = useState<number | undefined>();
  const [isChange, setChange] = useState<string>("");
  const { SocialMedia } = useData();

  const HandleUpdate = (idx: number) => {
    const data = isChange;

    updateArrayFieldAtIndex("website", "SocialMedia", "Data", data, idx).then(
      () => {
        notification["success"]({
          message: "Thành công !",
          description: `
          Thông tin của bạn đã được cập nhật !`,
        });
        setIsRefetch("SocialMedia");
      }
    );
  };

  return (
    <div className="w-full ">
      <div className="border rounded-md border-gray-500 ">
        <h3 className="p-5 shadow-lg rounded-t-md text-[25px] bg-[#353535]">
          Các kênh truyền thông
        </h3>
        <div className="p-5 grid d:grid-cols-4 d:gap-10 p:grid-cols-1 p:gap-2 ">
          {SocialMediaDashboard.map((items, idx) => {
            let Icon = IconMapping[items.icon];
            const SocialMediaItems = SocialMedia[idx];
            return (
              <Card
                key={idx}
                placeholder={SocialMediaItems}
                title={items.title}
                Icon={Icon}
                image={items.image}
                style={items.style}
                setSelected={setSelected}
                idx={idx}
                setChange={setChange}
                isSelected={isSelected}
                HandleUpdate={HandleUpdate}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;

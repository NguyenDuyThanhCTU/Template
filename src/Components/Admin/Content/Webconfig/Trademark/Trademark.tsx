import React, { useState } from "react";
import { useData } from "../../../../../Context/DataProviders";
import { notification } from "antd";
import { useStateProvider } from "../../../../../Context/StateProvider";
import { updateDocument } from "../../../../../Config/Services/Firebase/FireStoreDB";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uploadImage } from "../../../Item/Handle";

type ChangeEventType = React.ChangeEvent<HTMLInputElement>;

const Trademark = () => {
  const { TradeMarkData } = useData();
  const { setIsRefetch } = useStateProvider();
  const [Data, setData] = useState<string>("");
  const [isSelected, setSelected] = useState<number>();
  const [error, setError] = useState<boolean>(false);
  const [LogoUrl, setLogoUrl] = useState<string>("");
  const [IcoUrl, setIcoUrl] = useState<string>("");

  const HandleDiscard = () => {
    setData("");
    setLogoUrl("");
    setIcoUrl("");
  };

  const HandleUploadImage = (
    e: ChangeEventType,
    locate: string,
    type: string
  ) => {
    uploadImage(e, locate).then((data: any) => {
      if (type === "ico") {
        setIcoUrl(data);
      } else {
        setLogoUrl(data);
      }
    });
  };
  const ContactTrademark = [
    {
      name: "Logo Website",
      type: "input",
      placeholder: TradeMarkData.websiteLogo,
    },
    {
      name: "Icon Trang",
      type: "input",
      placeholder: TradeMarkData.websiteIco,
    },
  ];

  const ContactTrademark1 = [
    {
      name: "Tên website",
      type: "input",
      placeholder: TradeMarkData.websiteName,
    },
    {
      name: "Slogan công ty",
      type: "input",
      placeholder: TradeMarkData.websiteSlogan,
    },
  ];

  const HandleUpdate = (idx: any) => {
    if (!Data && !LogoUrl && !IcoUrl) {
      notification["error"]({
        message: "Lỗi !",
        description: `
        Vui lòng nhập thông tin trước khi CẬP NHẬT !`,
      });
    } else {
      let newData: object = {};
      if (idx === 0) {
        newData = { websiteLogo: Data };
      } else if (idx === 1) {
        newData = { websiteIco: Data };
      } else if (idx === 3) {
        newData = { websiteLogo: LogoUrl };
      } else if (idx === 4) {
        newData = { websiteIco: IcoUrl };
      } else if (idx === 5) {
        newData = { websiteName: Data };
      }
      updateDocument("website", "Trademark", newData).then(() => {
        notification["success"]({
          message: "Thành công !",
          description: `
          Thông tin đã được CẬP NHẬT !`,
        });
        HandleDiscard();
        setIsRefetch("trademark");
      });
    }
  };

  return (
    <div className="bg-[#353535] text-white rounded-xl shadow-xl w-auto">
      <div className="p-4 ">
        <h3 className="text-[25px] text-center ">Thương hiệu website</h3>

        <div className="flex flex-col gap-3 w-full ">
          {ContactTrademark1.map((items: any, idx: any) => {
            let Type = items.type;
            return (
              <div>
                <label>{items.name}</label>
                <div className="flex gap-5 p:flex-col d:flex-row w-full">
                  {Type && (
                    <div onClick={() => setSelected(idx)} className="w-full">
                      <Type
                        placeholder={items.placeholder}
                        type="text"
                        className="px-4 py-2 text-black outline-none rounded-2xl bg-gray-300 w-full "
                        onChange={(e: ChangeEventType) =>
                          setData(e.target.value)
                        }
                      />
                    </div>
                  )}
                  <div className="w-[120px]">
                    {isSelected === idx ? (
                      <button
                        className="hover:bg-[#bb86fc37] hover:text-[#BB86FC] text-[#74affc] bg-[#74affc43] px-3 py-2 rounded-xl"
                        onClick={() => HandleUpdate(idx)}
                      >
                        Cập nhật
                      </button>
                    ) : (
                      <button className="text-white bg-gray-400 px-3 py-2 rounded-xl cursor-default">
                        Cập nhật
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex d:flex-row gap-3 mt-5 p:flex-col">
          {ContactTrademark.map((items: any, idx) => {
            let Type = items.type;
            return (
              <div className="flex flex-col gap-3">
                <label>{items.name}</label>
                <div className="flex gap-5 d:flex-row p:flex-col">
                  {Type && (
                    <div
                      onClick={() => setSelected(idx)}
                      className="p:w-full d:w-auto"
                    >
                      <Type
                        placeholder={items.placeholder}
                        type="text"
                        className="px-4 py-2 text-black outline-none rounded-2xl bg-gray-300 w-full"
                        onChange={(e: ChangeEventType) =>
                          setData(e.target.value)
                        }
                      />
                    </div>
                  )}
                  <div className="w-[120px]">
                    {isSelected === idx ? (
                      <button
                        className="hover:bg-[#bb86fc37] hover:text-[#BB86FC] text-[#74affc] bg-[#74affc43] px-3 py-2 rounded-xl"
                        onClick={() => HandleUpdate(idx)}
                      >
                        Cập nhật
                      </button>
                    ) : (
                      <button className="text-white bg-gray-400 px-3 py-2 rounded-xl cursor-default">
                        Cập nhật
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-5 d:flex-row p:flex-col">
          <div>
            <label>
              <div className="flex justify-center mt-10  h-[300px] d:w-[350px] border rounded-lg cursor-pointer p:w-auto">
                <img
                  src={`${LogoUrl ? LogoUrl : TradeMarkData.websiteLogo}`}
                  alt="logo"
                  className="object-contain p-2"
                />

                <input
                  type="file"
                  className="w-0 h-0"
                  onChange={(e) => HandleUploadImage(e, "trademark", "logo")}
                />
              </div>
            </label>
            {error && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[260px]">
                Vui lòng chọn đúng định dạng
              </p>
            )}
            {LogoUrl ? (
              <div className="w-full justify-center flex">
                <button
                  className="hover:bg-[#bb86fc37] hover:text-[#BB86FC] text-[#fc7474] bg-[#fc747443] px-3 py-2 rounded-xl mt-3 "
                  onClick={() => HandleUpdate(3)}
                >
                  Cập nhật
                </button>
              </div>
            ) : (
              <p className="text-white italic text-[13px] mt-2">
                Nhấp vào logo để tải hình ảnh lên{" "}
                <strong className="text-redPrimmary">(*)</strong>
              </p>
            )}
          </div>

          <div>
            <label>
              <div className="flex justify-center mt-10  h-[300px] d:w-[350px] border rounded-lg cursor-pointer p:w-auto">
                <img
                  src={`${IcoUrl ? IcoUrl : TradeMarkData.websiteIco}`}
                  alt="logo"
                  className="object-contain p-2"
                />

                <input
                  type="file"
                  className="w-0 h-0"
                  onChange={(e) => HandleUploadImage(e, "trademark", "ico")}
                />
              </div>
            </label>
            {error && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[260px]">
                Vui lòng chọn đúng định dạng
              </p>
            )}
            {IcoUrl ? (
              <div className="w-full justify-center flex">
                <button
                  className="hover:bg-[#bb86fc37] hover:text-[#BB86FC] text-[#fc7474] bg-[#fc747443] px-3 py-2 rounded-xl mt-3 "
                  onClick={() => HandleUpdate(4)}
                >
                  Cập nhật
                </button>
              </div>
            ) : (
              <p className="text-white italic text-[13px] mt-2">
                Nhấp vào logo để tải hình ảnh lên{" "}
                <strong className="text-redPrimmary">(*)</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trademark;

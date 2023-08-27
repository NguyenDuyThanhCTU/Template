import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

import { Popconfirm, message, notification } from "antd";

import Input from "../Input";
import { FiEdit } from "react-icons/fi";
import { FcAddDatabase, FcViewDetails } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import { useData } from "../../../../Context/DataProviders";
import { useStateProvider } from "../../../../Context/StateProvider";
import {
  addDocument,
  delDocument,
} from "../../../../Config/Services/Firebase/FireStoreDB";
import { TypeProductItems } from "../../../../Utils/item";
import diacritic from "diacritic";
import { uploadImage } from "../Handle";

const AddType = () => {
  const [Name, setName] = useState("");
  const [Params, setIsParams] = useState("");
  const [Parent, setParent] = useState("Cửa hàng");
  const [ParentParams, setParentParams] = useState("cua-hang");

  const [imageUrl, setImageUrl] = useState("");
  const [isSelected, setSelected] = useState(false);
  const { setIsRefetch, setIsUploadProduct } = useStateProvider();
  const { productTypes, setUpdateId } = useData();

  const handleDiscard = () => {
    setName("");
    setIsParams("");
    setParent("Cửa hàng");
    setImageUrl("");
  };

  const HandleSubmit = () => {
    if (!Name) {
      notification["error"]({
        message: "Lỗi !",
        description: `
            Vui lòng nhập tên LOẠI SẢN PHẨM !`,
      });
    } else {
      const data = {
        name: Name,
        params: Params,
        parentName: Parent,
        parentParams: ParentParams,
        image: imageUrl,
        children: [],
      };

      addDocument("productTypes", data).then(() => {
        notification["success"]({
          message: "Thành công!",
          description: `
        Thông tin đã được CẬP NHẬT !`,
        });
        setIsRefetch("addHomeType");
        handleDiscard();
      });
    }
  };

  const HandleDelete = (id) => {
    delDocument("productTypes", id).then(() => {
      notification["success"]({
        message: "Success",
        description: `Yêu cầu của bạn đã được thực hiện thành công !`,
      });
    });
    setIsRefetch("deleted");
  };

  const HandleUploadImage = (e, locate) => {
    uploadImage(e, locate).then((data) => {
      setImageUrl(data);
    });
  };

  const convertToCodeFormat = (text) => {
    const textWithoutDiacritics = diacritic.clean(text);
    return textWithoutDiacritics.replace(/\s+/g, "-").toLowerCase();
  };

  useEffect(() => {
    const handleChange = () => {
      const userInput = Name;
      const formattedCode = convertToCodeFormat(userInput);
      if (formattedCode) {
        setIsParams(formattedCode);
      }
    };
    handleChange();
  }, [Name]);

  const handleTitleChange = (e) => {
    const selectedName = e.target.value;
    setParent(selectedName);
    const selectedItem = TypeProductItems.find(
      (item) => item.name === selectedName
    );
    if (selectedItem) {
      setParentParams(selectedItem.params);
    }
  };

  const HandleAddChildren = (id) => {
    setUpdateId(id);
    setIsUploadProduct("add-children-type");
  };

  const HandleSelected = (idx) => {
    if (isSelected === idx) {
      setSelected(0);
    } else {
      setSelected(idx);
    }
  };

  return (
    <div
      className={`bg-[rgba(0,0,0,0.3)] w-full flex items-center justify-center 
       h-full
      z-50 absolute rounded-md duration-300 `}
    >
      <div className="w-[80vw] h-[75vh] relative bg-white flex font-LexendDeca cursor-pointer rounded-sm ">
        <div className="items-center justify-center  w-full flex  ">
          <div className="flex w-[56vw]  justify-center gap-20 ">
            <div className="flex-1 h-[400px]">
              <p className="text-2xl font-bold text-center mb-3">
                Danh mục sản phẩm
              </p>
              <div className="grid  cols-4 items-center py-2  justify-start  border-t border-l border-r border-black">
                <p> </p>
                <p>Tên thể loại</p>
                <p>Mục</p>
                <p>Thời gian</p>
              </div>
              <div className="w-full border border-black h-[300px] overflow-y-scroll">
                {productTypes?.map((data, idx) => (
                  <div
                    key={idx}
                    className="grid  cols-4 items-center  my-5  ml-1  px-5 "
                  >
                    <div className="relative ">
                      <FiEdit
                        className="text-red-600 hover:scale-125 duration-300 "
                        onClick={() => HandleSelected(idx + 1)}
                      />
                      {isSelected === idx + 1 && (
                        <>
                          {" "}
                          <div className="w-[80px] bg-black opacity-90 absolute -top-2 h-8 left-5 rounded-lg">
                            <div className="mx-3 flex  justify-between text-[24px] h-full items-center ">
                              <FcAddDatabase
                                className="hover:scale-125 duration-300"
                                onClick={() => HandleAddChildren(data.id)}
                              />

                              <Popconfirm
                                title="Xóa sản phẩm"
                                description="Bạn muốn xóa sản phẩm này?"
                                onConfirm={() => {
                                  HandleDelete(data.id);
                                }}
                                onCancel={() => {
                                  message.error("Sản phẩm chưa được xóa!");
                                }}
                                okText="Yes"
                                okType="danger"
                                cancelText="No"
                              >
                                <MdDeleteForever className="text-red-600 hover:scale-125 duration-300" />
                              </Popconfirm>
                            </div>
                            <div className="absolute bg-none w-3 h-8 top-0 -left-2"></div>
                          </div>
                        </>
                      )}
                    </div>
                    <p className=" truncate">{data.name}</p>
                    <p className=" truncate">{data.parentName}</p>

                    <div className="ml-5">
                      {data.daysSinceCreation > 0 ? (
                        <div>
                          {" "}
                          <p className="text-[12px] w-[85px] truncate  py-1 border px-2 rounded-3xl text-orange-300 border-orange-300">
                            {data.daysSinceCreation} ngày trước
                          </p>
                        </div>
                      ) : (
                        <>
                          {" "}
                          <p className="text-[12px] w-[65px] truncate  border px-2 py-1 rounded-3xl text-green-300 border-green-300">
                            Bây giờ
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 ">
              <p className="text-2xl font-bold text-center mb-3">
                Thêm danh mục
              </p>

              <div>
                <Input text={`Tên danh mục`} Value={Name} setValue={setName} />
                <div className="flex   gap-2 items-center">
                  <div className="">
                    <Input
                      text="Liên kết hình ảnh"
                      Value={imageUrl}
                      setValue={setImageUrl}
                      Input={true}
                    />
                  </div>
                  <p className="text-red-500 italic">Hoặc</p>
                  <label>
                    <p className="bg-[#0047AB] hover:bg-[#0000FF] mt-8  text-center rounded text-white text-md font-medium p-2 w-52 outline-none">
                      Chọn từ thiết bị
                    </p>
                    <input
                      type="file"
                      onChange={(e) => HandleUploadImage(e, "Types")}
                      className="w-0 h-0"
                      id="fileInput"
                    />
                  </label>
                </div>
                <div
                  className={`flex flex-col gap-2 h-[100px] overflow-hidden`}
                >
                  <label className="text-md font-medium ">
                    Chọn mục cần thêm:
                  </label>
                  <select
                    className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                    onChange={handleTitleChange}
                  >
                    {TypeProductItems.map((item, idx) => (
                      <option
                        key={idx}
                        className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-6 mt-10">
                  <button
                    onClick={() => handleDiscard()}
                    type="button"
                    className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                  >
                    Xóa
                  </button>
                  <button
                    //disabled={videoAsset?.url ? false : true}
                    onClick={() => HandleSubmit()}
                    type="button"
                    className="bg-[#df6cad] hover:bg-red-500 focus:outline-none focus:shadow-outline text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                  >
                    Tải lên
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AiFillCloseCircle
          className="absolute -top-5 -right-5 text-[40px] border-white border-4 bg-black rounded-3xl text-white "
          onClick={() => {
            setIsUploadProduct("");
          }}
        />
      </div>
    </div>
  );
};

export default AddType;

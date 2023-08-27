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
  addAtArrayField,
  addDataToArrayField,
  addDocument,
  delDocument,
  deleteDataFromArrayField,
  updateArrayFieldAtIndex,
} from "../../../../Config/Services/Firebase/FireStoreDB";
import { TypeProductItems } from "../../../../Utils/item";
import diacritic from "diacritic";
import { uploadImage } from "../Handle";

const AddChildrenType = () => {
  const [Name, setName] = useState("");
  const [Params, setIsParams] = useState("");
  const [Parent, setParent] = useState("Cửa hàng");
  const [ParentParams, setParentParams] = useState("cua-hang");

  const [imageUrl, setImageUrl] = useState("");
  const [isSelected, setSelected] = useState(0);
  const [isType, setType] = useState();

  const { setIsRefetch, setIsUploadProduct } = useStateProvider();
  const { productTypes, updateId } = useData();

  useEffect(() => {
    const sort = productTypes.filter((item) => item.id === updateId);
    if (sort) {
      setType(sort[0]);
    }
  }, [updateId, productTypes, isType]);

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
        parentName: isType.name,
        parentParams: isType.params,
        image: imageUrl,
      };

      addDataToArrayField("productTypes", updateId, "children", data).then(
        () => {
          notification["success"]({
            message: "Thành công!",
            description: `
        Thông tin đã được CẬP NHẬT !`,
          });
          setIsRefetch("update children type");
        }
      );
    }
  };

  const HandleDelete = (idx) => {
    deleteDataFromArrayField("productTypes", updateId, "children", idx).then(
      () => {
        notification["success"]({
          message: "Success",
          description: `Yêu cầu của bạn đã được thực hiện thành công !`,
        });
        setIsRefetch("deleted");
      }
    );
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
                Danh sách loại sản phẩm
              </p>
              <div className="grid  cols-4 items-center py-2  justify-start  border-t border-l border-r border-black">
                <p> </p>
                <p>Tên thể loại</p>
                <p>Mục</p>
                <p>Thời gian</p>
              </div>
              <div className="w-full border border-black h-[300px] overflow-y-scroll">
                {isType?.children.map((data, idx) => (
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
                          <div className="w-[40px] bg-black opacity-90 absolute -top-2 h-8 left-5 rounded-lg">
                            <div className="mx-3 flex  justify-between text-[24px] h-full items-center ">
                              <Popconfirm
                                title="Xóa sản phẩm"
                                description="Bạn muốn xóa sản phẩm này?"
                                onConfirm={() => {
                                  HandleDelete(idx);
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
                Thêm mục con
              </p>

              <div>
                <Input text={`Tên mục con`} Value={Name} setValue={setName} />

                <div className="flex gap-6 mt-10">
                  <button
                    onClick={() => setIsUploadProduct("add-types")}
                    type="button"
                    className="border-blue-500 text-blue-500 hover:text-blue-700 hover:border-blue-700  border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                  >
                    Quay về
                  </button>
                  <button
                    //disabled={videoAsset?.url ? false : true}
                    onClick={() => HandleSubmit()}
                    type="button"
                    className="bg-[#df6cad] hover:bg-red-500 duration-300 focus:outline-none focus:shadow-outline text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
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

export default AddChildrenType;

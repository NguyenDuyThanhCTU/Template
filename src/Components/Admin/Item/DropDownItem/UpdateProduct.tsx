import React, { useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlineDelete } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";
import { notification } from "antd";

import Input from "../Input";
import { useStateProvider } from "../../../../Context/StateProvider";
import { updateDocument } from "../../../../Config/Services/Firebase/FireStoreDB";
import { useData } from "../../../../Context/DataProviders";
import { TypeProductItems } from "../../../../Utils/item";
import { uploadImage } from "../Handle";

type ChangeEventType = React.ChangeEvent<HTMLInputElement>;

const UpdateProduct: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [Title, setTitle] = useState<string | undefined>();
  const [Price, setPrice] = useState<string | undefined>();
  const [Content, setContent] = useState<string | undefined>();
  const [isType, setIsType] = useState<string | undefined>();
  const [isTypeParams, setIsTypeParams] = useState<string | undefined>();
  const [isParent, setIsParent] = useState<string | undefined>();
  const [isParentParams, setIsParentParams] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [colorImage, setColorImage] = useState<string>("");
  const [listColor, setListColor] = useState<any[]>([]);
  const [column, setColumn] = useState<string | undefined>();
  const [listUrl, setListUrl] = useState<any[]>([]);
  const { setDropDown, setIsRefetch } = useStateProvider();
  const { productTypes, Products, UpdateId } = useData();

  const [ProductSort, setProductSort] = useState<any>();

  const handleDiscard = () => {
    setContent("");
    setTitle("");
  };

  useEffect(() => {
    const product = Products.filter((item: any) => item.id === UpdateId);
    if (product.length > 0) {
      setProductSort(product[0]);
    }
  }, [Products, UpdateId]);

  useEffect(() => {
    setListColor(ProductSort?.color);
  }, [ProductSort]);

  const HandleUpdate = () => {
    const data: any = {
      ...(Title && { title: Title }),
      ...(Content && { content: Content }),
      ...(Price && { price: Price }),
      ...(isType && { type: isType }),
      ...(imageUrl && { image: imageUrl }),
      ...(isTypeParams && { params: isTypeParams }),
      ...(isParent && { parent: isParent }),
      ...(isParentParams && { parentParams: isParentParams }),
      ...(column && { column: column }),
      ...(listColor && { color: listColor }),
    };

    updateDocument("products", UpdateId, data).then(() => {
      notification["success"]({
        message: "Tải lên thành công!",
        description: `Sản phẩm của bạn đã được cập nhật !`,
      });

      setIsRefetch("upload successful");
      handleDiscard();
    });
  };

  const HandleUploadImage = (e: ChangeEventType, locate: string) => {
    uploadImage(e, locate).then((data: any) => {
      setImageUrl(data);
    });
  };

  const HandleParentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setIsParent(selectedName);
    const selectedItem = TypeProductItems.find(
      (item) => item.name === selectedName
    );
    if (selectedItem) {
      setIsParentParams(selectedItem.params);
    }
  };

  useEffect(() => {
    const sortType = productTypes?.filter(
      (item: any) => item.parent === isParentParams
    );
    if (sortType && sortType.length > 0) {
      setIsType(sortType[0]?.name);
      setIsTypeParams(sortType[0]?.params);
    }
  }, [isParent, isParentParams, productTypes]);

  const HandleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setIsType(selectedName);
    const selectedItem = productTypes.find(
      (item: any) => item.name === selectedName
    );
    if (selectedItem) {
      setIsTypeParams(selectedItem.params);
    }
  };

  const popValue = (indexToRemove: number, type: string) => {
    if (type === "image") {
      setListUrl((prevUrls: any) =>
        prevUrls.filter((_: any, index: any) => index !== indexToRemove)
      );
    } else if (type === "color") {
      setListColor((prevColors: any) =>
        prevColors.filter((_: any, index: any) => index !== indexToRemove)
      );
    }
  };

  const pushValue = (type: string) => {
    if (type === "image") {
      setListUrl((prevUrls: any) => [...prevUrls, imageUrl]);
      setImageUrl("");
    } else if (type === "color") {
      const data = {
        type: color,
        image: colorImage,
      };

      setListColor((prevColors: any) => [...prevColors, data]);
      setColor("");
      setColorImage("");
    }
  };
  return (
    <div
      className={`bg-[rgba(0,0,0,0.3)] w-full 
       h-full
      z-50 absolute rounded-md duration-300 flex items-center justify-center`}
    >
      <div className="w-auto h-auto bg-white relative p-10  font-LexendDeca cursor-pointer rounded-sm flex flex-col justify-center">
        <p className="text-2xl font-bold text-center text-[30px] mb-5">
          Cập nhật sản phẩm {ProductSort?.title}
        </p>
        <div className="flex">
          <div className="justify-center   w-full flex items-center gap-20">
            <div className="">
              <div className=" border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-5 w-[260px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
                {ProductSort?.image ? (
                  <div>
                    <img
                      src={ProductSort?.image}
                      className="w-[100%] h-[200px] object-cover"
                      alt=""
                    />
                    <label>
                      <p className="bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Chọn lại
                      </p>
                      <input
                        id="fileInput"
                        type="file"
                        onChange={(e) => HandleUploadImage(e, "product")}
                        className="w-0 h-0"
                      />
                    </label>
                    <p className="text-red-500 italic">Hoặc</p>
                    <div className="">
                      <Input
                        text="Liên kết hình ảnh"
                        Value={imageUrl}
                        setValue={setImageUrl}
                        Input={true}
                        PlaceHolder=""
                      />
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">
                          Chọn hình ảnh để tải lên
                        </p>
                      </div>
                      <p className="text-gray-400  text-center mt-10 text-sm leading-10">
                        Định dạng jpg hoặc png <br />
                      </p>
                      <p className="bg-[#0047AB] hover:bg-[#0000FF] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Chọn từ thiết bị
                      </p>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => HandleUploadImage(e, "products")}
                      className="w-0 h-0"
                      id="fileInput"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex items-center gap-10">
              <div className=" w-[700px] flex flex-col  items-center">
                <div className="grid grid-cols-2 gap-5 w-full">
                  {isParentParams === "album-anh" ? (
                    <></>
                  ) : (
                    <>
                      {" "}
                      <div className="  flex flex-col gap-3">
                        <Input
                          text="Tên sản phẩm"
                          Value={Title}
                          setValue={setTitle}
                          Input={true}
                          PlaceHolder={ProductSort.title}
                        />

                        <Input
                          text="Giá sản phẩm"
                          Value={Price}
                          setValue={setPrice}
                          Input={true}
                          PlaceHolder={ProductSort.price}
                        />
                        <Input
                          text="Mô tả sản phẩm"
                          Value={Content}
                          setValue={setContent}
                          Input={false}
                          PlaceHolder={ProductSort.describe}
                        />
                      </div>
                    </>
                  )}

                  <div className="  flex flex-col gap-3">
                    <div className="flex gap-2 w-full">
                      <div className="flex flex-col gap-2">
                        <label className="text-md font-medium ">
                          Mục bài viết:
                        </label>
                        <select
                          className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                          onChange={HandleParentChange}
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
                      <div className="flex flex-col gap-2 w-[190px]">
                        <label className="text-md font-medium ">
                          Loại bài viết
                        </label>
                        <select
                          className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                          onChange={HandleTypeChange}
                        >
                          {productTypes
                            ?.filter(
                              (item: any) =>
                                item.parentParams === isParentParams
                            )
                            .map((item: any, idx: any) => (
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
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="grid grid-cols-2 gap-2  items-end">
                        <div>
                          <Input
                            Value={color}
                            setValue={setColor}
                            text="Mã màu"
                            Input={true}
                            PlaceHolder=""
                          />
                        </div>
                        <label>
                          <p className="bg-[#0047AB] hover:bg-[#0000FF]  text-center rounded text-white text-md font-medium p-2  outline-none">
                            Chọn từ thiết bị
                          </p>
                          <input
                            type="file"
                            onChange={(e) => HandleUploadImage(e, "color")}
                            className="w-0 h-0"
                            id="fileInput"
                          />
                        </label>
                      </div>
                      <Input
                        Value={column}
                        setValue={setColumn}
                        text="Số cột"
                        Input={true}
                        PlaceHolder={ProductSort.column}
                      />
                      <div className="text-center">
                        {color && colorImage ? (
                          <>
                            {" "}
                            <div
                              className="p-2 bg-red-600 text-white rounded-lg "
                              onClick={() => pushValue("color")}
                            >
                              Thêm
                            </div>
                          </>
                        ) : (
                          <>
                            {" "}
                            <div
                              className="p-2 bg-red-300 hover:bg-red-600 text-white rounded-lg "
                              onClick={() => {
                                notification["error"]({
                                  message: "Lỗi !!!",
                                  description: `Vui lòng bổ sung đầy đủ thông tin !`,
                                });
                              }}
                            >
                              Thêm
                            </div>
                          </>
                        )}
                      </div>
                      <div className="overflow-y-auto border rounded-xl w-full  h-[100px] mt-5">
                        <div className="p-1 grid grid-cols-4 ">
                          {listColor && (
                            <>
                              {" "}
                              {listColor.map((items: any, idx: number) => {
                                return (
                                  <div className="my-2 relative w-[50px] h-[50px] group border flex justify-center items-center">
                                    <img src={items.image} alt="" />
                                    <div className="w-full h-full flex justify-center items-center ] text-[25px] absolute top-0  z-10 text-redPrimmary ">
                                      <p>{items.type}</p>
                                    </div>
                                    <div
                                      className="w-full h-full  group-hover:flex justify-center items-center bg-[rgba(0,0,0,0.3)] text-[40px] absolute top-0  z-10 text-redPrimmary hidden"
                                      onClick={() => popValue(idx, "color")}
                                    >
                                      <AiOutlineDelete className="" />
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </div>
                      </div>
                      {/* <p className="italic text-gray-600 ml-2">
                        không có màu bạn cần?{" "}
                        <span
                          className="hover:text-blue-500 hover:underline underline"
                          onClick={() => setDropDown("add-color")}
                        >
                          thêm màu
                        </span>
                      </p> */}
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 mt-10 ">
                  <button
                    onClick={() => handleDiscard()}
                    type="button"
                    className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                  >
                    Xóa
                  </button>
                  <button
                    //disabled={videoAsset?.url ? false : true}
                    onClick={() => HandleUpdate()}
                    type="button"
                    className="bg-[#df6cad] hover:bg-red-500 focus:outline-none focus:shadow-outline text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AiFillCloseCircle
          className="absolute -top-5 -right-5 text-[40px] border-white border-4 bg-black rounded-3xl text-white "
          onClick={() => {
            setDropDown("");
          }}
        />
      </div>
    </div>
  );
};

export default UpdateProduct;

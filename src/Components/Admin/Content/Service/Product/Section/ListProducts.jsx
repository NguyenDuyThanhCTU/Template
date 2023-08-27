import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper";
import { FiEdit } from "react-icons/fi";
import { FcViewDetails } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";

import { Popconfirm, message, notification } from "antd";

import { useStateProvider } from "../../../../../../Context/StateProvider";
import { useData } from "../../../../../../Context/DataProviders";

import { delDocument } from "../../../../../../Config/Services/Firebase/FireStoreDB";
import { AiOutlineCloudUpload } from "react-icons/ai";
import ListProduct from "./ListTypes";

const ListProducts = ({ name }) => {
  const { setIsRefetch, setIsUploadProduct } = useStateProvider();
  const { Products, setUpdateId } = useData();

  const HandleDelete = (id) => {
    delDocument("products", id).then(() => {
      notification["success"]({
        message: "Thành công!",
        description: `Yêu cầu của bạn đã được thực hiện thành công !`,
      });
    });
    setIsRefetch("deleted");
  };

  const HandleEdit = (id) => {
    setUpdateId(id);
    setIsUploadProduct("edit-product");
  };

  const HandleUpdate = (id) => {
    setUpdateId(id);
    setIsUploadProduct("update-product");
  };

  return (
    <div className=" rounded-xl">
      <div className="p-4 flex gap-5 border flex-col">
        <div className="flex items-center justify-start gap-2 ">
          <div className="h-1 w-[70px] bg-[#40b2b5] d:block p:hidden"></div>
          <h3 className="text-[24px] font-normal uppercase text-center">
            {name}
          </h3>
        </div>
        <div className="flex gap-5 d:flex-row p:flex-col">
          <div className="grid p:grid-cols-1 d:grid-cols-2 gap-10 cursor-pointer p:h-auto d:h-[550px]  p-5 border">
            <div className="shadow-2xl bg-[#353535] p:h-auto d:h-[300px] hover:shadow-gray-700 duration-300">
              <div className=" d:h-[320px] p:h-auto">
                <div className="p-3">
                  <div className="flex justify-between items-center text-[25px] pb-3 flex-col gap-5">
                    <p className="uppercase text-white text-center w-full">
                      Danh sách hình ảnh sản phẩm
                    </p>

                    <div className="p:h-auto d:h-[200px] p:w-[60vw] d:w-full border  rounded-2xl  ">
                      <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: false,
                        }}
                        navigation={true}
                        modules={[Autoplay, Navigation]}
                        className="mySwiper"
                      >
                        {Products.map((items) => (
                          <>
                            <SwiperSlide>
                              <img
                                key={items.id}
                                src={items.image[0]}
                                alt="banner"
                                className="h-[200px] w-full object-contain p-4"
                              />
                            </SwiperSlide>
                          </>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-gradient-to-r  from-gray-600  to-gray-700 rounded-md p-5">
                <div className=" ml-3 ">
                  <h3 className="py-3 text-[25px] font-bold uppercase underline">
                    Thêm sản phẩm
                  </h3>
                </div>

                <div className="mt-3">
                  <div
                    className="flex  justify-center items-center gap-2 uppercase py-2 border mx-2 bg-purple hover:bg-purpleAdmin hover:text-purpleHover hover:border-purpleHover text-blueAdmin border-blueAdmin  "
                    onClick={() => setIsUploadProduct("add-product")}
                  >
                    <AiOutlineCloudUpload className="text-[20px]" />{" "}
                    <p>Tải lên</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="shadow-2xl bg-[#353535] h-auto hover:shadow-gray-700 duration-300">
              <div className="flex justify-between items-center text-[25px] flex-col gap-5 p-3">
                <p className="uppercase text-white text-center w-full">
                  Danh sách sản phẩm
                </p>
                <div className="h-[400px]  w-full border  rounded-2xl overflow-y-scroll ">
                  {Products.map((data, idx) => (
                    <div
                      key={idx}
                      className="grid  grid-cols-4 items-center my-2  ml-1 justify-start px-5 "
                    >
                      <div className="group relative ">
                        <FiEdit className="text-red-600 hover:scale-125 duration-300 " />
                        <div className="w-[120px] bg-white opacity-90 absolute -top-2 h-8 left-5 rounded-lg hidden group-hover:block ">
                          <div className="mx-3 flex  justify-between text-[24px] h-full items-center ">
                            <FcViewDetails
                              className="hover:scale-125 duration-300"
                              onClick={() => HandleEdit(data.id)}
                            />
                            <FiEdit
                              className="text-green-600 hover:scale-125 duration-300"
                              onClick={() => HandleUpdate(data.id)}
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
                      </div>

                      <img
                        src={data.image[0]}
                        alt="product"
                        className="w-14 h-14 rounded-lg object-cover"
                      />

                      <div className="truncate w-[70px] text-[14px]">
                        {data.title}
                      </div>
                      <div>
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
            </div>
          </div>

          <ListProduct />
        </div>
      </div>
    </div>
  );
};

export default ListProducts;

//Custom
import React from "react";

const AddColor = () => {
  return <div>AddColor</div>;
};

export default AddColor;
// import React, { useEffect, useState } from "react";
// import { AiFillCloseCircle } from "react-icons/ai";

// import { Popconfirm, message, notification } from "antd";

// import Input from "../Input";
// import { FiEdit } from "react-icons/fi";
// import { MdDeleteForever } from "react-icons/md";
// import { useData } from "../../../../Context/DataProviders";
// import { useStateProvider } from "../../../../Context/StateProvider";
// import {
//   addDocument,
//   delDocument,
// } from "../../../../Config/Services/Firebase/FireStoreDB";

// import { uploadImage } from "../Handle";

// const AddColor = () => {
//   const [Name, setName] = useState("");

//   const [imageUrl, setImageUrl] = useState("");
//   const [isSelected, setSelected] = useState(false);
//   const { setIsRefetch, setDropDown } = useStateProvider();
//   const { Color } = useData();

//   const handleDiscard = () => {
//     setName("");
//     setImageUrl("");
//   };

//   const HandleSubmit = () => {
//     if (!Name) {
//       notification["error"]({
//         message: "Lỗi !",
//         description: `
//             Vui lòng nhập tên MÀU !`,
//       });
//     } else {
//       const data = {
//         name: Name,
//         image: imageUrl,
//       };

//       addDocument("colors", data).then(() => {
//         notification["success"]({
//           message: "Thành công!",
//           description: `
//         Thông tin đã được CẬP NHẬT !`,
//         });
//         setIsRefetch("add color");
//         handleDiscard();
//       });
//     }
//   };

//   const HandleDelete = (id) => {
//     delDocument("colors", id).then(() => {
//       notification["success"]({
//         message: "Success",
//         description: `Yêu cầu của bạn đã được thực hiện thành công !`,
//       });
//     });
//     setIsRefetch("deleted");
//   };

//   const HandleUploadImage = (e, locate) => {
//     uploadImage(e, locate).then((data) => {
//       setImageUrl(data);
//     });
//   };

//   const HandleSelected = (idx) => {
//     if (isSelected === idx) {
//       setSelected(0);
//     } else {
//       setSelected(idx);
//     }
//   };

//   return (
//     <div
//       className={`bg-[rgba(0,0,0,0.3)] w-full flex items-center justify-center
//        h-full
//       z-50 absolute rounded-md duration-300 `}
//     >
//       <div className="w-[80vw] h-[75vh] relative bg-white flex font-LexendDeca cursor-pointer rounded-sm ">
//         <div className="items-center justify-center  w-full flex  ">
//           <div className="flex w-[56vw]  justify-center gap-20 ">
//             <div className="flex-1 h-[400px]">
//               <p className="text-2xl font-bold text-center mb-3">
//                 Danh mục màu
//               </p>
//               <div className="grid  cols-4 items-center py-2  justify-start  border-t border-l border-r border-black">
//                 <p> </p>
//                 <p>Tên màu</p>
//                 <p>Hình ảnh</p>
//                 <p>Thời gian</p>
//               </div>
//               <div className="w-full border border-black h-[300px] overflow-y-scroll">
//                 {Color?.map((data, idx) => (
//                   <div
//                     key={idx}
//                     className="grid  cols-4 items-center  my-5  ml-1  px-5 "
//                   >
//                     <div className="relative ">
//                       <FiEdit
//                         className="text-red-600 hover:scale-125 duration-300 "
//                         onClick={() => HandleSelected(idx + 1)}
//                       />
//                       {isSelected === idx + 1 && (
//                         <>
//                           {" "}
//                           <div className="w-[40px] bg-black opacity-90 absolute -top-2 h-8 left-5 rounded-lg">
//                             <div className="mx-3 flex  justify-between text-[24px] h-full items-center ">
//                               <Popconfirm
//                                 title="Xóa màu"
//                                 description="Bạn muốn xóa màu này?"
//                                 onConfirm={() => {
//                                   HandleDelete(data.id);
//                                 }}
//                                 onCancel={() => {
//                                   message.error("màu chưa được xóa!");
//                                 }}
//                                 okText="Yes"
//                                 okType="danger"
//                                 cancelText="No"
//                               >
//                                 <MdDeleteForever className="text-red-600 hover:scale-125 duration-300" />
//                               </Popconfirm>
//                             </div>
//                             <div className="absolute bg-none w-3 h-8 top-0 -left-2"></div>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                     <p className=" truncate">{data.name}</p>
//                     <div className="w-10 h-10">
//                       <img
//                         src={data.image}
//                         alt="color"
//                         className="w-full h-full"
//                       />
//                     </div>

//                     <div className="ml-5">
//                       {data.daysSinceCreation > 0 ? (
//                         <div>
//                           {" "}
//                           <p className="text-[12px] w-[85px] truncate  py-1 border px-2 rounded-3xl text-orange-300 border-orange-300">
//                             {data.daysSinceCreation} ngày trước
//                           </p>
//                         </div>
//                       ) : (
//                         <>
//                           {" "}
//                           <p className="text-[12px] w-[65px] truncate  border px-2 py-1 rounded-3xl text-green-300 border-green-300">
//                             Bây giờ
//                           </p>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex-1 ">
//               <p className="text-2xl font-bold text-center mb-3">Thêm màu</p>

//               <div>
//                 <Input text={`Tên màu`} Value={Name} setValue={setName} />
//                 <div className="flex   gap-2 items-center">
//                   <div className="">
//                     <Input
//                       text="Liên kết hình ảnh"
//                       Value={imageUrl}
//                       setValue={setImageUrl}
//                       Input={true}
//                     />
//                   </div>
//                   <p className="text-red-500 italic">Hoặc</p>
//                   <label>
//                     <p className="bg-[#0047AB] hover:bg-[#0000FF] mt-8  text-center rounded text-white text-md font-medium p-2 w-52 outline-none">
//                       Chọn từ thiết bị
//                     </p>
//                     <input
//                       type="file"
//                       onChange={(e) => HandleUploadImage(e, "Types")}
//                       className="w-0 h-0"
//                       id="fileInput"
//                     />
//                   </label>
//                 </div>

//                 <div className="flex gap-6 mt-10">
//                   <button
//                     onClick={() => setDropDown("add-product")}
//                     type="button"
//                     className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
//                   >
//                     Quay về
//                   </button>
//                   <button
//                     //disabled={videoAsset?.url ? false : true}
//                     onClick={() => HandleSubmit()}
//                     type="button"
//                     className="bg-[#df6cad] hover:bg-red-500 focus:outline-none focus:shadow-outline text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
//                   >
//                     Tải lên
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <AiFillCloseCircle
//           className="absolute -top-5 -right-5 text-[40px] border-white border-4 bg-black rounded-3xl text-white "
//           onClick={() => {
//             setDropDown("");
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default AddColor;

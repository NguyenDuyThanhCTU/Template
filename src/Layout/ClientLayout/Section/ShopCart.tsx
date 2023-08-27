// import React from "react";
// import { AiOutlineDoubleRight } from "react-icons/ai";
// import { useData } from "../../../Context/DataProviders";
// import { RxCross2 } from "react-icons/rx";
// import { useStateProvider } from "../../../Context/StateProvider";
// import { Link } from "react-router-dom";

// const ShopCart = () => {
//   const { OpenCart, setOpenCart } = useStateProvider();

//   const { CartItems, Products, setCartItems } = useData();

//   const cartMap = {};
//   const listColor = [];
//   CartItems.forEach((itemId) => {
//     cartMap[itemId.id] = (cartMap[itemId.id] || 0) + 1;
//     listColor.push(itemId.color);
//   });

//   const cartProducts = [];
//   let totalAmount = 0.0; // Tổng tiền hóa đơn (số thực)

//   Object.keys(cartMap).forEach((itemId) => {
//     const product = Products.find((product) => product.id === itemId);
//     if (product) {
//       const itemCount = cartMap[itemId];
//       const itemTotal = product.price * itemCount;
//       totalAmount += itemTotal;

//       cartProducts.push({
//         ...product,
//         count: itemCount,
//         total: itemTotal,
//         ListColor: listColor,
//       });
//     }
//   });

//   const handleRemoveFromCart = (productId) => {
//     const updatedCartItems = CartItems.filter((itemId) => itemId !== productId);
//     setCartItems(updatedCartItems);
//   };

//   return (
//     <>
//       <div
//         className={` w-80 min-h-[200px] transform  ${
//           OpenCart ? " -translate-x-[300px]" : "-translate-x-[20px]"
//         }

//           transition duration-300 flex`}
//       >
//         <div
//           className="w-[43px] h-[43px] flex items-center justify-center bg-mainblue text-white hover:bg-mainpink duration-300 group"
//           onClick={() => setOpenCart(!OpenCart)}
//         >
//           {OpenCart ? (
//             <>
//               {" "}
//               <AiOutlineDoubleRight className="group-hover:rotate-0 rotate-90 duration-500" />
//             </>
//           ) : (
//             <>
//               {" "}
//               <AiOutlineDoubleRight className="group-hover:rotate-90 duration-500" />
//             </>
//           )}
//         </div>
//         <div className="bg-[#fdf1d8] w-full font-LexendDeca">
//           <div className=" w-full">
//             <h3 className="uppercase font-iCielBCCubano bg-gradient-to-l from-blue-300 to-blue-600 text-white text-center py-[10px] bg-no-repeat bg-cover font-bold">
//               Giỏ hàng của bạn
//             </h3>
//             <div className="border-t-4 h-2 w-full border-solid bg-gradient-to-r from-blue-300 to-blue-600 mt-1"></div>
//             <div className="text-right">
//               <div className="h-[320px] overflow-y-scroll   ">
//                 {cartProducts.map((product) => (
//                   <div
//                     key={product.id}
//                     className="flex flex-col px-2 gap-1 items-start py-4 w-full border-b border-black relative"
//                   >
//                     <div className="flex w-full justify-start gap-2 ">
//                       <div className="w-14 h-14 rounded-lg relative">
//                         <img
//                           src={product.image}
//                           alt="product img"
//                           className="w-full h-full object-cover hover:scale-110 duration-500"
//                         />
//                         <div className="absolute w-6 h-6 bg-white rounded-full -top-2 z-20 flex items-center justify-center text-red-500 font-bold  -right-2">
//                           <span> {product.count}</span>
//                         </div>
//                       </div>
//                       <div className="flex flex-col text-start ">
//                         <h3 className="   w-full">{product.title}</h3>
//                         <p className="italic text-[14px] text-gray-500">
//                           Mã màu:
//                         </p>
//                         <div className="w-full grid grid-cols-5 gap-2 grid-row-2">
//                           {product.ListColor.map((items, idx) => (
//                             <>
//                               <p>{items}</p>
//                             </>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                     <div>
//                       {/* <p className="w-full text-right">
//                         Giá:{" "}
//                         <span className="text-mainpink">
//                           {" "}
//                           {product.price} <sup>VNĐ</sup>
//                         </span>
//                       </p> */}
//                       <p className="w-full text-right">
//                         Giá:{" "}
//                         <span className="text-mainpink">
//                           {" "}
//                           {product.price} <sup>VNĐ</sup>
//                         </span>
//                       </p>
//                     </div>
//                     <div
//                       className="absolute top-2 right-2"
//                       onClick={() => handleRemoveFromCart(product.id)}
//                     >
//                       <RxCross2 />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="py-4  flex w-full justify-between px-2">
//                 <div className="font-SVNDancing text-[28px]">Tổng: </div>
//                 <div className="flex flex-col gap-2">
//                   <div>
//                     <span className="text-mainpink">
//                       {" "}
//                       {totalAmount.toFixed(3)} <sup>VNĐ</sup>
//                     </span>
//                   </div>
//                   <Link to={"/gio-hang"}>
//                     <div className="px-4 bg-mainblue py-1 text-white cursor-pointer">
//                       Đặt hàng
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ShopCart;
import React from "react";

const ShopCart = () => {
  return <div>ShopCart</div>;
};

export default ShopCart;

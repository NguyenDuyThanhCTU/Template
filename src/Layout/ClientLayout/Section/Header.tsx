import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../../Context/DataProviders";
import { useStateProvider } from "../../../Context/StateProvider";

import DropDown from "../Item/DropDown";

import { HeaderItems } from "../../../Utils/item";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { AiFillCaretRight } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  const [isSelected, setIsSelected] = useState(0);
  const [Hidden, setHidden] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [elementTop, setElementTop] = useState(95);
  const [IsTranslate, setTranslate] = useState(false);
  const [Search, setSearch] = useState("");
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(0);
  const targetPosition = 1;
  const { TradeMarkData, productTypes, CartItems } = useData();
  const { setOpenCart, OpenCart } = useStateProvider();

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset || document.documentElement.scrollTop;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > targetPosition) {
      setElementTop(0);
      setTranslate(true);
    } else {
      setElementTop(95);
      setTranslate(false);
    }
  }, [scrollPosition]);

  const HandleOpenSubMenu = (idx: number) => {
    if (idx === isOpenSubMenu) {
      setIsOpenSubMenu(0);
    } else {
      setIsOpenSubMenu(idx);
    }
  };

  return (
    <div className="d:h-[126px] font-LexendDeca  p:h-auto">
      <div className="bg-white ">
        <div className=" bg-none h-full relative  bg-white ">
          <div className=" w-full    text-[#1b365d] h-[92px] z-50 p:hidden d:flex justify-center">
            <div className="flex justify-between first-letter: items-center w-[1100px] ">
              <div className="flex items-center gap-10">
                <Link to="/">
                  <img
                    src={TradeMarkData.websiteLogo}
                    alt="img"
                    className="w-[110px]"
                  />
                </Link>
                <div className=" text-[#2d94c4]">
                  <div className="flex items-center flex-col">
                    <h3 className="uppercase text-[24px] font-bold">
                      THẢO NGÔ NAIL
                    </h3>
                    <span className="text-redPrimmary">
                      Uy tín - Chất lượng - Giá rẻ
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-20 items-center">
                <div className="relative text-black group  cursor-pointer">
                  <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 px-4 outline-none rounded-full bg-white border-mainpink border w-[300px]"
                  />
                  <Link to={`/cua-hang/tim-kiem/${Search}`}>
                    <FiSearch
                      className={`${
                        Search && "-right-10 bg-[#F67D08] text-white"
                      } group-hover:bg-[#F67D08] group-hover:text-white inline-block bg-white w-[36px] h-[36px] p-2 font-bold rounded-full text-[#F67D08] absolute right-[4px] bottom-[3px] group-hover:-right-10  duration-300 hover:scale-110`}
                    />
                  </Link>
                  <div
                    className={`${
                      Search ? "-top-3 left-5  " : "top-2 left-4"
                    } bg-white absolute   group-hover:-top-3 group-hover:left-5 px-2 duration-300`}
                  >
                    Tìm kiếm
                  </div>
                </div>

                <div
                  className="text-[24px] relative cursor-pointer"
                  onClick={() => setOpenCart(!OpenCart)}
                >
                  <div>
                    <BsCart3 />
                  </div>
                  <div className="text-redPrimmary rounded-full bg-white text-[14px]  absolute -bottom-2 -right-2 flex items-center justify-center border w-5 h-5">
                    <span> {CartItems.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p:block d:hidden w-full  ">
            <div className="flex justify-between  items-center ">
              <Link to="/">
                <img
                  src={TradeMarkData.websiteLogo}
                  alt="logo"
                  className="h-[50px] m-5 "
                />
              </Link>
              <div className="flex items-center text-[60px]">
                {Hidden ? (
                  <RxCross1
                    className="bg-redPrimmary text-white p-2 "
                    onClick={() => setHidden(!Hidden)}
                  />
                ) : (
                  <MdOutlineFormatListBulleted
                    className="bg-redPrimmary text-white p-2 "
                    onClick={() => setHidden(!Hidden)}
                  />
                )}
              </div>
            </div>
            <div
              className={`${
                Hidden ? "h-screen" : "h-0 "
              } w-full duration-700 bg-[rgba(253,253,253,0.9)] overflow-y-scroll`}
            >
              {HeaderItems.map((items: any, idx: any) => {
                const sort = productTypes.filter(
                  (item: any) => item.parentParams === items.link
                );

                return (
                  <DropDown
                    idx={idx}
                    dropdown={sort}
                    content={items.name}
                    link={items.link}
                    setHidden={setHidden}
                  />
                );
              })}
            </div>
          </div>

          <div className="d:flex flex-col p:hidden w-full  items-center">
            <div
              className={`fixed z-10 ${
                IsTranslate
                  ? `w-full bg-white text-black `
                  : " w-[1600px] bg-mainblue text-white  "
              }   duration-300 h-[69px] rounded-lg flex justify-center px-5  items-center text-normal font-semibold gap-16`}
              style={{ top: `${elementTop}px` }}
            >
              {HeaderItems.map((items, idx) => {
                const sort = productTypes.filter(
                  (item: any) => item.parentParams === items.link
                );

                return (
                  <div className="relative" key={idx}>
                    <Link
                      to={`${
                        items.params ? `/${items.params}` : `/${items.link}`
                      }`}
                    >
                      <div className="group/main">
                        <div
                          className={`uppercase text-[18px] flex items-center justify-between  gap-2  hover:text-mainpink duration-500  ${
                            IsTranslate
                              ? ` ${
                                  isSelected === idx
                                    ? "text-mainpink"
                                    : "text-black"
                                }`
                              : `text-white`
                          }
  
                         `}
                          onClick={() => {
                            setIsSelected(idx);
                          }}
                        >
                          <p> {items.name}</p>
                          {sort.length > 0 && (
                            <AiFillCaretRight className="group-hover/main:rotate-90 duration-500" />
                          )}
                        </div>

                        {/*  */}
                        {sort.length > 0 && (
                          <div className="group-hover/main:block hidden relative z-20">
                            <div className="absolute h-10 w-full bg-none"></div>
                            <div className="  absolute  mt-5 w-[340px] max-h-[300px]  shadow-xl rounded-b-lg bg-white  overflow-y-auto overflow-x-visible">
                              {sort.map((items: any, idx: number) => (
                                <div className="">
                                  <div className="w-full">
                                    <div
                                      className="py-4 px-8 font-light text-black group duration-300 hover:text-white hover:bg-mainpink flex justify-between items-center w-full"
                                      onClick={() => HandleOpenSubMenu(idx + 1)}
                                    >
                                      <Link
                                        to={`${
                                          items.parent === "album-anh"
                                            ? `/album-anh/${items.params}`
                                            : `/loai-san-pham/${items.params}`
                                        }`}
                                      >
                                        <span>{items.name}</span>
                                      </Link>
                                      {items.children.length > 0 && (
                                        <AiFillCaretRight
                                          className={`${
                                            isOpenSubMenu === idx + 1 &&
                                            "rotate-90"
                                          } duration-500 text-black`}
                                        />
                                      )}
                                    </div>
                                    <div
                                      className={`${
                                        isOpenSubMenu === idx + 1
                                          ? " h-max"
                                          : " h-0"
                                      } overflow-hidden duration-500  block`}
                                    >
                                      {items.children.length > 0 && (
                                        <>
                                          {items.children.map((items: any) => (
                                            <Link
                                              to={`/loai-san-pham/${items.params}`}
                                            >
                                              <div className="py-4 px-8 pl-14 font-light duration-300 text-mainblue hover:text-white hover:bg-mainblue cursor-pointer">
                                                {items.name}
                                              </div>
                                            </Link>
                                          ))}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {/*  */}
                      </div>
                    </Link>
                    <div
                      className={` ${
                        isSelected === idx
                          ? IsTranslate
                            ? "w-full bg-mainpink"
                            : "w-full bg-white"
                          : "w-0"
                      }  duration-500 h-2 rounded-3xl absolute -bottom-[23px]`}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

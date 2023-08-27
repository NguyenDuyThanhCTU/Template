import React, { useState } from "react";
import Clock from "./Clock/Clock";
import { useData } from "../../../Context/DataProviders";
import HeaderDropDown from "../Item/HeaderDropdown";

const Header = ({ setHidden, Hidden }: any) => {
  const { HeaderAdmin } = useData();
  const [Option, setOption] = useState(false);

  return (
    <div className=" h-[7vh] bg-Blue3D font-LexendDeca text-white flex w-full ">
      <div className="d:flex justify-between w-full mx-10 items-center relative p:hidden">
        <div className="flex gap-32 cursor-pointer">
          <div className="flex items-center">
            <div className="group relative ">
              <img
                src={HeaderAdmin?.photoURL}
                alt="logo"
                className="w-12 h-12 inline-block object-cover rounded-full "
              />
              <div className="absolute right-[-115px] top-[75px] hidden  group-hover:block ">
                <HeaderDropDown />
              </div>
            </div>

            <p className="inline-block ml-3">{HeaderAdmin?.displayName}</p>
          </div>
        </div>

        <div className="cursor-pointer flex gap-20  ">
          <div>
            <p className="hover:scale-110 duration-300 ">
              <Clock />
            </p>
          </div>
        </div>
      </div>

      <div className="p:flex justify-between w-full mx-2 items-center relative d:hidden">
        <div
          className=" flex items-center justify-center border-b border-gray-800 py-3"
          onClick={() => setHidden(!Hidden)}
        >
          <img
            src="https://image-sn.s3.amazonaws.com/Russo+Tech.png"
            alt="logo"
            className="w-12 h-[50] inline-block circle-animation"
          />
        </div>
        <div className="flex mr-5 cursor-pointer">
          <div className="flex items-center">
            <div className=" relative " onClick={() => setOption(!Option)}>
              <img
                src={HeaderAdmin?.photoURL}
                alt="logo"
                className="w-12 h-12 inline-block object-cover rounded-full "
              />
              {Option && (
                <>
                  {" "}
                  <div className="absolute right-[-115px] top-[75px]  ">
                    <HeaderDropDown />
                  </div>
                </>
              )}
            </div>

            <p className="inline-block ml-3" onClick={() => setOption(!Option)}>
              {HeaderAdmin?.displayName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import { BsCheck2Circle } from "react-icons/bs";

const Alert = ({ correct, uncorrect }: any) => {
  return (
    <div>
      {uncorrect ? (
        <div
          className=" px-4 py-3 rounded  fixed right-0 top-0 mt-20 transform translate-x-full delay-1000 transition duration-1000"
          role="alert"
        >
          <strong className="font-bold">Login Failed! </strong>
          <span className="block sm:inline">
            Vui lòng kiểm tra lại thông tin đăng nhập của bạn.
          </span>
        </div>
      ) : (
        <div
          className="bg-red-100 border border-red-400 text-red-700 w-1 "
          role="alert"
          style={{ transform: "translateX(0)" }}
        ></div>
      )}
      {correct ? (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded  fixed right-0 top-0 mt-20 transform delay-1000 translate-x-full transition duration-1000"
          role="alert"
        >
          <BsCheck2Circle className="inline-block mr-2 text-2xl" />
          <strong className="font-bold">Login Success!</strong>
        </div>
      ) : (
        <div
          className="bg-green-100 border border-green-400 text-green-700 w-1 "
          role="alert"
          style={{ transform: "translateX(0)" }}
        ></div>
      )}
    </div>
  );
};

export default Alert;

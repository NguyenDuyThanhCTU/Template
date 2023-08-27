import React from "react";
import { useData } from "../../Context/DataProviders";
import { Link } from "react-router-dom";

const Category = () => {
  const { productTypes } = useData();
  return (
    <div className="border w-[270px] font-LexendDeca ">
      <div className="w-full text-center py-3 bg-mainblue text-white text-[20px]">
        <h3>Danh mục sản phẩm</h3>
      </div>
      <div className="flex flex-col">
        {productTypes.map((items: any) => (
          <Link to={`/loai-san-pham/${items.params}`}>
            <div
              className="pl-4 py-2 border-b cursor-pointer hover:bg-gray-200"
              key={items.id}
            >
              {items.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;

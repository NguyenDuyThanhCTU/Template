import React from "react";
import { useStateProvider } from "../../../../../../Context/StateProvider";
import { useData } from "../../../../../../Context/DataProviders";

const ListProduct: React.FC = () => {
  const { setDropDown } = useStateProvider();
  const { productTypes } = useData();

  return (
    <div className="d:w-[400px] shadow-2xl bg-[#353535] p:w-auto">
      <div className="p-3">
        <div className="flex justify-between items-center text-[25px] p-3 flex-col gap-3">
          <p className="uppercase text-center w-full from-yellow-400">
            Danh mục sản phẩm
          </p>
          <div className="h-[400px] p:w-[60vw] d:w-[370px] border rounded-2xl overflow-y-scroll">
            <div className="flex flex-col cursor-pointer">
              {productTypes.map((items: any, idx: number) => {
                return (
                  <div key={idx}>
                    <div className="flex gap-5 p-2 items-center">
                      <div>{idx + 1}</div>
                      <img
                        src={items.image}
                        alt="product type"
                        className="w-10 h-10"
                      />
                      <div className="p-1 truncate">{items.name}</div>
                    </div>

                    {items.children.length > 0 &&
                      items.children.map(
                        (childItems: any, childIdx: number) => (
                          <div
                            key={childIdx}
                            className="ml-10 text-[16px] flex gap-3 items-center py-2"
                          >
                            <div>{childIdx}</div>
                            <div>{childItems.name}</div>
                          </div>
                        )
                      )}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="bg-white text-redPrimmary px-4 py-1 rounded-lg uppercase cursor-pointer hover:scale-110 duration-300"
            onClick={() => setDropDown("add-types")}
          >
            Thêm
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;

import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

import { useStateProvider } from "../../../../Context/StateProvider";
import { updateDocument } from "../../../../Config/Services/Firebase/FireStoreDB";

import { notification } from "antd";
import { useData } from "../../../../Context/DataProviders";
import { useEffect } from "react";
import TextEditor from "../../../Item/TextEditor";

const AddPost = () => {
  const [editorData, setEditorData] = useState("");
  const [PostSort, setPost] = useState([]);
  const { setIsRefetch, setIsUploadProduct } = useStateProvider();
  const { updateId, Posts } = useData();

  useEffect(() => {
    const sort = Posts.filter((item) => item.id === updateId);
    if (sort) {
      setPost(sort[0]);
    }
  }, [Posts, updateId]);

  const HandleDiscard = () => {
    setEditorData("");
  };

  const HandleSubmit = () => {
    if (!editorData) {
      notification["error"]({
        message: "Lỗi !",
        description: `
      Vui lòng nhập thông tin trước khi TẢI LÊN !`,
      });
    } else {
      const data = {
        content: editorData,
      };
      updateDocument("posts", updateId, data).then(() => {
        notification["success"]({
          message: "Thành công !",
          description: `
          Tải lên thành công !`,
        });
        HandleDiscard();
        setIsRefetch("add posts");
      });
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
          <div className="flex w-full h-full  justify-center gap-4 flex-col items-center ">
            <p className="text-2xl font-bold text-center mb-5">
              Chi tiết bài viết
            </p>

            <div className=" w-[60vw] mx-auto overflow-y-auto h-[500px]">
              <TextEditor
                editorData={`${
                  PostSort?.content ? `${PostSort?.content}` : `${editorData}`
                }`}
                setEditorData={setEditorData}
              />
            </div>
            <div className="flex gap-6 mt-10">
              <button
                onClick={() => HandleDiscard()}
                type="button"
                className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
              >
                Xóa
              </button>
              <button
                onClick={() => HandleSubmit()}
                type="button"
                className="bg-[#df6cad] hover:bg-red-500 focus:outline-none focus:shadow-outline text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
              >
                Tải lên
              </button>
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

export default AddPost;

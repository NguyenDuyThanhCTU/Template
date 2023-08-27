import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { notification } from "antd";

import { useStateProvider } from "../../../../Context/StateProvider";
import { updateDocument } from "../../../../Config/Services/Firebase/FireStoreDB";
import { useData } from "../../../../Context/DataProviders";

const Profile = () => {
  const { setIsUploadProduct } = useStateProvider();
  const { HeaderAdmin } = useData();
  const [Data, setData] = useState("");
  const [isSelected, setSelected] = useState(false);
  const [error, setError] = useState(false);
  const [AvatarUrl, setAvatarUrl] = useState();

  const handleDiscard = () => {
    setData("");
    setAvatarUrl();
  };

  const uploadImage = async (e, type) => {
    let selectImage = e.target.files[0];
    const filetypes = ["image/jpeg", "image/jpg", "image/png"];

    if (filetypes.includes(selectImage.type)) {
      const storage = getStorage();
      const storageRef = ref(storage, `img/logo`);

      uploadBytes(storageRef, selectImage)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");

          getDownloadURL(snapshot.ref)
            .then((url) => {
              setAvatarUrl(url);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      setError(true);
    }
  };

  const ContactTrademark = [
    {
      name: "Tên hiển thị",
      type: "input",
      placeholder: HeaderAdmin.displayName,
    },
    {
      name: "Ảnh đại diện",
      type: "input",
      placeholder: HeaderAdmin.photoURL,
    },
  ];

  const HandleUpdate = (idx) => {
    if (!Data && !AvatarUrl) {
      notification["error"]({
        message: "Lỗi !",
        description: `
        Vui lòng nhập thông tin trước khi CẬP NHẬT !`,
      });
    } else {
      let newData;
      if (idx === 0) {
        newData = { displayName: Data };
        HeaderAdmin.displayName = Data;
      } else if (idx === 1) {
        newData = { photoURL: `${Data ? Data : AvatarUrl}` };
        HeaderAdmin.photoURL = Data;
      }
      let DocumentName;
      if (HeaderAdmin.email) {
        DocumentName = "users";
      } else {
        DocumentName = "accounts";
      }

      updateDocument(DocumentName, HeaderAdmin.id, newData).then(() => {
        notification["success"]({
          message: "Thành công !",
          description: `
            Thông tin đã được CẬP NHẬT !`,
        });
        handleDiscard();
        setIsUploadProduct("");
      });
    }
  };
  return (
    <div
      className={`bg-[rgba(0,0,0,0.3)] w-full 
       h-full
      z-50 absolute rounded-md duration-300`}
    >
      <div className=" p:w-full p:h-full  d:w-[1500px] d:h-[700px] absolute bg-white d:bottom-[15%] d:left-[12%] p:bottom-0 p:left-0 flex font-LexendDeca cursor-pointer rounded-sm ">
        <div className="flex justify-center w-full items-center gap-10 d:flex-row p:flex-col ">
          <div className="shadow-2xl">
            <label>
              <div className="flex justify-center mt-10  h-[300px] w-[350px] border rounded-lg cursor-pointer">
                <img
                  src={`${AvatarUrl ? AvatarUrl : HeaderAdmin.photoURL}`}
                  alt="logo"
                  className="object-contain p-2"
                />

                <input
                  type="file"
                  className="w-0 h-0"
                  onChange={(e) => uploadImage(e)}
                />
              </div>
            </label>
            {error && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[260px]">
                Vui lòng chọn đúng định dạng
              </p>
            )}
            {AvatarUrl ? (
              <div className="w-full justify-center flex">
                <button
                  className="hover:bg-[#bb86fc37] hover:text-[#BB86FC] text-[#fc7474] bg-[#fc747443] px-3 py-2 rounded-xl mt-3 "
                  onClick={() => HandleUpdate(3)}
                >
                  Cập nhật
                </button>
              </div>
            ) : (
              <p className="text-black italic text-[13px] mt-2">
                Nhấp vào logo để tải hình ảnh lên{" "}
                <strong className="text-redPrimmary">(*)</strong>
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3 mt-5 shadow-2xl p-10">
            {ContactTrademark.map((items, idx) => {
              let Type = items.type;
              return (
                <div className="flex flex-col gap-3">
                  <label>{items.name}</label>
                  <div className="flex gap-5">
                    {Type && (
                      <div onClick={() => setSelected(idx)}>
                        <Type
                          placeholder={items.placeholder}
                          type="text"
                          className="px-4 py-2 text-black outline-none rounded-2xl bg-gray-300 w-[240px] "
                          onChange={(e) => setData(e.target.value)}
                        />
                      </div>
                    )}
                    <div>
                      {isSelected === idx ? (
                        <button
                          className="hover:bg-[#bb86fc37] hover:text-[#BB86FC] text-[#74affc] bg-[#74affc43] px-3 py-2 rounded-xl"
                          onClick={() => HandleUpdate(idx)}
                        >
                          Cập nhật
                        </button>
                      ) : (
                        <button className="text-white bg-gray-400 px-3 py-2 rounded-xl cursor-default">
                          Cập nhật
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <AiFillCloseCircle
          className="absolute d:-top-5 d:-right-5 p:top-0 p:right-0 text-[40px] border-white border-4 bg-black rounded-3xl text-white "
          onClick={() => {
            setIsUploadProduct("");
          }}
        />
      </div>
    </div>
  );
};

export default Profile;

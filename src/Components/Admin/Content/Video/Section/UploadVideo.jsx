import React, { useEffect, useState } from "react";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { notification } from "antd";
import { useStateProvider } from "../../../../../Context/StateProvider";
import { addDocument } from "../../../../../Config/Services/Firebase/FireStoreDB";
import Input from "../../../Item/Input";

const UploadVideo = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const { setIsRefetch } = useStateProvider();

  const getVideoId = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/|v\/|u\/\w\/|embed\/?\??(?:\w*=\w*)*)?([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  useEffect(() => {
    function checkurl() {
      const videoId = getVideoId(videoUrl);
      if (!videoId) {
        return <p>Invalid YouTube link</p>;
      } else {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        if (embedUrl) {
          setEmbedUrl(embedUrl);
        }
      }
    }
    checkurl();
  }, [videoUrl]);

  const HandleDiscard = () => {
    setVideoUrl("");
    setEmbedUrl("");
  };

  const HandleUpload = () => {
    if (!videoUrl || !embedUrl) {
      notification["error"]({
        message: "Tải lên không thành công!",
        description: `Vui lòng bổ sung đầy đủ thông tin !`,
      });
    } else {
      const data = {
        embedurl: embedUrl,
      };
      addDocument("videos", data).then(() => {
        notification["success"]({
          message: "Tải lên thành công!",
          description: `Sản phẩm của bạn đã được tải lên !`,
        });

        setIsRefetch("upload video");
        HandleDiscard();
      });
    }
  };
  return (
    <div className="  flex-[30%] flex flex-col gap-5">
      <div className="flex flex-col p-3 border items-center">
        <div className="flex flex-row gap-3 mt-5 w-full">
          <div className="flex flex-col items-center gap-1 text-white w-full ">
            <Input
              text="Liên kết video youtube"
              Value={videoUrl}
              setValue={setVideoUrl}
            />

            <div>
              {embedUrl ? (
                <button
                  className="hover:bg-[#bb86fc37] hover:text-[#BB86FC] text-[#74affc] bg-[#74affc43] px-3 py-2 rounded-xl"
                  onClick={() => HandleUpload()}
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
      </div>
      <div className="border">
        <div className="p-2">
          <iframe src={embedUrl} title="YouTube Video" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;

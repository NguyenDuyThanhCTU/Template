import React, { useEffect, useState } from "react";
import { Modal, notification } from "antd";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Context/AuthProviders";
import { useData } from "../../../../Context/DataProviders";
import { updateDocument } from "../../../../Config/Services/Firebase/FireStoreDB";

const Verify = ({ verify, isId }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { accounts } = useData();
  const { setVerify } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
    setTimeout(() => {
      setIsLogin(true);
    }, 2000);
  };

  const onFinish = (values) => {
    if (
      values.username === accounts.username &&
      values.password === accounts.password
    ) {
      const newData = {
        admin: true,
      };
      updateDocument("users", isId, newData).then(() => {
        setVerify(true);
        notification["success"]({
          message: "Đăng nhập thành công !",
          description: `Chào mừng đến với ${window.location.hostname} !`,
        });
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      });
    } else {
      notification["error"]({
        message: "Đăng nhập không thành công !",
        description: `
        Vui lòng đăng nhập bằng tài khoản đã được CẤP QUYỀN QUẢN TRỊ !`,
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title="Lần đầu đăng nhập bằng Google?"
        open={open}
        onOk={handleOk}
        okText="Tiếp tục"
        okType="danger"
        confirmLoading={confirmLoading}
        onCancel={() => verify(false)}
        cancelText="Hủy bỏ"
      >
        <p>"Tiếp tục" để nhập tài khoản và mật khẩu QUẢN TRỊ</p>
      </Modal>

      {isLogin && (
        <div class="z-50 fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          {" "}
          <div>
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="bg-white shadow-2xl flex flex-col items-center justify-center p-8 rounded-xl "
            >
              <label className="uppercase mb-5 text-[33px] font-LexendDeca">
                Xác thực quyền Quản trị
              </label>
              <div className="bg-[#7b7b7b3d] p-5 flex flex-col items-center  rounded-2xl">
                <div>
                  <label>Username</label>

                  <Form.Item className="w-[300px]" name="username">
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <label>Password</label>

                  <Form.Item className="w-[300px]" name="password">
                    <Input.Password />
                  </Form.Item>
                </div>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:border-none"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};
export default Verify;

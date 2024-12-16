import React, { useState } from "react";
import useTitle from "../hooks/useTitle";
import API from "../utils/API";
import MiniLoader from "../components/MiniLoader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  useTitle({ title: "忘记密码" });
  const [success, setSuccess] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState<any>({
    email: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const showToast = (type: "success" | "error" | "warn", message: string) => {
    toast[type](message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccess(null);
    try {
      setIsLoading(true);
      const response = await API.post("auth/forgot-password", userData)
      setIsLoading(false)
      if (!response.success) {
        if (response.error?.code === "ERR_SHIPPER_NOT_FOUND") {    
          showToast("error", "未找到发货人");
        }else if(response.error?.code === "ERR_USER_NOT_FOUND"){
          showToast("error", "该邮箱尚未注册");
        }
      }else{
        showToast("success","密码链接发送成功")

      }
      //  setUserData({
      //   email: "",   
      // });
    } catch (error) {
      showToast("error", "该邮箱尚未注册");
    
      console.log(error)
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors: any = {};

    if (!userData.email) {
      newErrors.email = "需要电子邮件。";
    } else if (!emailRegex.test(userData.email)) {
      newErrors.email = "请输入有效的电子邮件。";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    try {
      setSuccess("验证链接已发送到您的电子邮件。");
    } catch (err: any) {
      console.error(err);
      setErrors({ email: err.message || "Error sending verification link." });
      showToast("error", "发送验证链接时出错。");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="m-w-[500px] flex flex-col justify-center items-center">
        <h1 className="text-black font-bold text-5xl text-center">
        发送密码重置链接
        </h1>
        <p className="mt-6 text-black !text-start w-full mb-2">电子邮件
        </p>
        <input
          className="rounded-full p-3 bg-black/5 outline-none w-full text-black"
          type="email"
          value={userData.email}
          onChange={(e) =>
            setUserData({ ...userData, email: e.target.value })
          }
        />
        {errors.email && <p className="text-red-500 w-full text-start">{errors.email}</p>}
        {isLoading ? 
        <div className="w-full flex mt-5">
        <MiniLoader />
        </div>
         :
          <button
            onClick={handleSubmit}
            type="submit"
            className="rounded-full w-full p-3 px-5 transition text-white bg-black hover:bg-black/80 min-w-[92px] mt-8"
          >
            发送密码链接
          </button>
        }
        {/* {success && <p className="text-green-500">{success}</p>} */}
        <div className="mt-5 flex gap-2 text-black">
              <span>返回登录 ?</span>
              <Link
                to="/auth/login"
                className="text-black hover:text-black/80 duration-300"
              >
                登入
              </Link>
            </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

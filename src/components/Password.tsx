import { useState } from "react";
import API from "../utils/API";
import { useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Password = () => {
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
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
  const getQueryParam = (name: string) => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(name);
  };
  const token = getQueryParam("token");
  

  const handleSubmitNewPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    const newErrors: any = {};

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "密码必须至少包含8个字符，包括大写、小写、数字和特殊字符。";
    }

    if (!newPassword) {
      newErrors.confirmPassword = "请确认您的密码。";
    } else if (password !== newPassword) {
      newErrors.confirmPassword = "密码不匹配。";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await API.post("auth/password-reset", {
        token,
        password,
      });
      if (response.status === 200) {
        setSuccess("密码更新成功！");
        showToast("success","密码更新成功！")

      } else {
        setError("Failed to update password. Please try again.");
        showToast("error", "更新密码失败。请重试");

      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Error updating password.");
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[500px]">
        <h1 className="text-black font-bold text-5xl text-center">
          
创建新密码
        </h1>
        <p className="mt-4 text-black">新密码</p>
        <div className="relative">
          <input
            className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] bg-gray-100 text-black"
            type={passwordVisible ? "text" : "password"}
            placeholder="输入新密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <p className="mt-4 text-black">
        确认密码</p>
        <div className="relative">
          <input
            className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] bg-gray-100 text-black"
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter Confirm Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword}</p>
        )}

        <button
          onClick={handleSubmitNewPassword}
          className="rounded-md p-3 px-5 transition text-white bg-black hover:bg-black/80 min-w-[92px] mt-8"
        >
          重置密码
        </button>
        {success && <p className="text-green-500 mt-4">{success}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Password;

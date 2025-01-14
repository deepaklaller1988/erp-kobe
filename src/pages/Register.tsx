import React, { useState } from "react";
import { FaBalanceScale, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import API from "../utils/API";
import MiniLoader from "../components/MiniLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const Register: React.FC = () => {
  useTitle({ title: "登记" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userData, setUserData] = useState({
    type: "",
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const handleRoleSelection = (role: string) => {
    setUserData((prev) => ({ ...prev, type: role }));
    setErrors((prev) => ({ ...prev, type: "" }));
  };

  const validateInputs = (): boolean => {
    const { type, name, email, password, confirmpassword } = userData;
    const newErrors: Record<string, string> = {};

    if (!type) {
      newErrors.type = "请选择一个角色。";
    }
    if (!name.trim()) {
      newErrors.name = "姓名为必填项。";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "需要电子邮件。";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "电子邮件格式无效。";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!password) {
      newErrors.password = "需要密码。";
    } else if (!passwordRegex.test(password)) {
      newErrors.password = "密码必须至少为 8 个字符，包括大写字母、小写字母、数字和特殊字符。";
    }
    if (!confirmpassword) {
      newErrors.confirmpassword = "需要确认密码。";
    } else if (password !== confirmpassword) {
      newErrors.confirmpassword = "密码不匹配。";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setLoading(true);
    try {
      const response = await API.post("auth/register", userData);
      if (response.success) {
        setIsSuccess(true);
        showToast("success", "注册成功！请检查您的电子邮件以获取验证链接。");
        setUserData({ type: "", name: "", email: "", password: "", confirmpassword: "" });
      } else if (response.error?.code === "ERR_EMAIL_ALREADY_EXIST") {
        setErrors((prev) => ({ ...prev, email: "此邮箱号已被注册。请使用不同的电子邮件。" }));
        showToast("error", "此邮箱号已被注册。请使用不同的电子邮件。");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrors((prev) => ({ ...prev, general: "发生意外错误。请稍后重试。" }));
      showToast("error", "发生意外错误。请稍后重试。");
    } finally {
      setLoading(false);
    }
  };


  const renderInputField = (
    label: string,
    type: string,
    name: string,
    value: string,
    showToggleIcon = false,
    toggleVisibility?: () => void
  ) => (
    <div className="mt-4">
      <label className="text-[15px] mb-1 block text-black">{label}</label>
      <div className="relative">
        <input
          className="rounded-full p-3 bg-black/5 outline-none w-full text-black"
          type={showToggleIcon && toggleVisibility ? (type === "password" ? "password" : "text") : type}
          name={name}
          value={value}
          onChange={handleChange}
        />
        {showToggleIcon && toggleVisibility && (
          <span
            onClick={toggleVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {type === "password" ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
      {errors[name] && <p className="text-red-500 mt-2">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="w-full p-4 flex justify-center items-center">
      <div className="w-96">
        {isSuccess ? (
          <div className="text-green-500 text-center">
            <p className="font-bold text-2xl">
            注册成功！检查您的电子邮件以激活您的帐户。</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1 className="text-black font-bold text-5xl text-center">登记</h1>

            <p className="mt-10 mb-1 text-black">
            选择你的角色</p>
            <div className="flex justify-center gap-5">
              {[{ role: "seller", icon: <FaBalanceScale size={35} />, label: "卖方" },
              { role: "shipper", icon: <MdDeliveryDining size={35} />, label: "托运人" }].map((item) => (
                <button
                  key={item.role}
                  type="button"
                  className={`p-5 rounded-xl flex flex-col items-center gap-2 w-full border duration-300 text-gray-300 ${userData.type === item.role ? "border-blue-800  !text-blue-800" : "hover:bg-gray-100"
                    }`}
                  onClick={() => handleRoleSelection(item.role)}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
            {errors.type && <p className="text-red-500 mt-2">{errors.type}</p>}

            {renderInputField("姓名", "text", "name", userData.name)}
            {renderInputField("电子邮件", "email", "email", userData.email)}
            {renderInputField("密码", passwordVisible ? "text" : "password", "password", userData.password, true, () => setPasswordVisible((prev) => !prev))}
            {renderInputField("确认密码", confirmPasswordVisible ? "text" : "password", "confirmpassword", userData.confirmpassword, true, () => setConfirmPasswordVisible((prev) => !prev))}

            <button
              type="submit"
              disabled={loading}
              className="rounded-full p-3 w-full bg-black text-white mt-8 hover:bg-black/80 transition duration-300"
            >
              {/* {loading ? <MiniLoader /> : "Sign up"} */}
              {loading ? <MiniLoader /> : "报名"}
            </button>
            {errors.general && <p className="text-red-500 text-center">{errors.general}</p>}
            <div className="mt-5 flex gap-2 text-black">
          <span>已有账户?</span>
          <Link
            to="/auth/login"
            className="text-black hover:text-black/80 duration-300"
          >
            登入
          </Link>
        </div>
          </form>

        )}
      
      </div>
    </div>
  );
};

export default Register;
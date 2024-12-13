import React, { useState } from "react";
import { FaBalanceScale, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import API from "../utils/API";
import MiniLoader from "../components/MiniLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register: React.FC = () => {
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
      newErrors.type = "Please select a role.";
    }
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
    }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!password) {
          newErrors.password = "Password is required.";
        } else if (!passwordRegex.test(password)) {
          newErrors.password = "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.";
        }
        if (!confirmpassword) {
          newErrors.confirmpassword = "Confirm Password is required.";
        } else if (password !== confirmpassword) {
          newErrors.confirmpassword = "Passwords do not match.";
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
        showToast("success", "Registration successful! Please check your email for a verification link.");
        setUserData({ type: "", name: "", email: "", password: "", confirmpassword: "" });
      } else if (response.error?.code === "ERR_EMAIL_ALREADY_EXIST") {
        setErrors((prev) => ({ ...prev, email: "This email is already registered. Please use a different email." }));
        showToast("error", "This email is already registered. Please use a different email.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrors((prev) => ({ ...prev, general: "An unexpected error occurred. Please try again later." }));
      showToast("error", "An unexpected error occurred. Please try again later.");
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
          type={showToggleIcon && toggleVisibility ? (type === "password" ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={handleChange}
        />
        {showToggleIcon && toggleVisibility && (
          <span
            onClick={toggleVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {type === "password" ? <FaEyeSlash />: <FaEye /> }
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
            <p className="font-bold text-2xl">Registration successful! Check your email to activate your account.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1 className="text-black font-bold text-5xl text-center">Register</h1>

            <p className="mt-10 mb-1 text-black">Choose Your Role</p>
            <div className="flex justify-center gap-5">
              {[{ role: "seller", icon: <FaBalanceScale size={35} />, label: "Seller" },
                { role: "shipper", icon: <MdDeliveryDining size={35} />, label: "Shipper" }].map((item) => (
                <button
                  key={item.role}
                  type="button"
                  className={`p-5 rounded-xl flex flex-col items-center gap-2 w-full border duration-300 text-gray-300 ${
                    userData.type === item.role ? "border-blue-800  !text-blue-800" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleRoleSelection(item.role)}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
            {errors.type && <p className="text-red-500 mt-2">{errors.type}</p>}

            {renderInputField("Name", "text", "name", userData.name)}
            {renderInputField("Email", "email", "email", userData.email)}
            {renderInputField("Password", passwordVisible ? "text" : "password", "password", userData.password, true, () => setPasswordVisible((prev) => !prev))}
            {renderInputField("Confirm Password", confirmPasswordVisible ? "text" : "password", "confirmpassword", userData.confirmpassword, true, () => setConfirmPasswordVisible((prev) => !prev))}

            <button
              type="submit"
              disabled={loading}
              className="rounded-full p-3 w-full bg-black text-white mt-8 hover:bg-black/80 transition duration-300"
            >
              {loading ? <MiniLoader/> : "Sign up"}
            </button>
            {errors.general && <p className="text-red-500 text-center">{errors.general}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
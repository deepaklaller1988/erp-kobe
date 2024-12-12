import React, { useState, useEffect } from "react";
import useTitle from "../hooks/useTitle";
import { FaBalanceScale } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { Link } from "react-router-dom";
import API from "../utils/API";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MiniLoader from "../components/MiniLoader";

const Register: React.FC = () => {
  useTitle({ title: "Register" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);


  const [userData, setUserData] = useState({
    type: "",
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({
    type: "",
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleButtonClick = (role: string) => {
    setUserData((prev) => ({ ...prev, type: role }));
    setErrors((prev) => ({ ...prev, type: "" }));
  };

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    const newErrors: any = {};

    if (!userData.type) newErrors.type = "Please select a role.";
    if (!userData.name.trim()) newErrors.name = "Name is required.";
    if (!userData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(userData.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!userData.password) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(userData.password)) {
      newErrors.password =
        "Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character.";
    }
    if (!userData.confirmpassword) {
      newErrors.confirmpassword = "Confirm Password is required.";
    } else if (userData.password !== userData.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setUserData({
      type: "",
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
    setErrors({
      type: "",
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
  };

  useEffect(() => {
    if (isSubmitting) {
      const submitForm = async () => {
        if (!validateInputs()) {
          setIsSubmitting(false);
          return;
        }

        try {
          const response = await API.post("auth/register", userData);
          if (response.status === 200) {
            setIsSuccess(true);
            resetForm();
          }
        } catch (error) {
          console.error("Error during registration:", error);
        } finally {
          setIsSubmitting(false);
          setLoading(false);
        }
      };

      submitForm();
    }
  }, [isSubmitting]);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setLoading(true);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-96">
        {isSuccess ? (
          <div className="text-green-500 text-center mt-4">
            <p className="font-bold text-2xl">Registration successful! Kindly check your email to activate your account.</p>
          </div>
        ) : (
          <>
            <h1 className="text-black font-bold text-5xl text-center">Register</h1>
            <p className="mt-10 mb-1 text-black">Choose Your Role</p>
            <div className="flex justify-center items-center gap-5">
              <button
                className={`p-5 rounded-xl flex flex-col items-center gap-2 w-full border duration-300 border-gray-200 text-gray-300 ${userData.type === "seller"
                  ? "border-blue-600 !text-blue-600"
                  : "hover:bg-gray-100"
                  }`}
                onClick={() => handleButtonClick("seller")}
              >
                <FaBalanceScale size={35} />
                Seller
              </button>
              <button
                className={`p-5 rounded-xl flex flex-col items-center gap-1 w-full border duration-300 border-gray-200 text-gray-300 ${userData.type === "shipper"
                  ? "border-blue-600 !text-blue-600"
                  : "hover:bg-gray-100"
                  }`}
                onClick={() => handleButtonClick("shipper")}
              >
                <MdDeliveryDining size={35} />
                Shipper
              </button>
            </div>
            <p className="text-red-500 mt-2">{errors.type}</p>

            <p className="mt-4 mb-1 text-black">Name</p>
            <input
              className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] text-black"
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
            <p className="text-red-500 mt-2">{errors.name}</p>

            <p className="mt-4 mb-1 text-black">Email</p>
            <input
              className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] text-black"
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            <p className="text-red-500 mt-2">{errors.email}</p>

            <p className="mt-4 mb-1 text-black">Password</p>
            <div className="relative">
              <input
                className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] text-black"
                type={passwordVisible ? "text" : "password"}
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <p className="text-red-500 mt-2">{errors.password}</p>

            <p className="mt-4 mb-1 text-black">Confirm Password</p>
            <div className="relative">
              <input
                className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] text-black"
                type={confirmPasswordVisible ? "text" : "password"}
                value={userData.confirmpassword}
                onChange={(e) => setUserData({ ...userData, confirmpassword: e.target.value })}
              />
              <span
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <p className="text-red-500 mt-2">{errors.confirmpassword}</p>

            {loading ? <MiniLoader />: <button
              onClick={handleFormSubmit}
              className="rounded-md p-3 px-5 transition text-white bg-black hover:bg-black/80 w-full duration-300 mt-8"
            >
              Sign up
            </button>}

            <div className="mt-10 flex gap-2 text-black">
              <span>Already have an account?</span>
              <Link to="/auth/login" className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;

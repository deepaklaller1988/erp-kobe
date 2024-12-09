import React, { useState } from "react";
import useTitle from "../hooks/useTitle";
import { FaBalanceScale } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  useTitle({ title: "Register" });
  const [userData, setUserData] = useState({
    selectedRole: "",
    userName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({
    selectedRole: "",
    userName: "",
    email: "",
    password: "",
  });

  const handleButtonClick = (role: string) => {
    setUserData((prev) => ({
      ...prev,
      selectedRole: role,
    }));
    setErrors((prev:any) => ({
      ...prev,
      selectedRole: "",
    }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    const newErrors: any = {};
    if (!userData.selectedRole) {
      newErrors.selectedRole = "Please select a role.";
    }
    if (!userData.userName.trim()) {
      newErrors.userName = "Name is required.";
    }
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
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      window.alert("Sign-up successful!");
      setUserData({
        selectedRole: "",
        userName: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-96">
        <h1 className="text-black font-bold text-5xl text-center">Register</h1>
        <p className="mt-10 mb-1 text-black">Choose Your Role</p>
        <div className="flex justify-center items-center gap-5">
          <button
            className={`p-5 rounded-xl flex flex-col items-center gap-2 w-full border duration-300 border-gray-200 text-gray-300 ${
              userData.selectedRole === "Seller" ? "border-blue-600 !text-blue-600" : "hover:bg-gray-100"
            }`}
            onClick={() => handleButtonClick("Seller")}
          >
            <span>
              <FaBalanceScale size={35} />
            </span>
            Seller
          </button>
          <button
            className={`p-5 rounded-xl flex flex-col items-center gap-1 w-full border duration-300 border-gray-200 text-gray-300 ${
              userData.selectedRole === "Shipper" ? "border-blue-600 !text-blue-600" : "hover:bg-gray-100"
            }`}
            onClick={() => handleButtonClick("Shipper")}
          >
            <span>
              <MdDeliveryDining size={35} />
            </span>
            Shipper
          </button>
        </div>
        <p className="text-red-500 mt-2">{errors.selectedRole}</p>

        <p className="mt-4 mb-1 text-black">Name</p>
        <input
          className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] text-black"
          type="text"
          value={userData.userName}
          onChange={(e) =>
            setUserData({ ...userData, userName: e.target.value })
          }
        />
        <p className="text-red-500 mt-2">{errors.userName}</p>

        <p className="mt-4 mb-1 text-black">Email</p>
        <input
          className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] text-black"
          type="email"
          value={userData.email}
          onChange={(e) =>
            setUserData({ ...userData, email: e.target.value })
          }
        />
        <p className="text-red-500 mt-2">{errors.email}</p>

        <p className="mt-4 mb-1 text-black">Password</p>
        <input
          className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] text-black"
          type="password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <p className="text-red-500 mt-2">{errors.password}</p>

        <button
          onClick={handleFormSubmit}
          className="rounded-md p-3 px-5 transition text-white bg-black hover:bg-black/80 w-full duration-300 mt-8"
        >
          Sign up
        </button>

        <div className="mt-10 flex gap-2 text-black">
          <span>Already have an account?</span>
          <Link to="/auth/login" className="">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

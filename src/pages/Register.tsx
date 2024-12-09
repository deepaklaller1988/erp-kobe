import React, { useState } from "react";
import useTitle from "../hooks/useTitle";
import { FaBalanceScale } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";

const Register: React.FC = () => {
  useTitle({ title: "Register" });
  const [error, setError] = useState<any>({});
  const [userData, setUserData] = useState({
    selectedRole: "",
    name: "",
    email: "",
    password: "",
  });
  
  const handleButtonClick = (role: any) => {
    setUserData((prev) => ({
      ...prev,
      selectedRole:role
    }))
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    try {
      console.log("userData",userData)
      window.alert("Sign-up successful!");
    } catch (err: any) {
      console.error(err);
      setError({ email: err.message || "Sign-up failed!" });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[600px]">
          <h1 className="text-black font-bold text-5xl text-center">Sign up</h1>
          <p className="mt-10 mb-1 text-black">Choose Your role</p>
          <div className="flex justify-between">
            <button
              className={`border-2 px-5 py-2 rounded-md flex flex-col items-center gap-2 ${userData.selectedRole === "Seller" ? "bg-blue-300" : "hover:bg-blue-300"
                }`}
              onClick={() => handleButtonClick("Seller")}>
              <span>
                <FaBalanceScale size={25} />
              </span>
              Seller
            </button>
            <button
              className={`border-2 px-3 py-2 rounded-md flex flex-col items-center gap-1 ${userData.selectedRole === "Shipper" ? "bg-blue-300" : "hover:bg-blue-300"
                }`}
              onClick={() => handleButtonClick("Shipper")} >
              <span>
                <MdDeliveryDining size={30} />
              </span>
              Shipper
            </button>
          </div>
          <p className="mt-4 mb-1 text-black">Name</p>
          <input
            className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] bg-gray-100 text-black"
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}/>
          <p className="mt-4 mb-1 text-black">Email</p>
          <input
            className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] bg-gray-100 text-black"
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }/>
          <p className="text-red-500">{error.email}</p>
          <p className="mt-4 mb-1 text-black">Password</p>
          <input
            className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] bg-gray-100 text-black"
            type="password"
            name="password"
            placeholder="Create a password"
            required
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }/>
          <p className="text-red-500">{error.password}</p>
          <button
            onClick={handleFormSubmit}
            className="rounded-md p-3 px-5 transition text-white bg-blue-400 hover:bg-blue-600 min-w-[92px] mt-8">
            Sign up
          </button>

          <div className="mt-10 flex gap-2 text-black">
            <span>Already have an account?</span>
            <button className="">Sign in</button>
          </div>
      </div>
    </div>
  );
};

export default Register;

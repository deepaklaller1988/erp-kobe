import React, { useState } from "react";
import useTitle from "../hooks/useTitle";
import API from "../utils/API";

const ForgotPassword: React.FC = () => {
  useTitle({ title: "Forgot Password" });
  const [success, setSuccess] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState<any>({
    email: "",
  });

  const handleEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccess(null);
    try {
      const response = await API.post("auth/forgot-password",userData)
      console.log("response",response)
      setUserData({
        email: "",   
      });
    } catch (error) {
      console.log(error)
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors: any = {};

    if (!userData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(userData.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setSuccess("Verification link sent to your email.");
    } catch (err: any) {
      console.error(err);
      setErrors({ email: err.message || "Error sending verification link." });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="m-w-[500px]">
          <h1 className="text-black font-bold text-5xl text-center">
            Send Password Reset Link
          </h1>
          <p className="mt-6 text-black">Email Address</p>
          <input
            className="rounded-full p-3 bg-black/5 outline-none w-full text-black"
            type="email"
            placeholder="Enter your email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <button
          onClick={handleEmail}
            type="submit"
            className="rounded-full p-3 px-5 transition text-white bg-black hover:bg-black/80 min-w-[92px] mt-8"
          >
            Send Password Link
          </button>
          {success && <p className="text-green-500">{success}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;

import React, { useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";
import { Link, NavLink, useNavigate } from "react-router-dom";
import API from "../utils/API";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login: React.FC = () => {
  useTitle({ title: "Login" });
  const router = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null); 
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const getData = async () => {};
    getData();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setEmailError(null);
    setPasswordError(null);
  
    try {
      const response = await API.post("auth/login", userData);
      // console.log("API Response:", response); 
      if (response.success === true) {
        const { accessToken} = response.data;
        localStorage.setItem("accessToken",accessToken)
        // console.log('local token :', accessToken)
        router("/"); 
      } else {
        if (response.error?.code === "ERR_USER_NOT_FOUND") {
          // console.log("Email Error: No user found.");
          setEmailError("No user found with this email address.");
        }
        else if (response.error?.code === "ERR_WRONG_PASSWORD") {
          // console.log("Password Error: Incorrect password.");
          setPasswordError("Incorrect password.");
        }
        else {
          // console.log("General Error: Invalid credentials.");
          setEmailError("Invalid email");
        }
      }
    } catch (err: any) {
      console.error("Request Error:", err);
      setEmailError("An error occurred, please try again.");
    }
  };
  
  

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, email: e.target.value });
    if (emailError) {
      setEmailError(null);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, password: e.target.value });
    if (passwordError) {
      setPasswordError(null); 
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-96">
        <form onSubmit={handleFormSubmit} className="flex flex-col w-full">
          <h1 className="text-black font-bold text-5xl text-center">Sign in</h1>
          <p className="mt-10 mb-1 text-black">Email</p>
          <input
            className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] text-black"
            type="text"
            name="email"
            required
            value={userData.email}
            onChange={handleEmailChange}
          />
          <p className="text-red-500">{emailError}</p> 

          <p className="mt-4 mb-1 text-black">Password</p>
          <div className="relative">
            <input
              className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] text-black"
              type={passwordVisible ? "text" : "password"}
              name="password"
              required
              value={userData.password}
              onChange={handlePasswordChange}
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <p className="text-red-500">{passwordError}</p> 

          <div className="flex justify-end pt-2">
            <NavLink className="text-blue-600" to="/auth/forgotpassword">
              Forgot Password
            </NavLink>
          </div>

          <button
            type="submit"
            className="rounded-md p-3 px-5 transition text-white bg-black hover:bg-black/80 min-w-[92px] mt-5 duration-300"
          >
            Login
          </button>

          <div className="mt-10 flex gap-2 text-black">
            <span>Don't have an account?</span>
            <Link to="/auth/register" className="text-black hover:text-black/80 duration-300">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
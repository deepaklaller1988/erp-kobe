import React, { useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";

const Login: React.FC = () => {
  useTitle({ title: "Login" });
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {};
    getData();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Login failed!");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[600px]">
        <form onSubmit={handleFormSubmit} className="flex flex-col w-full">
          <h1 className="text-black font-bold text-5xl text-center">
            Login
          </h1>
          <p className="mt-10 mb-1 text-black">Email</p>
          <input
            className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] bg-gray-100 text-black"
            type="text"
            name="email"
            placeholder="Enter your username"
            required
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <p className="text-red-500">{error}</p>
          <p className="mt-4 mb-1 text-black">Password</p>
          <input
            className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] bg-gray-100 text-black"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <p className="text-red-500">{error}</p>
          <button
            type="submit"
            className="rounded-md p-3 px-5 transition text-white bg-[#028b5d] hover:bg-[#01774f] min-w-[92px] mt-8"
          >
            Login
          </button>
          <div className="mt-10 flex gap-2 text-black">
            <span>Don't have an account?</span>
            <button className="">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

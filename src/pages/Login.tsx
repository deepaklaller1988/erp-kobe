import React, { useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";
import { Link} from "react-router-dom";

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
            Sign in
          </h1>
          <p className="mt-10 mb-1 text-black">Email</p>
          <input
            className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] text-black"
            type="text"
            name="email"
            required
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <p className="text-red-500">{error}</p>
          <p className="mt-4 mb-1 text-black">Password</p>
          <input
            className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] text-black"
            type="password"
            name="password"
            required
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <p className="text-red-500">{error}</p>
          <button
            type="submit"
            className="rounded-md p-3 px-5 transition text-white bg-black hover:bg-black/80 min-w-[92px] mt-8 duration-300"
          >
            Login
          </button>
          <div className="mt-10 flex gap-2 text-black">
            <span>Don't have an account?</span>
            <Link to="/auth/register" className="text-black hover:text-black/80 duration-300">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

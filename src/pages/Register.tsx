import React, { useState } from "react";
import useTitle from "../hooks/useTitle";

const Register: React.FC = () => {
  useTitle({ title: "Register" });
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<any>({});

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError({});

    try {
      window.alert("Sign-up successful!");
    } catch (err: any) {
      console.error(err);
      setError({ email: err.message || "Sign-up failed!" });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[600px]">
        <form onSubmit={handleFormSubmit} className="flex flex-col w-full">
          <h1 className="text-black font-bold text-5xl text-center">Sign up</h1>

          <p className="mt-10 mb-1 text-black">Username</p>
          <input
            className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] bg-gray-100 text-black"
            type="text"
            name="username"
            placeholder="Enter your username"
            required
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />

          <p className="mt-4 mb-1 text-black">Name</p>
          <input
            className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] bg-gray-100 text-black"
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />

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
            }
          />
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
            }
          />
          <p className="text-red-500">{error.password}</p>

          <button
            type="submit"
            className="rounded-md p-3 px-5 transition text-white bg-[#028b5d] hover:bg-[#01774f] min-w-[92px] mt-8"
          >
            Sign up
          </button>

          <div className="mt-10 flex gap-2 text-black">
            <span>Already have an account?</span>
            <button className="">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

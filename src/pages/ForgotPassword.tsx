import React, { useState } from "react";
import useTitle from "../hooks/useTitle";

const ForgotPassword: React.FC = () => {
  useTitle({ title: "Forgot Password" });
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleForgotPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      setSuccess("Verification code sent to your email.");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error sending verification code.");
    }
  };

  const handleSubmitNewPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      setSuccess("Password updated successfully!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error updating password.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[600px]">
        <form onSubmit={handleForgotPassword} className="flex flex-col w-full">
          <h1 className="text-black font-bold text-5xl text-center">
            Forgot Password
          </h1>
          <p className="mt-10 mb-1 text-black">Username</p>
          <input
            className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] bg-gray-100 text-black"
            type="text"
            name="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-red-500">{error}</p>
          <button
            type="submit"
            className="rounded-md p-3 px-5 transition text-white bg-[#028b5d] hover:bg-[#01774f] min-w-[92px] mt-8"
          >
            Send Verification Code
          </button>
          <p className="mt-10 text-black">Verification Code</p>
          <input
            className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] bg-gray-100 text-black"
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <p className="mt-4 mb-1 text-black">New Password</p>
          <input
            className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] bg-gray-100 text-black"
            type="password"
            placeholder="Create a new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            onClick={handleSubmitNewPassword}
            className="rounded-md p-3 px-5 transition text-white bg-[#028b5d] hover:bg-[#01774f] min-w-[92px] mt-8"
          >
            Reset Password
          </button>
          {success && <p className="text-green-500">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

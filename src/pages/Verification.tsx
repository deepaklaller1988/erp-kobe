import React, { useState } from "react";

const Verification = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmitNewPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    const newErrors: any = {};

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.";
    }

    if (!newPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== newPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; 
    }

    try {
      setSuccess("Password updated successfully!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error updating password.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[500px]">
        <h1 className="text-black font-bold text-5xl text-center">
          Create New Password
        </h1>
        <p className="mt-4 text-black">New Password</p>
        <input
          className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] bg-gray-100 text-black"
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <p className="mt-4 text-black">Confirm Password</p>
        <input
          className="w-full rounded-md p-3 outline-none border border-[#D1D5DB] bg-gray-100 text-black"
          type="password"
          placeholder="Enter Confirm Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword}</p>
        )}

        <button
          onClick={handleSubmitNewPassword}
          className="rounded-md p-3 px-5 transition text-white bg-black hover:bg-black/80 min-w-[92px] mt-8"
        >
          Reset Password
        </button>
        {success && <p className="text-green-500 mt-4">{success}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Verification;

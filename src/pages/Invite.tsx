import { useState } from "react";
import API from "../utils/API";

const Invite = () => {
  const [userData, setUserData] = useState({
    email: "",
  });
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, email: e.target.value });
    if (emailError) {
      setEmailError(null);
    }
  };

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email) {
      setEmailError("Email is required.");
      return false;
    } else if (!emailRegex.test(userData.email)) {
      setEmailError("Please enter a valid email.");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        const response = await API.post("invite", userData);
        console.log("Response:", response);
      } catch (error) {
        console.error("Error sending invite:", error);
      }
    }
  };

  return (
    <div className="py-5 gap-2 flex flex-col items-start">
      <h1 className="text-lg font-semibold">Enter Shipper Email ID</h1>
      <form onSubmit={formSubmit} className="flex flex-col gap-2">
        <div>
          <input
            className="border-2 rounded-md px-2 py-1 w-full"
            type="text"
            name="email"
            value={userData.email}
            onChange={handleEmailChange}
            placeholder="Email ID"
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>
        <div>
          <button
            type="submit"
            className="border-2 px-4 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Invite;
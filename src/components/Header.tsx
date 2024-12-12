import { NavLink, useNavigate } from "react-router-dom";
import API from "../utils/API";
import { useEffect, useState } from "react";

export const Header = () => {
  const router = useNavigate();
  const [type, setType] = useState<string>();

  useEffect(() => {
    let type = localStorage.getItem("type");
    setType(type ? type : "");
  }, []);

  const handleLogout = async () => {
    await API.get(`auth/logout`);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("type");
    router("auth/login");
  };

  const gotoDashboard = () => {
    if (type === "seller") {
      router("/seller");
    } else if (type === "shipper") {
      router("/shipper");
    } else {
      window.alert("Not logged in");
    }
  };

  return (
    <header className="p-8 lg:px-8 px-5 w-full bg-black">
      <div className="flex flex-col h-full justify-between">
        <div className="header-inner flex justify-between items-center">
          <div className="header-icon">
            <h1 className=" text-white font-bold text-2xl">ERP</h1>
          </div>
          <div className="menu-list">
            <ul className="flex gap-3 items-center">
              <li>
                <button
                  onClick={gotoDashboard}
                  className="hover:bg-[#355489] duration-300 hover:text-[white] text-white/70 py-3 px-4 rounded-full hidden sm:inline-block cursor-pointer"
                >
                  Dashboard
                </button>
              </li>
              {type === "seller" && (
                <li>
                  <NavLink
                    to="/invite-shipper"
                    className="hover:bg-[#355489] duration-300 hover:text-[white] text-white/70 py-3 px-4 rounded-full hidden sm:inline-block cursor-pointer"
                  >
                    Invite Shipper
                  </NavLink>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:bg-[#355489] duration-300 hover:text-[white] text-white/70 py-3 px-4 rounded-full sm:inline-block hidden cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

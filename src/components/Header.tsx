import { NavLink, useNavigate } from "react-router-dom";
import API from "../utils/API";

export const Header = () => {
  const router = useNavigate();

  const handleLogout = async () => {
    await API.get(`auth/logout`);
    await localStorage.removeItem("accessToken");
    router("auth/login");
    console.log("User logged out");
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
                <NavLink
                  to="/invite"
                  className="hover:bg-[#355489] duration-300 hover:text-[white] text-white/70 py-3 px-4 rounded-full hidden sm:inline-block cursor-pointer"
                >
                  Invite Shipper
                </NavLink>
              </li>
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

import { NavLink, useNavigate } from "react-router-dom";
import API from "../utils/API";
import { useEffect, useState } from "react";
import { userDetailsAttributes } from "../types/UserTypes";
import ErrorPopup from "./ErrorPopup";

export const Header = () => {
  const router = useNavigate();
  const [userDetails, setUserDetails] = useState<userDetailsAttributes>();
  const [error,setError]=useState<string|null>(null);

  useEffect(() => {
    let checkUserDetails: any = localStorage.getItem("userDetails");
    let data = JSON.parse(checkUserDetails);
    setUserDetails(data);
  }, []);

  const handleLogout = async () => {
    await API.get(`auth/logout`);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");
    router("auth/login");
  };

  const gotoDashboard = () => {
    if (userDetails?.type === "seller") {
      router("/seller");
    } else if (userDetails?.type === "shipper") {
      router("/shipper");
    } else {
      // window.alert("未登录");
      setError("未登录")
      
    }
  };

  const capitalizeWords = (word: any) => {
    return !word ? "" : word.charAt(0).toUpperCase() + word.substring(1);
  };

  const typeOfUser: any = (userDetails?.type === "seller" ? "卖方" : "托运人");
  // console.log("user type : " , typeOfUser)
  return (
    <header className="p-8 lg:px-8 px-5 w-full bg-black">
      {/* {error && <ErrorPopup error={error} setError={setError}/>} */}
      <div className="flex flex-col h-full justify-between">
        <div className="header-inner flex justify-between items-center">
          <div className="header-icon">
            <h1 className=" text-white font-bold text-2xl">
              企业资源计划 ({capitalizeWords(typeOfUser)} 仪表板)
            </h1>
            <p className="mt-1 text-gray-200">欢迎, {userDetails?.name}</p>
          </div>
          <div className="menu-list">
            <ul className="flex gap-3 items-center">
              <li>
                <button
                  onClick={gotoDashboard}
                  className="hover:bg-[#355489] duration-300 hover:text-[white] text-white/70 py-3 px-4 rounded-full hidden sm:inline-block cursor-pointer"
                >
                  {/* Dashboard */}
                  仪表板

                </button>
              </li>
              {userDetails?.type === "seller" && (
                <li>
                  <NavLink
                    to="/invite-shipper"
                    className="hover:bg-[#355489] duration-300 hover:text-[white] text-white/70 py-3 px-4 rounded-full hidden sm:inline-block cursor-pointer"
                  >
                    {/* Invite Shipper */}
                    邀请托运人
                  </NavLink>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:bg-[#355489] duration-300 hover:text-[white] text-white/70 py-3 px-4 rounded-full sm:inline-block hidden cursor-pointer"
                >
                  {/* Logout */}
                  退出
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

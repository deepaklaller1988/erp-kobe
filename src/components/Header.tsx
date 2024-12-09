import { NavLink, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  const smallHeaderRoutes = ["/bots/*"].includes(location.pathname);

  return (
    <header
      className={`p-8 lg:px-8 px-5 w-full bg-black ${
        smallHeaderRoutes ? " h-[300px] pb-12 " : " "
      }`}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="header-inner flex justify-between items-center">
          <div className="header-icon">
            <NavLink to="/">
              <img
                className="w-[120px]"
                src="tiktoklogo.png"
                alt="TikTok Logo"
              />
            </NavLink>
          </div>
          <div className="menu-list">
            <ul className="flex gap-3 items-center">
              <li>
                <NavLink
                  to="/invite"
                  className="hover:bg-[#355489] duration-300 hover:text-[white] text-[#86a2d1] py-3 px-4 rounded-full hidden sm:inline-block cursor-pointer">
                  Invite-Shipper
                </NavLink>
              </li>
              <li>
                <button
                  className="hover:bg-[#355489] duration-300 hover:text-[white] text-[#86a2d1] py-3 px-4 rounded-full sm:inline-block hidden cursor-pointer">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        {smallHeaderRoutes && (
          <div className="welcome-info w-full">
            <h2 className="sm:text-3xl text-xl text-white">
              Welcome Back, <b>Jackson !</b>
            </h2>
            <h3 className="sm:text-[15px] text-xs sm:mt-1 mt-0 text-white/80">
              To the future of digital marketing
            </h3>
          </div>
        )}
      </div>
    </header>
  );
};

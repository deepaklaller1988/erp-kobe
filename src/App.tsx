import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Header } from "./components/Header";
import { Suspense, useEffect, useState } from "react";
import MiniLoader from "./components/MiniLoader";
import Home from "./pages/Home";
import Seller from "./pages/Seller";
import Shipper from "./pages/Shipper";
import Invite from "./pages/Invite";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Verification from "./pages/Verification";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    const authRoutes = [ "/auth/register", "/auth/forgot-password", "/auth/verification"];
    const isAuthRoute = authRoutes.includes(location.pathname);

    if (!storedToken && !isAuthRoute) {
      navigate("/auth/login");
    }

    if (storedToken && isAuthRoute) {
      navigate(-1);
    }
  }, [ location.pathname, navigate]);

  const isAuthRoute = [
    "/auth/login",
    "/auth/forgot-password",
    "/auth/register",
    "/auth/verification",
  ].includes(location.pathname);

  return (
    <div className="w-full flex flex-col bg-white duration-300">
      {!isAuthRoute && <Header />}
      <div className="w-full flex h-full flex-row">
        <Suspense fallback={<MiniLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/shipper" element={<Shipper />} />
            <Route path="/invite-shipper" element={<Invite />} />
            <Route path="/invitation/shipper" element={<Invite />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/verification" element={<Verification />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

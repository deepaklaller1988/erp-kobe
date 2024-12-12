import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
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

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    console.log("storedToken",storedToken)
    setToken(storedToken);
    setLoading(false); // Set loading to false once the token is checked
  }, []);

  useEffect(() => {
    if (loading) return; // Skip the logic until we are done with loading

    const authRoutes = ["/auth/login", "/auth/register", "/auth/forgotpassword", "/auth/verification"];
    const isAuthRoute = authRoutes.includes(location.pathname);

    // If the user is not authenticated and not on an auth route, redirect to login
    if (!token && !isAuthRoute) {
      navigate("/auth/login", { replace: true });
    }

    // If the user is authenticated and on an auth route, redirect to home
    if (token && isAuthRoute) {
      navigate("/", { replace: true });
    }
  }, [token, loading, location.pathname, navigate]);

  const isAuthRoute = [
    "/auth/login",
    "/auth/forgotpassword",
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
            <Route path="/auth/forgotpassword" element={<ForgotPassword />} />
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
    </BrowserRouter>
  );
}

export default App;

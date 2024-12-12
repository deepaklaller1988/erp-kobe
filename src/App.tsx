import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Suspense, lazy, useEffect, useState } from "react";
import MiniLoader from "./components/MiniLoader";
import Home from "./pages/Home";

const Seller = lazy(() => import("./pages/Seller"));
const Invite = lazy(() => import("./pages/Invite"));
const Shipper = lazy(() => import("./pages/Shipper"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Verification = lazy(() => import("./pages/Verification"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Layout = () => {
  const location = useLocation();
  const router = useNavigate();

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("accessToken");
      setToken(storedToken);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && !token && !["/auth/login", "/auth/register"].includes(location.pathname)) {
      router("/auth/login");
    }

    if (!loading && token && ["/auth/login", "/auth/register"].includes(location.pathname)) {
      router("/");
    }
  }, [token, loading, location, router]);

  const isAuthRoute = [
    "/auth/login",
    "/auth/forgotpassword",
    "/auth/register",
    "/auth/verification",
  ].includes(location.pathname);

  return (
    <div className="w-full flex flex-col bg-white duration-300">
      {/* Render Header only for non-auth routes */}
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

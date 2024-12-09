import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Suspense, lazy } from "react";
import MiniLoader from "./components/MiniLoader";
import Home from "./pages/Home";
import Invite from "./pages/Invite";

const Seller = lazy(() => import("./pages/Seller"));
const Shipper = lazy(() => import("./pages/Shipper"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Layout = () => {
  const location = useLocation();

  const isAuthRoute = [
    "/auth/login",
    "/auth/forgot",
    "/auth/register",
  ].includes(location.pathname);

  return (
    <div className="w-full flex flex-col bg-white duration-300">
      {!isAuthRoute && <Header />}
      <div className="w-full flex flex-row lg:px-8 px-5">
        <Suspense fallback={<MiniLoader />}>
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/shipper" element={<Shipper />} />
            <Route path="/invite" element={<Invite/>} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/forgot" element={<ForgotPassword />} />
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

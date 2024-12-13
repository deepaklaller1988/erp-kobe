import { useState, useEffect } from "react";
import Password from "../components/Password";
import Successmessage from "../components/Successmessage";
import { useLocation } from "react-router-dom";
import API from "../utils/API";
import MiniLoader from "../components/MiniLoader";
import { toast } from "react-toastify";

const Verification = () => {
  const [type, setType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const showToast = (type: "success" | "error" | "warn", message: string) => {
    toast[type](message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };
  const location = useLocation();

  useEffect(() => {
    const getQueryParam = (name: string) => {
      const urlParams = new URLSearchParams(location.search);
      return urlParams.get(name);
    };

    const token: string | null = getQueryParam("token");
    const type: string | null = getQueryParam("type");

    if (token && type) {
      setIsLoading(true);
      API.get(`auth/account-activation?token=${token}&type=${type}`)
        .then((response) => {

          if(response?.error?.code){
        showToast("error", "Account not verified");
            setError("ERR_ACCOUNT_NOT_VERIFIED");
          }
          if(response?.success){
            // showToast("success","Password updated Successfully")
            setError("");
          }
        })
        .catch((error) => {
          setError("Error during verifying link")
          console.error("Error during verifying link", error);
        });
      setIsLoading(false);
    }

    setType(type);
  }, [location.search]);

  return (
    <>
      {isLoading ? <div className="mt-4 flex w-full"><MiniLoader /></div> :
      error ? 
      <div className="flex items-center justify-center w-full h-screen">
        <p className="text-red-500 text-4xl">{error === "ERR_ACCOUNT_NOT_VERIFIED" ? "Please activate your account first" : error}</p>
      </div>
      :
        type === "account-activation" ? <Successmessage /> : <Password />
      }
      
    </>
  );
};

export default Verification;

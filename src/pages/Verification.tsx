import { useState, useEffect } from "react";
import Password from "../components/Password";
import Successmessage from "../components/Successmessage";
import { useLocation } from "react-router-dom";
import API from "../utils/API";
import useTitle from "../hooks/useTitle";

const Verification = () => {
  useTitle({ title: "确认" });
  const [type, setType] = useState<string | null>(null);
  const location = useLocation();
  const [error,setError]=useState<string | null>(null);

  useEffect(() => {
    const getQueryParam = (name: string) => {
      const urlParams = new URLSearchParams(location.search);
      return urlParams.get(name);
    };

    const token: string | null = getQueryParam("token");
    const type: string | null = getQueryParam("type");

    if (token && type) {
      API.get(type==="reset-password" ? `auth/verify-password-reset-link?token=${token}`:`auth/account-activation?token=${token}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          setError(error);
          console.error("Error during account activation:", error);
        });
    }

    setType(type);
  }, [location.search]);

  return (
    <>
    {error?(<div className="flex flex-col justify-center items-center w-full h-screen">
      <h1 className="text-4xl">{error === "ERR_USER_NOT_FOUND"?"未找到用户":error}</h1>

    </div>):
      type === "account-activation" ? <Successmessage /> : <Password />}
      
    </>
  );
};

export default Verification;

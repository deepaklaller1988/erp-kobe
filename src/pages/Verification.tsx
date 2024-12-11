import { useState, useEffect } from "react";
import Password from "../components/Password";
import Successmessage from "../components/Successmessage";
import { useLocation } from "react-router-dom";
import API from "../utils/API";

const Verification = () => {
  const [type, setType] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const getQueryParam = (name: string) => {
      const urlParams = new URLSearchParams(location.search);
      return urlParams.get(name);
    };

    const token: string | null = getQueryParam("token");
    const type: string | null = getQueryParam("type");

    if (token && type) {
      API.get(`auth/account-activation?token=${token}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error during account activation:", error);
        });
    }

    setType(type);
  }, [location.search]);

  return (
    <>
      {type === "account-activation" ? <Successmessage /> : <Password />}
    </>
  );
};

export default Verification;

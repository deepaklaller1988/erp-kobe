import { useEffect, useState } from "react";
import API from "../utils/API";
import { useLocation, useNavigate } from "react-router-dom";
import MiniLoader from "../components/MiniLoader";
import { toast } from "react-toastify";

const Invite = () => {
  const router = useNavigate();
  const location = useLocation();
  const [shipperEmail, setUserData] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProcessed, setIsProcessed] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
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


  const getQueryParam = (name: string) => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(name);
  };

  const checkToken = getQueryParam("token");
  
  const handleAcceptInvitation = async () => {
    if (isProcessed) return;
    setIsProcessed(true);
  
    try {
      setIsLoading(true);
      const response = await API.get(`seller-shipper/invitation?token=${checkToken}`);
      if (response.error?.code === "ERR_INVITATION_ALREADY_ACCEPTED") {
        showToast("error", "This invitation has already been accepted.");
        setEmailError("This invitation has already been accepted.");
        
      } else {
        showToast("success", "Invitation accepted successfully.");
      }
    } catch (error) {
      console.error("Error fetching invitation:", error);
      setEmailError("An error occurred while accepting the invitation.");
      showToast("error", "An error occurred while accepting the invitation.");
    }
    setIsLoading(false);
  };
  handleAcceptInvitation();
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(e.target.value);
    if (emailError) {
      setEmailError(null);
    }
  };

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!shipperEmail) {
      setEmailError("Email is required.");
      return false;
    } else if (!emailRegex.test(shipperEmail)) {
      setEmailError("Please enter a valid email.");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      setLoading(true);
      try {
        const response = await API.post("seller-shipper/invitation", {
          shipperEmail: shipperEmail,
        });
        console.log("Response:", response);
        if (!response.success) {
          setEmailError("No shipper found with this email address.");
          showToast("error","No shipper found with this email address.")
        }else{
          setEmailError("");
          showToast("success","Email sent to shipper successfully")
        }
      } catch (error) {
        console.error("Error sending invite:", error);
        setEmailError("An error occurred while sending the invitation.");
        showToast("error","An error occurred while sending the invitation.")
      }finally{
        setLoading(false);
      }
    }
  };

  const handleOk = () => {
    router("/shipper");
  };

  return (
    <div className="py-5 gap-2 flex-col flex items-center justify-center h-full mt-10 w-full">
      {checkToken ? (
        isLoading ? (
          <div className="pt-20">
            <MiniLoader />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-full h-full">
            {emailError ? (
              <p className="text-gray-500 text-xl">{emailError}</p>
            ) : (
              <>
                <h1 className="text-4xl">Seller invitation accepted!</h1>
                <p className="text-gray-500 text-xl">
                  Now you will see all products of this seller
                </p>
              </>
            )}
            <button
              className="text-xl font-bold px-10 py-3 rounded-xl border bg-black text-white hover:bg-black/70 duration-300 mt-8"
              onClick={handleOk}
            >
              OK
            </button>
          </div>
        )
      ) : (
        <>
          <h1 className="text-xl mb-2 text-blue-800 font-semibold text-center">Enter Shipper Email ID to invite</h1>
          <form
            onSubmit={formSubmit}
            className="flex flex-col items-center justify-center w-full w-[300px]"
          >
            <div className="w-full">
              <input
                className="rounded-full p-3 bg-black/5 outline-none w-full text-black"
                type="text"
                name="email"
                value={shipperEmail}
                onChange={handleEmailChange}
                placeholder="Email ID"
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            {loading ? <MiniLoader/> :  <button
              type="submit"
              className="rounded-full p-2 px-5 transition text-white bg-black hover:bg-black/80 min-w-[92px] mt-5 duration-300"
            >
              Send
            </button>}
           
          </form>
        </>
      )}
    </div>
  );
};

export default Invite;

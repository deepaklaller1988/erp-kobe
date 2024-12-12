import { useEffect, useState } from "react";
import API from "../utils/API";
import { useLocation, useNavigate } from "react-router-dom";
import MiniLoader from "../components/MiniLoader";

const Invite = () => {
  const router = useNavigate();
  const location = useLocation();
  const [shipperEmail, setUserData] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProcessed, setIsProcessed] = useState<boolean>(false);

  const getQueryParam = (name: string) => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(name);
  };

  const checkToken = getQueryParam("token");

  useEffect(() => {
    const handleAcceptInvitation = async () => {
      if (!checkToken || isProcessed) return;

      setIsLoading(true);
      setIsProcessed(true);

      try {
        const response = await API.get(
          `seller-shipper/invitation?token=${checkToken}`
        );

        if (
          response.error &&
          response.error.code === "ERR_INVITATION_ALREADY_ACCEPTED"
        ) {
          setEmailError("This invitation has already been accepted.");
        } else {
          console.log("Invitation accepted successfully:", response);
        }
      } catch (error) {
        console.error("Error fetching invitation:", error);
        setEmailError("An error occurred while accepting the invitation.");
      } finally {
        setIsLoading(false);
      }
    };

    if (checkToken) {
      handleAcceptInvitation();
    }
  }, [checkToken]);

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
      try {
        const response = await API.post("seller-shipper/invitation", {
          shipperEmail: shipperEmail,
        });
        console.log("Response:", response);
        if (!response.success) {
          setEmailError("No shipper found with this email address.");
        }
      } catch (error) {
        console.error("Error sending invite:", error);
        setEmailError("An error occurred while sending the invitation.");
      }
    }
  };

  const handleOk = () => {
    router("/shipper");
  };

  return (
    <div className="py-5 gap-2 flex flex-col items-start flex items-center justify-center h-full mt-10 w-full">
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
          <h1>Enter Shipper Email ID to invite</h1>
          <form
            onSubmit={formSubmit}
            className="flex flex-col items-center justify-center gap-2 w-96 mt-5"
          >
            <div className="w-full">
              <input
                className="rounded-md w-full p-3 outline-none border border-[#D1D5DB] text-black"
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
            <button
              type="submit"
              className="rounded-md p-3 px-10 transition text-white bg-black hover:bg-black/80 mt-2 w-full"
            >
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Invite;

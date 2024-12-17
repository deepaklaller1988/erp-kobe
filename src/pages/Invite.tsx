import { useEffect, useState } from "react";
import API from "../utils/API";
import { useLocation, useNavigate } from "react-router-dom";
import MiniLoader from "../components/MiniLoader";
import { toast } from "react-toastify";
import useTitle from "../hooks/useTitle";

const Invite = () => {
  useTitle({ title: "邀请" });
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
    if (checkToken) {


      if (isProcessed) return;
      setIsProcessed(true);

      try {
        setIsLoading(true);
        const response = await API.get(
          `seller-shipper/invitation?token=${checkToken}`
        );
        if (response.error?.code === "ERR_INVITATION_ALREADY_ACCEPTED") {
          showToast("error", "此邀请已被接受。");
          setEmailError("此邀请已被接受。");
        }
      } catch (error) {
        console.error("Error fetching invitation:", error);
        setEmailError("接受邀请时发生错误。");
        showToast("error", "接受邀请时发生错误。");
      }
      setIsLoading(false);
    }
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
      setEmailError("需要电子邮件。");
      return false;
    } else if (!emailRegex.test(shipperEmail)) {
      setEmailError("请输入有效的电子邮件。");
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
        if (!response.success) {
          if (response.error?.code === "ERR_SHIPPER_NOT_FOUND") {
            setEmailError("未找到使用此电子邮件地址的发件人。");
            showToast("error", "未找到使用此电子邮件地址的发件人。");
          } else if (response.error?.code === "ERR_SHIPPER_ALREADY_INVITED") {
            setEmailError("该托运人已被邀请");
            showToast("error", "该托运人已被邀请");
          } else if (response.error?.code === "ERR_SHIPPER_NOT_VERIFIED") {
            setEmailError("未找到使用此电子邮件地址的发件人。");
            showToast("error", "未找到使用此电子邮件地址的发件人。");
          } else {
            setEmailError("未找到使用此电子邮件地址的发件人。");
            showToast("error", "未找到使用此电子邮件地址的发件人。");
          }

        } else {
          setEmailError("");
          showToast("success", "电子邮件已成功发送给发货人");
        }
      } catch (error) {
        console.error("Error sending invite:", error);
        setEmailError("发送邀请时出错。");
        showToast("error", "发送邀请时出错。");
      } finally {
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
                <h1 className="text-4xl">卖家邀请已接受！</h1>
                <p className="text-gray-500 text-xl">
                  
现在您将看到该卖家的所有产品
                </p>
              </>
            )}
            <button
              className="text-xl font-bold px-10 py-3 rounded-xl border bg-black text-white hover:bg-black/70 duration-300 mt-8"
              onClick={handleOk}
            >
             好的
            </button>
          </div>
        )
      ) : (
        <>
          <h1 className="text-xl mb-2 text-blue-800 font-semibold text-center">
          输入发件人电子邮件 ID 以邀请</h1>
          <form
            onSubmit={formSubmit}
            className="flex flex-col items-center justify-center w-[300px]"
          >
            <div className="w-full">
              <input
                className="rounded-full p-3 bg-black/5 outline-none w-full text-black"
                type="text"
                name="email"
                value={shipperEmail}
                onChange={handleEmailChange}
                placeholder="电子邮件地址"
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            {loading ? (
              <div className="mt-4"><MiniLoader /></div>
            ) : (
              <button
                type="submit"
                className="rounded-full p-3 px-10 transition text-white bg-black hover:bg-black/80 mt-5 w-full"
              >
                发送
              </button>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default Invite;

import { useNavigate } from "react-router-dom";
import API from "../utils/API";


const ErrorPopup = ({error,setError}:any) => {
    const router = useNavigate();
    const handleOk =async ()=>{
        setError(null)
        await API.get(`auth/logout`);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userDetails");
        router("auth/login");
    }
  return (
 
    <div className="bg-black/50 w-full h-full inset-0 absolute flex justify-center items-center"
              style={{ zIndex: 2 }}
            >
              <div className="bg-white rounded-xl p-8 flex flex-col">
                <p className="text-red-500 font-semibold">{error === "ERR_ACCESS_TOKEN_EXPIRED" ? "会话已过期，请重新登录":error}</p>
                <button
                  className="rounded-full p-2 px-8 transition text-white bg-black hover:bg-black/80 mt-5 duration-300"
                  onClick={handleOk}
                >
                  好的
                </button>
              </div>
            </div>
  )
}

export default ErrorPopup
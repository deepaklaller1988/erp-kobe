import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toasterSuccess = (message: any, time: any = 3000, customId?: any) => {
  toast(message || "process has been done successfully", {
    type: "success",
    toastId: customId,
    position: "bottom-center",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    className: 'text-sm'
  });
};

export const toasterError = (message: any, time: any = 3000, customId?: any) => {
  toast(message, {
    type: "error",
    toastId: customId,
    position: "bottom-center",
    autoClose: time, 
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    className: 'text-sm text-white'
  });
};

export const toasterInfo = (message: any, time: any = 3000, customId?: any) => {
  toast(message, {
    type: "info",
    toastId: customId,
    position: "top-center",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    className: 'text-sm p-2'
  });
};

export const toasterWarning = (message: any) => {
  toast(message, {
    type: "warning",
    position: "bottom-center",
    autoClose: 3000, 
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    className: 'text-sm'
  });
};



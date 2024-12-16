import React, { useState } from "react";
import API from "../utils/API";
import { IoCloseSharp } from "react-icons/io5";
import MiniLoader from "./MiniLoader";

interface PollModalProps {
  onClose: () => void;
  onSuccess: () => void;
  orderId: string;
}

const StatusPop = ({ onClose, onSuccess, orderId }: PollModalProps) => {
  const [select, setSelect] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const postProduct = async () => {
    try {
 
      if (select === "" || select === undefined || select === null) {
        setError("请选择状态");
      } else {
        let data = {
          orderId,
          status: select,
        };
        const response = await API.post("order/update-status", data);
        onSuccess();
        onClose();
    
      }
    } catch (error) {
      console.error("Error during product submission:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    postProduct();
  };

  const handleSelect = (status: string) => {
    setSelect(status);
    setError("");
  };

  return (
    <div className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center">
      <div className="relative bg-white p-4 rounded-lg shadow-lg w-[400px]">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black items-center"
          onClick={onClose}
        >
          <IoCloseSharp size={24} />
        </button>
        <h1 className="text-xl mb-4 text-blue-800 font-semibold text-center">
         
更改状态
        </h1>
        <div className="flex flex-col gap-2 justify-center">
          <div className="flex flex-row gap-2 items-center cursor-pointer bg-black/5 rounded-full p-2 px-4">
            <input
              type="radio"
              name="status"
              id="pending"
              checked={select === "pending"}
              onChange={() => handleSelect("pending")}
            />
            <label htmlFor="pending">
            待办的</label>
          </div>

          <div className="flex flex-row gap-2 items-center cursor-pointer bg-black/5 rounded-full p-2 px-4">
            <input
              type="radio"
              name="status"
              id="started"
              checked={select === "started"}
              onChange={() => handleSelect("started")}
            />
            <label htmlFor="started">开始</label>
          </div>

          <div className="flex flex-row gap-2 items-center cursor-pointer bg-black/5 rounded-full p-2 px-4">
            <input
              type="radio"
              name="status"
              id="completed"
              checked={select === "completed"}
              onChange={() => handleSelect("completed")}
            />
            <label htmlFor="completed">
            完全的</label>
          </div>
        </div>
        <p className="text-red-500 mt-2">{error}</p>

        <div className="text-center">
          {loading ? (
            <MiniLoader />
          ) : (
            <button
              onClick={handleSubmit}
              className="rounded-full p-2 px-5 transition text-white bg-black hover:bg-black/80 min-w-[92px] mt-5 duration-300"
            >
              提交
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusPop;

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
      console.log(select, "[]][[]");
      if (select === "" || select === undefined || select === null) {
        setError("Please select status");
      } else {
        let data = {
          orderId,
          status: select,
        };
        const response = await API.post("order/update-status", data);
        onSuccess();
        onClose();
        console.log("Product added successfully:", response);
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
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black items-center"
          onClick={onClose}
        >
          <IoCloseSharp size={24} />
        </button>
        <h1 className="mt-10 mb-1 text-black font-bold items-center">
          Change status
        </h1>
        <div>
          <div className="flex flex-row gap-2">
            <input
              type="radio"
              name="status"
              id="pending"
              checked={select === "pending"}
              onChange={() => handleSelect("pending")}
            />
            <label htmlFor="pending">Pending</label>
          </div>

          <div className="flex flex-row gap-2">
            <input
              type="radio"
              name="status"
              id="started"
              checked={select === "started"}
              onChange={() => handleSelect("started")}
            />
            <label htmlFor="started">Started</label>
          </div>

          <div className="flex flex-row gap-2">
            <input
              type="radio"
              name="status"
              id="completed"
              checked={select === "completed"}
              onChange={() => handleSelect("completed")}
            />
            <label htmlFor="completed">Completed</label>
          </div>
        </div>
        <p className="text-red-500 mt-2">{error}</p>

        <div className="text-center">
          {loading ? (
            <MiniLoader />
          ) : (
            <button
              onClick={handleSubmit}
              className="rounded-md p-3 px-5 transition text-white bg-black hover:bg-black/80 min-w-[92px] mt-5 duration-300"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusPop;

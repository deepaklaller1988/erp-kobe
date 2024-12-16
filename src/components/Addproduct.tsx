import React, { useState } from 'react';
import API from '../utils/API';
import { IoCloseSharp } from "react-icons/io5";
import MiniLoader from './MiniLoader';
import { toast } from 'react-toastify';

interface PollModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

const AddProduct = ({ onClose,onSuccess }: PollModalProps) => {
    const [userData, setUserData] = useState({
        name: "",
        totalQuantity: "",
    });
    const [productError, setProductError] = useState<string | null>(null);
    const [quantityError, setQuantityError] = useState<string | null>(null);
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

    const postProduct = async (data: { name: string; totalQuantity: string }) => {
        try {
            const response = await API.post("product", data);
            showToast("success", "产品添加成功");
            onSuccess();
        } catch (error) {
            console.error("Error during product submission:", error);
            showToast("error", "添加产品时出错");
        } finally {
            setLoading(false);
        }
    };

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, name: e.target.value });
        if (productError) {
            setProductError(null);
        }
    };

    const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setUserData({ ...userData, totalQuantity: value });
            if (quantityError) {
                setQuantityError(null);
            }
        }
    };

    const handleSubmit = () => {
        const { name, totalQuantity } = userData;

        let valid = true;
        if (!name) {
            setProductError("产品名称为必填项。");
            valid = false;
        }
        if (!totalQuantity) {
            setQuantityError("数量为必填项。");
            valid = false;
        }

        if (valid) {
           
            postProduct({ ...userData });
            setLoading(true);
            setUserData({
                name: "",
                totalQuantity: "",
            });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="relative bg-white p-4 rounded-lg shadow-lg w-[400px]">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-black items-center"
                    onClick={onClose}
                >
                    <IoCloseSharp size={24} />
                </button>
                <h1 className="text-xl mb-4 text-blue-800 font-semibold text-center">
                添加产品</h1>
                <p className="mt- mb-1 text-black">产品名称</p>
                <input
                    className="rounded-full p-3 bg-black/5 outline-none w-full text-black"
                    type="text"
                    name="name"
                    required
                    value={userData.name}
                    onChange={handleName}
                />
                <p className="text-red-500">{productError}</p>

                <p className="mt-4 mb-1 text-black">数量</p>
                <input
                    className="rounded-full p-3 bg-black/5 outline-none w-full text-black"
                    type="text"
                    name="totalQuantity"
                    required
                    value={userData.totalQuantity}
                    onChange={handleQuantity}
                />
                <p className="text-red-500">{quantityError}</p>

                <div className="text-center">
                    {loading ? <MiniLoader /> : 
                        <button
                            onClick={handleSubmit}
                            className="rounded-full p-2 px-5 transition text-white bg-black hover:bg-black/80 min-w-[92px] mt-5 duration-300"
                        >
                            提交
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default AddProduct;

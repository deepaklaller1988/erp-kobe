import React, { useState } from 'react';
import API from '../utils/API';
import { IoCloseSharp } from "react-icons/io5";
interface PollModalProps {
    onClose: () => void;
}
const AddorderData = ({ onClose }: PollModalProps) => {
    const [userData, setUserData] = useState({
        productId: "",
        label: "",
        note: "",
        usedQuantity: "",
    });
    const [productError, setProductError] = useState<string | null>(null);
    const [labelError, setLabelError] = useState<string | null>(null);
    const [productIdError, setProductIdError] = useState<string | null>(null);
    const [quantityError, setQuantityError] = useState<string | null>(null);

    const postProduct = async (data: { note: string; usedQuantity: string; productId: string; label: string }) => {
        try {
            const response = await API.post("order/by-order", data);
            console.log("Product added successfully:", response);
        } catch (error) {
            console.error("Error during product submission:", error);
        }
    };

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, note: e.target.value });
        if (productError) {
            setProductError(null);
        }
    };
    const handleLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, label: e.target.value });
        if (labelError) {
            setLabelError(null);
        }
    };
    const handleProductid = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, productId: e.target.value });
        if (productIdError) {
            setProductIdError(null);
        }
    };

    const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setUserData({ ...userData, usedQuantity: value });
            if (quantityError) {
                setQuantityError(null);
            }
        }
    };

    const handleSubmit = () => {
        const { note, usedQuantity, productId, label } = userData;

        let valid = true;
        if (!note) {
            setProductError("Order name is required.");
            valid = false;
        }
        if (!usedQuantity) {
            setQuantityError("Used Quantity is required.");
            valid = false;
        }
        if (!productId) {
            setProductIdError("Order Id is required.");
            valid = false;
        }
        if (!label) {
            setLabelError("Label is required.");
            valid = false;
        }

        if (valid) {
            postProduct({ ...userData });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="relative bg-white p-8 rounded-lg shadow-lg w-[400px]">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-black items-center"
                    onClick={onClose}
                >
                    <IoCloseSharp size={24} />
                </button>
                <h1 className="mt-5 mb-1 text-black font-bold items-center">Add Order</h1>
                <p className="mt-5 mb-1 text-black">Product ID</p>
                <input
                    className="rounded-md p-3 w-full outline-none border border-[#D1D5DB] text-black"
                    type="text"
                    name="productId"
                    required
                    value={userData.productId}
                    onChange={handleProductid}
                />
                <p className="text-red-500">{productIdError}</p>
                <p className="mt-5 mb-1 text-black">Order Name</p>
                <input
                    className="rounded-md p-3 w-full outline-none border border-[#D1D5DB] text-black"
                    type="text"
                    name="note"
                    required
                    value={userData.note}
                    onChange={handleName}
                />
                <p className="text-red-500">{productError}</p>

                <p className="mt-5 mb-1 text-black">Label</p>
                <input
                    className="rounded-md p-3 w-full outline-none border border-[#D1D5DB] text-black"
                    type="text"
                    name="label"
                    required
                    value={userData.label}
                    onChange={handleLabel}
                />
                <p className="text-red-500">{labelError}</p>

                <p className="mt-5 mb-1 text-black">Used Quantity</p>
                <input
                    className="rounded-md p-3 w-full outline-none border border-[#D1D5DB] text-black"
                    type="text"
                    name="totalQuantity"
                    required
                    value={userData.usedQuantity}
                    onChange={handleQuantity}
                />
                <p className="text-red-500">{quantityError}</p>
                <div className="text-center">
                    <button
                        onClick={handleSubmit}
                        className="rounded-md p-3 px-5 transition text-white bg-black hover:bg-black/80 min-w-[92px] mt-5 duration-300">
                        Submit
                    </button>
                </div>
            </div>
        </div>

    );
}

export default AddorderData
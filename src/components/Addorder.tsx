import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import { IoCloseSharp } from "react-icons/io5";
import Select from "react-select";
import MiniLoader from './MiniLoader';

interface PollModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

const AddorderData = ({ onClose, onSuccess }: PollModalProps) => {
    const [userData, setUserData] = useState({
        productId: "",
        note: "",
        usedQuantity: "",
        label: "", // We'll store the label file name here
    });
    const [productError, setProductError] = useState<string | null>(null);
    const [labelError, setLabelError] = useState<string | null>(null);
    const [productIdError, setProductIdError] = useState<string | null>(null);
    const [quantityError, setQuantityError] = useState<string | null>(null);
    const [productIdData, setproductIdData] = useState<any[]>([]);
    const [productDetails, setProductDetails] = useState<any>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await API.get("product/");
                setproductIdData(response.data.rows);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const postProduct = async (data: { note: string; usedQuantity: string; productId: string; label: string }) => {
        try {
            const response = await API.post("order", data);
            onSuccess();
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

    const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (/^\d*$/.test(value)) {
            const usedQuantityValue = parseInt(value, 10);
            const availableQuantityValue = productDetails?.availableQuantity;

            if (usedQuantityValue >= availableQuantityValue) {
                setQuantityError("Quantity cannot be more than the available quantity.");
            } else {
                setQuantityError(null);
                setUserData({ ...userData, usedQuantity: value });
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setUserData({ ...userData, label: file.name }); // Store the file name in label
        }
    };

    const handleSubmit = async () => {
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
            setProductIdError("Product ID is required.");
            valid = false;
        }
        if (!label) {
            setLabelError("Label file is required.");
            valid = false;
        }
        if (valid) {
            try {
                await postProduct({ ...userData });
                setUserData({
                    productId: "",
                    label: "",
                    note: "",
                    usedQuantity: "",
                });
                setProductError(null);
                setLabelError(null);
                setProductIdError(null);
                setQuantityError(null);
                setLoading(true);
                onClose();
            } catch (error) {
                console.error("Error during product submission:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleChange = (e: any, inputValue?: any) => {
        if (e === "productId") {
            setUserData((prevData: any) => ({
                ...prevData,
                productId: inputValue,
            }));
        } else {
            const { name, value } = e.target;
            setUserData((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
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

                {/* Product ID Dropdown */}
                <p className="mt-5 mb-1 text-black">Product ID</p>
                <div className="col-12 col-sm-6 mt-4">
                    <Select
                        name="productId"
                        value={userData.productId ? { label: productIdData.find((product: any) => product.productId === userData.productId)?.name, value: userData.productId } : null}
                        menuShouldScrollIntoView={false}
                        isClearable
                        placeholder="Select a Product"
                        className="dropDownFixes rounded-md formDropDown mt-1 text-sm borderBottom"
                        options={productIdData.map((items: any) => ({
                            label: items.name,
                            value: items.productId,
                            key: items.productId,
                            availableQuantity: items.availableQuantity,
                        }))}
                        onChange={(item: any) => {
                            setProductDetails(item);
                            handleChange("productId", item?.value);
                        }}
                    />
                    <p className="text-red-500">{productIdError}</p>
                </div>

                {/* Note Input */}
                <p className="mt-5 mb-1 text-black">Note</p>
                <input
                    className="rounded-md p-3 w-full outline-none border border-[#D1D5DB] text-black"
                    type="text"
                    name="note"
                    required
                    value={userData.note}
                    onChange={handleName}
                />
                <p className="text-red-500">{productError}</p>

                {/* Label File Upload */}
                <p className="mt-5 mb-1 text-black">Label (Upload File)</p>
                <input
                    className="rounded-md p-3 w-full outline-none border border-[#D1D5DB] text-black"
                    type="file"
                    name="label"
                    onChange={handleFileChange}
                />
                <p className="text-red-500">{labelError}</p>

                {/* Display uploaded file name */}
                {userData.label && <p>Uploaded file: {userData.label}</p>}

                <p className='mt-5'>Available Quantity: {productDetails?.availableQuantity}</p>

                {/* Used Quantity */}
                <p className="mt-2 mb-1 text-black">Used Quantity</p>
                <input
                    className="rounded-md p-3 w-full outline-none border border-[#D1D5DB] text-black"
                    type="text"
                    name="usedQuantity"
                    required
                    value={userData.usedQuantity}
                    onChange={handleQuantity}
                />
                <p className="text-red-500">{quantityError}</p>

                {/* Submit Button */}
                <div className="text-center">
                    {loading ? <MiniLoader /> :
                        <button
                            onClick={handleSubmit}
                            className="rounded-md p-3 px-5 transition text-white bg-black hover:bg-black/80 min-w-[92px] mt-5 duration-300"
                            disabled={loading}
                        >
                            Submit
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default AddorderData;

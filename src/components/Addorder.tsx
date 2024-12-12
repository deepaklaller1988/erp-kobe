import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import { IoCloseSharp } from "react-icons/io5";
import Select from "react-select";

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
    const [productIdData, setproductIdData] = useState<any[]>([]);
    const [productDetails,setProductDetails]=useState<any>({})

console.log("productDetails :",productDetails)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await API.get("product/");
                // console.log("=====-----",response.data.rows)
                setproductIdData(response.data.rows);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);
    // console.log("productIdData :", productIdData)

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

    const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setUserData({ ...userData, usedQuantity: value });
            if (quantityError) {
                setQuantityError(null);
            }
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
            setLabelError("Label is required.");
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
            } catch (error) {
                console.error("Error during product submission:", error);
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
                            availableQuantity:items.availableQuantity,
                        }))}
                        onChange={(item: any) => {
                            setProductDetails(item);
                            handleChange("productId", item?.value);
                        }}
                    />

                    <p className="text-red-500">{productIdError}</p>
                </div>
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

<p className='mt-5'>Available Quantity : {productDetails?.availableQuantity}</p>

                <p className="mt-2 mb-1 text-black">Used Quantity</p>
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
                        className="rounded-md p-3 px-5 transition text-white bg-black hover:bg-black/80 min-w-[92px] mt-5 duration-300"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddorderData;

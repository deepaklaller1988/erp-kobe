import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { IoCloseSharp } from "react-icons/io5";
import Select from "react-select";
import MiniLoader from "./MiniLoader";
import { toast } from "react-toastify";
import { GrAttachment } from "react-icons/gr";

interface PollModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AddorderData = ({ onClose, onSuccess }: PollModalProps) => {
  const [userData, setUserData] = useState({
    productId: "",
    note: "",
    usedQuantity: "",
    label: "",
  });
  const [productError, setProductError] = useState<string | null>(null);
  const [labelError, setLabelError] = useState<string | null>(null);
  const [productIdError, setProductIdError] = useState<string | null>(null);
  const [quantityError, setQuantityError] = useState<string | null>(null);
  const [productIdData, setproductIdData] = useState<any[]>([]);
  const [productDetails, setProductDetails] = useState<any>({});
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

  const postProduct = async (data: {
    note: string;
    usedQuantity: string;
    productId: string;
    label: string;
  }) => {
    try {
      setLoading(true)
      const response = await API.post("order", data);
      showToast("success","订单添加成功")
      onSuccess();
      setLoading(false)
    } catch (error) {
      console.error("Error during product submission:", error);
      setLoading(false)
      showToast("error","添加订单时出错")
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

      if (usedQuantityValue > availableQuantityValue) {
        setQuantityError(
          "数量不能多于可用数量。"
        );
      } else {
        setQuantityError(null);
        setUserData({ ...userData, usedQuantity: value });
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setUserData({ ...userData, label: file.name });

      const formData = new FormData();
      formData.append("pdf", file);

      let headers = new Headers();
      headers.append("Accept", "application/json");

      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.append("authorization", `Bearer ${token}`);
      }

      try {
        let response = await fetch(
          "http://localhost:5000/api/v1/order/upload-label",
          {
            method: "POST",
            body: formData,
            credentials: "include",
            headers: headers,
          }
        );
        let result = await response.json();
        setUserData({ ...userData, label: result.data.url });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleSubmit = async () => {
    const { note, usedQuantity, productId, label } = userData;
    let valid = true;
    if (!note) {
      setProductError("订单名称为必填项。");
      valid = false;
    }
    if (!usedQuantity) {
      setQuantityError("已用数量为必填项。");
      valid = false;
    }
    if (!productId) {
      setProductIdError("需要产品 ID。");
      valid = false;
    }
    if (!label) {
      setLabelError("需要标签文件。");
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
      <div className="relative bg-white p-4 rounded-lg shadow-lg w-[400px]">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black items-center"
          onClick={onClose}
        >
          <IoCloseSharp size={24} />
        </button>
        <h1 className="text-xl mb-4 text-blue-800 font-semibold text-center">
        添加订单
        </h1>

        {/* Product ID Dropdown */}
        <p className="mt-5 mb-1 text-black">
        产品编号</p>
        <div className="col-12 col-sm-6">
          <Select
            name="productId"
            value={
              userData.productId
                ? {
                    label: productIdData.find(
                      (product: any) => product.productId === userData.productId
                    )?.name,
                    value: userData.productId,
                  }
                : null
            }
            menuShouldScrollIntoView={false}
            isClearable
            placeholder="选择产品"
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
        <p className="mt-5 mb-1 text-black">笔记</p>
        <input
          className="rounded-full p-3 bg-black/5 outline-none w-full text-black"
          type="text"
          name="note"
          required
          value={userData.note}
          onChange={handleName}
        />
        <p className="text-red-500">{productError}</p>

        {/* Label File Upload */}
        <p className="mt-5 mb-1 text-black">
        标签 (上传文件)</p>
        <div className="flex gap-2 items-center rounded-full p-3.5 bg-black/5 outline-none w-full text-black relative">
        <GrAttachment/>附加文件导入
        <input
          className="absolute w-full h-full opacity-0"
          type="file"
          name="pdf"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        </div>
        <p className="text-red-500">{labelError}</p>

        {/* Display uploaded file name */}
        {userData.label && <p className="text-xs font-semibold text-green-500 mt-2">
          上传的文件: {userData.label}</p>}

        <p className="mt-5 font-semibold">
        可用数量: {productDetails?.availableQuantity}
        </p>

        {/* Used Quantity */}
        <p className=" mb-1 text-black">使用数量</p>
        <input
          className="rounded-full p-3 bg-black/5 outline-none w-full text-black"
          type="text"
          name="usedQuantity"
          required
          value={userData.usedQuantity}
          onChange={handleQuantity}
        />
        <p className="text-red-500">{quantityError}</p>

        {/* Submit Button */}
        <div className="text-center">
          {loading ? (
            <div className="mt-4">
            <MiniLoader />
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              className="rounded-full p-2 px-5 transition text-white bg-black hover:bg-black/80 min-w-[92px] mt-5 duration-300"
              disabled={loading}
            >
              提交
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddorderData;

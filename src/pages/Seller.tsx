import { TableColumn } from "react-data-table-component";
import { DataTable } from "../components/DataTable";
import useTitle from "../hooks/useTitle";
import {
  SellerProductData,
  ShipperOrderData,
} from "../types/DataTableAttributes";
import AddProduct from "../components/Addproduct";
import { useEffect, useState } from "react";
import API from "../utils/API";
import AddorderData from "../components/Addorder";
import MiniLoader from "../components/MiniLoader";

const Seller = () => {
  useTitle({ title: "Seller Dashboard" });

  const [isPollPopupOpen, setIsPollPopupOpen] = useState(false);
  const [isPollPopupOrderOpen, setisPollPopupOrderOpen] = useState(false);
  const [apiProductData, setApiProductData] = useState<SellerProductData[]>([]);
  const [apiOrderSeller, setApiOrderSeller] = useState<ShipperOrderData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiProduct();
  }, []);
  useEffect(() => {
    apiOrderSellerData();
  }, []);

  const apiProduct = async () => {
    const response = await API.get("product/");
    setLoading(true);
    console.log("product data ", response.data.rows);
    setApiProductData(response.data.rows);
    setLoading(false);
  };

  const apiOrderSellerData = async () => {
    const response = await API.get("order/by-seller");
    console.log("order data ", response.data.rows);
    setApiOrderSeller(response.data.rows);
  };

  const productColumns: TableColumn<SellerProductData>[] = [
    {
      name: "Product",
      selector: (row) => row.name,
      sortable: true,
      width: "25%",
    },
    {
      name: "Total Quantity",
      selector: (row) => row.totalQuantity,
      sortable: true,
      width: "25%",
    },
    {
      name: "Available Quantity",
      selector: (row) => row.availableQuantity,
      sortable: true,
      width: "25%",
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      sortable: true,
      width: "25%",
    },
  ];

  const orderColumns: TableColumn<ShipperOrderData>[] = [
    {
      name: "Product",
      selector: (row) => row.name,
      sortable: true,
      width: "20%",
    },
    {
      name: "Used Quantity",
      selector: (row) => row.usedQuantity,
      sortable: true,
      width: "20%",
    },
    {
      name: "Label",
      selector: (row) => row.label,
      sortable: true,
      width: "20%",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "20%",
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      sortable: true,
      width: "20%",
    },
  ];

  const closePollModal = () => {
    setIsPollPopupOpen(false);
  };
  const closePollOrderModal = () => {
    setisPollPopupOrderOpen(false);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-col justify-center items-center py-5 border">
          <div className="mt-2 flex justify-end w-[90%]">
            <button
              onClick={() => setIsPollPopupOpen(true)}
              className="font-bold px-4 py-3 rounded-xl border hover:bg-black hover:text-white duration-300"
            >
              Add Product
            </button>
          </div>
          <div className="w-3/4">
            {loading ? (
              <MiniLoader />
            ) : (
              <DataTable data={apiProductData} columns={productColumns} />
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center py-5">
          <div className="mt-2 flex justify-end">
            <button
              onClick={() => setisPollPopupOrderOpen(true)}
              className="font-bold px-4 py-3 rounded-xl border hover:bg-black hover:text-white duration-300"
            >
              Add Order
            </button>
          </div>
          <div className="w-3/4">
            {loading ? (
              <MiniLoader />
            ) : (
              <DataTable data={apiOrderSeller} columns={orderColumns} />
            )}
          </div>
        </div>
      </div>

      {isPollPopupOpen && <AddProduct onClose={closePollModal} />}
      {isPollPopupOrderOpen && <AddorderData onClose={closePollOrderModal} />}
    </>
  );
};

export default Seller;

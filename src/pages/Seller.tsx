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
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Seller = () => {
  useTitle({ title: "Seller Dashboard" });

  const [isPollPopupOpen, setIsPollPopupOpen] = useState(false);
  const [isPollPopupOrderOpen, setisPollPopupOrderOpen] = useState(false);
  const [apiProductData, setApiProductData] = useState<SellerProductData[]>([]);
  const [apiOrderSeller, setApiOrderSeller] = useState<ShipperOrderData[]>([]);
  const [loading, setLoading] = useState(false);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<any>();
  const [ordersOfSingleProduct, setOrdersOfSingleProduct] = useState<
    ShipperOrderData[]
  >([]);

  useEffect(() => {
    apiProduct();
  }, []);
  useEffect(() => {
    apiOrderSellerData();
  }, []);

  useEffect(() => {
    if (openAccordionIndex || openAccordionIndex === 0) {
      getAllOrdersOfaProducts();
    }
  }, [openAccordionIndex]);

  const getAllOrdersOfaProducts = async () => {
    setLoading(true);
    const response = await API.get(
      `order/by-product?productId=${apiProductData[openAccordionIndex].productId}&page=1&limit=10`
    );
    console.log(openAccordionIndex, response, "222222222222");
    setOrdersOfSingleProduct(response.data.rows);
    setLoading(false);
  };

  const apiProduct = async () => {
    const response = await API.get("product/");
    setLoading(true);
    setApiProductData(response.data.rows);
    setLoading(false);
  };

  const apiOrderSellerData = async () => {
    const response = await API.get("order/by-seller");
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
      selector: (row) => row.products[0].name,
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
      cell: (row) => (
        <button className="px-8 py-3 rounded-xl border bg-blue-400 text-white">
          View
        </button>
      ),
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

  const handleAccordionClick = (index: any) => {
    if (index === openAccordionIndex) {
      setOpenAccordionIndex(null);
    } else {
      setOpenAccordionIndex(index);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-col justify-center items-center py-5">
          <div className="mt-2 flex justify-between items-center w-[90%]">
            <h1>All products</h1>
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
              <div className="w-full p-5 flex flex-col gap-2 h-full">
                <div className="flex flex-row justify-around">
                  <h3>PRODUCT</h3>
                  <h3>TOTAL QUANTITY</h3>
                  <h3>AVAILABLE QUANTITY</h3>
                  <h3>DATE OF CREATION</h3>
                </div>
                {apiProductData?.map((item: any, itemIndex: any) => (
                  <div key={`${itemIndex}+${item}`}>
                    <div
                      key={itemIndex}
                      className={`full ${
                        itemIndex === openAccordionIndex
                          ? "accordionActive bg-gray-100"
                          : ""
                      } border border-gray-200 hover:bg-gray-100 duration-300 rounded-lg overflow-hidden`}
                    >
                      <section
                        className="flex flex-row gap-0 justify-between p-5 cursor-pointer"
                        onClick={() => handleAccordionClick(itemIndex)}
                      >
                        <div className="w-full flex gap-3 sm:gap-6 items-center justify-between">
                          <div className="flex flex-row items-center justify-around w-full">
                            <p className="text-black font-semibold">
                              {item?.name}
                            </p>
                            <p>{item?.totalQuantity}</p>
                            <p>{item?.availableQuantity}</p>
                            <p>{item?.createdAt}</p>
                          </div>
                          <p>
                            {itemIndex === openAccordionIndex ? (
                              <IoIosArrowUp />
                            ) : (
                              <IoIosArrowDown />
                            )}
                          </p>
                        </div>
                      </section>
                      <section
                        className={`flex flex-col gap-2 transition w-full ${
                          itemIndex === openAccordionIndex
                            ? "border-t h-auto"
                            : "max-h-0"
                        } border-gray-300 px-2 overflow-hidden accordion duration-300`}
                      >
                        <div className="w-3/4">
                          {loading ? (
                            <MiniLoader />
                          ) : (
                            <DataTable
                              data={ordersOfSingleProduct}
                              columns={orderColumns}
                            />
                          )}
                        </div>
                      </section>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* <div className="flex flex-col justify-center items-center w-screen py-5">
          <div className="mt-2 flex justify-end w-[90%]">
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
        </div> */}
      </div>

      {isPollPopupOpen && (
        <AddProduct onClose={closePollModal} onSuccess={apiProduct} />
      )}
      {isPollPopupOrderOpen && (
        <AddorderData
          onClose={closePollOrderModal}
          onSuccess={apiOrderSellerData}
        />
      )}
    </>
  );
};

export default Seller;

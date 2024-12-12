import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { DataTable } from "../components/DataTable";
import MiniLoader from "../components/MiniLoader";
import useTitle from "../hooks/useTitle";
import { useEffect, useState } from "react";
import API from "../utils/API";
import { TableColumn } from "react-data-table-component";
import { ShipperOrderData } from "../types/DataTableAttributes";

const Shipper = () => {
  useTitle({ title: "Shipper Dashboard" });
  const [loading, setLoading] = useState(false);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<any>();
  const [shipperData, setShipperData] = useState<any>([]);
  const [ordersOfSingleSeller, setOrdersOfSingleSeller] = useState<
    ShipperOrderData[]
  >([]);

  useEffect(() => {
    getAllAssociatedSellers();
  }, []);

  useEffect(() => {
    if (openAccordionIndex || openAccordionIndex === 0) {
      getAllOrdersOfaSeller();
    }
  }, [openAccordionIndex]);

  const getAllAssociatedSellers = async () => {
    setLoading(true);
    const response = await API.get(`seller-shipper/all-sellers-under-shipper`);
    setShipperData(response.data.rows);
    setLoading(false);
  };

  const getAllOrdersOfaSeller = async () => {
    setLoading(true);
    const response = await API.get(
      `seller-shipper/get-orders?sellerId=${shipperData[openAccordionIndex].productId}&page=1&limit=10`
    );
    console.log(openAccordionIndex, response, "222222222222");
    setOrdersOfSingleSeller(response.data.rows);
    setLoading(false);
  };

  const handleAccordionClick = (index: any) => {
    if (index === openAccordionIndex) {
      setOpenAccordionIndex(null);
    } else {
      setOpenAccordionIndex(index);
    }
  };

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

  return (
    <div className="flex flex-col justify-center items-center w-screen py-5">
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
            {!shipperData || shipperData.length === 0 ? (
              <p className="text-center text-gray-500 mt-4">
                No Seller associated with your account
              </p>
            ) : (
              shipperData?.map((item: any, itemIndex: any) => (
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
                            data={ordersOfSingleSeller}
                            columns={orderColumns}
                          />
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shipper;

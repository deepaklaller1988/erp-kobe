import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { DataTable } from "../components/DataTable";
import MiniLoader from "../components/MiniLoader";
import useTitle from "../hooks/useTitle";
import { useEffect, useState } from "react";
import API from "../utils/API";
import { TableColumn } from "react-data-table-component";
import { ShipperOrderData } from "../types/DataTableAttributes";
import { CgArrowsExchange } from "react-icons/cg";
import Select from "react-select";
import StatusPop from "../components/StatusPop";

const Shipper = () => {
  useTitle({ title: "托运人仪表板" });
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<any>();
  const [shipperData, setShipperData] = useState<any>([]);
  const [ordersOfSingleSeller, setOrdersOfSingleSeller] = useState<
    ShipperOrderData[]
  >([]);
  const [statusPop, setStatusPop] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>("");

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
    setLoading1(true);
    const response = await API.get(
      `seller-shipper/get-orders?sellerId=${shipperData[openAccordionIndex].sellerId}&page=1&limit=10`
    );
    setOrdersOfSingleSeller(response.data.rows);
    setLoading1(false);
  };

  const handleAccordionClick = (index: any) => {
    if (index === openAccordionIndex) {
      setOpenAccordionIndex(null);
    } else {
      setOpenAccordionIndex(index);
    }
  };

  const handleView = (url: string) => {
    if (url) {
      window.open(`${process.env.REACT_APP_API_URL}${url}`, "_blank");
    } else {
      alert("没有上传文件");
    }
  };

  const openStatusPopup = (open: boolean, orderId: string) => {
    setOrderId(orderId);
    setStatusPop(true);
  };

  const orderColumns: TableColumn<ShipperOrderData>[] = [
    {
      name: "产品",
      selector: (row) => row.products[0].name,
      sortable: true,
      // width: "15%",
    },
    {
      name: "使用数量",
      selector: (row) => row.usedQuantity,
      sortable: true,
      // width: "15%",
    },
    {
      name: "标签",
      selector: (row) => row.label,
      sortable: true,
      // width: "15%",
      cell: (row) => (
        <button
          className="p-2 px-4 rounded-full bg-blue-800 text-white"
          onClickCapture={() => handleView(row.label)}
        >
          
看法
        </button>
      ),
    },
    {
      name: "地位",
      selector: (row) => row.status,
      sortable: true,
      // width: "15%",
    },
    {
      name: "创建于",
      selector: (row) => row.createdAt?.substring(0, 10),
      sortable: true,
      // width: "15%",
    },
    {
      name: "更改状态",
      selector: (row) => row.orderId,
      sortable: true,
      // width: "15%",
      cell: (row) => (
        <button
          className="p-2 px-4 rounded-full bg-black text-white flex flex-row gap-2 items-center justify-center"
          onClickCapture={() => openStatusPopup(true, row.orderId)}
        >
          选择状态
          <p className="text-xl">
            <CgArrowsExchange />
          </p>
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center w-full h-full py-5">
      {statusPop && (
        <StatusPop
          onClose={() => setStatusPop(false)}
          onSuccess={getAllOrdersOfaSeller}
          orderId={orderId}
        />
      )}
      <div className="w-full max-w-[1200px] max-auto px-2">
        {loading ? (
          <div className="flex">
            <MiniLoader />
          </div>
        ) : (
          <div className="w-full p-5 flex flex-col gap-2 h-full">
            <div className="flex flex-row justify-start">
              <h3>
                卖家</h3>
            </div>
            {!shipperData || shipperData.length === 0 ? (
              <p className="text-center text-gray-500 mt-4">

                没有卖家与您的帐户关联
              </p>
            ) : (
              shipperData?.map((item: any, itemIndex: any) => (
                <div key={`${itemIndex}+${item}`}>
                  <div
                    key={itemIndex}
                    className={`full ${itemIndex === openAccordionIndex
                        ? "accordionActive bg-gray-100"
                        : ""
                      } border border-gray-200 hover:bg-gray-100 duration-300 rounded-lg overflow-hidden`}
                  >
                    <section
                      className="flex flex-row gap-0 justify-between p-5 cursor-pointer"
                      onClick={() => handleAccordionClick(itemIndex)}
                    >
                      <div className="w-full flex gap-3 sm:gap-6 items-center justify-between">
                        <div className="flex flex-row items-center justify-start w-full">
                          <p className="text-black capitalize font-semibold">
                            {item?.seller_name}
                          </p>
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
                      className={`flex flex-col gap-2 transition w-full ${itemIndex === openAccordionIndex
                          ? "border-t p-4 h-auto"
                          : "max-h-0"
                        } border-gray-300 overflow-hidden accordion duration-300`}
                    >
                      <div className="w-full">
                        {loading1 ? (
                          <div className="flex mt-4">
                            <MiniLoader />
                          </div>
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

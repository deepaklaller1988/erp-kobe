import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { DataTable } from "../components/DataTable";
import MiniLoader from "../components/MiniLoader";
// import AddProduct from "../components/AddProduct";
// import AddOrderData from "../components/AddOrderData";
import API from "../utils/API";
import AddProduct from "../components/Addproduct";
import AddorderData from "../components/Addorder";
import {
  SellerProductData,
  ShipperOrderData,
} from "../types/DataTableAttributes";
import ErrorPopup from "../components/ErrorPopup";
import useTitle from "../hooks/useTitle";

const Seller = () => {
  useTitle({ title: "卖方" });

  const [ordersOfSingleProduct, setOrdersOfSingleProduct] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    null
  );
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [apiProductData, setApiProductData] = useState<SellerProductData[]>([]);
  const [apiOrderSeller, setApiOrderSeller] = useState<ShipperOrderData[]>([]);
  const [error,setError]=useState<string|null>(null);

  // useEffect(() => {
  //   apiOrderSellerData();
  // }, []);
  useEffect(() => {
    apiProduct();
  }, []);

  const apiProduct = async () => {
    const response = await API.get("product/");
    setLoading(true);
    if(response.error){
      setError(response.error.code)
    }else{
      setApiProductData(response.data.rows);
    }
    
    setLoading(false);
  };

  const fetchOrdersByProduct = async (productId: string) => {
    setLoading(true);
    try {
      const response = await API.get(
        `order/by-product?productId=${productId}&page=1&limit=10`
      );
      setOrdersOfSingleProduct(response.data.rows);
    } catch (error) {
      console.error("Error fetching product orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccordionClick = async (index: number, productId: string) => {
    if (index === openAccordionIndex) {
      setOpenAccordionIndex(null);
    } else {
      setOpenAccordionIndex(index);
      await fetchOrdersByProduct(productId);
    }
  };

  const apiOrderSellerData = async () => {
    const response = await API.get("order/by-seller");
    setApiOrderSeller(response.data.rows);
  };

  const handleView = (url: string) => {
    if (url) {
      window.open(`${process.env.REACT_APP_API_URL}${url}`, "_blank");
    } else {
      alert("没有上传文件");
    }
  };

  return (
    <div className="flex flex-col w-full">
      {error && <ErrorPopup error={error} setError={setError}/>}
      <div className="flex flex-col justify-center items-center py-5">
        <div className="mt-2 flex justify-between items-center w-full max-w-[1200px] mx-auto px-2">
          <h1 className="text-xl mb-4 text-blue-800 font-semibold text-center">所有产品</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowAddProduct(true)}
              className="px-4 py-2 bg-blue-800 text-white rounded-full hover:bg-blue-600"
            >
             添加产品
            </button>
            <button
              onClick={() => setShowAddOrder(true)}
              className="px-4 py-2 bg-green-800 text-white rounded-full hover:bg-bgreen-600"
            >
           添加订单
            </button>
          </div>
        </div>
        <div className="mt-6 w-full bg-gray-400/10 rounded-lg p-2 max-w-[1200px] max-auto px-2">
          {loading && openAccordionIndex === null ? (
            <div className="w-full flex items-center justify-center">
              <MiniLoader />
            </div>
          ) : (
            <div className="w-full p-5 flex flex-col gap-2 h-full">
              <div className="flex flex-row justify-around mx-14">
                <h3>产品</h3>
                <h3>总数量</h3>
                <h3>可用数量</h3>
                <h3>创建日期</h3>
              </div>
              {apiProductData && apiProductData.length > 0 ?
              apiProductData?.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div
                    className={`full ${
                      itemIndex === openAccordionIndex
                        ? "accordionActive bg-gray-100"
                        : ""
                    } border border-gray-200 hover:bg-gray-100 duration-300 rounded-lg overflow-hidden`}
                  >
                    <section
                      className="flex flex-row gap-0 justify-between p-5 cursor-pointer bg-white"
                      onClick={() =>
                        handleAccordionClick(itemIndex, item.productId)
                      }
                    >
                      <div className="w-full flex gap-3 sm:gap-6 items-center justify-between">
                        <div className="flex flex-row items-center justify-around w-full">
                          <p className="text-black font-semibold">
                            {item?.name}
                          </p>
                          <p>{item?.totalQuantity}</p>
                          <p>{item?.availableQuantity}</p>
                          <p>{item?.createdAt?.substring(0, 10)}</p>
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
                          ? "border-t h-auto p-2"
                          : "max-h-0"
                      } bg-white overflow-hidden accordion duration-300`}
                    >
                      <div className="w-full border">
                        {loading && openAccordionIndex === itemIndex ? (
                          <div className="flex my-5">
                            <MiniLoader />
                          </div>
                        ) : (
                          <DataTable
                            data={ordersOfSingleProduct}
                            columns={[
                              {
                                name: "产品",
                                selector: (row: any) => row?.products[0]?.name,
                                sortable: true,
                              },
                              {
                                name: "使用数量",
                                selector: (row: any) => row.usedQuantity,
                                sortable: true,
                              },
                              {
                                name: "标签",
                                selector: (row: any) => row.label,
                                cell: (row: any) => (
                                  <button
                                    className="p-2 px-4 rounded-full bg-blue-800 text-white"
                                    onClick={() => handleView(row.label)}
                                  >
                                    看法
                                  </button>
                                ),
                              },
                              {
                                name: "地位",
                                selector: (row: any) => row.status,
                                sortable: true,
                              },
                              {
                                name: "日期",
                                selector: (row: any) =>
                                  row.createdAt?.substring(0, 10),
                                sortable: true,
                              },
                            ]}
                          />
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              ))
            :
            <p className="text-gray-500 text-center mt-1">没有找到产品 </p>
            }
            </div>
          )}
        </div>
      </div>

      {showAddProduct && (
        <AddProduct
          onClose={() => setShowAddProduct(false)}
          onSuccess={apiProduct}
        />
      )}
      {showAddOrder && (
        <AddorderData
          onClose={() => setShowAddOrder(false)}
          onSuccess={apiOrderSellerData}
        />
      )}
    </div>
  );
};

export default Seller;

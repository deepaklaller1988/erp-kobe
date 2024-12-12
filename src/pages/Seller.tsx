import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { DataTable } from "../components/DataTable";
import MiniLoader from "../components/MiniLoader";
// import AddProduct from "../components/AddProduct";
// import AddOrderData from "../components/AddOrderData";
import API from "../utils/API";
import AddProduct from "../components/Addproduct";
import AddorderData from "../components/Addorder";
import { SellerProductData, ShipperOrderData } from "../types/DataTableAttributes";

const Seller = () => {

  const [ordersOfSingleProduct, setOrdersOfSingleProduct] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [apiProductData, setApiProductData] = useState<SellerProductData[]>([]);
  const [apiOrderSeller, setApiOrderSeller] = useState<ShipperOrderData[]>([]);
console.log("apiOrderSeller :",apiOrderSeller)
console.log("ordersOfSingleProduct :",ordersOfSingleProduct)
  useEffect(() => {
    apiOrderSellerData();
  }, []);
  useEffect(() => {
    apiProduct();
  }, []);

  const apiProduct = async () => {
    const response = await API.get("product/");
    setLoading(true);
    setApiProductData(response.data.rows);
    setLoading(false);
  };

  const fetchOrdersByProduct = async (productId: string) => {
    setLoading(true);
    try {
      const response = await API.get(
        `order/by-product?productId=${productId}&page=1&limit=10`
      );
      console.log("ordersOfSingleProduct : ====",response.data.rows)
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
    // console.log("order name : ======",response.data.rows)
    setApiOrderSeller(response.data.rows);
  };
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col justify-center items-center py-5">
        <div className="mt-2 flex justify-between items-center w-[90%]">
          <h1>All Products</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowAddProduct(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Product
            </button>
            <button
              onClick={() => setShowAddOrder(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Order
            </button>
          </div>
        </div>
        <div className="w-3/4">
          {loading && openAccordionIndex === null ? (
            <MiniLoader />
          ) : (
            <div className="w-full p-5 flex flex-col gap-2 h-full">
              <div className="flex flex-row justify-around">
                <h3>PRODUCT</h3>
                <h3>TOTAL QUANTITY</h3>
                <h3>AVAILABLE QUANTITY</h3>
                <h3>DATE OF CREATION</h3>
              </div>
              {apiProductData?.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div
                    className={`full ${
                      itemIndex === openAccordionIndex
                        ? "accordionActive bg-gray-100"
                        : ""
                    } border border-gray-200 hover:bg-gray-100 duration-300 rounded-lg overflow-hidden`}
                  >
                    <section
                      className="flex flex-row gap-0 justify-between p-5 cursor-pointer"
                      onClick={() => handleAccordionClick(itemIndex, item.productId)}
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
                          ? "border-t h-auto"
                          : "max-h-0"
                      } border-gray-300 px-2 overflow-hidden accordion duration-300`}
                    >
                      <div className="w-full">
                        {loading && openAccordionIndex === itemIndex ? (
                          <MiniLoader />
                        ) : (
                          <DataTable
                            data={ordersOfSingleProduct }
                   
                            columns={[
                              {
                                name: "Product",
                                selector: (row: any) => row?.products[0]?.name,
                                sortable: true,
                              },
                              {
                                name: "Used Quantity",
                                selector: (row: any) => row.usedQuantity,
                                sortable: true,
                              },
                              {
                                name: "Label",
                                selector: (row: any) => row.label,
                                cell: (row: any) => (
                                  <button className="px-8 py-3 rounded-xl border bg-blue-400 text-white">
                                    View
                                  </button>
                                ),
                              },
                              {
                                name: "Status",
                                selector: (row: any) => row.status,
                                sortable: true,
                              },
                              {
                                name: "Date",
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
              ))}
            </div>
          )}
        </div>
      </div>

      {showAddProduct && (
        <AddProduct onClose={() => setShowAddProduct(false)} onSuccess={apiProduct} />
      )}
      {showAddOrder && (
        <AddorderData onClose={() => setShowAddOrder(false)} onSuccess={apiOrderSellerData} />
      )}
    </div>
  );
};

export default Seller;

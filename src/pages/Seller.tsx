import { TableColumn } from "react-data-table-component";
import { DataTable } from "../components/DataTable";
import useTitle from "../hooks/useTitle";
import { SellerProductData, ShipperOrderData } from "../types/DataTableAttributes";
import API from "../utils/API";

const Seller = () => {
  useTitle({ title: "Seller-Table" });

  const handleProduct = () => {
    console.log("Product added");
  };

  const handleOrder = () => {
    console.log("Order added");
  };

  const productData: SellerProductData[] = [
    {
      sellerProductName: "Puma",
      messageType: "Product",
      totalstock: 20,
      availablestock: 15,
    },
    {
      sellerProductName: "Nike",
      messageType: "Total Stock",
      totalstock: 25,
      availablestock: 20,
    },
    {
      sellerProductName: "Adidas",
      messageType: "Available Stock",
      totalstock: 30,
      availablestock: 25,
    },
  ];

  const orderData: ShipperOrderData[] = [
    {
      shipperProductName: "Puma",
      messageType: "Product",
      label: "Label",
      status: "Pending",
    },
    {
      shipperProductName: "Nike",
      messageType: "Used Stock",
      label: "Label",
      status: "Pending",
    },
    {
      shipperProductName: "Adidas",
      messageType: "Label",
      label: "Label",
      status: "Pending",
    },
    {
      shipperProductName: "Asics",
      messageType: "Status",
      label: "Label",
      status: "Pending",
    },
  ];

  const productColumns: TableColumn<SellerProductData>[] = [
    {
      name: "Product",
      selector: (row) => row.sellerProductName,
      sortable: false,
      width: "30%",
    },
    {
      name: "Total Stock",
      selector: (row) => row.totalstock,
      sortable: false,
      width: "30%",
    },
    {
      name: "Available Stock",
      selector: (row) => row.availablestock,
      sortable: false,
      width: "30%",
    },
  ];

  const orderColumns: TableColumn<ShipperOrderData>[] = [
    {
      name: "Product",
      selector: (row) => row.shipperProductName,
      sortable: false,
      width: "25%",
    },
    {
      name: "Used Stock",
      selector: (row) => row.messageType,
      sortable: false,
      width: "25%",
    },
    {
      name: "Label",
      selector: (row) => row.label,
      sortable: false,
      width: "25%",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: false,
      width: "25%",
    },
  ];

const getAllOrderProduct = ()=>{
  const order = API.get("by-seller")
console.log("Seller order :",order)
const product = API.get("by-product")
console.log("Seller Product :",product)

}


  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center w-screen py-5">
          {/* w-full */}
          <div className="mt-2 flex justify-end ">
            <button
              onClick={handleProduct}
              className="font-bold px-4 py-3 rounded-xl border hover:bg-black hover:text-white duration-300"
            >
              Add Product
            </button>
          </div>
          <div className="w-3/4">
            <DataTable data={productData} columns={productColumns} />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-screen py-5">
          {/* w-full */}
          <div className="mt-2 flex justify-end ">
            <button
              onClick={handleOrder}
              className="font-bold px-4 py-3 rounded-xl border hover:bg-black hover:text-white duration-300"
            >
              Add Order
            </button>
          </div>
          <div className="w-3/4">
            <DataTable data={orderData} columns={orderColumns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Seller;

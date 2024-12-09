import { TableColumn } from "react-data-table-component";
import { DataTable } from "../components/DataTable";
import useTitle from "../hooks/useTitle";
import { SellerProductData } from "../types/DataTableAttributes";

const Seller = () => {
  useTitle({ title: "Seller-Table" });

  const handleProduct =()=>{
    console.log("Order added")
  }
  const data: SellerProductData[] = [
    {
      sellerProductName: "Puma",
      messageType: "Product",
      totalstock:20,
      availablestock:15
    },
    {
      sellerProductName: "Nike",
      messageType: "Total Stock",
      totalstock:25,
      availablestock:20
    },
    {
      sellerProductName: "Addidas",
      messageType: "Available Stock",
      totalstock:30,
      availablestock:25
    },
    
  ];

  const columns: TableColumn<SellerProductData>[] = [
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
  return (
    <div
    className="flex flex-col justify-center items-center w-screen py-5"
  >
      <div className="mt-5 flex justify-end w-full  ">
    <button
        onClick={handleProduct}
        className="font-bold px-6 py-3 rounded-xl border hover:bg-black hover:text-white duration-300"
      >
        Add Product
      </button>
    </div>
    <div className="w-3/4">
      <DataTable data={data} columns={columns} />
    </div>
    
  </div>
  );
};

export default Seller;

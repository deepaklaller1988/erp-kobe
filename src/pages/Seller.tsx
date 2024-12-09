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
    },
    {
      sellerProductName: "Nike",
      messageType: "Total Stock",
    },
    {
      sellerProductName: "Addidas",
      messageType: "Available Stock",
    },
    
  ];

  const columns: TableColumn<SellerProductData>[] = [
    {
      name: "Product",
      selector: (row) => row.messageType,
      sortable: false,
      width: "30%",
    },
    {
      name: "Total Stock",
      selector: (row) => row.messageType,
      sortable: false,
      width: "30%",
    },
    {
      name: "Available Stock",
      selector: (row) => row.messageType,
      sortable: false,
      width: "30%",
    },
  ];
  return (
    <div className="">
      <div className="mt-3 max-w-full">
        <DataTable data={data} columns={columns} />
      </div>
      <div><button onClick={handleProduct} className="font-bold border-2 border-slate-400 px-2 py-2 rounded-md flex flex-col items-center shadow-md gap-1 hover:bg-blue-500 hover:border-black ">Add Product</button></div>
    </div>
  );
};

export default Seller;

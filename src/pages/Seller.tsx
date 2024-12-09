import { TableColumn } from "react-data-table-component";
import { DataTable } from "../components/DataTable";
import useTitle from "../hooks/useTitle";
import { SellerProductData } from "../types/DataTableAttributes";

const Seller = () => {
  useTitle({ title: "Seller-Table" });
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
    <div>
      <div className="mt-3 max-w-full">
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default Seller;

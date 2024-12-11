import useTitle from '../hooks/useTitle';
// import { ShipperOrderData } from '../types/DataTableAttributes';
import { TableColumn } from 'react-data-table-component';
import { DataTable } from "../components/DataTable";

const Shipper = () => {
    // useTitle({ title: "Shipper-Table" });
    // const handleOrder=()=>{
    //   console.log("Order added")
    // }
    // const data: ShipperOrderData[] = [
    //   {
    //     shipperProductName: "Puma",
    //     messageType: "Product",
    //     label:"Label",
    //     status:"Pending"
    //   },
    //   {
    //     shipperProductName: "Nike",
    //     messageType: "Used Stock",
    //     label:"Label",
    //     status:"Pending"
    //   },
    //   {
    //     shipperProductName: "Addidas",
    //     messageType: "Label",
    //     label:"Label",
    //     status:"Pending"
   
    //   },
    //   {
    //     shipperProductName: "asics",
    //     messageType: "Status",
    //     label:"Label",
    //     status:"Pending"
    //   },
    // ];
  
    // const columns: TableColumn<ShipperOrderData>[] = [
    //   {
    //     name: "Product",
    //     selector: (row) => row.shipperProductName,
    //     sortable: false,
    //     width: "25%",
    //   },
    //   {
    //     name: "Used Stock",
    //     selector: (row) => row.messageType, 
    //     sortable: false,
    //     width: "25%",
    //   },
    //   {
    //     name: "Label",
    //     selector: (row) => row.label,
    //     sortable: false,
    //     width: "25%",
    //   },
    //   {
    //     name: "Status",
    //     selector: (row) => row.status,
    //     sortable: false,
    //     width: "25%",
    //   },
    // ];
    // return (
    //   <div
    //   className="flex flex-col justify-center items-center w-screen py-5"
    // >
    //     <div className="mt-5 flex justify-end w-full  ">
    //   <button
    //       onClick={handleOrder}
    //       className="font-bold px-6 py-3 rounded-xl border hover:bg-black hover:text-white duration-300"
    //     >
    //       Add Order
    //     </button>
    //   </div>
    //   <div className="w-3/4">
    //     <DataTable data={data} columns={columns} />
    //   </div>
      
    // </div>
    // );
  };

export default Shipper
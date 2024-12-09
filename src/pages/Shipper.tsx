import useTitle from '../hooks/useTitle';
import { ShipperOrderData } from '../types/DataTableAttributes';
import { TableColumn } from 'react-data-table-component';
import { DataTable } from "../components/DataTable";

const Shipper = () => {
    useTitle({ title: "Shipper-Table" });
    const handleOrder=()=>{
      console.log("Order added")
    }
    const data: ShipperOrderData[] = [
      {
        shipperProductName: "Puma",
        messageType: "Product",
        label:"Label",
        status:"Pending"
      },
      {
        shipperProductName: "Nike",
        messageType: "Used Stock",
        label:"Label",
        status:"Pending"
      },
      {
        shipperProductName: "Addidas",
        messageType: "Label",
        label:"Label",
        status:"Pending"
   
      },
      {
        shipperProductName: "asics",
        messageType: "Status",
        label:"Label",
        status:"Pending"
      },
    ];
  
    const columns: TableColumn<ShipperOrderData>[] = [
      {
        name: "Product",
        selector: (row) => row.shipperProductName,
        sortable: false,
        width: "25%",
      },
      {
        name: "Message Type",
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
    return (
      <div
      className="flex flex-col justify-center items-center w-screen py-5"
    >
      <div className="w-3/4">
        <DataTable data={data} columns={columns} />
      </div>
      <div className="mt-5">
        <button
          onClick={handleOrder}
          className="font-bold border-2 border-slate-400 px-4 py-2 rounded-md shadow-md hover:bg-blue-500 hover:border-black"
        >
          Add Order
        </button>
      </div>
    </div>
    );
  };

export default Shipper
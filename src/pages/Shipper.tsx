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
      },
      {
        shipperProductName: "Nike",
        messageType: "Used Stock",
      },
      {
        shipperProductName: "Addidas",
        messageType: "Label",
   
      },
      {
        shipperProductName: "asics",
        messageType: "Status",
      },
    ];
  
    const columns: TableColumn<ShipperOrderData>[] = [
      {
        name: "Product",
        selector: (row) => row.messageType,
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
        selector: (row) => row.messageType,
        sortable: false,
        width: "25%",
      },
      {
        name: "Status",
        selector: (row) => row.messageType,
        sortable: false,
        width: "25%",
      },
    ];
    return (
      <div>
        <div className="mt-3 max-w-full">
          <DataTable data={data} columns={columns} />
        </div>
        <div><button onClick={handleOrder} className="font-bold border-2 border-slate-400 px-2 py-2 rounded-md flex flex-col items-center shadow-md gap-1 hover:bg-blue-500 hover:border-black  ">Add Order</button></div>
      </div>
    );
  };

export default Shipper
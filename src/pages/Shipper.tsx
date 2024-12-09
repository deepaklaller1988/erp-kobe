import useTitle from '../hooks/useTitle';
import { ShipperOrderData } from '../types/DataTableAttributes';
import { TableColumn } from 'react-data-table-component';
import { DataTable } from "../components/DataTable";

const Shipper = () => {
    useTitle({ title: "Shipper-Table" });
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
      </div>
    );
  };

export default Shipper
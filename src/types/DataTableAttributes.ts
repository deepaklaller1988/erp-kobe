import { TableColumn } from "react-data-table-component";
import { Primitive } from "react-data-table-component/dist/DataTable/types";

//Seller
export interface SellerProductData {
    productId: string;
    name: Primitive;
    totalQuantity: Primitive;
    availableQuantity: Primitive;
    createdAt:any;
}
export interface SellerProductAttributes {
    data: SellerProductData[];
    columns: TableColumn<SellerProductData>[];
}

//shipper
export interface ShipperOrderData {
    name: string;
    usedQuantity: string;
    label:string,
    status:string,
    createdAt:string,
    products:any[]
}

export interface ShipperOrderAttributes {
    data: ShipperOrderData[];
    columns: TableColumn<ShipperOrderData>[];
}
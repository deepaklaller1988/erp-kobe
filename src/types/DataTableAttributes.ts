import { TableColumn } from "react-data-table-component";
import { Primitive } from "react-data-table-component/dist/DataTable/types";

//Seller
export interface SellerProductData {
    sellerProductName: string;
    messageType: string;
}
export interface SellerProductAttributes {
    messageType: Primitive;
    data: SellerProductData[];
    columns: TableColumn<SellerProductData>[];
}

//shipper
export interface ShipperOrderData {
    shipperProductName: string;
    messageType: string;
}

export interface ShipperOrderAttributes {
    messageType: Primitive;
    data: ShipperOrderData[];
    columns: TableColumn<ShipperOrderData>[];
}
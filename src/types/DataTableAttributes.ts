import { TableColumn } from "react-data-table-component";

export interface SellerProductData {
    botName: string;
    messageType: string;
    creatorsReached: number;
    replies: number;
    sampleRequests: number;
    remainingCreators: number;
    botStatus: string;
    createdDate: string;
    action: string;
}

export interface SellerOrderData {
    botName: string;
    messageType: string;
    creatorsReached: number;
    replies: number;
    sampleRequests: number;
    remainingCreators: number;
    botStatus: string;
    createdDate: string;
    action: string;
}

export interface SellerProductAttributes {
    data: SellerProductData[];
    columns: TableColumn<SellerProductData>[];
}

export interface SellerOrderAttributes {
    data: SellerOrderData[];
    columns: TableColumn<SellerOrderData>[];
}
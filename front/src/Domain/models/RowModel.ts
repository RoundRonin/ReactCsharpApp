import { BaseOrderModel } from "."

export interface RowModel extends BaseOrderModel {
    id: string;
    orderNumber: string;
    [key: string]: any
}
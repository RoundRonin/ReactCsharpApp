import { BaseOrderModel } from "."

export interface DetailModel extends BaseOrderModel {
    id: string;
    orderNumber: string;
}
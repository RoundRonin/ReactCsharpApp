import { TableModel, FormModel, DetailModel } from "@/Domain";

export interface OrderRepositoryInterface {
    getOrders(page: number, limit: number): Promise<TableModel>;
    getOrderDetail(id: string): Promise<DetailModel>;
    createOrder(data: FormModel): Promise<any>;
}
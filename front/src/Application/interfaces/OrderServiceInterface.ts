import { TableModel, FormModel, DetailModel } from "@/Domain";

export interface OrderServiceInterface {
    getOrders(page: number, limit: number): Promise<TableModel>
    getOrderDetail(id: string): Promise<DetailModel>
    createOrder(data: FormModel): any
}
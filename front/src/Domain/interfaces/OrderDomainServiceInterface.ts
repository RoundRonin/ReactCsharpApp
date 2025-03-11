import { TableModel, FormModel, DetailModel } from "@/Domain";

export interface OrderDomainServiceInterface {
    getOrders(page: number, limit: number): Promise<TableModel>
    getOrderDetail(id: string): Promise<DetailModel>
    createOrder(data: FormModel): any //TODO define clearly
}
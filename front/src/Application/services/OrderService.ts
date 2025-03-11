import { OrderServiceInterface, } from "../interfaces";
import { FormModel, OrderDomainServiceInterface } from "@/Domain";

export class OrderService implements OrderServiceInterface {
    private orderDomainService: OrderDomainServiceInterface

    constructor(orderDomainService: OrderDomainServiceInterface) {
        this.orderDomainService = orderDomainService;
    }

    public async getOrders(page: number = 1, limit: number = 10) {
        return await this.orderDomainService.getOrders(page, limit);
    }

    public async getOrderDetail(id: string) {
        return await this.orderDomainService.getOrderDetail(id);
    }

    public async createOrder(data: FormModel) {
        return await this.orderDomainService.createOrder(data);
    }
};
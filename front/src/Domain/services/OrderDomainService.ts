import { OrderDomainServiceInterface, OrderRepositoryInterface } from "../interfaces";
import { FormModel } from "../models";

export class OrderDomainService implements OrderDomainServiceInterface {
    private repository: OrderRepositoryInterface

    constructor(repository: OrderRepositoryInterface) {
        this.repository = repository;
    }

    public async getOrders(page: number = 1, limit: number = 10) {
        return await this.repository.getOrders(page, limit);
    }

    public async getOrderDetail(id: string) {
        return await this.repository.getOrderDetail(id);
    }

    public async createOrder(data: FormModel) {
        return await this.repository.createOrder(data);
    }
};
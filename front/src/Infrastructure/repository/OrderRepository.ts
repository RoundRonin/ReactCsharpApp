import { OrderRepositoryInterface, TableModel, FormModel, DetailModel } from "@/Domain";
import { APIInterface } from "../interfaces";
import { TableMapper, DetailMapper } from "../mappers";

export class OrderRepository implements OrderRepositoryInterface {
    private API: APIInterface;

    constructor(API: APIInterface) {
        this.API = API;
    }

    public async getOrders(page: number, limit: number): Promise<TableModel> {
        const endpoint = `/api/Order?page=${page}&limit=${limit}`;
        const data = await this.API.fetchData(endpoint);
        return TableMapper(data);
    }

    public async getOrderDetail(id: string): Promise<DetailModel> {
        const endpoint = `/api/Order/${id}`;
        const data = await this.API.fetchData(endpoint);
        return DetailMapper(data)
    }

    public async createOrder(data: FormModel): Promise<any> {
        return await this.API.fetchData("/api/Order", {
            method: "POST",
            data,
        });
    }
}
